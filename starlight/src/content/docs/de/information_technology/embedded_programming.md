---
title: Hardwarenahe Programmierung
sidebar:
    order: 3
---

#### Evaluation Kit/Board

Ein Evaluation Board ist eine System was man um ein Bauteil oder System herum baut, bzw. gibt es sie manchmal vorgefertigt. Dieses Board/Kit braucht man damit das Teil funktioniert. Für ein Evaluation Board für eine CPU bräuchte man zum Beispiel RAM, eine SD-Card usw...

#### Hardwarenahe Programmierung

Eine hardwarenahe Programmierung ermöglicht dem Programmierer in erster Linie, auf mehrere `tiefere` (näher bei der Hardware befindend) Elemente der Hardware zuzugreifen. Dabei unterscheidet man `höhere` (in Abstraktion und Komplexität von der Ebene der Maschinensprachen deutlich entfernte) Programmiersprachen, wie zum Beispiel C, Javascript, usw., und „tiefe“ Sprachen, wie Assembler. Letztere Programmiersprache ermöglicht bereits den Zugriff auf CPU-Register, welches viele andere höhere Programmiersprachen nicht unterstützen.

Einige komplexe Programme können jedoch leider nur schwer oder gar nicht mit hardwarenahen Programmiersprachen umgesetzt werden. Aus diesem Grund haben Dennis Richie und Ken Thompson die Programmiersprache C entwickelt, mit dessen Hilfe sie dann Unix entwickelt haben...

#### Assembler und „C“

Wie bereits um oberen Absatz angeschnitten, sind Assembler und C eher hardwarenahe Programmiersprachen. Wobei allerdings der wichtige Unterschied ist, dass C zu einer Hochsprache zählt und Assembler nicht. Dafür kann man mit Assembler wirklich Kerne programmieren. Was man mit Assembler allerdings nicht kann, ist das Entwickeln von komplexen Programmen, weil dies nicht dem „Komfort“ eines Programmierers entspricht (quasi viel zu kompliziert...).

Wie es dieser [Artikel](https://www.mikrocontroller.net/articles/ASM_vs_C "ASM vs C") ausführlich erklärt, hat jede Programmiersprache ihre Existenzberechtigung. Allerdings kann man nicht mit jeder Programmiersprache alles erreichen, wie es dieses Zitat verdeutlichen soll (Z3-11):

> Bei zeit- und prozessoroptimierten Assemblerprogrammen sind viel mehr Adaptionen zu leisten, als bei den Hochsprachen. Bei typischen Applikationen für AVR, 8051 oder PIC ist dies meist noch relativ problemlos möglich, da die Codegröße und Strukturvielfalt begrenzt sind. [...] Bei einem ARM7, mit seiner dreistufigen Pipeline, wird dies schon schwieriger [...]. Der Konstrukteur des Compilers [...] kann dies besser, da er erstens die Architektur sehr gut kennt und sich zweitens mit nichts anderem als Codegeneration beschäftigt.

#### Compiler

Der Compiler wandelt den Programmcode, den wir entwickelt haben (zum Beispiel: .c, .h, ... - Files) in eine .hex-Datei, die der Mikrocontroller interpretieren und damit arbeiten kann. Der Vorgang, den dieser Compiler durchführt, heißt dann logischerweise kompilieren.

#### Plattformabhängigkeit

Wie es dieser [Artikel](https://www.mikrocontroller.net/articles/Plattformunabh%C3%A4ngige_Programmierung_in_C "Plattformunabhängige Programmierung in C") äußerst ausführlich beschreibt, bleibt der Programmcode laut Definition immer plattformabhängig. Jedoch kann man durch geschicktes Verwenden verschiedener Datentypen eine gewisse Plattformunabhängigkeit herbeiführen. Das bedeutet jedoch nicht, dass man eine Anwendung für einen AVR-µC unverändert für einen PC kompilieren kann, da der PC unter anderem nicht über die gleiche Peripherie (Timer, I/O-Ports, Datenbusse, ...) verfügt.

Aus diesem Grund sollte man immer plattformabhängige und plattformunabhängige Programmierung teilen und separat schreiben. Wenn man nämlich den plattformabhängigen Teil isoliert programmiert, muss man nur diesen Teil umschreiben, damit man den Code für andere Geräte kompilieren kann.

#### AVR

AVR ist eine Familie von 8-Bit-Mikrocontrollern die weit verbreitet sind, da sie einfach gebaut sind, aber auch leicht programmierbar sind. Wir verwenden auch einen AVR Chip (einen ATmega) und verwenden die Atmel IDE, da die AVR-Familie auch von Atmel stammt.

#### Port

Unter einem Port versteht man in der Elektronik einen Digitalen I/O Port mit dem man einfach einen Bit-Zustand darstellt. Der Zustand ist dann entweder 1-5V oder 0V. Sie werden hauptsächlich für das ein- und auslesen von digitalen Signalen verwendet, aber auch manchmal für A/D oder D/A Wandler.

## Grundprogramm

Ein typisches C-Programm hat eine main-function, welche am Start des Programms aufgerufen wird. Wichtig ist, dass diese Funktion eine Endlosschleife, die sogenannte Arbeitsschleife, enthält, ansonsten würde das Program aufhören zu laufen.

```c
/*
 * Basic_Program.c
 *
 * Created: 06.09.2069 06:09:00
 * Author : trueberryless
 */

#define F_CPU 16000000

#include <avr/io.h>
#include <avr/interrupt.h>

#define __DELAY_BACKWARD_COMPATIBLE__
#include <util/delay.h>

int main(void)
{
    // einmalige Aktionen

    while (1)
    {
        // Arbeitsschleife - mehrmalige Aktionen
    }
}
```

## LED - Licht emittierende Diode

Eine LED ist eine simple Diode, welche Licht emittiert. Damit diese leuchtet, müssen 5V Spannung an der Diode anliegen. Wenn sie nicht leuchten soll, legt man 0V Spannung an.

### Aufbau

Die LED kann an jedem beliebigen PIN angeschlossen werden. Dieses PIN muss auf [Code-Ebene](#code) als Ausgang konfiguriert werden, damit entweder 5V oder 0V anliegen. Damit kein Kurzschluss auftreten kann, muss in dem Stromkreis ein Widerstand mit 3.3K eingebaut werden. Außerdem befindet sich in diesem Kreis eine Diode. Diese ist polarisiert, was bedeutet, sie hat eine Anode und eine Kathode.

:::tip[Anode]
Die Anode ist das **positive** Ende einer Diode: **+**. Hardware-technisch wird sie gekennzeichnet durch das **längere** Ende der Diode.
:::
:::tip[Kathode]  
Die Kathode ist das **negative** Ende einer Diode: **-**. Hardware-technisch wird sie gekennzeichnet durch das **kürzere** Ende der Diode.
:::

Damit die LED korrekt funktioniert muss die Anode mit dem Ende des Widerstandes verbunden sein und die Kathode wird an den Ground (GND) angeschlossen.

### Code

```c
int main(void)
{
    // LED an Port B, Pin 0
    //  Port B, Pin 0 als Ausgang konfigurieren
    DDRB |= (1<<DDB0);

    //  Port B, Pin 0 Spannung: 0V
    PORTB &= ~(1<<PORTB0);

    //  Port B, Pin 0 Spannung: 5V
    PORTB |= (1<<PORTB0);

    while (1)
    {

    }
}
```

## Taste

Tasten sind eine Eingabe des Benutzers auf einfachster Hardware-Ebene. Die Taste kann entweder gedrückt sein oder eben nicht. Diese binäre Zustandsoption ermöglicht das einfache Konvertieren in „Strom an“ oder „Strom aus“.

### Theorie

Grundsätzlich gibt es zwei verschiedene Arten, Tasten zu verwenden:

-   Active Low Beschaltung => Pull-Up Widerstand
-   Active High Beschaltung => Pull-Down Widerstand

Diese beiden Arten müssen auf [Code-Ebene](#code-1) unterschiedlich verarbeitet werden.

#### Active Low / Pull-Up

Bei der Active Low Beschaltung liegen **0V Spannung** (low) am Eingang an, wenn die Taste gedrückt ist (active). Der [Aufbau](#active-low--pull-up-1) einer Active Low Beschaltung verwendet den Pull-Up Widerstand.

#### Active High / Pull-Down

Active High Beschaltungen funktionieren genau anders herum. Hierbei liegen die **5V Spannung** (high) am Eingang an, wenn die Taste gedrückt ist (active). Der [Aufbau](#active-high--pull-down-1) einer Active High Beschaltung verwendet den Pull-Down Widerstand.

### Aufbau

#### Active Low / Pull-Up

Am korrespondierendem PIN baut man einen Spannungsteiler auf, welcher auf der einen Seite einen 10K Widerstand mit 5V Versorgungsspannung und auf der anderen Seite eine an den Ground angeschlossene Taste anliegen hat.

![Pull-Up Widerstand](/images/embedded_programming/button/pull_up_widerstand.png)
_Ein Pull-Up Widerstand Aufbau, wenn die Taste geöffnet ist_

![Pull-Up Widerstand geschlossen](/images/embedded_programming/button/pull_up_widerstand_closed.png)
_Ein Pull-Up Widerstand Aufbau, wenn die Taste geschlossen ist_

#### Active High / Pull-Down

Am korrespondierendem PIN liegt wieder ein Spannungsteiler an, welcher diesmal allerdings auf der Seite des 10K Widerstandes den Ground (GRN) hat und auf der anderen Seite befindet sich die Taste mit 5V Versorgungsspannung.

![Pull-Down Widerstand](/images/embedded_programming/button/pull_down_widerstand.png)
_Ein Pull-Down Widerstand Aufbau, wenn die Taste geöffnet ist_

![Pull-Down Widerstand geschlossen](/images/embedded_programming/button/pull_down_widerstand_closed.png)
_Ein Pull-Down Widerstand Aufbau, wenn die Taste geschlossen ist_

### Code

#### Ohne Interrupts

:::note
Achte genau auf die Unterschiede der if-Bedingungen!
:::

##### Pull-Up Beschaltung

```c
#include <avr/io.h>
#include <util/delay.h>

void checkButton(void);

int main(void)
{
    // Taste an Port B, Pin 0
    //  Port B, Pin 0 als Eingang konfigurieren
    DDRB &= ~(1<<DDB0);

    while (1)
    {
        checkButton();
    }
}

void checkButton(void) {
    // Überprüfen, ob die Taste gedrückt wird.
    if (!(PINB & (1<<PINB0)))
    {
        // Taste wurde 1x gedrückt
    }

    // Prellen vermeiden
    _delay_ms(70);
}
```

##### Pull-Down Beschaltung

```c
#include <avr/io.h>
#include <util/delay.h>

void checkButton(void);

int main(void)
{
    // Taste an Port B, Pin 0
    //  Port B, Pin 0 als Eingang konfigurieren
    DDRB &= ~(1<<DDB0);

    while (1)
    {
        checkButton();
    }
}

void checkButton(void) {
    // Überprüfen, ob die Taste gedrückt wird.
    if (PINB & (1<<PINB0))
    {
        // Taste wurde 1x gedrückt
    }

    // Prellen vermeiden
    _delay_ms(70);
}
```

##### Interner Pull-Up Widerstand

```c
#include <avr/io.h>
#include <util/delay.h>

void checkButton(void);

int main(void)
{
    // Taste an Port B, Pin 0
    //  Port B, Pin 0 als Eingang konfigurieren
    DDRB &= ~(1<<DDB0);

    //  Port B, Pin 0 Spannung: 5V (internen Pull-Up Widerstand aktivieren)
    PORTB |= (1<<PORTB0);

    while (1)
    {
        checkButton();
    }
}

void checkButton(void) {
    // Überprüfen, ob die Taste gedrückt wird.
    if (!(PINB & (1<<PINB0)))
    {
        // Taste wurde 1x gedrückt
    }

    // Prellen vermeiden
    _delay_ms(70);
}
```

#### Mit Interrupts

Mit Interrupts hat man den Vorteil, dass man nicht in der while-Schleife ständig eine Methode aufrufen muss, welche die Tasten abfragt. Dieses Verhalten wird bei den [Interrupts](#interrupts) noch besser erklärt.

##### Direkt externe Interrupts

An Port D gibt es zwei PINs (2 und 3), welche über direkte externe Interrupts - Funktionalitäten verfügen. Das bedeutet, dass dort angeschlossene Tasten spezifisch mithilfe von bereits definierten Interrupts überprüft werden können. Dies erspart ein wenig komplexen Programmcode.

```c
#include <avr/io.h>
#include <util/delay.h>
#include <avr/interrupt.h>

int main(void)
{
    // Taste an Port D, Pin 2
    //  Port D, Pin 2 als Eingang konfigurieren
    DDRD &= ~(1<<DDD2);

    //  Port D, Pin 2 Spannung: 5V (internen Pull-Up Widerstand aktivieren)
    PORTD |= (1<<PORTD2);

    // Interrupt
    //  direktes externe Interrupt an Port D, Pin 2 aktivieren
    EIMSK |= (1<<INT0);

    //  Set Enable Interrupt
    sei();

    while (1)
    {
    }
}

ISR (INT0_vect) {
    // Taste wurde 1x gedrückt

    _delay_ms(70);
}
```

##### Gruppenbasierte externe Interrupts

Die gruppenbasierten externen Interrupts gelten immer für den gesamten Port. Aus diesem Grund muss man im Interrupt auch nochmals den richtigen PIN auf Tasteneingaben überprüfen, wie man unten, im Code, sehen kann.

|       | Port B        | Port C         | Port D         |
| ----- | ------------- | -------------- | -------------- |
| PIN 0 | PCIE0, PCINT0 | PCIE1, PCINT8  | PCIE2, PCINT16 |
| PIN 1 | PCIE0, PCINT1 | PCIE1, PCINT9  | PCIE2, PCINT17 |
| PIN 2 | PCIE0, PCINT2 | PCIE1, PCINT10 | PCIE2, PCINT18 |
| PIN 3 | PCIE0, PCINT3 | PCIE1, PCINT11 | PCIE2, PCINT19 |
| PIN 4 | PCIE0, PCINT4 | PCIE1, PCINT12 | PCIE2, PCINT20 |
| PIN 5 | PCIE0, PCINT5 | PCIE1, PCINT13 | PCIE2, PCINT21 |
| PIN 6 | PCIE0, PCINT6 | PCIE1, PCINT14 | PCIE2, PCINT22 |
| PIN 7 | PCIE0, PCINT7 | -              | PCIE2, PCINT23 |

```c
#include <avr/io.h>
#include <util/delay.h>
#include <avr/interrupt.h>

int main(void)
{
    // Taste an Port D, Pin 4
    //  Port D, Pin 4 als Eingang konfigurieren
    DDRD &= ~(1<<DDD4);

    //  Port D, Pin 4 Spannung: 5V (internen Pull-Up Widerstand aktivieren)
    PORTD |= (1<<PORTD4);

    // Interrupt
    //  gruppenbasiertes externe Interrupt an Port D, Pin 4 aktivieren
    PCICR |= (1<<PCIE2);
    PCMSK2 |= (1<<PCINT20);

    //  Set Enable Interrupt
    sei();

    while (1)
    {
    }
}

ISR (PCINT2_vect) {
    // notwendige Überprüfung des spezifischen PINs 4 auf Port D
    //  aufgrund der Verwendung von gruppenbasierten Interrupts
    if(!(PIND & (1<<PIND4))){
        // Taste wurde 1x gedrückt
    }

    _delay_ms(70);
}
```

### Troubleshooting

#### Floating Point

Ohne Widerstand darf man keine 5V Versorgungsspannung auf der Taste anlegen:

![Floating Point](/images/embedded_programming/button/floating_point.png)

#### Kurzschluss

Ebenso darf ein Spannungsteiler nicht einfach an den Ground (GND) angeschlossen werden, da dieser Ground sofort die Versorgungsspannung aufheben würde.

![Kurzschluss](/images/embedded_programming/button/kurzschluss.png)

## LCD - Flüssigkristallanzeige

Das Liquid Crystal Display besteht aus 16 Zeichen in einer Reihe und 2 Zeilen insgesamt. Es unterstützt die gesamten lateinischen, chinesischen und weiter Zeichensätze plus einige Emoji.

Für die Verwendung des Display empfiehlt sich <a href="/embedded_programming/lcd/lcd.c" download>lcd.c</a> und <a href="/embedded_programming/lcd/lcd.h" download>lcd.h</a>.

### Aufbau

![Aufbau eines LCDs am ATmega 328p](/images/embedded_programming/lcd/lcd_composition.png)
![Grid eines LCDs](/images/embedded_programming/lcd/lcd_grid.png)

### Code

Das LCD hat einige Möglichkeiten, Zeichen zu verändern, zu löschen und hinzuzufügen.

#### Schreibe Zeichen

Man kann einzelne Zeichen mit `lcd_putc('s')` aufs Display schreiben oder einen ganzen String:

```c
lcd_puts("trueberryless");
```

#### Display leeren

Um alle Zeichen auf dem Display wieder zu löschen:

```c
lcd_clrscr();
```

#### Bewege Zeichen

Wenn man alle Zeichen um eins nach links bewegen möchte, kann man das machen:

```c
lcd_command(LCD_MOVE_DISP_LEFT);
```

Dies ist äußerst hilfreich, wenn ein Text übers Display laufen soll.

#### Example Project

```c
#define F_CPU 16000000

#include <avr/io.h>
#include <avr/interrupt.h>

#define __DELAY_BACKWARD_COMPATIBLE__
#include <util/delay.h>

#include "lcd.h"
#include "dht.h"

int main(void)
{
    char buffer[16];

    int8_t temperature = 0;
    int8_t humidity = 0;

    lcd_init(LCD_DISP_ON);

    while(1) {
        if (dht_gettemperaturehumidity(&temperature, &humidity) != -1) {
            sprintf(buffer, "T: %u C, H: %u", temperature, humidity);
            lcd_puts(buffer);
            lcd_puts("%");
        }
        else {
            lcd_puts("Error");
        }
        _delay_ms(2000);
        lcd_clrscr();
    }
}
```

### Downloads

<a href="/embedded_programming/lcd/lcd.c">lcd.c</a>
<a href="/embedded_programming/lcd/lcd.h">lcd.h</a>

## Interrupts

## ADC - Analog Digital Converter

Der ADC wandelt ein analoges Signal in ein digitales Signal um. Folge dessen ist ein ADC immer ein Input. Die folgende Grafik veranschaulicht dies:

![Analoges Signal wird zu einem digitalen Signal verarbeitet](/images/embedded_programming/adc/analog_to_digital.webp)

### Theorie

Der ATmega328p verfügt über einen **10-bit ADC**. Diese Funktionalität gibt ist allerdings nur auf Port C. Je nachdem, wie viel Spannung (Volt) an den korrespondierenden PIN (zum Beispiel `PC5`) anliegen, wandelt der ADC den analogen Wert in einen digitalen um, welcher zwischen `0` und `1023` (beides inkludiert) liegt. Dieser Wert kann über das Macro `ADCW` (besteht aus `ADCL` und `ADCH`) ausgelesen werden.

#### Referenzauswahl Bits

Es gibt verschiedene Arten der Stromversorgung für den ADC. Beim ATmega328p müssen Sie meistens `REFS0` auf 1 und `REFS1` auf 0 setzen, damit Sie die korrekte Auswahl treffen. Mehr Informationen befinden sich in der [Tabelle 23-3 im Datenblatt](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=217).

#### Links- oder Rechtsbündig?

Der digitale Input, welcher auf Code-Ebene für unzählige Zwecke verwendet werden kann, wird in zwei Bytes gespeichert, weil sich 10-bit nicht in einem Byte ausgehen. Auf diese beiden Bytes kann man mit den Registern `ADCL` (lower Bit) und `ADCH` (higher Bit) zugreifen. Zusätzlich gibt es die Möglichkeit mittels `ADCW`-Register auf die gesamten 16 Bit zuzugreifen. Ob die digitalen Daten nun auf der linken oder rechten Seite dieser 16 Bits gespeichert werden sollen, kann man mittels [`ADLAR`](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=217)-Register auswählen. Welche Vor- und Nachteile diese Auswahl hat, wird im [Kapitel "effizienter ADC"](#effizienter-adc-8-bit-genauigkeit) erklärt.

#### PIN-Auswahl

Um zu bestimmen an welchen PIN (ausschließlich Port C möglich) der analoge Input anliegt, werden die `MUXx`-Bits verwendet. Diese vier Bits im [`ADMUX`](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=217)-Register werden vom [MUX-Decoder](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=206) in das korrespondierende PIN umgewandelt.

Folgende Tabelle und die [Tabelle 23-4 im Datenblatt](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=218) zeigen das Herausfinden der richtigen Konfiguration:

| PIN    | MUX0 | MUX1 | MUX2 | MUX3 |
| ------ | ---- | ---- | ---- | ---- |
| `ADC0` | 0    | 0    | 0    | 0    |
| `ADC1` | 1    | 0    | 0    | 0    |
| `ADC2` | 0    | 1    | 0    | 0    |
| `ADC3` | 1    | 1    | 0    | 0    |
| `ADC4` | 0    | 0    | 1    | 0    |
| `ADC5` | 1    | 0    | 1    | 0    |

In diesem Beispiel wird der ADC für `PC5` konfiguriert:

```c
ADMUX |= (1<<MUX0) | (1<<MUX2);
```

#### Interrupt aktivieren

Der Ablauf einer ADC-Messung sieht meistens so aus:

1. Messung starten
2. ISR (Interrupt) wird aufgerufen
3. Messung abgeschlossen

Um diesen Ablauf zu erreichen, muss man den ADC aktivieren und anschließend so konfigurieren, dass der ADC das entsprechende Interrupt verwendet. Diese Konfiguration sieht auf Code-Ebene folgendermaßen aus:

```c
// ADC Enable
ADCSRA |= (1<<ADEN);
// ADC Interrupt Enable
ADCSRA |= (1<<ADIE);

// Set Enable Interrupt
sei();
```

Und schon kann man die Messung starten:

```c
ADCSRA |= (1<<ADSC);
```

#### Modes of Operation

##### Normal Mode

Beim normalen Modus muss die Konvertierung von analogen auf digitales Signal jedes mal manuell gestartet werden. Sobald die Messung abgeschlossen ist, wird die entsprechende ISR aufgerufen. Meistens startet man die nächste Messung direkt nach der Absolvierung des Durchlaufs des [Interrupts](#interrupts).

```c
int main(void)
{
    // Standardmäßig sowieso 0, deswegen optional
    ADCSRA &= ~(1<<ADATE);
    // ...

    sei();

    // erste Messung starten
    ADCSRA |= (1<<ADSC);
}

ISR(ADC_vect) {
    // Code - Digitaler Input als `ADCW` verfügbar

    // nächste Messung starten
    ADCSRA |= (1<<ADSC);
}
```

##### Free Running Mode

Es gibt die Möglichkeit den ADC so einzustellen, dass er so schnell wie er nur kann hintereinander unendlich oft automatisch getriggert wird. Dabei entsteht die Gefahr, dass bei einer länger andauernden Ausführung des ADC [Interrupts](#interrupts) die nächste Ausführung gestartet wird, bevor die aktuell Ausführung überhaupt fertig ist.

```c
ADCSRA |= (1<<ADATE);
```

#### Prescaler

Der ADC beim ATmega328p benötigt nicht so einen schnellen Takt wie der Systemtakt. Aus diesem Grund, braucht man einen Prescaler, auch Division Factor genannt, welcher - wie der Name schon sagt, den Systemtakt durch eine konfigurierte Zahl dividiert.

Beim ATmega328p benötigen wir einen Division Factor von `128`, damit der Systemtakt ($16.000.000\;Hz$) zwischen $50K\;Hz$ und $200K\;Hz$ liegt.

$$
\frac {16.000.000\;Hz} {128} = 125.000\;Hz
$$

$$
50.000\;Hz \le 125.000\;Hz \le 200.000\;Hz
$$

Die Konfiguration auf Code-Ebene sieht dann folgendermaßen aus:

```c
ADCSRA |= (1<<ADPS0) | (1<<ADPS1) | (1<<ADPS2);
```

Falls Sie nicht den ATmega328p verwenden, empfehlen wir einen Blick in die [Tabelle 23-5](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=219).

#### effizienter ADC (8-bit Genauigkeit)

Wie vorhin bereits erwähnt hat das Data Register vom ADC beim ATmega328p 10-bit. Weil dies mehr als 8-bit sind, benötigt man zwei Bytes um die Informationen zu speichern. Diese beiden Register heißen `ADCL` und `ADCH`, was einerseits für das Low- und andererseits für das High-Byte steht. Kombiniert können die beiden Register mittels `ADCW`-Register ausgelesen werden. Dabei wird zuerst das Low Byte, anschließend das High Byte ausgelesen und schlussendlich beide geleert.

Außerdem kann man im ADC Multiplexer Selection Register (`ADMUX`-Register) das [`ADLAR`](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=217) auf 1 setzen, was dafür sorgt, dass der ADC das Ergebnis linksbündig in die beiden Register `ADCL` und `ADCH` hineinschreibt und nicht rechtsbündig, wie es standardmäßig geschieht. Für ein besseres Verständnis sehen Sie sich entweder die Bilder unten an oder lesen Sie [die Register im Datenblatt](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=219) nach.

![ADC Right Adjust Result](/images/embedded_programming/adc/adc_right_adjust_result.png)
![ADC Left Adjust Result](/images/embedded_programming/adc/adc_left_adjust_result.png)

Die Kombination dieser beiden Funktionalitäten erlauben das schnellere und effizientere Auslesen des Wertes vom ADC. Setzt man nämlich den [`ADLAR`](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=217)-Wert auf 1, sodass die _Most Significant Bits_ im `ADCH` stehen, kann man den `ADCH`-Wert direkt auslesen und erspart sich die Leseoperation vom `ADCL`-Wert. Allerdings muss man eine geringere Genauigkeit in Kauf nehmen, weil die beiden _Least Significant Bits_ nicht ausgelesen werden (`ADC0` und `ADC1`). Dies bedeutet, dass drei von vier `ADCW`-Werten abgerundet sind und der maximale Wert deswegen `1020` ist.

### Aufbau

### Code

```c
#define F_CPU 16000000

#include <avr/io.h>
#include <avr/interrupt.h>

int main(void)
{
    ADMUX |= (1<<REFS0);
    ADMUX |= (1<<MUX0) | (1<<MUX2);

    ADCSRA |= (1<<ADEN) | (1<<ADIE);
    ADCSRA |= (1<<ADPS0) | (1<<ADPS1) | (1<<ADPS2);

    // optional:
    ADCSRA |= (1<<ADATE);

    sei();

    ADCSRA |= (1<<ADSC);

    while (1);
}

ISR(ADC_vect) {
    // Code - Digitaler Input als `ADCW` verfügbar


    ADCSRA |= (1<<ADSC);
}
```

## Timer / Counter

Der Timer ist ein sehr nützliches Instrument in der hardwarenahen Programmierung und eignet sich besonders gut für zeitbasierte Vorgänge, wie zum Beispiel:

-   Delay (Programmverzögerung) um bestimmte Anzahl an Sekunden
-   regelmäßig ADC triggern
-   DC-Motor drehzahlgesteuert zu betreiben

### Theorie

Der ATmega 328p hat 3 verschiedene Timer:

-   TC0: 8-bit
-   TC1: 16-bit
-   TC2: 8-bit; async

:::note
Ersetzen Sie im gesamten Artikel das `n` immer mit der jeweiligen Nummer des Timers, welchen Sie gerade verwenden (TC0: n = 0; TC1: n = 1; ...). Im ATmega328P Datenblatt, ist TC0 [Kapitel 14](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=74), TC1 [Kapitel 15](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=89) und TC2 [Kapitel 17](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=116).
:::

Jeder Timer verfügt über ein eigenes Zählregister `TCNTn`, welches einmal pro Systemtakt hoch zählt. Wenn das Zählregister den `TOP`-Wert bzw. den `OCRnx`-Wert ([CTC Mode](#ctc---clear-timer-on-compare-match)) erreicht hat, passiert ein Überlauf. Das ist der Fachausdruck für den Prozess, bei welchem `TCNTn` wieder auf den `BOTTOM`-Wert gesetzt wird.

:::tip[Aha!]
Der 16-bit Timer verfügt hierbei über einen größeren Speicherplatz für das Zählregister, nämlich **zwei** Bytes im Gegensatz zu nur einem Byte, weshalb er seltener überläuft, weil `TCNT1` erst bis 65536 zählen muss, während `TCNT0` und `TCNT2` nur bis 256 laufen.
:::

Der Prozess des Überlaufs ist periodisch und wird hier grafisch dargestellt:

![Timer Überlauf](/images/embedded_programming/timer/timer_ueberlauf.png)

:::tip[Formular]
Um sich die Zeitspanne $\Delta t$ auszurechnen, welche beschreibt, in welchen Zeitabständen der jeweilige Timer zum Überlauf kommt, gibt es folgende Formel:

$$
\frac {2^{Bit\;des\;Timers}} {Hz\;des\;Microcontrollers} = {\Delta t\;in\;Sekunden}
$$

:::

#### Prescaler

Der Prescaler verlangsamt den Zähltakt. Auf Hardware-Ebene ist der Prescaler nämlich ein Bauteil vorm Timer, welcher den Systemtakt als Input bekommt und den manipulierten neuen Takt an den Timer weitergibt. Standardmäßig ist der Prescaler nicht gesetzt, was bedeutet, dass der Timer gar keinen Takt bekommt und somit gestoppt ist.

| Prescaler | neuer Takt $f$ | neue Periodendauer $T$ | $\Delta t$ 8-bit / 256 | $\Delta t$ 16-bit / 65536 |
| --------: | -------------: | ---------------------: | ---------------------: | ------------------------: |
|         1 |          16MHz |            0.0000625ms |                0.016ms |                   4.096ms |
|         8 |           2MHz |               0.0005ms |               0.1275ms |                   32.76ms |
|        64 |         250kHz |                0.004ms |                 1.02ms |                  262.14ms |
|       256 |        62.5kHz |                0.016ms |                 4.08ms |                  1048.5ms |
|      1024 |      15.625kHz |                0.064ms |                16.32ms |                 4194.24ms |

:::tip[Erinnerung]
Die Periodendauer $T$ ist gleich $\frac1f$, wobei $f$ die Frequenz in `Hz` ist. Sprich, je größer der Takt, desto kleiner die Periodendauer.

$$
T = \frac1f \Leftrightarrow f = \frac1T
$$

:::

#### Modes of Operation

Dabei hat jeder Timer 3 verschiedene Modi, welche in der Tabelle kurz erklärt werden:

| Normal Mode                                                                                                                                                                                                                                                                                                                                          | CTC Mode                                                                                                                                                                                                                                                                                                             | PWM Mode                                                                                                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Im normalen Modus zählt der Timer von `BOTTOM` bis `TOP` und wird bei `TOP` wieder auf `BOTTOM` gesetzt. Es gibt die Möglichkeit den Timer mit einem bestimmten Wert vorzuladen - also quasi den `BOTTOM`-Wert zu erhöhen -, indem man einfach `TCNTn` immer direkt nach dem Überlauf setzt, weshalb man die Zeitspanne bis zum Überlauf verringert. | Bei der Clear Timer on Compare Match setzt man anfangs einmal den `OCRnA`- bzw. den `OCRnB`-Wert. Erreicht der Timer (also `TCNTn`) diesen Wert, wird er geleert, was bedeutet, dass `TCNTn` wieder auf 0 gesetzt wird. Die Timer unterstützen dabei zwei unabhängige Output Compare Register (`OCRnA` und `OCRnB`). | Mithilfe der Pulse Width Modulation kann man die Spannung auf einem bestimmten PIN variable verändern. Somit lässt sich z. B. ein DC-Motor steuern, welcher sich umso schneller dreht, je mehr Spannung er bekommt. |

##### Normal Mode

Um einen bestimmten Programmcode in gewünschten Zeitabständen auszulösen, können wir also nun einen Timer verwenden, welcher konstant hoch zählt und überläuft. Da die Zeitspanne bis zum Überlauf allerdings nicht immer exakt der gewünschten Zeitspanne entsprechen wird, müssen wir den `BOTTOM`-Wert / Vorladewert so verändern (also erhöhen), dass die zeitliche Differenz zwischen dem Vorladewert und dem `TOP`-Wert genau der gewünschten Zeitspanne entspricht. Wie man dies programmtechnisch umsetzt, wird unten beim [Code](#tcntn-vorladen) erklärt. Um Ihnen die schwierigen Berechnungen zu ersparen, gibt es hier eine einfache Formel zur Berechnung des Vorladewertes:

$$
Vorladewert = 2^{Bit\;des\;Timers} - {gewünschte\;Zeitspanne\;in\;Sekunden} * \frac {Hz\;des\;Microcontrollers} {Prescaler}
$$

:::note[Beachte!]
Damit die obige Formel keine irrsinnigen Ergebnisse ausspuckt, müssen folgende Bedingungen erfüllen sein:

$$
Prescaler = \{ 1, 8, 64, 256, 1024 \}
$$

$$
0 \le gewünschte\;Zeitspanne \le \frac {1} {Hz\;des\;Microcontrollers} * 2^{Bit\;des\;Timers} * Prescaler
$$

Wenn man die Definitionsmengen nämlich nicht erfüllt, würden Werte für den Vorladewert $\gt$ `TOP`-Wert herauskommen.
:::

Zur Visualisierung, was wir eigentlich gerade gemacht haben, eignet sich dieses Bild:

![Timer mit bestimmten Wert vorlade](/images/embedded_programming/timer/timer_vorladen.png)

##### CTC - Clear Timer on Compare Match

Der Clear Timer on Compare Match Mode erleichtert uns die exakte regelmäßige Ausführung eines Programmcodes. Man setzt anfangs einmalig den `OCRnx`-Wert (Output Compare Register) als Obergrenze. Man kann sich das so vorstellen, als würde man den `TOP`-Wert senken. Somit ist der CTC Mode das Gegenteil des Vorladens, erfüllt allerdings den gleichen Zweck.

Die Formel zur Berechnung des `Output Compare Register`-Wertes ist ziemlich ähnlich. Beachten Sie dabei wieder die gleichen Definitionsmengen wie bei [obiger Formel](#normal-mode-1)!

$$
Output\;Compare\;Register =  {gewünschte\;Zeitspanne\;in\;Sekunden} * \frac {Hz\;des\;Microcontrollers} {Prescaler}
$$

##### PWM - Pulse Width Modulation

Mithilfe des PWM Modes kann man an bestimmten PINs eine bestimmte Spannung zwischen 0V und 5V anlegen. Durch ständiges, in bestimmten Intervallen auftretendes Ein- und Ausschalten der Spannung, stellt sich diese nach kurzer Zeit automatisch auf den Mittelwert der zeitlich auftretenden Spannungen ein.

Diese Vorgang passiert in Realität so schnell, dass man das ständigen Ein- und Ausschalten nicht mitbekommt. Hier ist der Prozess dargestellt:

![Duty Cycle stellt sich langsam auf den Mittelwert ein](/images/embedded_programming/timer/timer_pwm_duty_cycle_average.png)

Der PWM Mode ermöglicht uns also das exakte Einstellen der Spannung bei Laufzeit.

###### Duty Cycle

Eventuell ist Ihnen aufgefallen, dass im obigen Bild $50\%$ in den Bereichen steht, wo die Spannung _high_ ist. Genau dieses Zeitintervall in Prozent ist der sogenannte **Duty Cycle** und die Berechnung für diesen ist hier zu sehen:

$$
Duty\;Cycle = \frac {T_{on}} {T_{on} + T_{off}} * 100\%
$$

:::note
$T$ ist die Periodendauer, also das Zeitintervall, in welchem die Spannung entweder _high_ oder _low_ ist.
:::

Konfigurieren kann man den Duty Cycle mittels dem `OCRnx` Register. Dieses bestimmt - genau wie beim CTC Mode - den Vergleichswert (`Output Compare Register`).

![PWM Mode Compare Register](/images/embedded_programming/timer/timer_pwm_compare_register.png)

---

Der PWM Mode kann invertiert oder nicht invertiert betrieben werden:

###### Invertierter Modus

Beim invertierten Modus wird beim Erreichen des Vergleichswertes (`TCNTn` $=$ `OCRnx`) die Spannung auf _high_ gesetzt und beim Überlauf auf _low_.

![PWM Mode Invertierter Modus](/images/embedded_programming/timer/timer_pwm_inverting_mode.png)

###### Nicht Invertierter Modus

Beim nicht invertierten Modus ist es genau umgekehrt. Beim Erreichen des Vergleichswertes (`TCNTn` $=$ `OCRnx`) wird die Spannung auf _low_ gesetzt und beim Überlauf auf _high_.

![PWM Mode Nicht Invertierter Modus](/images/embedded_programming/timer/timer_pwm_non_inverting_mode.png)

#### Interrupts

### Code

Übersichtliche Tabelle für die wichtigsten Konfigurationen (alle Konfiguration finden Sie hier: [TC0: Table 14-8](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=86), [TC1: Table 15-5](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=109), [TC2: Table 17-8](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=130)):

|     | Normal Mode                                                     | CTC Mode                                                        | Fast<br/>PWM Mode                                               | Phase Correct<br/>PWM Mode                                      |
| --- | --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| TC0 | `WGM00` == 0<br/>`WGM01` == 0<br/>`WGM02` == 0                  | `WGM00` == 0<br/>`WGM01` == 1<br/>`WGM02` == 0                  | `WGM00` == 1<br/>`WGM01` == 1<br/>`WGM02` == 0                  | `WGM00` == 1<br/>`WGM01` == 0<br/>`WGM02` == 0                  |
| TC1 | `WGM10` == 0<br/>`WGM11` == 0<br/>`WGM12` == 0<br/>`WGM13` == 0 | `WGM10` == 0<br/>`WGM11` == 0<br/>`WGM12` == 1<br/>`WGM13` == 0 | `WGM10` == 1<br/>`WGM11` == 0<br/>`WGM12` == 1<br/>`WGM13` == 0 | `WGM10` == 1<br/>`WGM11` == 0<br/>`WGM12` == 0<br/>`WGM13` == 0 |
| TC2 | `WGM20` == 0<br/>`WGM21` == 0<br/>`WGM22` == 0                  | `WGM20` == 0<br/>`WGM21` == 1<br/>`WGM22` == 0                  | `WGM20` == 1<br/>`WGM21` == 1<br/>`WGM22` == 0                  | `WGM20` == 1<br/>`WGM21` == 0<br/>`WGM22` == 0                  |

#### Normal Mode

Für den normalen Modus beim Timer können folgende Konfigurationen getroffen werden:

-   `WGMn0`, `WGMn1` und `WGMn2` (und `WGM13`) auf 0 setzen (siehe [Table 14-8](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=86), [Table 15-5](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=109) oder [Table 17-8](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=130))

    ```c
    // Timer Modus auf Normal Mode setzen
    TCCRnA &= ~((1<<WGMn0) | (1<<WGMn1));
    TCCRnB &= ~((1<<WGMn2));
    ```

-   `CSn0`, `CSn1` und `CSn2` einstellen (siehe [Table 14-9](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=87), [Table 15-6](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=110) oder [Table 17-9](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=131))

    ```c
    // Prescaler einstellen - Beispiel 1024
    TCCRnB |= (1<<CSn0) | (1<<CSn2);
    TCCRnB &= ~(1<<CSn1);
    ```

    Nutzen Sie [diese](#prescaler-1) Tabelle, um herauszufinden, welcher Prescaler Wert in Ihrem Program am meisten Sinn macht.

##### `TCNTn` vorladen

:::tip[Aufgabe]
Erstellen Sie ein Programm, bei welchem eine ISR alle **vier Millisekunden** ausgeführt wird! Nutzen Sie dafür den Timer im Normal Mode!
:::

Um diese Aufgabe zu lösen, verwenden wir die [Formel](#normal-mode-1), um uns den Vorladewert von $1536$ auszurechnen.

```c
#define F_CPU 16000000

#include <avr/io.h>

int main(void)
{
    // Timer Modus auf Normal setzen (optional)
    TCCR1A &= ~((1<<WGM10) | (1<<WGM11));
    TCCR1B &= ~((1<<WGM12) | (1<<WGM13));

    // Zählregister vorladen
    TCNT1 = 1536;

    sei();

    while (1);
}

// ISR wird jeden Überlauf getriggert - alle 4ms in diesem Fall
ISR(TIMER1_OVF_vect) {
    // Code

    // Zählregister vorladen
    TCNT1 = 1536;
}
```

#### CTC - Clear Timer on Compare Match

Für den CTC Modus beim Timer müssen/können folgende Konfigurationen getroffen werden:

-   `WGMnx` richtig setzen (TC0 / TC2: `WGMn1`; TC1: `WGM12` (und `WGM13`))  
    (siehe [Table 14-8](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=86), [Table 15-5](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=109) oder [Table 17-8](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=130))

-   `OCIEnx` auf 1 setzen (siehe [14.9.6](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=88), [15.11.8](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=112) oder [17.11.6](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=132))

    ```c
    // Interrupts aktivieren - Beispiel Compare Match A
    TIMSKn |= (1<<OCIEnA);
    ```

-   `CSn0`, `CSn1` und `CSn2` einstellen (siehe [Table 14-9](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=87), [Table 15-6](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=110) oder [Table 17-9](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=131))

    ```c
    // Prescaler einstellen - Beispiel 256
    TCCRnB |= (1<<CSn2);
    TCCRnB &= ~((1<<CSn0) | (1<<CSn1));
    ```

    Nutzen Sie [diese](#prescaler-1) Tabelle, um herauszufinden, welcher Prescaler Wert in Ihrem Program am meisten Sinn macht.

:::tip[Aufgabe]
Erstellen Sie ein Programm, bei welchem eine ISR alle **vier Millisekunden** ausgeführt wird! Nutzen Sie dafür den Timer im CTC Mode!
:::

Um diese Aufgabe zu lösen, verwenden wir die [Formel](#ctc---clear-timer-on-compare-match), um uns den Vorladewert von $64000$ auszurechnen.

```c
#define F_CPU 16000000

#include <avr/io.h>

int main(void)
{
    // Timer Modus auf CTC setzen
    TCCR1A &= ~((1<<WGM10) | (1<<WGM11));
    TCCR1B |= (1<<WGM12);
    TCCR1B &= ~(1<<WGM13);

    // Output Compare Register richtig einstellen
    OCR1A = 64000;

    // Output Compare Register Interrupt aktivieren
    TIMSK1 |= (1<<OCIE1A);

    sei();

    while (1);
}

// ISR wird bei jedem Compare Match getriggert - alle 4ms in diesem Fall
ISR(TIMER1_COMPA_vect) {
    // Code
}
```

#### PWM - Puls Width Modulation

Für den PWM Modus beim Timer müssen/können folgende Konfigurationen getroffen werden:

-   `WGMnx` richtig setzen
    (siehe [Table 14-8](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=86), [Table 15-5](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=109) oder [Table 17-8](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=130))

-   invertierenden / nicht-invertierenden Modus einstellen

    -   `COMnA0` und `COMnA1` (siehe [Table 14-3 und 14-4](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=84), [Table 15-3 und 15-4](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=108) oder [Table 17-3 und 17-4](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=128))

    -   `COMnB0` und `COMnB1` (siehe [Table 14-6 und 14-7](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=85), [Table 15-3 und 15-4](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=108) oder [Table 17-6 und 17-7](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=129))

-   `CSn0`, `CSn1` und `CSn2` einstellen (siehe [Table 14-9](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=87), [Table 15-6](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=110) oder [Table 17-9](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=131))

    ```c
    // Prescaler einstellen - Beispiel 64
    TCCRnB |= (1<<CSn0) | (1<<CSn1);
    TCCRnB &= ~(1<<CSn2);
    ```

    Nutzen Sie [diese](#prescaler-1) Tabelle, um herauszufinden, welcher Prescaler Wert in Ihrem Program am meisten Sinn macht.

:::tip[Aufgabe]
Erstellen Sie ein Programm, bei welchem eine ISR alle **vier Millisekunden** ausgeführt wird! Nutzen Sie dafür den Timer im CTC Mode!
:::

Um diese Aufgabe zu lösen, verwenden wir die [Formel](#ctc---clear-timer-on-compare-match), um uns den Vorladewert von $64000$ auszurechnen.

```c
#define F_CPU 16000000

#include <avr/io.h>
#include <util/delay.h>
#include <avr/interrupt.h>


int main(void)
{
    // PB1 als Ausgang konfigurieren
    DDRB |= (1<<DDB1);

    // WGM10 und WGM12: Fast PWM; 8-bit aktivieren (MAX -> 255)
    TCCR1A |= (1<<WGM10);
    TCCR1B |= (1<<WGM12);

    // CS12: 256er Prescaler setzen => PWM mit 244,1 Hz
    TCCR1B |= (1<<CS12);

    // non-inverting Mode einstellen
    TCCR1A |= (1<<COM1A1);

    // REFS0: Aufgrund der Beschaltung des ADCs.
    // A3: Analoges Signal an PC3 => MUX0 | MUX1
    ADMUX |= (1<<REFS0) | (1<<MUX0) | (1<<MUX1);

    // ADEN => Enables ADC
    // ADPSx => Division Factor to get between 50kHz and 200kHz with our 60MHz Elegoo.
    ADCSRA |= (1<<ADEN) | (1<<ADPS0) | (1<<ADPS1) | (1<<ADPS2);

    ADCSRA |= (1<<ADIE);

    // ADSC => Start Conversion
    ADCSRA |= (1<<ADSC);

    sei();

    /* Replace with your application code */
    while (1)
    {
        //OCR1A = 65;             // Pulsweite DC von ca. 25%
        //_delay_ms(2000);
        //OCR1A = 123;            // Pulsweite DC von ca. 50%
        //_delay_ms(2000);
        //OCR1A = 255;            // Pulsweite DC von ca. 100%
        //_delay_ms(2000);
    }
}

ISR(ADC_vect) {
    OCR1A = ADCW / (1023 / 255);

    // ADSC => Start Conversion
    ADCSRA |= (1<<ADSC);
}
```

#### Interrupts

Timer Counter n Überlauf:

```c
ISR(TIMERn_OVF_vect) {

}
```

Timer Counter n Compare Match x:

```c
// CTC Mode
ISR(TIMERn_COMPx_vect) {

}
```

## Pointer

## USART - Universal Synchronous and Asynchronous Receiver Transmitter

In Datenverarbeitungsprogrammen ist es oft, wenn nicht sogar immer, notwendig, Daten zwischen Computern auszutauschen. Um diese Verbindung zwischen unserem ATmega328p Board und unserer Entwicklungsmaschine herzustellen, gibt es das USART (Universal Synchronous/Asynchronous Receiver Transmitter).

### Theorie

#### Datenübertragung

Für die Datenübertragung braucht es zwei PINs, ein PIN zum Senden und ein PIN zum Empfangen von Daten. Dafür sind beim ATmega328p die PINs `PD0` und `PD1` reserviert. Wenn Sie das USART also verwenden möchten, achten Sie darauf, diese beiden PINs nicht gleichzeitig für andere Zwecke zu verwenden.

#### Konfiguration

##### Baud Rate

Damit das `USART` beim ATmega328p richtig funktioniert, muss man die Baud Rate auf 9600 setzen. Die Baud Rate gibt an, wie viele Bits pro Sekunde übertragen werden sollen. Dabei ist es wichtig, dass unsere Arduino Board und der andere Kommunikationspartner die gleiche Baud Rate verwenden.

```c
UBRR0 = 103;
```

Für andere Baud Rate-Konfigurationen lesen Sie bitte [Kapitel 19-11 im Datenblatt](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=163) durch.

##### Senden aktivieren

Wenn Sie Daten senden möchten, müssen Sie dies aktivieren.

```c
UCSR0B |= (1<<TXEN0);
```

##### Empfangen aktivieren

Für das Aktivieren für das Empfangen von Daten muss zusätzlich auch das Interrupt aktiviert werden, damit bei jedem hereinkommenden Zeichen diese getriggert wird.

```c
UCSR0B |= (1<<RXEN0) | (1<<RXCIE0);
```

##### Größe der Bits setzen

Sender und Empfänger müssen definieren, wie viele Bits pro gesendetem Zeichen verwendet werden sollen. Je nachdem, welche Codierung (`ASCII`, `UTF-8`, `UTF-16` ...) verwendet wird, benötigen die Zeichen jeweils acht, 16 oder mehrere Bits.

Die meisten Encodings verwenden 8-bit:

```c
UCSR0C |= (1<<UCSZ00) | (1<<UCSZ01);
```

Für andere Konfigurationen verwenden Sie die [Tabelle 19-7 aus dem Datenblatt](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=162).

### Code

#### Konfiguration

Meistens verwenden Sie diese Konfiguration um alles bezüglich `USART` richtig zu konfigurieren:

```c
UBRR0 = 103;
UCSR0B |= (1<<TXEN0) | (1<<RXEN0) | (1<<RXCIE0);
UCSR0C |= (1<<UCSZ00) | (1<<UCSZ01);
```

#### Daten senden

Um die Implementierung zu erleichtern, verwendet man [Pointer](#pointer). Dies ist die Methode für einzelne [ASCII-Zeichen](https://www.torsten-horn.de/techdocs/ascii.htm).

```c
void write_char(char str) {
    while (!(UCSR0A & (1<<UDRE0)));
    UDR0=str;
}
```

Für ganze Zeichenketten gibt es diese einfache Methode:

```c
void write_string(char *arr) {
    while(*arr) {
        while (!(UCSR0A & (1<<UDRE0)));
        UDR0=*arr++;
    }
}
```

#### Daten empfangen

Während man ganze Zeichenketten schicken kann, kann man immer nur einzelne Zeichen empfangen.

```c
ISR(USART_RX_vect) {
    uint8_t tmp;
    tmp = UDR0;
}
```

Um ganze Zeichenketten zu empfangen müsste man ein Protokoll definieren / verwenden, damit die Kommunikation zwischen den Computern einheitlich ist. Das Protokoll würde zum Beispiel definieren, welcher Overhead vor / nach den eigentlichen RAW-Daten mitgeschickt werden müsste, damit alle Komponenten exakt wissen, welche Zeichen zu welcher Zeichenkette gehören.

## SPI - Serial Peripheral Interface

### Theorie

Das SPI ist ein serielles Kommunikationsprotokoll (Bus-System), welches verwendet werden kann, um den Datenaustausch zwischen verschiedenen Komponenten effizient zu ermöglichen. Dieses bidirektionale, synchronisierte Interface bietet eine schnelle und zuverlässige Methode für die Übertragung von Daten zwischen einem `Controller`-Gerät und mehreren `Peripheral`-Geräten, wie zum Beispiel SD-Karten, Sensoren oder Schieberegister.

Dabei muss die Kommunikation immer vom Controller aus gestartet werden. Ein Peripheral kann nur Daten senden, wenn er vom Controller dazu aufgefordert wird.

Das SPI verwendet separate Takt- und Datenleitungen sowie eine Auswahlleitung, um das Gerät auszuwählen, mit dem Sie sprechen möchten. Dies ist auch einer der Unterschiede zum [USART](#usart---universal-synchronous-and-asynchronous-receiver-transmitter), welches keine synchrone Schnittstelle ist, da es keine Garantie gibt, dass beide Seiten mit der gleichen Taktrate laufen. Beim USART müssen sich die beiden Seiten im Vorhinein einigen, mit welcher Übertragungsgeschwindigkeit ([Baudrate](#baud-rate)) sie kommunizieren und es müssen zusätzliche Start- und Stoppbits übertragen werden.

:::note
Einige Dokumentationen verwenden noch die veralteten Begriffe, wie `Master` oder `Slave`. Aufgrund ihrer historischen Verbindung mit Rassismus werden diese Begriffe heutzutage durch neutralere Alternativen ersetzt. Folgende Tabelle zeigt die Änderungen diesbezüglich:

| Veralteter Begriff         | Neuer Name                          |
| -------------------------- | ----------------------------------- |
| Master                     | Controller                          |
| Slave                      | Peripheral                          |
| MISO (Master In Slave Out) | POCI (Peripheral Out Controller In) |
| MOSI (Master Out Slave In) | PICO (Peripheral In Controller Out) |
| SS (Slave Select)          | CS (Chip Select)                    |

Für weitere Informationen siehe [Wikipedia](<https://en.wikipedia.org/wiki/Master%E2%80%93slave_(technology)#Terminology_concerns>).
:::

#### Clock

Genau wie der [Timer](#timer--counter) benötigt das SPI einen Prescaler, um den Systemtakt anzupassen. Mithilfe dieser Tabelle ([Datenblatt](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=141)) und diesen Registern kann man den Prescaler einstellen:

| `SPI2X` | `SPR1` | `SPR0` | `SCK` Frequency       |
| ------- | ------ | ------ | --------------------- |
| 0       | 0      | 0      | f<sub>OSC</sub> / 4   |
| 0       | 0      | 1      | f<sub>OSC</sub> / 16  |
| 0       | 1      | 0      | f<sub>OSC</sub> / 64  |
| 0       | 1      | 1      | f<sub>OSC</sub> / 128 |
| 1       | 0      | 0      | f<sub>OSC</sub> / 2   |
| 1       | 0      | 1      | f<sub>OSC</sub> / 8   |
| 1       | 1      | 0      | f<sub>OSC</sub> / 32  |
| 1       | 1      | 1      | f<sub>OSC</sub> / 64  |

Diese Bits können in den Registern `SPSR` (`SPI2X`) und `SPCR` (`SPR1`, `SPR0`) gesetzt werden.

```c
SPCR |= (1<<SPR0) | (1<<SPR1);
SPSR |= (1<<SPI2X);
```

#### Chip Select

Vor jedem Senden und Empfangen der Daten wird empfohlen das Peripheral zu selektieren, indem das jeweilige PIN auf 0V gesetzt wird und anschließend die interne Spannung wieder auf 5V gesetzt wird. Anders gesagt, ist der Chip Select `active low`.

Beispielsweise kann man mittels dieser Konfiguration den `RFID` (ein Kartenlesegerät) selektieren:

```c
#define RFID PORTB2
PORTB &= ~(1<<RFID);
```

Und anschließend wieder deselektieren:

```c
PORTB |= (1<<RFID);
```

Für jedes Peripheral muss man einen eigenen Chip Select PIN verwenden. Diese Architektur kann in diesem Bild ([Quelle](https://learn.sparkfun.com/tutorials/serial-peripheral-interface-spi/all)) noch einmal besser veranschaulicht werden:

![Aufbau SPI](/images/embedded_programming/spi/architecture.png)

#### Read und Write

Das Prinzip bei SPI ist immer: Der Controller sendet Daten an das Peripheral und der Peripheral sendet Daten zurück. Allerdings werden immer alle Bits gleichzeitig verschoben (also eigentlich ein Schieberegister). Während der Controller Bits von rechts nach links (Controller beginnt mit dem MSB) sendet, sendet der Peripheral die Bits, die aus seinem Byte hinausgeschoben werden zurück an den Controller.

Das bedeutet, dass in den ersten **acht Zyklen** die Daten von Controller an den Peripheral gesendet werden. Gleichzeit erhält der Controller nutzlose Daten vom Peripheral, welche noch im Byte vom Peripheral enthalten waren. Und anschließend kann der Controller mithilfe von `Dummy Daten` die eigentlichen Daten vom Peripheral auslesen.

In diesem Beispiel werden die Daten zuerst vom Controller zum Peripheral gesendet:

```c
uint8_t data = ((1<<7) | (0x37<<1));

SPDR = data;
while(!(SPSR & (1<<SPIF)));

uint8_t temp = SPDR;
```

Der Prozess dieses Ablaufs ist in diesem Diagramm nochmal dargestellt:

<img src="/images/embedded_programming/spi/transfer_data.png" alt="Data Transfer" class="light-only"/>
<img src="/images/embedded_programming/spi/transfer_data_dark.png" alt="Data Transfer" class="dark-only"/>

Und anschließend werden die berechneten Daten vom Peripheral zum Controller gesendet:

```c
uint8_t dummyData = 0x00;

SPDR = dummyData;
while(!(SPSR & (1<<SPIF)));

uint8_t versionNumber = SPDR;
```

<img src="/images/embedded_programming/spi/transfer_data_2.png" alt="Data Transfer" class="light-only"/>
<img src="/images/embedded_programming/spi/transfer_data_2_dark.png" alt="Data Transfer" class="dark-only"/>

### Code

#### Config

```c
#define CS_PIN PORTB2

void SPI_init(void)
{
    DDRB |= (1<<DDB2) | (1<<DDB3) | (1<<DDB5);
    PORTB |= (1<<CS_PIN);
    SPCR |= (1<<MSTR) | (1<<SPE) | (1<<SPR0);
}
```

#### Read und Write Methods

```c
uint8_t ReadCommand(uint8_t command) {
	return ((1<<7) | (command<<1));
}

uint8_t WriteCommand(uint8_t command) {
	return (command<<1);
}
```

## EEPROM - Nicht flüchtiger Speicher

Manchmal ist es notwendig, Daten auf einen nicht flüchtigen Speicher zu speichern. Dies bedeutet, dass die Daten auch nach dem Trennen vom Strom und anschließenden Hinzufügen des Stromes immer noch gespeichert sind. Heutzutage hat jeder Computer so einen Speicher, bekannt als Festplattenspeicher, ROM bzw. SSD. Letzteres ist bereits eine spezifische Speicherart.

Das Gegenteil eines solchen Speichers ist der flüchtige Speicher, der Arbeitsspeicher, bekannt als RAM.

### Theorie

Der ATmega328p verfügt bereits über einen nicht flüchtigen Speicher, dem EEPROM. Mithilfe [dieser](https://www.nongnu.org/avr-libc/user-manual/group__avr__eeprom.html) Bibliothek ist das Lesen und Schreiben eine Leichtigkeit.

Hierbei gibt es viele verschiedene Funktionen, welche unterschiedliche Anzahl an Bytes speichern / lesen:

| Funktion              | Bit | Byte |
| --------------------- | --- | ---- |
| `eeprom_read_byte()`  | 8   | 1    |
| `eeprom_read_word()`  | 16  | 2    |
| `eeprom_read_dword()` | 32  | 4    |
| `eeprom_read_float()` | 32  | 4    |

:::tip
Verwenden Sie für `int`-Werte `eeprom_read_word()`!
:::

Dabei muss man immer selbst auswählen, unter welcher Adresse die Bytes gespeichert werden. Der ATmega328p verfügt über eine Speichergröße von 1kB, also von Adresse `0x000` bis `0x3FF`.

### Code

#### Lesen

Um Daten zu lesen - diese Operation ist theoretisch unlimitiert durchführbar - reicht dieser simple Code aus:

```c
#define F_CPU 16000000

#include <avr/io.h>
#include <avr/eeprom.h>

int main(void)
{
    uint16_t value = eeprom_read_word(0x00);

    while (1);
}
```

#### Schreiben

Um Daten zu schreiben - diese Operation ist laut [Datenblatt](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf) 100.000 Mal durchführbar - reicht dieser simple Code aus:

```c
#define F_CPU 16000000

#include <avr/io.h>
#include <avr/eeprom.h>

int main(void)
{
    int nice = 69420;
    eeprom_write_word(0x00, nice);

    while (1);
}
```

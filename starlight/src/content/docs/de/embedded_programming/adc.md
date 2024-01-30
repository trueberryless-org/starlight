---
title: ADC - Analog Digital Converter
description: Der ADC wandelt ein analoges Signal in ein digitales Signal um.
sidebar:
    order: 6
---

Der ADC wandelt ein analoges Signal in ein digitales Signal um. Folge dessen ist ein ADC immer ein Input. Die folgende Grafik veranschaulicht dies:

![Analoges Signal wird zu einem digitalen Signal verarbeitet](../../../../assets/embedded_programming/adc/analog_to_digital.webp)

## Theorie

Der ATmega328p verfügt über einen **10-bit ADC**. Diese Funktionalität gibt ist allerdings nur auf Port C. Je nachdem, wie viel Spannung (Volt) an den korrespondierenden PIN (zum Beispiel `PC5`) anliegen, wandelt der ADC den analogen Wert in einen digitalen um, welcher zwischen `0` und `1023` (beides inkludiert) liegt. Dieser Wert kann über das Macro `ADCW` (besteht aus `ADCL` und `ADCH`) ausgelesen werden.

### Referenzauswahl Bits

Es gibt verschiedene Arten der Stromversorgung für den ADC. Beim ATmega328p müssen Sie meistens `REFS0` auf 1 und `REFS1` auf 0 setzen, damit Sie die korrekte Auswahl treffen. Mehr Informationen befinden sich in der [Tabelle 23-3 im Datenblatt](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=217).

### Links- oder Rechtsbündig?

Der digitale Input, welcher auf Code-Ebene für unzählige Zwecke verwendet werden kann, wird in zwei Bytes gespeichert, weil sich 10-bit nicht in einem Byte ausgehen. Auf diese beiden Bytes kann man mit den Registern `ADCL` (lower Bit) und `ADCH` (higher Bit) zugreifen. Zusätzlich gibt es die Möglichkeit mittels `ADCW`-Register auf die gesamten 16 Bit zuzugreifen. Ob die digitalen Daten nun auf der linken oder rechten Seite dieser 16 Bits gespeichert werden sollen, kann man mittels [`ADLAR`](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=217)-Register auswählen. Welche Vor- und Nachteile diese Auswahl hat, wird im [Kapitel "effizienter ADC"](#effizienter-adc-8-bit-genauigkeit) erklärt.

### PIN-Auswahl

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

### Interrupt aktivieren

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

### Modes of Operation

#### Normal Mode

Beim normalen Modus muss die Konvertierung von analogen auf digitales Signal jedes mal manuell gestartet werden. Sobald die Messung abgeschlossen ist, wird die entsprechende ISR aufgerufen. Meistens startet man die nächste Messung direkt nach der Absolvierung des Durchlaufs des [Interrupts](../interrupts/).

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

#### Free Running Mode

Es gibt die Möglichkeit den ADC so einzustellen, dass er so schnell wie er nur kann hintereinander unendlich oft automatisch getriggert wird. Dabei entsteht die Gefahr, dass bei einer länger andauernden Ausführung des ADC [Interrupts](./interrupts.md) die nächste Ausführung gestartet wird, bevor die aktuell Ausführung überhaupt fertig ist.

```c
ADCSRA |= (1<<ADATE);
```

### Prescaler

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

### effizienter ADC (8-bit Genauigkeit)

Wie vorhin bereits erwähnt hat das Data Register vom ADC beim ATmega328p 10-bit. Weil dies mehr als 8-bit sind, benötigt man zwei Bytes um die Informationen zu speichern. Diese beiden Register heißen `ADCL` und `ADCH`, was einerseits für das Low- und andererseits für das High-Byte steht. Kombiniert können die beiden Register mittels `ADCW`-Register ausgelesen werden. Dabei wird zuerst das Low Byte, anschließend das High Byte ausgelesen und schlussendlich beide geleert.

Außerdem kann man im ADC Multiplexer Selection Register (`ADMUX`-Register) das [`ADLAR`](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=217) auf 1 setzen, was dafür sorgt, dass der ADC das Ergebnis linksbündig in die beiden Register `ADCL` und `ADCH` hineinschreibt und nicht rechtsbündig, wie es standardmäßig geschieht. Für ein besseres Verständnis sehen Sie sich entweder die Bilder unten an oder lesen Sie [die Register im Datenblatt](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=219) nach.

![ADC Right Adjust Result](../../../../assets/embedded_programming/adc/adc_right_adjust_result.png)
![ADC Left Adjust Result](../../../../assets/embedded_programming/adc/adc_left_adjust_result.png)

Die Kombination dieser beiden Funktionalitäten erlauben das schnellere und effizientere Auslesen des Wertes vom ADC. Setzt man nämlich den [`ADLAR`](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=217)-Wert auf 1, sodass die _Most Significant Bits_ im `ADCH` stehen, kann man den `ADCH`-Wert direkt auslesen und erspart sich die Leseoperation vom `ADCL`-Wert. Allerdings muss man eine geringere Genauigkeit in Kauf nehmen, weil die beiden _Least Significant Bits_ nicht ausgelesen werden (`ADC0` und `ADC1`). Dies bedeutet, dass drei von vier `ADCW`-Werten abgerundet sind und der maximale Wert deswegen `1020` ist.

## Aufbau

## Code

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

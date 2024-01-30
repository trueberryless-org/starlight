---
title: USART - Daten senden / empfangen
sidebar:
    order: 9
---

In Datenverarbeitungsprogrammen ist es oft, wenn nicht sogar immer, notwendig, Daten zwischen Computern auszutauschen. Um diese Verbindung zwischen unserem ATmega328p Board und unserer Entwicklungsmaschine herzustellen, gibt es das USART (Universal Synchronous/Asynchronous Receiver Transmitter).

## Theorie

### Datenübertragung

Für die Datenübertragung braucht es zwei PINs, ein PIN zum Senden und ein PIN zum Empfangen von Daten. Dafür sind beim ATmega328p die PINs `PD0` und `PD1` reserviert. Wenn Sie das USART also verwenden möchten, achten Sie darauf, diese beiden PINs nicht gleichzeitig für andere Zwecke zu verwenden.

### Konfiguration

#### Baud Rate

Damit das `USART` beim ATmega328p richtig funktioniert, muss man die Baud Rate auf 9600 Bits pro Sekunde setzen. Die Baud Rate (Übertragungsgeschwindigkeit) gibt an, wie viele Bits pro Sekunde übertragen werden sollen. Dabei ist es wichtig, dass unsere Arduino Board und der andere Kommunikationspartner die gleiche Baud Rate verwenden.

```c
UBRR0 = 103;
```

Das [SPI](../spi/) muss keine Übertragungsgeschwindigkeit einstellen, da es synchron (mit gleichem Takt) kommuniziert.

Für andere Baud Rate-Konfigurationen lesen Sie bitte [Kapitel 19-11 im Datenblatt](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=163) durch.

#### Senden aktivieren

Wenn Sie Daten senden möchten, müssen Sie dies aktivieren.

```c
UCSR0B |= (1<<TXEN0);
```

#### Empfangen aktivieren

Für das Aktivieren für das Empfangen von Daten muss zusätzlich auch das Interrupt aktiviert werden, damit bei jedem hereinkommenden Zeichen diese getriggert wird.

```c
UCSR0B |= (1<<RXEN0) | (1<<RXCIE0);
```

#### Größe der Bits setzen

Sender und Empfänger müssen definieren, wie viele Bits pro gesendetem Zeichen verwendet werden sollen. Je nachdem, welche Codierung (`ASCII`, `UTF-8`, `UTF-16` ...) verwendet wird, benötigen die Zeichen jeweils acht, 16 oder mehrere Bits.

Die meisten Encodings verwenden 8-bit:

```c
UCSR0C |= (1<<UCSZ00) | (1<<UCSZ01);
```

Für andere Konfigurationen verwenden Sie die [Tabelle 19-7 aus dem Datenblatt](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf#page=162).

## Code

### Konfiguration

Meistens verwenden Sie diese Konfiguration um alles bezüglich `USART` richtig zu konfigurieren:

```c
UBRR0 = 103;
UCSR0B |= (1<<TXEN0) | (1<<RXEN0) | (1<<RXCIE0);
UCSR0C |= (1<<UCSZ00) | (1<<UCSZ01);
```

### Daten senden

Um die Implementierung zu erleichtern, verwendet man [Pointer](../pointer/). Dies ist die Methode für einzelne [ASCII-Zeichen](https://www.torsten-horn.de/techdocs/ascii.htm).

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

### Daten empfangen

Während man ganze Zeichenketten schicken kann, kann man immer nur einzelne Zeichen empfangen.

```c
ISR(USART_RX_vect) {
    uint8_t tmp;
    tmp = UDR0;
}
```

Um ganze Zeichenketten zu empfangen müsste man ein Protokoll definieren / verwenden, damit die Kommunikation zwischen den Computern einheitlich ist. Das Protokoll würde zum Beispiel definieren, welcher Overhead vor / nach den eigentlichen RAW-Daten mitgeschickt werden müsste, damit alle Komponenten exakt wissen, welche Zeichen zu welcher Zeichenkette gehören.

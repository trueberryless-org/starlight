---
title: EEPROM - Nicht flüchtiger Speicher
sidebar:
    order: 11
---

Manchmal ist es notwendig, Daten auf einen nicht flüchtigen Speicher zu speichern. Dies bedeutet, dass die Daten auch nach dem Trennen vom Strom und anschließenden Hinzufügen des Stromes immer noch gespeichert sind. Heutzutage hat jeder Computer so einen Speicher, bekannt als Festplattenspeicher, ROM bzw. SSD. Letzteres ist bereits eine spezifische Speicherart.

Das Gegenteil eines solchen Speichers ist der flüchtige Speicher, der Arbeitsspeicher, bekannt als RAM.

## Theorie

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

## Code

### Lesen

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

### Schreiben

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

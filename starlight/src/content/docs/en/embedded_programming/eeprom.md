---
title: EEPROM - Non-volatile memory
sidebar:
    order: 11
---

Sometimes it is necessary to store data on a non-volatile memory. This means that the data is still stored even after disconnecting the power and then adding the power. Nowadays, every computer has such a memory, known as hard disk memory, ROM or SSD. The latter is already a specific type of memory.

The opposite of such a memory is the volatile memory, the main memory, known as RAM.

## Theory

The ATmega328p already has a non-volatile memory, the EEPROM. With the help of [this](https://www.nongnu.org/avr-libc/user-manual/group__avr__eeprom.html) library, reading and writing is a breeze.

There are many different functions which store / read different numbers of bytes:

| Function              | Bit | Byte |
| --------------------- | --- | ---- |
| `eeprom_read_byte()`  | 8   | 1    |
| `eeprom_read_word()`  | 16  | 2    |
| `eeprom_read_dword()` | 32  | 4    |
| `eeprom_read_float()` | 32  | 4    |

:::tip
For `int` values use `eeprom_read_word()`!
:::

You always have to choose yourself under which address the bytes are stored. The ATmega328p has a memory size of 1kB, so from address `0x000` to `0x3FF`.

## Code

### Read

To read data - this operation is theoretically unlimited - this simple code is sufficient:

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

### Write

To write data - this operation can be performed 100,000 times according to [data sheet](https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf) - this simple code is sufficient:

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

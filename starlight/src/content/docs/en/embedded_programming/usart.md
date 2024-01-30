---
title: USART - Send / receive data
sidebar:
    order: 9
---

In data processing programs it is often, if not always, necessary to exchange data between computers. To establish this connection between our ATmega328p board and our development machine, we have the USART (Universal Synchronous/Asynchronous Receiver Transmitter).

## Theory

For data transmission, two PINs are needed, one PIN for sending and one PIN for receiving data. The PINs 'PD0' and 'PD1' are reserved for this purpose on the ATmega328p. So if you want to use the USART, be careful not to use these two PINs for other purposes at the same time.

## Code

### Send data

To facilitate the implementation, use [Pointer](../pointer/). This is the method for single [ASCII characters](https://www.torsten-horn.de/techdocs/ascii.htm).

```c
void write_char(char str) {
    while (!(UCSR0A & (1<<UDRE0)));
    UDR0=str;
}
```

For whole strings, there is this simple method:

```c
void write_string(char *arr) {
    while(*arr) {
        while (!(UCSR0A & (1<<UDRE0)));
        UDR0=*arr++;
    }
    while (!(UCSR0A & (1<<UDRE0)));
}
```

### Receive data

While you can send whole strings, you can only ever receive single characters.

```c
ISR(USART_RX_vect) {
    uint8_t tmp;
    tmp = UDR0;
}
```

In order to receive whole strings one would need to define / use a protocol so that communication between computers is consistent. The protocol would define, for example, what overhead would have to be sent before / after the actual RAW data so that all components know exactly which characters belong to which string.

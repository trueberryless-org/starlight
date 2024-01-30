---
title: SPI - Serial Peripheral Interface
sidebar:
    order: 10
---

Das SPI ist ein serielles Kommunikationsprotokoll (Bus-System), welches verwendet werden kann, um den Datenaustausch zwischen verschiedenen Komponenten effizient zu ermöglichen. Dieses bidirektionale, synchronisierte Interface bietet eine schnelle und zuverlässige Methode für die Übertragung von Daten zwischen einem `Controller`-Gerät und mehreren `Peripheral`-Geräten, wie zum Beispiel SD-Karten, Sensoren oder Schieberegister.

Dabei muss die Kommunikation immer vom Controller aus gestartet werden. Ein Peripheral kann nur Daten senden, wenn er vom Controller dazu aufgefordert wird.

Das SPI verwendet separate Takt- und Datenleitungen sowie eine Auswahlleitung, um das Gerät auszuwählen, mit dem Sie sprechen möchten. Dies ist auch einer der Unterschiede zum [USART](../usart/), welches keine synchrone Schnittstelle ist, da es keine Garantie gibt, dass beide Seiten mit der gleichen Taktrate laufen. Beim USART müssen sich die beiden Seiten im Vorhinein einigen, mit welcher Übertragungsgeschwindigkeit ([Baudrate](../usart/#baud-rate)) sie kommunizieren und es müssen zusätzliche Start- und Stoppbits übertragen werden.

:::note
Einige Dokumentationen verwenden noch die veralteten Begriffe, wie `Master` oder `Slave`. Aufgrund ihrer historischen Verbindung mit Rassismus werden diese Begriffe heutzutage durch neutralere und inklusivere Alternativen ersetzt. Folgende Tabelle zeigt die Änderungen diesbezüglich:

| Veralteter Begriff         | Neuer Name                          |
| -------------------------- | ----------------------------------- |
| Master                     | Controller                          |
| Slave                      | Peripheral                          |
| MISO (Master In Slave Out) | POCI (Peripheral Out Controller In) |
| MOSI (Master Out Slave In) | PICO (Peripheral In Controller Out) |
| SS (Slave Select)          | CS (Chip Select)                    |

Für weitere Informationen siehe [Wikipedia](<https://en.wikipedia.org/wiki/Master%E2%80%93slave_(technology)#Terminology_concerns>).
:::

### Clock

PB5

### Chip Select

PB2, nur relevant, wenn unser Microcontroller ein Peripheral Gerät ist.

## Code

### Config

```c
void SPI_MasterInit(void)
{
	/* Set PICO [obsolete: MOSI], SCK output and CS [obsolete: SS], all others input */
	DDRB = (1<<DDB3) | (1<<DDB5) | (1<<DDB2);
	/* Enable SPI, Master, set clock rate fck/128 */
	SPCR = (1<<SPE) | (1<<MSTR) | (1<<SPR0) | (1<<SPR1);

}

char SPI_MasterTransmit(char cData)
{
	/* Start transmission */
	SPDR = cData;
	/* Wait for transmission complete */
	while(!(SPSR & (1<<SPIF)));

    return SPDR;
}
```

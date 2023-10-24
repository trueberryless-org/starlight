---
title: Cloud Computing
sidebar:
    order: 0
---

Cloud Computing bezeichnet eine `PaaS` (Platform as a Service) Architektur, welche es Programmierern ermöglicht, sich zu 100% auf die Applikationen und die Userdaten zu konzentrieren, während große Cloud Anbieter, wie Google (Google Cloud), Microsoft (Azure) und Amazon (AWS) sich darum kümmern, dass sie billig Server arrangieren und diese eine hohe Verfügbarkeit garantieren. Diese Methode der Programmierung ist in den letzten Jahrzehnten immer beliebter geworden, da es sowohl für die Anbieter, als auch die Kunden (Programmierer) einige Vorteile mit sich bringt.

## Übersicht

Es gibt allgemein verschiedene Formen von Anbietern. In diesem Kapitel beschäftigen wir uns großteils mit `PaaS` (Platform as a Service).

![IaaS, PaaS, SaaS](../../../../assets/SYTD/iaas-paas-saas.png)

### Vorteile

-   flexibles zahlen (nur das zahlen, was man verwendet)
-   einfache Skalierbarkeit (rauf und runter)
-   niedriger Einstiegspreis
-   **hohe** Ausfallsicherheit (Service Level Agreement garantiert)

### Nachteile

-   immer noch teurer als selber hosten

## Ressourcen / Services

Es gibt unterschiedliche Arten von Ressourcen, für welche man flexible bezahlen muss:

### Rechenressourcen

Hierbei zahlt man für die Zeit, welche eine bestimmte Ressource läuft, und die Ausstattung und Hardware, welche diese Ressource besitzt.

| Beispiele                                                      |
| -------------------------------------------------------------- |
| App Service                                                    |
| Azure Function                                                 |
| Virtuelle Maschinen                                            |
| Container Registry (für die Verwaltung von Docker-Images)      |
| Container-Instanzen (für die Ausführung von Docker-Containern) |

### Speicherressourcen

Hierbei zahlt man für die Menge an Daten, welche man speichern möchte.

| Beispiele         |
| ----------------- |
| Storage account   |
| Azure Cosmos DB   |
| Data Lake Storage |

### Gemischte Ressourcen

Dies ist eine Mischung aus den obrigen beiden Ressourcentypen.

## Redundanz

Für viele Dienste können Sie den gewünschten Redundanzgrad angeben. Dieser bestimmt, wie gut Ihre Daten gegen Naturkatastrophen und dergleichen geschützt sind und wiederhergestellt werden können.

### Lokale redundante Speicherung (LRS

Hierbei werden Ihre Daten drei Mal innerhalb eines einzigen physischen Standortes in der primären Zohne gespeichert. Dadurch sind die Daten zwar nicht sehr gut gegen Feuer, Überflutungen und sonstige Vernichtungsmöglichkeiten einzelner Standorte geschützt.

### Zonen-redundanter Speicher (ZRS)

ZRS kopiert Ihre Daten über drei Azure-Verfügbarkeitszonen in der primären Region. Deswegen wird dieser Redundanzgrad für Anwendungen empfohlen, welche eine hohe Verfügbarkeit erfordern.

### Geo-redundanter Speicher (GRS)

Für die höchste Redundanz gibt es GRS. Wie bei LRS werden die Daten drei Mal innerhalb eines einzigen physischen Standortes in der primären Zone gespeichert. Zusätzlich wird auch noch ein asynchrones Backup in einer sekundären Zone kopiert, welches Hunderte von Kilometern von der primären Region entfernt ist. Dies sichert die Daten am besten gegen Naturkatastrophen. Die Haltbarkeit beträgt bei den meisten Anbietern mindestens `99,99999999999999%` (16 9er).

## Skalierbarkeit

Für die meisten Services gibt es die Option eine `Auto-Skalierbarkeit` einzustellen, damit bei hohen Anfragen mehrere Instanzen Ihrer Services gestartet werden können und bei Ruhezeiten diese automatisch wieder heruntergefahren werden können.

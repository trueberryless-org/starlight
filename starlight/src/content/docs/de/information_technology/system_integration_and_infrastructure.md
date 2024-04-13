---
title: Systemintegration und Infrastruktur
sidebar:
    order: 4
---

## Virtualisierung

Die Virtualisierung ermöglicht die Erstellung von virtuellen Instanzen von Hardware- und Softwarekomponenten. Das Hauptziel besteht darin, physische Ressourcen zu abstrahieren, um flexiblere und effizientere IT-Infrastrukturen zu schaffen. Durch die Schaffung isolierter virtueller Umgebungen können vorhandene Ressourcen besser genutzt und die Skalierbarkeit verbessert werden. Virtualisierung bildet nicht nur die Grundlage für Cloud Computing, sondern findet auch in Rechenzentren, Netzwerken und Endgeräten vielfältige Anwendungen.

### Vorteile

-   das Testen von neuen Betriebssystemen
-   das Testen von neuen Applikationen auf Betriebssystemen
-   Schulung von Umgebungen, welche einfach wieder gelöscht werden können
-   Hardware-Ressourcen besser ausnutzen
-   Snapshots erstellen und wiederherstellen
-   Cloud Hosting Server mieten

### Geschichte

Das Konzept der Virtualisierung wurde das erste Mal innerhalb der 1960er Jahre genutzt, um die Mehrbenutzerfähigkeit umzusetzen. Damals hatten Betriebssysteme noch nicht die Funktionalität von mehreren Benutzern integriert, weshalb der einfachste Weg, dies zu erreichen, weitere Instanzen des Betriebssystems waren. Aufgrund der Weiterentwicklungen - Betriebssysteme waren später sowieso automatisch die mehrbenutzerfähig - wurde das Konzept nicht weiterverwendet.

Um das Jahr 2010 herum wurde das Konzept der Virtualisierung wieder verwendet, weil Entwickler nun Anwendungen und Betriebssysteme testen können wollten. Außerdem kann man Hardware-Ressourcen viel besser ausnutzen, da in einem Unternehmen gewisse Dienste nur zu gewissen Zeiten exzessiv verwendet werden. Beispielsweise melden sich zwischen acht und neun Uhr viele Mitarbeiter am Domain Controller an, am Nachmittag werden sehr viele E-Mails verschickt und Dateien ausgedruckt. Um kostspielige Ressourcen besser nutzen zu können, kann man Server, welche genau diese Aufgaben erfüllen, virtualisieren, damit zu bestimmten Zeiten verschiedene Server flexibel Ressourcen zur Verfügung gestellt bekommen. Virtualisierung hilft dementsprechend enorm bei flexibler Skalierung.

### Begriffe

Bei einem virtualisierten System gibt es immer zwei wesentliche Teilnehmer:

-   **Host**  
    Der Host ist der Computer, auf welchem die virtuellen Betriebssysteme laufen. Auf diesem Host läuft ein [Hypervisor](#hypervisor), welcher die verschiedenen virtuellen Maschinen bzw. Guests verwaltet.

-   **Guest**  
    Das virtuelle Betriebssysteme wird vom [Hypervisor](#hypervisor) verwaltet und läuft somit auf dem Host.

### Hypervisor

Der Hypervisor ist ein `Virtual Machine Monitor`, welcher die Instanzen der virtuellen Betriebssysteme steuert und verwaltet. Dieses Programm hat die Aufgabe, den virtuellen Maschinen `Rechner-Ressourcen` möglichst effizient zuzuweisen. Denn genau wie jeder andere Computer, benötigen auch virtuelle Maschinen CPU-Ressourcen, Arbeitsspeicher, Festplattenspeicher, Netzwerkkarten und vieles mehr. All diese Ressourcen werden dynamisch aufgeteilt. Benötigt beispielsweise ein Domain Controller momentan viel Kapazitäten, da sich gerade viele Benutzer anmelden wollen, kann der Hypervisor dem Domain Controller fast die gesamten Ressourcen zuschreiben, während andere Server währenddessen im Minimalbetrieb laufen.

Je nach Virtualisierungstyp ist der Hypervisor entweder ein einfaches `Anwendungsprogramm`, welches auf einem Betriebssystem installiert ist, oder die `Installation`, welche direkt auf der Hardware aufgesetzt wird.

### Virtualisierungstypen

#### Typ 1 Virtualisierung

Bei einer Typ 1 Virtualisierung (auch Bare-Metall Virtualisierung genannt) interagiert der Hypervisor direkt mit der Hardware. Es gibt kein Betriebssystem zwischen Hardware und Hypervisor. Weil ein Hypervisor ohne Betriebssystem nicht installierbar ist, muss man bei einer Installation zuerst ein Betriebssystem installieren, von welchem aus man anschließend den Hypervisor installieren kann, um anschließend die Betriebssysteme installieren zu können 🫠.

![Typ-1-Virtualisierung](/images/system_integration_and_infrastructure/Typ-1-Virtualisierung.png)

##### Beispiele

-   VMware ESXi (ehemals ESX)
-   Citrix Xen
-   Hyper-V

#### Typ 2 Virtualisierung

Bei einer Typ 2 Virtualisierung läuft der Hypervisor als einfaches Anwendungsprogramm auf dem unterliegenden Betriebssystem. Dabei muss dem virtualisierten Betriebssystem vorgetäuscht werden, dass es als einziges Zugriff auf die Hardware hat.

---

Jedoch kann der Hypervisor als Anwendung dem virtuellen Betriebssystem nicht vortäuschen, dass die Hardware-Ressourcen nur ihm gehören, weil er selbst auch vom Betriebssystem verwaltet wird. Eine mögliche Lösung für dieses Problem besteht darin, dass der Hypervisor Techniken wie Hardware-Virtualisierung oder Hardware-Assisted Virtualisation verwendet. Diese Technologien ermöglichen es dem Hypervisor, direkten Zugriff auf bestimmte Hardware-Ressourcen zu erhalten, ohne dass das Host-Betriebssystem jeden Zugriff vermitteln muss. Dies verbessert die Leistung und Effizienz der Virtualisierung.

Die Hardware-Virtualisierung wird oft durch CPU-Funktionen wie Intel VT-x oder AMD-V ermöglicht. Diese Technologien erlauben es dem Hypervisor, virtuelle Maschinen direkt auf die physische Hardware zuzugreifen, wodurch die Verwaltungsschicht des Host-Betriebssystems umgangen wird. Dadurch kann der Hypervisor dem virtualisierten Betriebssystem effektiv vortäuschen, dass es exklusiven Zugriff auf die Hardware hat.

![Typ-2-Virtualisierung](/images/system_integration_and_infrastructure/Typ-2-Virtualisierung.png)

##### Beispiele

-   VMware Workstation Player
-   VirtualBox

#### Paravirtualisierung

Paravirtualisierung ist eine Methode zur Virtualisierung, bei welcher die Gastbetriebssysteme (Guest) speziell für die Virtualisierung angepasst werden. Dies bedeutet, dass die Gastbetriebssysteme die Hardware direkt nicht mehr ansprechen können, sondern stattdessen über eine virtuelle Schnittstelle, die VMI (Virtual Machine Interface), mit der Hardware kommunizieren müssen. Die VMI wird vom Hypervisor bereitgestellt, der die virtuelle Maschine (VM) verwaltet.

##### Virtual Machine Interface

Die VMI ist eine zusätzliche Schicht zwischen den Gastbetriebssystemen und der Hardware. Sie ermöglicht es dem Hypervisor, die Kommunikation zwischen den Gastbetriebssystemen und der Hardware zu steuern.

##### Funktionsbibliothek

Die Funktionsbibliothek ist eine Sammlung von Funktionen, die zusammenarbeiten, um eine bestimmte Aufgabe zu erfüllen. Sie ermöglichen es den Gastbetriebssystemen, die Hardwarefunktionen zu nutzen, ohne dass sie direkt auf die Hardware zugreifen müssen.

Die Funktionsbibliotheken sind in der Regel in zwei Teile unterteilt:

-   **VMI-Treiber**  
    Die VMI-Treiber stellen die Verbindung zwischen den Gastbetriebssystemen und der VMI her. Sie sind für die Übersetzung der Hardwareaufrufe der Gastbetriebssysteme in die entsprechenden Aufrufe der VMI verantwortlich.

-   **VMI-Funktionen**  
    Die VMI-Funktionen stellen die eigentlichen Hardwarefunktionen für die Gastbetriebssysteme bereit. Sie umfassen beispielsweise Funktionen zum Zugriff auf die CPU, den Speicher, die Festplatte und andere Hardwarekomponenten.
    Die Funktionsbibliotheken werden vom Hypervisor bereitgestellt. Der Hypervisor lädt die Funktionsbibliotheken beim Start der Gastbetriebssysteme in den Arbeitsspeicher. Die Gastbetriebssysteme können dann die Funktionsbibliotheken verwenden, um auf die Hardware zuzugreifen.

###### Beispiel

Um eine Datei zu lesen, muss ein Gastbetriebssystem normalerweise direkt auf die Festplatte zugreifen. Bei der Paravirtualisierung muss das Gastbetriebssystem stattdessen die Funktion `read()` der Funktionsbibliothek aufrufen. Die Funktion `read()` sendet dann einen entsprechenden Aufruf an den Hypervisor. Der Hypervisor übersetzt den Aufruf und leitet ihn dann an die Festplatte weiter.

###### Vorteile

-   Sicherheit: Funktionsbibliotheken können helfen, die Sicherheit der Gastbetriebssysteme zu erhöhen. Dies liegt daran, dass die Gastbetriebssysteme nicht direkt auf die Hardware zugreifen können.
-   Leistung: Funktionsbibliotheken können die Leistung der Gastbetriebssysteme verbessern. Dies liegt daran, dass die Funktionsbibliotheken die Hardwarefunktionen effizienter nutzen können als die Gastbetriebssysteme selbst.

###### Nachteile

-   Kompatibilität: Funktionsbibliotheken sind nicht mit allen Gastbetriebssystemen kompatibel.
-   Kosten: Die Entwicklung von Funktionsbibliotheken kann kostspielig sein.

#### Containervirtualisierung

Im Gegensatz zu anderen Virtualisierungen hat man bei einer Containervirtualisierung kein eigenes Betriebssystem bei den eigenen Containern. Deswegen benötigt man nicht so viel Platz und es kann schneller starten und auch laufen. Außerdem kann man den Bauplan eines Containers sehr viel einfacher über bekannte Registries, wie zum Beispiel `Docker Hub`, teilen und somit Umgebungen - auch `Environments` - schnell auf neuen Rechnern aufsetzen.

![Containervirtualisierung Aufbau](/images/system_integration_and_infrastructure/Container_Structure.svg)

Wie man in dem Bild leider nicht sehen kann, hat ein Container keinen eigenen Kern. Die Container nutzen nämlich den Kern des Hosts.

##### Vorteile

-   schneller
-   wenig Speicherplatz
-   leicht teilen und veröffentlichen
-   Anwendung und Abhängigkeiten kapseln (nicht gesamtes Betriebssystem)

##### Verwendung

Um Containervirtualisierung zu verwenden, gibt es verschiedene Anbieter, wie zum Beispiel [Docker](https://www.docker.com/) und [Podman](https://podman.io). Falls Sie Docker verwenden, können Sie dies auf MacOS und Windows mittels [Docker Desktop](https://docs.docker.com/get-docker/) installieren.

##### Images

Ein Image ist ein Bauplan für einen Container. Im Vergleich zur Objektorientierten Programmierung ist ein Image eine Klasse und ein Container eine Instanz der Klasse. Ein Image enthält den Code und die Tools und Ausführungsprogramme, damit im Container alles enthalten ist, was man benötigt.

##### Container

##### Dockerfile

##### Commands

### System / User Mode

Gewisse Prozesse können nicht von einer Anwendung, wie zum Beispiel dem Hypervisor, selbst, sondern müssen direkt vom Betriebssystem erledigt werden. Beispielsweise der Zugriff auf die Festplatte. Damit nun jedoch auch Anwendungen auf die Festplatte lesen und schreiben können, gibt es das Konzept des System Modes und des User Modes.

#### System Mode

Bei einem PC, auf welchem ein normales Betriebssystem installiert ist, läuft nur das Betriebssystem und die Interrupt Service Routine im System Mode. Prozesse im System Mode können alles machen, da sie vollständigen Zugriff auf die Hardware haben.

#### User Mode

Alle anderen Anwendungen laufen im User Mode. Wenn diese nun direkt auf die Hardware zugreifen müssen, wird folgender Ablauf gestartet:

1. Die Anwendung ruft mittels `System calls` die Betriebssystemfunktionalität auf.
2. Der ausgeführte Prozess wird kurzfristig an das Betriebssystem übergeben, sodass dieses die Aufgabe erledigen kann.
3. Anschließend kehrt das Programm wieder in den User Mode zurück.

## Speichersysteme

Professionelle Speichersysteme sind meistens eine zentrale Speicherlösung, damit alle Nutzer in einem Netzwerk auf diesen Speicher zugreifen können. Bei solchen Speichersystemen liegt am Host kein Speichersystem, sondern alles nur auf Virtuellen Maschinen.

### NAS

NAS steht für Network Attatched Storage und ist eine einfache Möglichkeit in Netzwerken einen zentralen Speicherplatz für alle Nutzer aufzubauen. Dabei ist das NAS ein eigener Rechner mit Betriebssystem, wobei dieses Betriebssystem die Speicherverwaltung übernimmt und die Dateifreigabe verwaltet.

#### Funktionalitäten

-   **RAID**  
    Damit die Daten redundant gespeichert sind, unterstützt NAS out of the box bereits RAID. Dieses kann sowohl auf Softwareebene, also auch auf Hardwareebene umgesetzt werden. Bei letzterem unterstützt NAS sogar das Speichern auf unterschiedlichen physischen Platten (NAT-Boxen).

-   **Berechtigungsverwaltung**  
    NAS hat zusätzlich auch noch direkt eine Verwaltung für verschiedene Benutzer integriert.

#### Anbieter

-   OpenMediaVault (Software)
-   XigmaNAS (Software)
-   Synology (Hardware): stellt eigene Server speziell für die Speicherung von Daten her

#### Vorteile

-   **Einfache Integration**  
    NAS-Geräte sind einfach in bestehende Netzwerke zu integrieren. Sie fungieren als eigenständige Server und sind über das Netzwerk zugänglich.

-   **Einfache Verwaltung**  
    Die Verwaltung von NAS ist in der Regel benutzerfreundlich und erfordert keine speziellen Kenntnisse im Bereich Storage Networking. Die Konfiguration erfolgt oft über eine Web-Benutzeroberfläche.

-   **Kostengünstig für kleinere Umgebungen**  
    NAS-Systeme sind oft kostengünstiger als SAN-Systeme und daher gut für kleinere Unternehmen oder Heimnetzwerke (`SOHO`) geeignet.

-   **Berechtigungsverwaltung**  
    NAS hat standardmäßig bereits eine Verwaltung für verschiedene Benutzer integriert.

#### Nachteile

-   **Begrenzte Leistung**  
    Im Vergleich zu SAN bieten NAS-Geräte oft eine begrenzte Leistung, insbesondere bei intensiven Anwendungen wie Datenbanken oder Virtualisierung.

-   **Skalierbarkeit**  
    NAS kann bei wachsendem Bedarf an Speicherplatz und Leistung an seine Grenzen stoßen. Die Skalierbarkeit kann durch die begrenzte Anzahl unterstützter Festplatten beeinträchtigt werden.

-   **Belastung des LAN**  
    Da alle Daten über das Unternehmensnetzwerk gesendet werden und diese Dateien meistens große Daten sind, entstehen viele Pakete, welche das Unternehmensnetzwerk sehr belasten. Außerdem haben diese Pakete aufgrund der Fragmentiertung viel Overhead.

### SAN

SAN steht für Storage Area Network und ist die High-End Variante von zentralen Speichersystemen. Im Gegensatz zu NAS gibt es nämlich bei SAN ein eigenes Netzwerk, in welchem auf verschiedenen Servern die Daten abgelegt werden. Dies hat den Vorteil, dass bei einer Synchronisation der Sicherungsinstanzen kein zusätzlicher Netzverkehr anfällt, da dieser Verkehr vom Unternehmensnetzwerk abgeschottet ist.

![SAN Aufbau](/images/system_integration_and_infrastructure/SAN-Aufbau.png)

Wie man im Bild sehen kann, haben die Server eigenen Netzwerkkarten, um auf den Speicher zugreifen zu können. Aufgrund der `Host Bus Adapter (HBA)` glauben die Server, dass die Speicherplatten direkt an ihn angeschlossen sind. Das gesamte SAN ist für die Server also transparent.

:::note[Hinweis]
Bei einem SAN-System ist es empfehlenswert, alle Komponenten von einem Hersteller zu kaufen (`SINGLE VENDOR`).
:::

#### Vorteile

-   **Eigenes Netzwerk**  
    Das N in SAN steht für Network. Dies bedeutet, dass bei SAN ein eigenes Netzwerk für die Verwaltung der Speichermedien existiert. Dadurch ist das Unternehmensnetzwerk nicht überlastet und Speichermedien können sich an verschiedenen Standorten befinden.

-   **Hohe Leistung**  
    SAN bietet in der Regel eine höhere Leistung als NAS, insbesondere bei blockbasierten Datenzugriffen. Es ist ideal für Anwendungen mit hohen Leistungsanforderungen, wie z. B. Datenbanken.

-   **Skalierbarkeit**  
    SAN-Systeme sind hoch skalierbar und können leicht an wachsende Speicheranforderungen angepasst werden. Dies macht sie gut geeignet für große Unternehmen mit umfangreichen Datenmengen.

-   **Blockbasierte Speicherung**  
    SAN arbeitet auf Blockebene und ermöglicht so den direkten Zugriff auf Speicherblöcke. Dies ist besonders vorteilhaft für Anwendungen, die blockbasierte Datenzugriffe erfordern.

#### Nachteile

-   **Kosten**  
    SAN-Systeme sind in der Regel teurer als NAS, sowohl in Bezug auf die Hardware als auch auf die Implementierung.

-   **Komplexität**  
    Die Einrichtung und Verwaltung von SAN erfordert spezielle Kenntnisse im Bereich Storage Networking. Dies macht SAN in der Regel komplexer als NAS.

-   **eingeschränkte Dateifreigabe**  
    Im Vergleich zu NAS ist SAN weniger gut geeignet für die gemeinsame Nutzung von Dateien in einem Netzwerk, da es hauptsächlich auf blockbasierten Datenzugriff ausgerichtet ist.

### DAS

Der Direct Attatched Storage ist einfach eine Festplatte direkt im PC verbaut.

## Sicherungsstrategien

Im privaten Bereich gibt es keine Verpflichtung für die Datensicherung. Was Sie mit Ihren Daten machen, kann jedem anderen Menschen eigentlich recht egal sein. Doch bei Unternehmen sieht das anders aus. Unternehmen müssen eine Buchhaltung führen, für welche es die Pflicht gibt, Rechnungen sieben Jahre lang aufzubewahren. Und wenn Unternehmen Rechnungen digital führen wollen, dann müssen diese Rechnungen strategisch gesichert sein. Sonst kann es schnell passieren, dass aufgrund einer exzessiven redundanten Sicherung der Platz ausgeht oder die Daten verloren gehen.

:::note[zusätzliche Information]
Bei Unternehmen gibt es sogenannte ISO-Zertifizierungen, welche dazu dienen eine gewisse Qualität voraus zu setzen. Diese ISO-Normen definieren gewisse Bereiche und sind in alle Sektoren (Umwelt, IT, Qualität, Gebrauchsgüter, Ernährung, Medizin, ...). Beispiel für ISO-Normen sind:

-   9000: Qualitätsmanagement
-   14000: Umweltmanagement
-   27000: IT-Sicherheit

:::

### Strategien

Um eine Sicherung möglichst effizient betreiben zu können, gibt es einige Strategien, welche bei der Einrichtung eines Backups hilfreich sind.

#### Kommunikation

Vorab ist es wichtig zu erwähnen, dass nicht nur IT-Mitarbeiter über die Sicherung Bescheid wissen sollen. Es ist essenziell, dass alle Mitarbeit des Unternehmens wissen, welche Daten gesichert werden. Somit kann man den Mitarbeitern die Verantwortung übergeben, Daten am richtigen Speicherplatz abzulegen, damit diese auch gesichert werden.

#### Durchführung - Wie?

Es gibt verschiedene Möglichkeiten, auf welche Art man die Daten sichern will. Je nach Art ist der Aufwand unterschiedlich hoch, dafür ändert sich allerdings der Speicherbedarf. Außerdem muss man sich überlegen, ob man nur bestimmte Daten oder das gesamte Betriebssystem sichern will.

##### Vollständige Sicherung

Bei einer vollständigen (oder kompletten) Sicherung macht man eine 1:1 Kopie des Mediums. Deswegen hat man einen hohen Speicherbedarf, wenn zum Beispiel täglich immer alle Daten erneut gesichert werden. Nach einer Woche, benötigt die Sicherung bereits zirka sieben Mal so viel Platz, wie die Daten selbst. Allerdings hat man den Vorteil, einen geringen Aufwand beim Sichern und beim Wiederherstellen zu haben.

![Backup Full](/images/system_integration_and_infrastructure/backup-full.png)

##### Differentielle Sicherung

Bei einer differentiellen Sicherung macht man regelmäßig eine Komplettsicherung und dazwischen in gewissen Zeitabständen immer eine Teilsicherung mit allen Änderungen zur letzten **Komplettsicherung**. Beispielsweise sichert man wöchentlich alles erneut (vollständig) und täglich die Veränderung seit Wochenanfang (Differenz).

![Backup Differential](/images/system_integration_and_infrastructure/backup-differential.png)

##### Inkrementelle Sicherung

Bei einer inkrementellen Sicherung macht man regelmäßig eine Komplettsicherung und dazwischen in gewissen Zeitabständen eine Teilsicherung relativ zur letzten **Teilsicherung**. Beispielsweise sichert man wöchentlich alles erneut (vollständig) und täglich die Veränderung zum Vortag (Inkrement).

![Backup Incremental](/images/system_integration_and_infrastructure/backup-incremental.png)

##### Generationenprinzip

Das Generationenprinzip ist eine geprüfte Sicherungsstrategie, welches folgendes Problem löst:

> Bei einer Sicherung will man den Speicherplatz optimal nutzen und trotzdem Daten, welche sich täglich verändern und wachsen, speichern können. Wie kann ich beide Faktoren möglichst stark optimieren?

Zuerst beantworten wir die Frage, was eine Generation in diesem Zusammenhang ist. Man spricht von einer neuen Generation, wenn diese eine Komplettsicherung aller zeitlich vorherigen Sicherungen aus vorherigen Generationen ist. Wie man in dem Bild unten erkennen kann ist `V1` (Freitag, 5. Jänner) eine neue Generation, da diese Sicherung alle Daten der Sicherungen `S1` - `S4` (1. - 4. Jänner) beinhaltet. Aus diesem Grund kann am 8. Jänner die Sicherung vom 1. Jänner überschrieben werden (gleiche Zeilen bedeuten gleiche Festplatten).

![Generationenprinzip](/images/system_integration_and_infrastructure/generationenprinzip.png)

Um das Prinzip nun fachlich zu formulieren:

> In logarithmischen Abständen werden neue Generationen erstellt. Bei jeder Sicherung in eine höhere Generation werden alle Daten der darunterliegenden Generationen zu einer Vollsicherung zusammengefasst.

Aufgrund dieser logarithmischen Eigenschaft, kann das Generationenprinzip theoretisch zeitlich unendlich lange angewandt werden ohne viel mehr Speicherplatz zu benötigen. Das Generationenprinzip ist nicht an einen speziellen Sicherungstyp (vollständig, differenziell, inkrementell) gebunden.

#### Verantwortlichkeit - Wer?

Eine Sicherung macht sich nicht von alleine. In einem Unternehmen sollte genau eingeteilt sein, welche(r) Mitarbeiter für die Sicherung verantwortlich ist und diese gewissenhaft durchführt. Diese Person(en) kümmert sich um die Datenmedien (z. B.: Helpdesk, Funktion, ...). Im Unternehmen muss außerdem jeder Mitarbeit darüber Bescheid wissen, was und wann gesichert wird ([Kommunikation](#kommunikation)).

#### Zeitplan - Wann?

Bei einer Sicherung muss man sich vorab überlegen, in welchen Abständen man sichern will. Meistens macht es Sinn, täglich zu sichern. Außerdem muss klar definiert sein, um welche Uhrzeit gesichert wird. Am sinnvollsten sind Uhrzeiten, in denen die wenigsten Mitarbeiter arbeiten. Dies ist meistens nachts, es sei denn, man betreibt die Sicherung in einem Spital.

#### Speicherort - Wo?

Es ist wichtig, sich zu überlegen, ob die Sicherung in einem eigenen Raum oder sogar in einem eigenen Gebäude durchführt und aufbewahrt werden soll. Je weiter die Sicherung geografisch von der Verwendung der Daten entfernt ist, desto sicherer sind die gesicherten Daten gegen physische Gefahren, wie zum Beispiel Feuer oder Wasser geschützt.

Des Weiteren muss besprochen werden, ob die Sicherung in einen Datensicherheitsschrank gesichert wird oder andere Aufbewahrungsmöglichkeiten mehr Sinn machen.

#### Aufbewahrungsdauer - Wie lange?

Unternehmen müssen Daten laut Gesetz mindestens sieben Jahre aufbewahren. Ob jedoch alle dieser Daten oder nur bestimmte Rechnungen für einen so langen Zeitraum aufgehoben werden müssen, muss abgeklärt werden.

#### Datenidentifikation - Welche Daten?

In den meisten Fällen macht es Sinn, reine Nutzdaten zu sichern und das Betriebssystem und Programme nicht mit zu sichern. Um eine effiziente Sicherung durchführen zu können, wird empfohlen mit mehreren Mitarbeitern zu kommunizieren, um herauszufinden, welche Datentypen gesichert werden müssen. Denn viele Backup-Systeme unterstützen auch die Einschränkung auf Dateiendungen.

#### Speichermedium - Welches Medium?

Sicherungen werden meistens für längere Zeiträume aufbewahrt, weshalb Magnetbänder mehr Sinn machen, als einfache SSDs oder Datenbänder. Jedoch kann diese Entscheidung - sowie jede andere Strategie - von Fall zu Fall variieren.

#### Verschlüsselung

Stellen Sie sich die Frage, ob eine Verschlüsselung notwendig ist oder nicht. Wenn ja, welche Verschlüsselung verwenden Sie?

#### Wiederherstellung

Es ist wirklich wichtig, regelmäßig zu testen, ob die Sicherung auch wiederhergestellt werden kann. Des Weiteren sollten Sie die Funktionalität der wiederhergestellten Dateien ausprobieren. Wenn Sie diese Testung nicht durchführen, kann es sein, dass die gesamte Sicherung und der verbundene Aufwand umsonst gewesen ist. Ein empfohlener Zeitabstand für diese Testung beträgt ein Jahr.

### Standards

Es gibt bezüglich Datensicherung auch einige Standards.

#### Linear Tape Open

Linear Tape Open (LTO), auch bekannt als LTO-Ultrium-Format, ist ein leistungsstarkes, skalierbares, anpassungsfähiges offenes Bandformat, das für hohe Kapazität, maximale Speicherdichte und Leistung optimiert ist. Seit der Markteinführung der ersten LTO-Produkte wurden über 5,6 Millionen Laufwerke, 371.232.918 Kassetten und 517.958 Milliarden GB Medienkapazität ausgeliefert, was LTO Ultrium zum erfolgreichsten Bandformat der Geschichte macht.

Die LTO-Technologie bietet eine kostengünstige Möglichkeit zur langfristigen Datenspeicherung, Datensicherung und Datenarchivierung. Die Bandlaufwerke verwenden Magnetbänder als Speichermedium und sind in der Lage, große Datenmengen effizient zu sichern und zu archivieren.

Die verschiedenen Generationen von LTO haben sich kontinuierlich weiterentwickelt, wobei jede Generation normalerweise eine höhere Kapazität und schnellere Datenübertragungsraten bietet als die vorherige. Typischerweise sind LTO-Laufwerke abwärtskompatibel (zwei vorherige Generationen lesen und eine vorherige Generation schreiben), sodass neuere Bänder auch in älteren Laufwerken gelesen werden können, jedoch möglicherweise nicht die neuesten Funktionen unterstützen.

![LTO Roadmap](/images/system_integration_and_infrastructure/LTO_Roadmap.jpg)

Die Verwendung von LTO ist in verschiedenen Branchen weit verbreitet, darunter in Rechenzentren, Archivierungsumgebungen und anderen Szenarien, in denen eine zuverlässige und kostengünstige Datensicherung und -archivierung erforderlich ist.

LTO verfügt auch über **Verschlüsselungsmethoden** und verfolgt die **WORM-Strategie** (Write Once Read Many).

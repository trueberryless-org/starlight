---
title: Softwaremetriken
---

Ingenieure versuchen Applikationen stabil, flexible und wartbar aufzubauen während der Endnutzer nichts von dem komplexen System mitbekommen soll.

### Skalierbarkeit

Wenn mehr und mehr Anfragen (steigende Last) auf eine Applikation kommen, muss diese skaliert werden. Dabei gibt es eine horizontale (Anzahl an Rechnern) und eine vertikale (Kapazitäten pro Rechner) Skalierung.

#### Horizontale Skalierung

Horizontale Skalierung beschreibt das Hinzufügen von weiteren logischen Einheiten, wie zum Beispiel mehrere Rechner, um die steigende Last auszugleichen.

#### Vertikale Skalierung

Vertikale Skalierung bedeutet, dass innerhalb einer logischen Einheit stärkere oder einfach mehr Ressourcen hinzugefügt werden. Beispielsweise mehr Arbeitsspeicher, Prozessorkerne oder bessere Grafikkarten.

### Offenheit

Softwaresysteme sollen für neue Funktionalitäten erweiterbar sein. Dabei sollen diese Programme auch wartbar sein, um die Weiterentwicklung des Systems zu erleichtern. Nicht wartbare Programme sind toter Code. Und toter Code ist unbrauchbar.

#### Interoperabilität

Jedes System soll mit anderen Systemen kommunizieren können. Hierfür benötigt man klar definierte Schnittstellen, welche sich in der Praxis - im Gegensatz zur Theorie - meist während der Durchführung des Projekts ändern.

#### Portabilität

Systeme sollen nicht nur auf einer bestimmten Version eines Betriebssystems laufen können. Es soll nicht auf die Umgebung des Betriebssystems ankommen, ob die Applikation funktioniert oder nicht. Für Entwickler bietet Containervirtualisierung heutzutage eine einfach Möglichkeit, Systeme auf allen Betriebssystemen starten zu können. Für Endnutzer soll die Applikation von allen Endgeräten erreichbar sein. Im Idealfall entwickeln die Ingenieure eine eigene PWA (Progressive Web App) für mobile Endgeräte.

### Transparenz

Der Endbenutzer interessiert sich nicht, wie der Entwickler ein System ausimplementiert hat.

#### Zugriffstransparenz

Der Zugriff auf eine Ressource ist immer gleich. Jedoch gibt es Unterschiede in der Art des Zugriffs (welcher Rechner, welches Netzwerk, ...) und der Darstellung der Ressource (Datumsformat in verschiedenen Ländern, Berechtigungen, ...).

#### Ortstransparenz

Ein Endbenutzer kann nicht erkennen, wo sich eine Ressource physisch innerhalb des Systems befindet. Um dies zu vermeiden, werden Ressourcen mit virtuellen Namen identifiziert (URL). Diese enthalten keine Informationen über den Standort. Dadurch können Ressourcen aus einer Datenbank, einem Dateisystem oder einem anderen Microservice kommen, beliebig verschoben und ausgetauscht werden, ohne dass der Endbenutzer etwas merkt.

#### Replikationstransparenz

Der Endbenutzer merkt nicht, dass es mehrere Kopien der Ressource gibt. Diese Kopien sind aufgrund der Datensicherheit notwendig. Alle Kopien müssen den selben Namen haben. Diese Transparenz setzt Ortstransparenz voraus, ansonsten wüsste der Endnutzer, dass mehrere Kopien existieren, wenn mehrere Standorte existieren.

#### Nebenläufigkeitstransparenz

Es ist egal, wie viele Benutzer gerade auf die Applikation zugreifen, die Ressource des Endbenutzers muss problemlos funktionieren. Herausforderungen hierbei sind Synchronisierung und Konsistenz der Daten.

### Koppelung

Die Koppelung ist das Maß der Abhängigkeit zwischen Softwareelementen (Klassen). Um ein System flexible und wartbar zu gestalten, soll die Koppelung möglichst gering bleiben. Dies bedeutet, dass Softwareelemente nur über wenige Schnittstellen untereinander kommunizieren und nicht direkt auf die ausimplementierten Klassen zugreifen.

### Kohäsion

Die Kohäsion beschreibt das Maß des inneren Zusammenhalts eines Softwareelements. Jede Klasse soll immer nur eine Aufgabe erfüllen und alle Methoden innerhalb einer Klasse müssen das Verhalten der Klasse widerspiegeln. Das [Single Responsibility Principle](#single-responsibility-principle) beschreibt genau diese Metrik innerhalb der SOLID-Kriterien.

### SOLID-Kriterien

#### Single Responsibility Principle

Das SRP besagt, dass jedes Software-Modul immer nur eine einzige Aufgabe haben soll. Wenn eine Methode beispielsweise eine Textdatei einliest, in eine Datenbank speichert und in der Applikation anzeigt, wird dieses Prinzip verletzt.

Dieses Prinzip definiert die [Kohäsion](#kohäsion).

> "There should never be more than one reason for a class to change" - Robert C. Martin

Ursprünglich bezieht sich das SRP nur auf Klassen, heutzutage gilt es allgemein für Software-Module (Services, Klassen, Methoden, ...).

#### Open / Closed Principle

Eine Klasse soll offen für Erweiterungen, aber geschlossen für Veränderungen sein. Dies bedeutet, dass beim Hinzufügen von Funktionalitäten diese am besten in keiner existierenden Klasse, sondern durch Hinzufügen einer neuen Klasse umgesetzt werden kann. Man will vermeiden, dass aufgrund von Änderungen in einer existierenden Klasse, Fehler in restlichen Teilen der Applikation verursacht werden.

Dadurch wird eine geringe [Koppelung](#koppelung) sichergestellt.

#### Liskov Substitution Principle

Bei Vererbung muss eine Instanz der Unterklasse anstatt einer Instanz der Basisklasse verwendet werden können. Um dieses Prinzip nicht zu verletzen, gibt es spezifische Regeln, welche man beim Erstellen einer Unterklasse beachten muss:

-   Ein Parameter einer Methode der Unterklasse muss gleich oder abstrakter als der Parameter in der Methode der Basisklasse sein. Wenn der Methodenkopf der Basisklasse beispielsweise `walk(Dog d)` definiert, kann der Methodenkopf der Unterklasse zum Beispiel `walk(Dog d)` oder `walk(Animal d)` lauten. Jedoch darf die Unterklasse den Parameter nicht auf einen spezifischeren Typen einschränken, wie zum Beispiel `walk(Bulldog d)`. Denn in diesem Fall könnte keine `Dog`-Instanz an die Methode `walk()` übergeben werden, wenn die Instanz der Basisklasse eine Instanz der Unterklasse ist (`Dog d = new Bulldog();`).

-   Bei Rückgabewerten ist es genau anders herum: Der Rückgabewert einer Unterklasse muss gleich oder spezifischer (also erbend vom Rückgabewert der Methode der Basisklasse) als der Rückgabewert der Methode der Basisklasse sein. Wenn die Basisklasse `Dog getInstance()` ausimplementiert, darf die Unterklasse nur `Dog getInstance()` oder `Bulldog getInstance()`, nicht jedoch `Animal getInstance()` ausimplementieren. Denn ansonsten könnte eine Instanz der Unterklasse, welche eine Basisklasse ist, ein anderes Tier als Dog nicht zurückbekommen, obwohl die Unterklasse das Verhalten so implementiert.

-   Eine Methode der Unterklasse soll keine `Exception` werfen, welche die Basisklasse nicht erwartet.

Falls dies alles bisschen kompliziert klingt, keine Sorge. In den meisten (vor allem typbasierten) Programmiersprachen (Java, C#, ...) sind diese Regeln bereits in der Programmiersprache verankert.

#### Interface Segregation Principle

Eine Schnittstelle soll nur ein einziges Verhalten definieren (nicht implementieren). Das Gegenteil wäre der Fall, wenn alle Methoden in einem einzigen riesigen Interface definiert sind.

Somit verbessert dieses Prinzip die [Kohäsion](#kohäsion) jeder Schnittstelle.

#### Dependency Inversion Principle

Die Umkehrung der Abhängigkeiten besagt, dass Instanzen nicht an Klassen übergeben werden sollen, wenn sie gebraucht werden, sondern einmalig instanziiert werden und anschließend vom Framework verwaltet werden. Somit kümmert sich nicht mehr der Programmierer um alle Instanzen, welche für eine gewünschte Funktionalität benötigt werden, sondern das System. Der Entwickler muss nur angeben, welche Instanzen gebraucht werden.

> "Don't call us, we'll call you"

Diese Instanzen haben oft einen Lebenszyklus, welcher vom Entwickler definiert werden kann. Bei .NET Blazor gibt es zum Beispiel `Singleton` (eine Instanz für die gesamte Laufzeit der Applikation), `Scoped` (eine Instanz für alle Anfragen eines Clients) und `Transient` (eine Instanz pro Anfrage).


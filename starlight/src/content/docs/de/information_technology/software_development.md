---
title: Softwareentwicklung
sidebar:
    order: 0
---

Die Welt, in der wir heute leben, ist geprägt von der unaufhaltsamen Evolution der Technologie. In diesem stetigen Fortschreiten spielt die Softwareentwicklung eine entscheidende Rolle. Software, als die treibende Kraft hinter den digitalen Innovationen, beeinflusst unser tägliches Leben in nie dagewesener Weise.

:::note
Code-Beispiele werden für die Erklärung in C# implementiert.
:::

## Grundlagen

### Datentypen

Datentypen sind die Grundlage für die Programmierung. Sie ermöglichen das Speichern von Daten, wie zum Beispiel das Alter, einen Namen oder eine Adresse. Dabei muss man unterscheiden, dass es verschiedene Typen von Daten gibt, wie zum Beispiel Nummern, Texte, Listen, ...

Um nun zum Beispiel das Alter von einer Person zu speichern, muss man einen neuen Datentyp anlegen. Dazu sagt man **Instanz**. Eine Instanz ermöglich das Speichern eines Wertes und hat einen konkreten Datentypen.

Um eine neue Instanz zu erstellen, bracht man immer zwei Schritte: **Deklaration** und **Initialisierung**. Die Deklaration legt die Instanz an und sagt dem System, welchen Datentypen sie haben soll. Die Initialisierung ist die erstmalige Zuweisung eines Wertes zu der Instanz. Dieses Beispiel verdeutlicht Deklaration und Initialisierung:

```cs
// Deklaration
int age;

// Initialisierung
age = 20;

// Deklaration + Initialisierung
int age = 20;
```

#### Primitive Datentypen

##### Eigenschaften

Einfache Datentypen (engl.: Value Types) haben folgende Eigenschaften:

-   können NICHT `null` sein
-   enthalten Daten im eigenen Speicher
-   sind meistens im Stack gespeichert (Variablen einer `class` oder `struct` sind dort gespeichert, wo auch die `class` / `struct` gespeichert ist; z.B.: Heap)
-   erben von `System.ValueType`
-   von einem einfachen Datentyp kann man NICHT erben
-   Wenn man einen einfachen Datentyp kopiert, kopiert man nur die **Daten** in einen neuen Datentyp. Eine Änderung der Daten des einen Datentyps führt _NICHT_ zur Änderung der Daten des anderen Datentyps.

##### Wertebereiche

Überblick über alle einfachen Datentypen (nach Größe, Nachkommastellen und Positiv/Negative sortiert):

| Typ     | Wertebereich                                                                             |
| ------- | ---------------------------------------------------------------------------------------- |
| Bool    | `true` oder `false`                                                                      |
| SByte   | `-128` bis `127`                                                                         |
| Byte    | `0` bis `255`                                                                            |
| Short   | `-2^15` bis `2^15-1`                                                                     |
| UShort  | `0` bis `65535`                                                                          |
| Int     | `-2^31` bis `2^31-1`                                                                     |
| UInt    | `0` bis `2^32-1`                                                                         |
| Long    | `-2^63` bis `2^63-1`                                                                     |
| ULong   | `0` bis `2^64-1`                                                                         |
| Float   | `1.4 * 10^-45` bis `3.4 * 10^38`                                                         |
| Double  | `5.0 * 10^-324` bis `1.7 * 10^308`                                                       |
| Decimal | keine Nachkommastellen: `±79^27`, <br/> mit Nachkommastellen: `±7.9^-29`                 |
| Object  | Eine Variable vom Typ Object kann jeden anderen Datentyp enthalten, ist also universell. |

### Objekt-orientierten Programmierung

#### Polymorphie

##### Vererbung

Basisklassen sind Datentypen, welche **ähnliches** Verhalten zusammenfügen.

##### Interfaces

Schnittstellen sind Datentypen, welche **unterschiedliches** Verhalten zusammenfügen.

## Softwaremetriken

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

## Design Patterns

In der Softwareentwicklung kommt es oft vor, dass ähnliche Problemstellungen gelöst werden müssen. Um bereits durchdachte Lösungen für diese Probleme effizienter umsetzen und entwickeln zu können, gibt es **Design Patterns**.

:::note[Hinweis]
Alle Design Patterns und Kategorien werden hier mit dem englisch Originalnamen genannt, um eine sprachliche Konsistenz zu schaffen.
:::

### Creational Design Patterns

Creational Design Patterns beschäftigen sich mit Problemstellungen beim Erstellen von Objekten.

#### Singleton

##### Problem

Das Singleton Design Patterns sorgt dafür, dass eine Klasse nur eine einzige Instanz haben kann. Außerdem kann auf diese eine Instanz global - im gesamten Programm - zugegriffen werden.

##### Lösung

Zuerst muss der Konstruktor auf privat gestellt werden, damit keine Instanz der Klasse erstellt werden kann. Diesen Prozess des Erstellens wollen nämlich wir als Programmierer steuern können. Deswegen wird außerdem eine statische Erstellungsmethode geschrieben, welche eine privat gespeicherte Instanz der Klasse zurück gibt. Somit wird sichergestellt, dass bei jedem Aufruf der `GetInstance()`-Methode immer die gleiche Instanz zurückgegeben wird.

Um dieses Verhalten auch bei Multi-Thread-Anwendungen zu garantieren, kann die `GetInstance()`-Methode mittels ThreadLock erweitert werden. Dabei kann das Double-Checked-Locking-Pattern verwendet werden, damit die Leistung verbessert wird. Denn nur der erste Aufruf der Methode, sperrt das `LockObject`.

##### Code

Einfaches Singleton Design Pattern:

```csharp
public class Singleton
{
    private static readonly Singleton Instance = new();

    private Singleton() { }

    public static Singleton GetInstance() => Instance;
}
```

Threadsicheres Singleton Design Pattern mittels Double-Checked-Locking-Pattern:

```csharp
public class Singleton
{
    private static readonly object LockObject = new object();
    private static readonly Singleton Instance = new();

    private Singleton() { }

    public static Singleton GetInstance()
    {
        if (_instance == null)
        {
            lock (LockObject)
            {
                if (_instance == null)
                {
                    _instance = new Singleton();
                }
            }
        }
        return _instance;
    }
}
```

### Structural Design Patterns

Structural Design Patterns beschäftigen sich mit dem Aufbau von Klassen in großen Strukturen, damit diese Strukturen flexible und effizient gleichzeitig effizient bleiben.

#### Adapter

##### Problem

In Softwareentwicklungsszenarien kommt es häufig vor, dass verschiedene Systeme oder Komponenten unterschiedliche Methoden und Strukturen verwenden, was die direkte Zusammenarbeit erschwert. Ein Beispiel für diese Inkompatibilität zwischen zwei bestehenden Schnittstellen oder Klassen ist wie folgt: Sie haben ein Interface `IQuackable`, welches den Methodenkopf `Quack` vorgibt. Ein zweites Interface `IHonkable` gibt die Methode `Honk` an. Nun wollen Sie eine Liste mit `IQuackables` erstellen und dort soll ein Objekt enthalten sein, welches nur von `IHonkable` erbt.

##### Lösung

Sie können hierfür einen Adapter erstellen. Dieser Adapter ist eine eigene spezielle Klasse, welche ein Interface so konvertiert, dass es von einem anderen Objekt verstanden werden kann. In unserem Beispiel erbt dieser Adapter von `IQuackable` und hat eine Property `IHonkable`. In der Methode `Quack` wird die `Honk`-Methode von unserem `IHonkable`-Objekt aufgerufen.

##### Code

```csharp
public class HonkAdapter : IQuackable
{
    private readonly IHonkable _honkable;

    public HonkAdapter(IHonkable honkable)
    {
        _honkable = honkable;
    }

    public string Quack() => _honkable.Honk();
}
```

#### Decorator

##### Problem

In einigen Softwareentwicklungsszenarien müssen Sie das Verhalten einer Klasse erweitern. In der Objekt-orientierten Programmierung denken viele Programmierer instinktiv an Vererbung. Doch Vererbung ist nicht immer die beste Möglichkeit, Verhalten zu erweitern. Das Problem der Vererbung ist nämlich in vielen Programmiersprachen, dass nur von einer Basisklasse geerbt werden kann.

Stelle Sie sich folgendes Szenario vor: Sie bauen eine App mit einem Benachrichtigungssystem. Diese Benachrichtigungen sind anfangs nur mittels E-Mail möglich. Eines Tages will ein Kunde von Ihnen, dass Benachrichtigungen auch via SMS und direkt in der App gesendet werden können sollen. Sie programmieren diese Verhalten in zwei Subklassen aus. Allerdings haben Sie nun ein Problem: Benachrichtigungen können immer nur auf einen Weg gesendet werden. Sie können keine E-Mail-Benachrichtigung und SMS-Benachrichtigung auf einmal senden.

##### Lösung

Verwenden Sie für die Erweiterung des Verhaltens einen Decorator. Dieser Decorator enthält eine Referenz auf die Klasse, welche erweitert werden soll. Außerdem erbt der Decorator von den gleichen Interfaces wie die Referenzklasse. In den Methoden kann nun zusätzliches Verhalten vor oder nach dem Aufruf der Referenzklasse implementiert werden.

##### Code

```csharp
public class QuackCountDecorator : IQuackable
{
    private readonly IQuackable _quackable;

    public static int Counter = 0;

    public QuackCountDecorator(IQuackable quackable)
    {
        _quackable = quackable;
    }

    public string Quack()
    {
        Counter++;
        return _quackable.Quack();
    }
}
```

### Behavioral Design Patterns

Behavioral Design Patterns beschäftigen sich mit Algorithmen und Zuweisung von Verantwortlichkeiten zwischen Objekten.

#### Command

Das Command Design Pattern ist auch als Action und Transaction Pattern bekannt.

##### Problem

Oft wollen Sie Programme entwickeln, welche Operationen rückgängig machen können oder Operationen verzögern. Doch ein Programm mit `STRG` + `z` Funktionalität ist nicht einfach zu implementieren.

##### Lösung

Das Command Pattern schlägt vor, eine Anfrage nicht als Methode sondern als eigenen Komponenten aus zu implementieren. Dadurch kann man die Anfrage nicht nur als Parameter in Methoden übergeben, sondern eben auch rückgängig machen.

##### Code

```csharp
public class Robot
{
    public int X { get; set; }
    public int Y { get; set; }

    public void MoveUp() => Y++;
    public void MoveDown() => Y--;
    public void MoveRight() => X++;
    public void MoveLeft() => X--;
}
```

```csharp
public class MoveDownCommand
{
    public MoveDownCommand(Robot robot) : base(robot) { }

    public override void Do() => Robot.MoveDown();

    public override void Undo() => Robot.MoveUp();
}
```

#### Strategy

##### Problem

Wenn eine Klasse mehrere verschiedene Strategien anbieten soll, ein bestimmtes Ergebnis zu erzielen, dann kann diese Klasse schnell groß und unwartbar werden. Dies will man um jeden Preis vermeiden. Stelle Sie sich vor, Sie entwickeln eine Navigationsapp mit den Funktionalitäten „zu Fuß gehen“, „mit dem Auto fahren“ und „Öffis benutzen“. All diese Funktionen in einer Klasse zu implementieren ist ein Schuss ins eigene Knie.

##### Lösung

Erstellen Sie für jede Funktionalität - für jede Strategie - eine eigene Klasse, alle erben von der gleichen Schnittstelle. Nun kann man in der `Context`-Klasse eine Referenz auf diese Schnittstelle speichern und die Methoden einfach aufrufen. In der Objekt-orientierten Programmierung spart man sich somit viele unnötige `If`-Bedingungen, da das Framework automatisch die richtige Implementierung aufruft. Das Framework erkennt den Typen der Referenz und ruft den Code von dieser Klasse auf.

##### Code

```csharp
public interface IStrategy
{
    object DoSomething(object data);
}
```

```csharp
class ConcreteStrategyA : IStrategy
{
    public object DoSomething(object data)
    {
        var list = data as List<string>;
        list.Sort();

        return list;
    }
}
```

```csharp
class ConcreteStrategyB : IStrategy
{
    public object DoSomething(object data)
    {
        var list = data as List<string>;
        list.Sort();
        list.Reverse();

        return list;
    }
}
```

```csharp
class Context
{
    private IStrategy _strategy;

    public Context()
    { }

    public Context(IStrategy strategy)
    {
        this._strategy = strategy;
    }

    // Die ausgewählte Strategie kann somit auch zur Runtime geändert werden
    public void SetStrategy(IStrategy strategy)
    {
        this._strategy = strategy;
    }

    public void DoSomeBusinessLogic()
    {
        Console.WriteLine("Context: Sorting data using the strategy (not sure how it'll do it)");
        var result = this._strategy.DoSomething(new List<string> { "a", "b", "c", "d", "e" });

        string resultStr = string.Empty;
        foreach (var element in result as List<string>)
        {
            resultStr += element + ",";
        }

        Console.WriteLine(resultStr);
    }
}
```

```csharp
class Program
{
    static void Main(string[] args)
    {
        var context = new Context();

        Console.WriteLine("Client: Strategy is set to normal sorting.");
        context.SetStrategy(new ConcreteStrategyA());
        context.DoSomeBusinessLogic();

        Console.WriteLine();

        Console.WriteLine("Client: Strategy is set to reverse sorting.");
        context.SetStrategy(new ConcreteStrategyB());
        context.DoSomeBusinessLogic();
    }
}
```

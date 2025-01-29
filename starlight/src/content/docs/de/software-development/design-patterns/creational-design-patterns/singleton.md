---
title: Singleton
---

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
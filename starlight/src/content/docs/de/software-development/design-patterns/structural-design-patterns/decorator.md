---
title: Decorator
---

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
---
title: Adapter
---

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
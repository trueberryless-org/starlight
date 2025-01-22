---
title: Command
---

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
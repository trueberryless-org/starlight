---
title: Durable Functions
sidebar:
    order: 3
---

Bei komplexerer Geschäftslogik müssen oft Funktionen miteinander interagieren. Diese Funktionalität ist bei herkömmlichen Azure Functions nicht gegeben. Aus diesem Grund und ein paar anderen, gibt es Durable Functions. Sie erlauben uns, während der Ausführung einer Function auf User-Input zu warten, komplexe Logik, welche das Ausführungslimit der Azure Functions überschreiten würde, durchzuführen und Monitoring-Systeme aufzusetzen.

## Orchestrator

Der Orchestrator ist die organisatorische Funktion einer Durable Function. Sie ist der Kernpunkt, die langfristige Ausführungen erst ermöglicht. Der Orchestrator kann andere Functions - sogenannte Activities - aufrufen und auf Externe Events warten.

```csharp
[FunctionName("HelloCities")]
public static async Task<List<string>> Run(
    [OrchestrationTrigger] IDurableOrchestrationContext context)
{
	var outputs = new List<string>();

	outputs.Add(await context
		.CallActivityAsync<string>("SayHello", "Tokyo"));
	outputs.Add(await context
		.CallActivityAsync<string>("SayHello", "Seattle"));
	outputs.Add(await context
		.CallActivityAsync<string>("SayHello", "London"));

	return outputs;
}
```

Hierbei müssen die Eingangsparameter und Rückgabewerte aufeinander abgestimmt sein. Im unteren Beispiel muss `"Tokyo"` vom Typ `string` sein, damit in der [Activity](#activity) der Name vom Context ausgelesen werden kann. Ebenso muss der Rückgabewert der Activity vom Typ `string` sein, damit der Orchestrator beim Aufruf von `await context.CallActivityAsync<string>()` das Ergebnis in einen String speichern kann.

### Flow

Orchestrators haben einen ganz besonderen Ausführungsprozess. Bei jedem Aufruf einer Activity bzw. jedem Warten auf eine externes Event wird der aktuelle Stand des Orchestrators in einen Table Storage Account gespeichert und der Orchestrator heruntergefahren. Somit weiß dieser nicht mehr, an welcher Stelle / Zeile im Code er stehengeblieben ist und muss nach der Fertigstellung der Activity bzw. dem Auftreten eines externen Events wieder von vorne anfangen!

Sobald er wieder zum Aufruf der vorherigen Activity kommt (diese wurde nun bereits durchgeführt, da sie beim vorherigen Durchlauf aufgerufen wurde), schaut der Orchestrator in dem Table Storage Account nach, ob der Rückgabewert der Activity bereits gespeichert sind. Wenn ja, wird die Activity nicht noch einmal aufgerufen, sondern das Ergebnis aus der Tabelle ausgelesen und der Orchestrator setzt mit der Durchführung des weiteren Programmablaufs fort.

Dieses anfangs äußerst ungewöhnliche Verhalten eines Programms führt dazu, dass keine "einfachen" Variablen im Orchestrator deklariert und initialisiert werden dürfen, da der Orchestrator innerhalb eines Triggers mehrmals diese Programmzeile durchführt. Folgendes Programm würde aus diesem Grund die Zeit nicht richtig mitstoppen:

:::danger[Achtung!]
Unteres Programm hat einen Logikfehler!
:::

```csharp
[FunctionName("HelloCities")]
public static async Task<List<string>> Run(
    [OrchestrationTrigger] IDurableOrchestrationContext context,
    ILogger log)
{
    // Orchestrator führt diese Zeile mehrmals aus
    var startTime = DateTime.UtcNow;

    // irgendeine Activity
	await context.CallActivityAsync("LogInfo", "London");

    var ellapsedTimeMs = (DateTime.UtcNow - startTime).TotalMilliseconds;
    log.LogInformation($"Orchestrator hat {ellapsedTimeMs}ms mit der Durchführung gebraucht.");
}
```

Stattdessen müsste man in solchen Fällen eine eigene Activty schreiben, welche die momentane UTC Zeit returnt. Sobald die Funktionalität nämlich in einer eigenen Activity ausgelagert ist, wird das Ergebnis in einem Table Storage Account persistiert und nicht erneut durchgeführt. Da die momentane Zeit häufig in Orchestratoren verwendet wird, gibt es für den obrigen Orchestrator einen Spezialfall:

```csharp
[FunctionName("HelloCities")]
public static async Task<List<string>> Run(
    [OrchestrationTrigger] IDurableOrchestrationContext context,
    ILogger log)
{
    var startTime = context.CurrentUtcDateTime;

    // irgendeine Activity
	await context.CallActivityAsync("LogInfo", "London");

    var ellapsedTimeMs = (DateTime.UtcNow - startTime).TotalMilliseconds;
    log.LogInformation($"Orchestrator hat {ellapsedTimeMs}ms mit der Durchführung gebraucht.");
}
```

:::tip[Fazit]
Orchestrator Funktionen müssen **deterministisch** programmiert werden, damit sie bei mehreren Durchlaufen immer das gleiche Ergebnis erzielen.
:::

## Activity

Eine Activity ist eine normale Azure Function, welche vom Orchestrator ein oder mehrere Male aufgerufen werden kann. Für die Activity gelten die gleichen Regeln wie für eine [Azure Function](/de/decentralised_systems/azure_functions/).

```csharp
[FunctionName("SayHello")]
public static string SayHello(
	[ActivityTrigger] IDurableActivityContext helloContext)
{
	string name = helloContext.GetInput<string>();
	return $"Hello {name}!";
}
```

## External Event

Manchmal muss der Orchestrator auf ein externes Event warten.

```csharp
[FunctionName("BudgetApproval")]
public static async Task Run(
	[OrchestrationTrigger]
	IDurableOrchestrationContext context)
{
	bool approved = await context.WaitForExternalEvent<bool>("Approval");
	if (approved)
	{
		// approval granted - do the approved action
	}
	else
	{
		// approval denied - send a notification
	}
}
```

Hierbei haben wir eine einfache Azure Function mit Queue Trigger, damit das externe Event geworfen wird. Hierfür muss das externe Event die ID des Orchestrators wissen.

```csharp
[FunctionName("ApprovalQueueProcessor")]
public static async Task Run(
    [QueueTrigger("approval-queue")] string instanceId,
    [DurableClient] IDurableOrchestrationClient client)
{
	await client.RaiseEventAsync(instanceId, "Approval", true);
}
```

## Durable Function Patterns

Mithilfe des Prinzipes der Durable Functions können nun mehrere Funktionalität umgesetzt werden.

### Function Chaining

Das Funktionsverkettungsmuster ermöglicht die Ausführung von Funktionen in einer bestimmten Reihenfolge, wobei die Ausgabe einer Funktion als Eingabe für die nächste dient. Die Verwendung von Warteschlangen zwischen den Funktionen gewährleistet die Skalierbarkeit und Robustheit des Systems.

![Durable Function Chaining](../../../../assets/SYTD/azure-function/durable-function-chaining.png)

Durable Functions erleichtern die präzise Implementierung dieses Musters, wie im folgenden Beispiel gezeigt. Sie können die Abfolge von Funktionen mithilfe üblicher imperativer Codierungsstrukturen steuern, wobei Logik für Fehlerbehandlung und bedingte Anweisungen integriert werden kann.

```csharp
[FunctionName("Chaining")]
public static async Task<object> Run(
    [OrchestrationTrigger]
    IDurableOrchestrationContext context)
{
    try
    {
        var x = await context.CallActivityAsync<object>(
	        "F1", null);
        var y = await context.CallActivityAsync<object>(
	        "F2", x);
        var z = await context.CallActivityAsync<object>(
	        "F3", y);
        return  await context.CallActivityAsync<object>(
	        "F4", z);
    }
    catch (Exception)
    {
        // Error handling
    }
}
```

### Fan Out / Fan In

Beim Auffächern auswärts/einwärts-Muster werden mehrere Funktionen parallel ausgeführt, und dann wird auf den Abschluss aller gewartet. Oft werden die Ergebnisse dieser Funktionen aggregiert.

![Durable Function Fan Out Fan In](../../../../assets/SYTD/azure-function/durable-function-fan-out-fan-in.png)

In normalen Funktionen kann das Auffächern auswärts erreicht werden, indem die Funktion mehrere Nachrichten an eine Warteschlange sendet. Das Auffächern zurück nach innen ist komplexer, da Sie den Status der ausgelösten Funktionen nachverfolgen und deren Ausgaben speichern müssen.

```csharp
[FunctionName("FanOutFanIn")]
public static async Task Run(
	[OrchestrationTrigger] IDurableOrchestrationContext context)
{
    var parallelTasks = new List<Task<int>>();

    // Get a list of N work items to process in parallel.
    object[] workBatch = await context.CallActivityAsync<object[]>("F1", null);
    for (int i = 0; i < workBatch.Length; i++)
    {
        Task<int> task = context.CallActivityAsync<int>("F2", workBatch[i]);
        parallelTasks.Add(task);
    }

    await Task.WhenAll(parallelTasks);

    // Aggregate all N outputs and send the result to F3.
    int sum = parallelTasks.Sum(t => t.Result);
    await context.CallActivityAsync("F3", sum);
}
```

### Asynchrone HTTP APIs

Das asynchrone HTTP-API-Muster koordiniert die Statusverfolgung von lang laufenden Vorgängen mit externen Clients. Normalerweise wird die Vorgangsaktion über einen HTTP-Endpunkt gestartet, und der Client wird zu einem Statusendpunkt weitergeleitet, um den Abschluss des Vorgangs zu überwachen.

![Durable Function Chaining](../../../../assets/SYTD/azure-function/durable-function-async-http-api.png)

Durable Functions erleichtert und vereinfacht die Implementierung dieses Musters erheblich, indem es integrierte Unterstützung bietet. Sie können REST-Befehle verwenden, um Orchestratorfunktionen zu starten und deren Status abzufragen. Dies bietet eine einfachere Interaktion mit langen Funktionsausführungen.

```bash
> curl -X POST https://myfunc.azurewebsites.net/api/orchestrators/DoWork -H "Content-Length: 0" -i
HTTP/1.1 202 Accepted
Content-Type: application/json
Location: https://myfunc.azurewebsites.net/runtime/webhooks/durabletask/instances/b79baf67f717453ca9e86c5da21e03ec

{"id":"b79baf67f717453ca9e86c5da21e03ec", ...}

> curl https://myfunc.azurewebsites.net/runtime/webhooks/durabletask/instances/b79baf67f717453ca9e86c5da21e03ec -i
HTTP/1.1 202 Accepted
Content-Type: application/json
Location: https://myfunc.azurewebsites.net/runtime/webhooks/durabletask/instances/b79baf67f717453ca9e86c5da21e03ec

{"runtimeStatus":"Running","lastUpdatedTime":"2019-03-16T21:20:47Z", ...}

> curl https://myfunc.azurewebsites.net/runtime/webhooks/durabletask/instances/b79baf67f717453ca9e86c5da21e03ec -i
HTTP/1.1 200 OK
Content-Length: 175
Content-Type: application/json

{"runtimeStatus":"Completed","lastUpdatedTime":"2019-03-16T21:20:57Z", ...}
```

### Monitor

Das Überwachen-Muster wiederholt Vorgänge in einem Workflow, wie das Warten auf bestimmte Bedingungen. Mit Durable Functions lassen sich flexible Wiederholungsintervalle einrichten und Aufgabenlebensdauern verwalten. Ein Beispiel ist das Überwachen von Zustandsänderungen durch langlebige Monitore, anstelle von externen Client-Überwachungen. Dies ermöglicht die Verwaltung mehrerer Monitore und variable Warteintervalle basierend auf Bedingungen wie exponentiellem Backoff.

![Durable Function Chaining](../../../../assets/SYTD/azure-function/durable-function-monitor.png)

```csharp
[FunctionName("MonitorJobStatus")]
public static async Task Run(
    [OrchestrationTrigger] IDurableOrchestrationContext context)
{
    int jobId = context.GetInput<int>();
    int pollingInterval = GetPollingInterval();
    DateTime expiryTime = GetExpiryTime();

    while (context.CurrentUtcDateTime < expiryTime)
    {
        var jobStatus = await context.CallActivityAsync<string>("GetJobStatus", jobId);
        if (jobStatus == "Completed")
        {
            // Perform an action when a condition is met.
            await context.CallActivityAsync("SendAlert", jobId);
            break;
        }

        // Orchestration sleeps until this time.
        var nextCheck = context.CurrentUtcDateTime.AddSeconds(pollingInterval);
        await context.CreateTimer(nextCheck, CancellationToken.None);
    }

    // Perform more work here, or let the orchestration end.
}
```

### Human Interaction

Automatisierte Prozesse beinhalten oft Benutzerinteraktion, was herausfordernd sein kann, da Menschen nicht so verfügbar und reaktionsfähig wie Clouddienste sind. Zeitlimits und Kompensationslogik können in automatisierten Prozessen verwendet werden, um diese Interaktion zu ermöglichen.

![Durable Function Chaining](../../../../assets/SYTD/azure-function/durable-function-approval.png)

Dieses Muster kann mithilfe einer Orchestrierungsfunktion implementiert werden, die Timer für die Genehmigung und Eskalation verwendet und auf externe Benutzerinteraktion wartet. Hier wird ein Genehmigungsprozess dargestellt.

Ein Beispiel ist ein Genehmigungsprozess, bei dem Benutzerinteraktion erforderlich ist, wie bei einer Spesenabrechnung, die eine Genehmigung ab einem bestimmten Betrag erfordert. Wenn die Genehmigung nicht innerhalb von 72 Stunden erfolgt, tritt eine Eskalation in Kraft.

```csharp
[FunctionName("ApprovalWorkflow")]
public static async Task Run(
    [OrchestrationTrigger] IDurableOrchestrationContext context)
{
    await context.CallActivityAsync("RequestApproval", null);
    using (var timeoutCts = new CancellationTokenSource())
    {
        DateTime dueTime = context.CurrentUtcDateTime.AddHours(72);
        Task durableTimeout = context.CreateTimer(dueTime, timeoutCts.Token);

        Task<bool> approvalEvent = context.WaitForExternalEvent<bool>("ApprovalEvent");
        if (approvalEvent == await Task.WhenAny(approvalEvent, durableTimeout))
        {
            timeoutCts.Cancel();
            await context.CallActivityAsync("ProcessApproval", approvalEvent.Result);
        }
        else
        {
            await context.CallActivityAsync("Escalate", null);
        }
    }
}
```

### Aggregator

Ereignisdaten werden über einen Zeitraum zusammengefasst, möglicherweise aus verschiedenen Quellen und über längere Zeiträume verteilt. Die Herausforderung bei der Implementierung mit normalen Funktionen besteht darin, die Parallelität zu steuern und sicherzustellen, dass der Aggregator auf einer einzigen VM läuft. Die Verwendung von dauerhaften Entitäten erleichtert die Implementierung.

![Durable Function Chaining](../../../../assets/SYTD/azure-function/durable-function-aggregator.png)

```csharp
[FunctionName("Counter")]
public static void Counter([EntityTrigger] IDurableEntityContext ctx)
{
    int currentValue = ctx.GetState<int>();
    switch (ctx.OperationName.ToLowerInvariant())
    {
        case "add":
            int amount = ctx.GetInput<int>();
            ctx.SetState(currentValue + amount);
            break;
        case "reset":
            ctx.SetState(0);
            break;
        case "get":
            ctx.Return(currentValue);
            break;
    }
}
```

```csharp
public class Counter
{
    [JsonProperty("value")]
    public int CurrentValue { get; set; }

    public void Add(int amount) => this.CurrentValue += amount;

    public void Reset() => this.CurrentValue = 0;

    public int Get() => this.CurrentValue;

    [FunctionName(nameof(Counter))]
    public static Task Run([EntityTrigger] IDurableEntityContext ctx)
        => ctx.DispatchAsync<Counter>();
}
```

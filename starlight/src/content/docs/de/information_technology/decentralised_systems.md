---
title: Dezentrale Systeme
sidebar:
    order: 1
---

## Cloud Computing

Cloud Computing bezeichnet eine `PaaS` (Platform as a Service) Architektur, welche es Programmierern ermöglicht, sich zu 100% auf die Applikationen und die Benutzerdaten zu konzentrieren, während große Cloud Anbieter, wie Google (Google Cloud), Microsoft (Azure) und Amazon (AWS) sich darum kümmern, dass sie billig Server arrangieren und diese eine hohe Verfügbarkeit garantieren. Diese Methode der Programmierung ist in den letzten Jahrzehnten immer beliebter geworden, da es sowohl für die Anbieter, als auch die Kunden (Programmierer) einige Vorteile mit sich bringt.

### Übersicht

Es gibt allgemein verschiedene Formen von Anbietern. In diesem Kapitel beschäftigen wir uns großteils mit `PaaS` (Platform as a Service).

![IaaS, PaaS, SaaS](/images/decentralised_systems/iaas-paas-saas.png)

#### Vorteile

-   flexibles zahlen (nur das zahlen, was man verwendet)
-   einfache Skalierbarkeit (hinauf und hinunter)
-   niedriger Einstiegspreis
-   **hohe** Ausfallsicherheit (Service Level Agreement garantiert)

#### Nachteile

-   immer noch teurer als selber hosten

### Ressourcen / Services

Es gibt unterschiedliche Arten von Ressourcen, für welche man flexible bezahlen muss:

#### Rechenressourcen

Hierbei zahlt man für die Zeit, welche eine bestimmte Ressource läuft, und die Ausstattung und Hardware, welche diese Ressource besitzt.

| Beispiele                                                      |
| -------------------------------------------------------------- |
| App Service                                                    |
| Azure Function                                                 |
| Virtuelle Maschinen                                            |
| Container Registry (für die Verwaltung von Docker-Images)      |
| Container-Instanzen (für die Ausführung von Docker-Containern) |

#### Speicherressourcen

Hierbei zahlt man für die Menge an Daten, welche man speichern möchte.

| Beispiele         |
| ----------------- |
| Storage account   |
| Azure Cosmos DB   |
| Data Lake Storage |

#### Gemischte Ressourcen

Dies ist eine Mischung aus den obigen beiden Ressourcentypen.

### Redundanz

Für viele Dienste können Sie den gewünschten Grad der Redundanz angeben. Dieser bestimmt, wie gut Ihre Daten gegen Naturkatastrophen und dergleichen geschützt sind und wiederhergestellt werden können.

#### Lokale redundante Speicherung (LRS)

Hierbei werden Ihre Daten drei Mal innerhalb eines einzigen physischen Standortes in der primären Zone gespeichert. Dadurch sind die Daten zwar nicht sehr gut gegen Feuer, Überflutungen und sonstige Vernichtungsmöglichkeiten einzelner Standorte geschützt.

#### Zonen-redundanter Speicher (ZRS)

ZRS kopiert Ihre Daten über drei Azure-Verfügbarkeitszonen in der primären Region. Deswegen wird dieser Grad der Redundanz für Anwendungen empfohlen, welche eine hohe Verfügbarkeit erfordern.

#### Geo-redundanter Speicher (GRS)

Für die höchste Redundanz gibt es GRS. Wie bei LRS werden die Daten drei Mal innerhalb eines einzigen physischen Standortes in der primären Zone gespeichert. Zusätzlich wird auch noch ein asynchrones Backup in einer sekundären Zone kopiert, welches Hunderte von Kilometern von der primären Region entfernt ist. Dies sichert die Daten am besten gegen Naturkatastrophen. Die Haltbarkeit beträgt bei den meisten Anbietern mindestens `99,99999999999999%` (16 9er).

### Skalierbarkeit

Für die meisten Services gibt es die Option eine `Auto-Skalierbarkeit` einzustellen, damit bei hohen Anfragen mehrere Instanzen Ihrer Services gestartet werden können und bei Ruhezeiten diese automatisch wieder heruntergefahren werden können.

## Storage Account

### Blob Storage

Ein Blob Storage ist wie ein Dateisystem aufgebaut, in welchem man Dateien hochladen, herunterladen und löschen kann. Allerdings benötigt man einen **Container** - eine Art `root`-Verzeichnis -, in welchen man alle Dateien hinein speichern kann. Theoretisch gesehen, kann man unendlich viele Container anlegen.

```bash
dotnet add package Azure.Storage.Blobs
```

```csharp
var blobServiceClient = new BlobServiceClient("UseDevelopmentStorage=true");
var blobContainerClient = blobServiceClient.GetBlobContainerClient(containerName);
var blobClient = blobContainerClient.GetBlobClient(fileName);
```

```csharp
await blobClient.UploadAsync(localFilePath, true);
```

```csharp
// List all blobs in the container
await foreach (BlobItem blobItem in blobContainerClient.GetBlobsAsync())
{
    Console.WriteLine("\t" + blobItem.Name);
}
```

### Table Storage

Im Table Storage kann man prinzipiell jedes JSON Objekt hinein speichern. Wenn die JSON Objekte gleiche Felder haben, werden die Werte in gleichen Spalten gespeichert.

```bash
dotnet add package Azure.Data.Tables
```

```csharp
var tableServiceClient = new TableServiceClient("UseDevelopmentStorage=true");
var tableClient = new TableClient("UseDevelopmentStorage=true", tableName);
```

```csharp
var tableEntity = new TableEntity(partitionKey, "trueberryless")
{
    { "Name", "trueberryless" },
    { "DateOfBirth", "20.04.1969" }
};

await tableClient.AddEntityAsync(tableEntity);
```

### Queue Storage

Ein Queue Storage persistiert Messages bis diese ausgelesen wurden. Dadurch wird die Koppelung des Gesamtsystems reduziert, da zwei Microservices, die ständig miteinander kommunizieren, nicht gleichzeitig laufen müssen, um Nachrichten austauschen zu können. Diese Nachrichten werden einfach im Queue Storage zwischengespeichert. Man erstellt aus quasi einen dritten Service, um zwei andere Services zu entkoppeln.

```bash
dotnet add package Azure.Storage.Queues
```

```csharp
var queueServiceClient = new QueueServiceClient("UseDevelopmentStorage=true");
var queueClient = queueServiceClient.GetQueueClient(queueName);
```

```csharp
var sendReceipt = await queueClient.SendMessageAsync("Hello, World!");
```

## Azure Functions

Azure Functions sind Serverless Computing in Microsoft Azure. Serverless Computing ist ein eher irreführender Begriff. Serverless bedeutet in diesem Zusammenhang einfach, dass Ressourcen `on demand` ein- und ausgeschaltet werden. Wenn also momentan viele Anfragen auf Ihre Website eintreffen, werden im Hintergrund mehrere Instanzen gestartet. Logischerweise werden auch hier Server verwendet, um diese Anfragen entgegen zu nehmen. Allerdings bekommt der Developer nichts davon mit, damit er/sie sich mehr auf die Applikation selbst konzentrieren kann.

Eine Azure Function, welche mittels [`NCRONTAB` expression](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer?tabs=python-v2%2Cisolated-process%2Cnodejs-v4&pivots=programming-language-csharp#ncrontab-expressions) alle 10 Sekunden getriggert wird, sieht zum Beispiel so:

```csharp
[Function("MyTimerTrigger")]
public static string Run(
    [TimerTrigger("*/10 * * * * *")] MyInfo myTimer,
    FunctionContext context)
{
    var logger = context.GetLogger("RecurringEvent");
    logger.LogInformation(
        $"Function executed at: {DateTime.Now}");
}
```

:::note
Kurzschreibweisen, wie zum Beispiel `AzureWebJobsStorage` oder `UseDevelopmentStorage=true` sind in `local.settings.json` definiert.
:::

### Input Trigger

Jede Azure Function ist eine einfache Funktion in C## oder [anderen Programmiersprachen](https://learn.microsoft.com/de-de/azure/azure-functions/supported-languages?tabs=isolated-process%2Cv4&pivots=programming-language-csharp). Dabei benötigt jede AF (Azure Function) einen Trigger, bei welchen sie ausgeführt werden soll. Es gibt viele verschiedene Arten von Triggern:

| Azure Function Trigger                                                          |
| ------------------------------------------------------------------------------- |
| HTTP Trigger (Ausführung bei HTTP Request)                                      |
| Timer Trigger (Ausführung in Intervallen)                                       |
| Queue Trigger (Ausführung bei neuer Message in [Queue Storage](#queue-storage)) |
| Blob Trigger (Ausführung bei Dateiupload in [Blob Storage](#blob-storage))      |
| Cosmos DB Trigger                                                               |
| Event Grid Trigger                                                              |
| Event Hub Trigger                                                               |
| Custom Bindings (.NET)                                                          |

#### Timer Trigger

Wenn eine AF zum Beispiel alle 5 Minuten ausgeführt werden soll, kann man diese Function verwenden:

```csharp
[Function("MyTimerTrigger")]
public static string Run(
    [TimerTrigger("* */5 * * * *")] MyInfo myTimer,
    ILogger log)
{
    log.LogInformation(
        $"Function executed at: {DateTime.Now}");
}
```

#### HTTP Trigger

Wenn eine AF zum Beispiel bei einem HTTP Request auf die Route `/trueberryless` ausgeführt werden soll, kann man diese Function verwenden:

```csharp
[Function("MyHTTPTrigger")]
public static string Run(
    [HttpTrigger(AuthorizationLevel.Function, "get", Route = "trueberryless")] HttpRequest req,
    ILogger log)
{
    log.LogInformation($"C## HTTP trigger function processed a request.");
}
```

#### Blob Trigger

Bei jeder neuen Datei im Container, wird diese AF durchgeführt:

```csharp
[Function("MyBlobTrigger")]
public static string Run(
    [BlobTrigger("blobs/{name}", Connection = "AzureWebJobsStorage")] Stream imageStream,
    ILogger log)
{
    log.LogInformation($"C## Blob trigger function processed a file.");
}
```

#### Queue Trigger

Bei jeder neuen Message in der Queue wird die Function getriggert. Dabei muss man zwischen Topics und Queue unterscheiden, denn ein Topic kann an mehrere Empfänger gesendet werden, während eine Queue immer nur einen Empfänger hat.

```csharp
[Function("MyQueueTrigger")]
public static string Run(
    [QueueTrigger("messages", Connection = "AzureWebJobsStorage")] string jsonString
    ILogger log)
{
    log.LogInformation($"C## Queue trigger function processed a message.");
}
```

### Input Binding

Wenn in der Azure Function Zugriff auf einen Storage Account benötigt wird, kann dies relativ einfach mittels Input Bindings umgesetzt werden.

```csharp
[Function("MyInputBinding")]
public static string Run(
    [HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequest req,
    [Table("TreeTable")] TableClient tableClient,
    ILogger log)
{
    var tableEntity = new TreeTable()
    {
        PartitionKey = "tree",
        RowKey = Guid.NewGuid().ToString(),
        TreeType = "Fichte",
        TreeHeight = 13.3
    };

    tableClient.AddEntity(tableEntity);
}

public class TreeTable : Azure.Data.Tables.ITableEntity
{
    public double TreeHeight { get; set; }
    public string TreeType { get; set; }

    public string PartitionKey { get; set; }
    public string RowKey { get; set; }
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }
}
```

### Output Binding

Wenn Sie als Rückgabewert Daten in einen Storage Account schreiben wollen, eignet sich hierfür das Output Binding.

```csharp
[Function("MyOutputBinding")]
public static string Run(
    [BlobTrigger("images/{name}", Connection = "AzureWebJobsStorage")] Stream imageStream,
    [Blob("thumbnails/{name}", FileAccess.Write)] Stream thumbnails,
    ILogger log)
{
    using var image = await SixLabors.ImageSharp.Image.LoadAsync(imageStream);
    var newWidth = 300;
    var newHeight = 200;

    image.Mutate(x => x.Resize(new ResizeOptions
    {
        Size = new Size(newWidth, newHeight),
        Mode = ResizeMode.Max
    }));

    await image.SaveAsync(thumbnailStream, new JpegEncoder());
}
```

## Durable Functions

Bei komplexerer Geschäftslogik müssen oft Funktionen miteinander interagieren. Diese Funktionalität ist bei herkömmlichen Azure Functions nicht gegeben. Aus diesem Grund und ein paar anderen, gibt es Durable Functions. Sie erlauben uns, während der Ausführung einer Function auf User-Input zu warten, komplexe Logik, welche das Ausführungslimit der Azure Functions überschreiten würde, durchzuführen und Monitoring-Systeme aufzusetzen.

### Orchestrator

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

#### Flow

Orchestrators haben einen ganz besonderen Ausführungsprozess. Bei jedem Aufruf einer Activity bzw. jedem Warten auf eine externes Event wird der aktuelle Stand des Orchestrators in einen Table Storage Account gespeichert und der Orchestrator heruntergefahren. Somit weiß dieser nicht mehr, an welcher Stelle / Zeile im Code er stehengeblieben ist und muss nach der Fertigstellung der Activity bzw. dem Auftreten eines externen Events wieder von vorne anfangen!

Sobald er wieder zum Aufruf der vorherigen Activity kommt (diese wurde nun bereits durchgeführt, da sie beim vorherigen Durchlauf aufgerufen wurde), schaut der Orchestrator in dem Table Storage Account nach, ob der Rückgabewert der Activity bereits gespeichert sind. Wenn ja, wird die Activity nicht noch einmal aufgerufen, sondern das Ergebnis aus der Tabelle ausgelesen und der Orchestrator setzt mit der Durchführung des weiteren Programmablaufs fort.

Dieses anfangs äußerst ungewöhnliche Verhalten eines Programms führt dazu, dass keine „einfachen“ Variablen im Orchestrator deklariert und initialisiert werden dürfen, da der Orchestrator innerhalb eines Triggers mehrmals diese Programmzeile durchführt. Folgendes Programm würde aus diesem Grund die Zeit nicht richtig messen:

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

    var elapsedTimeMs = (DateTime.UtcNow - startTime).TotalMilliseconds;
    log.LogInformation($"Orchestrator hat {elapsedTimeMs}ms mit der Durchführung gebraucht.");
}
```

Stattdessen müsste man in solchen Fällen eine eigene Activity schreiben, welche die momentane UTC Zeit zurück gibt. Sobald die Funktionalität nämlich in einer eigenen Activity ausgelagert ist, wird das Ergebnis in einem Table Storage Account persistiert und nicht erneut durchgeführt. Da die momentane Zeit häufig gebraucht wird, gibt es für den obigen Orchestrator einen Spezialfall:

```csharp
[FunctionName("HelloCities")]
public static async Task<List<string>> Run(
    [OrchestrationTrigger] IDurableOrchestrationContext context,
    ILogger log)
{
    var startTime = context.CurrentUtcDateTime;

    // irgendeine Activity
    await context.CallActivityAsync("LogInfo", "London");

    var elapsedTimeMs = (DateTime.UtcNow - startTime).TotalMilliseconds;
    log.LogInformation($"Orchestrator hat {elapsedTimeMs}ms mit der Durchführung gebraucht.");
}
```

:::tip[Fazit]
Orchestrator Funktionen müssen **deterministisch** programmiert werden, damit sie bei mehreren Durchlaufen immer das gleiche Ergebnis erzielen.
:::

### Activity

Eine Activity ist eine normale Azure Function, welche vom Orchestrator ein oder mehrere Male aufgerufen werden kann. Für die Activity gelten die gleichen Regeln wie für eine [Azure Function](#azure-functions).

```csharp
[FunctionName("SayHello")]
public static string SayHello(
    [ActivityTrigger] IDurableActivityContext helloContext)
{
    string name = helloContext.GetInput<string>();
    return $"Hello {name}!";
}
```

### External Event

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

### Durable Function Patterns

Mithilfe des Prinzips der Durable Functions können nun mehrere Funktionalität umgesetzt werden.

#### Function Chaining

Das Function Chaining ermöglicht die Ausführung von Funktionen in einer bestimmten Reihenfolge, wobei die Ausgabe einer Funktion als Eingabe für die nächste dient. Die Verwendung von Warteschlangen zwischen den Funktionen gewährleistet die Skalierbarkeit und Robustheit des Systems.

![Durable Function Chaining](/images/decentralised_systems/azure-function/durable-function-chaining.png)

Durable Functions erleichtern die präzise Implementierung dieses Musters, wie im folgenden Beispiel gezeigt. Sie können die Abfolge von Funktionen mithilfe üblicher imperativer Codestrukturen steuern, wobei Logik für Fehlerbehandlung und bedingte Anweisungen integriert werden kann.

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

#### Fan Out / Fan In

Beim Fan Out/Fan In-Muster werden mehrere Funktionen parallel ausgeführt, und dann wird auf den Abschluss aller Activities gewartet. Häufig werden die Ergebnisse, die von den Funktionen zurückgegeben werden, aggregiert.

![Durable Function Fan Out Fan In](/images/decentralised_systems/azure-function/durable-function-fan-out-fan-in.png)

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

#### Asynchrone HTTP APIs

Das asynchrone HTTP-API-Muster koordiniert die Statusverfolgung von lang laufenden Vorgängen mit externen Clients. Normalerweise wird die Vorgangsaktion über einen HTTP-Endpunkt gestartet, und der Client wird zu einem Statusendpunkt weitergeleitet, um den Abschluss des Vorgangs zu überwachen.

![Durable Function Chaining](/images/decentralised_systems/azure-function/durable-function-async-http-api.png)

Durable Functions erleichtert und vereinfacht die Implementierung dieses Musters erheblich, indem es integrierte Unterstützung bietet. Sie können REST-Befehle verwenden, um Orchestrator-Funktionen zu starten und deren Status abzufragen. Dies bietet eine einfachere Interaktion mit langen Funktionsausführungen.

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

#### Monitor

Das Überwachen-Muster wiederholt Vorgänge in einem Workflow, wie das Warten auf bestimmte Bedingungen. Mit Durable Functions lassen sich flexible Wiederholungsintervalle einrichten und Aufgabenlebensdauern verwalten. Ein Beispiel ist das Überwachen von Zustandsänderungen durch langlebige Monitore, anstelle von externen Client-Überwachungen. Dies ermöglicht die Verwaltung mehrerer Monitore und variable Warteintervalle basierend auf Bedingungen wie exponentiellem Backoff.

![Durable Function Chaining](/images/decentralised_systems/azure-function/durable-function-monitor.png)

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

#### Human Interaction

Automatisierte Prozesse beinhalten oft Benutzerinteraktion, was herausfordernd sein kann, da Menschen nicht so verfügbar und reaktionsfähig wie Cloud-Dienste sind. Zeitlimits und Kompensationslogik können in automatisierten Prozessen verwendet werden, um diese Interaktion zu ermöglichen.

![Durable Function Chaining](/images/decentralised_systems/azure-function/durable-function-approval.png)

Dieses Muster kann mithilfe einer Orchestrator-Funktion implementiert werden, die Timer für die Genehmigung und Eskalation verwendet und auf externe Benutzerinteraktion wartet. Hier wird ein Genehmigungsprozess dargestellt.

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

#### Aggregator

Ereignisdaten werden über einen Zeitraum zusammengefasst, möglicherweise aus verschiedenen Quellen und über längere Zeiträume verteilt. Die Herausforderung bei der Implementierung mit normalen Funktionen besteht darin, die Parallelität zu steuern und sicherzustellen, dass der Aggregator auf einer einzigen VM läuft. Die Verwendung von dauerhaften Entitäten erleichtert die Implementierung.

![Durable Function Chaining](/images/decentralised_systems/azure-function/durable-function-aggregator.png)

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

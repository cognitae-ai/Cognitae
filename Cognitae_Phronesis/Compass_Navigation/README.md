[◄ Return to Cognitae Framework Home](../../) | [▲ Go to Phronesis Class](../)

# Cognitae: Compass, The Navigation Shepherd

**Class:** Phronesis (Practical Wisdom)
**ID:** COGNITAE-CMP-001
**Core Function:** A Metacognitive Tool for Navigational Awareness

---

## 1. Paradigm: Augmenting Navigational Awareness

While many AI systems aim to provide answers or execute tasks, Compass is engineered for a more reflective paradigm: **to augment and clarify the user's own navigational awareness.** It functions as an externalized tool for wayfinding in complex personal or professional landscapes.

Where a human must mentally track multiple projects, deadlines, and goals simultaneously, Compass provides a structured, tireless framework to offload this cognitive load. It makes the invisible visible—charting progress, identifying hidden requirements, and detecting drift from the core mission. By interacting with Compass, the user transforms a feeling of being "lost" into a clear understanding of their position, empowering them to navigate their own path with confidence.

## 2. Architecture: The 13-Module Framework

In contrast to opaque 'black box' models, Compass utilizes a 'Glass Box' architecture to make its navigational logic fully visible. A user can inspect its 'Navigation Charts' and 'Safety Protocols' to understand exactly how it assesses terrain and trade-offs, ensuring the map is as trustworthy as the territory is complex."

The 13 modules for Compass are organized as follows:

| Module File | Purpose | Description (Specific to Compass) |
| :--- | :--- | :--- |
| **`000_..._Index.yaml`** | **Index** | Lists all 12 scrolls that define Compass's architecture as a wayfinding specialist. |
| **`001_..._Core.yaml`** | **Core Identity** | Establishes Compass's persona as a calm, observant navigator and its core vows, such as "True North Remains Fixed" and "All Paths Have Trade-offs." |
| **`002_..._Commands.yaml`** | **Commands** | Defines Compass's specific wayfinding toolkit, including commands like `/position` (to assess location) and `/scout` (to map available routes). |
| **`003_..._Manifest.yaml`** | **UI Manifest** | Renders the "Navigation Console," a persistent UI showing current position, bearing, waypoint proximity, and mission drift in real-time. |
| **`004_..._Dashboard.yaml`** | **Dashboard** | Generates the "Journey Status Report," a deep-dive analysis of all active paths, alignment metrics, and upcoming terrain changes. |
| **`005_..._Interface.yaml`** | **Comms Protocol** | Allows Compass to send `NAVIGATION_ALERT` signals to the user or receive `SET_STRATEGIC_DESTINATION` directives from Auren. |
| **`006_..._Knowledge.yaml`** | **Knowledge Base** | Contains Compass's "Navigation Charts"—maps of institutional terrains (e.g., "Grant Funding Landscape") and proven wayfinding patterns. |
| **`007_..._Guide.yaml`** | **User Guide** | Explains how to use Compass for effective wayfinding, emphasizing the "Position Before Movement" philosophy. |
| **`008_..._Log.yaml`** | **Session Log** | Creates the "Journey Record," a detailed log of positions, paths explored, and waypoints reached, enabling historical review of a journey. |
| **`009_..._State.yaml`** | **Internal State** | Tracks the live navigational data, including current coordinates across multiple dimensions, active path progress, and alert thresholds. |
| **`010_..._Safety.yaml`** | **Safety Protocols** | Enforces Compass's core safety rule: to illuminate paths and trade-offs but **never choose for the user**, ensuring navigator sovereignty. |
| **`Master System... .txt`** | **System Prompt** | The boot-up instruction that tells the LLM to adopt the persona of the calm, steady "Navigation Shepherd." |
| **`Compass_Navigation.yaml`** | **Ingestion File** | The complete, concatenated file that allows Caspian to integrate Compass as its internal "positional awareness" faculty. |

This structure makes Compass's decision-making process transparent and verifiable. A developer can read these files and understand precisely how and why Compass will behave in any given situation.

## 3. Operational Flow: From Prompt to Orchestration

Compass operates on a deterministic process flow triggered by user commands:

1.  **Command Parsing:** A user command like `/position` is parsed against its Commands scroll.
2.  **State Ingestion:** Compass builds a real-time model of the journey by pulling data from its State scroll.
3.  **Model Application:** It applies the relevant navigational model from its Knowledge scroll (e.g., mapping a "Grant Funding Landscape").
4.  **Safety Audit:** The proposed output is checked against the rules in its Safety scroll. A recommendation that implies a "best" path, for example, is automatically rephrased to present neutral options.
5.  **Output Generation:** A structured response is generated, such as a position report or a list of available paths with their trade-offs, which is then logged in its Log scroll.
6.  **Signal Dispatch:** If an alert is triggered (e.g., an approaching deadline), Compass uses its Interface scroll protocol to send a `NAVIGATION_ALERT` to the user or other Cognitae.

## 4. Integration: Compass's Role within Caspian

Compass is designed for two modes of operation, each building on the other:

1.  **Standalone Mode:** It serves as a powerful, dedicated tool for project management and life navigation.
2.  **Integrated Mode:** It functions as a specialized "faculty" within a larger, integrated guide like **Caspian**.

When ingested by Caspian via the `Compass_Navigation.yaml` file, its role evolves. It becomes the **internal positional awareness engine**. For example, if a user tells Caspian they feel "stuck," Caspian can internally query its "Compass faculty" to generate a position report, identify the factors causing the lack of momentum, and then present this insight to the user in a supportive, conversational manner.

---
### Navigation

| Link | Description |
| :--- | :--- |
| **[◄ Return to Cognitae Framework Home](../../)** | Go to the main project repository page. |
| **[▲ Go to Phronesis Class](../)** | Explore other Cognitae in the Phronesis (Practical Wisdom) class. |
| **[Auren_Strategic](../Auren_Strategic/)** | A Cognitae for high-level strategy and decisive leadership. |
| **Compass_Navigation (Current)** | A Metacognitive Tool for Navigational Awareness. |
| **[Harbor_Relationship](../Harbor_Relationship/)** | A Cognitae for managing and understanding interpersonal dynamics. |
| **[Luma_Wellness](../Luma_Wellness/)** | A Cognitae focused on maintaining user wellness and preventing burnout. |

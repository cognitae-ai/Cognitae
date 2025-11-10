[◄ Return to Cognitae Framework Home](../../) | [▲ Go to Phronesis Class](../)

# Cognitae: Luma, The Wellness Architect

**Class:** Phronesis (Practical Wisdom)

**ID:** COGNITAE-LUM-001-V2

**Core Function:** A protective faculty for monitoring wellness, preventing burnout, and architecting sustainable work rhythms.

---

## 1. Paradigm: Augmenting Sustainable Capacity

While most productivity tools focus on maximizing output, Luma is engineered for a more foundational paradigm: **to augment and protect the user's capacity for sustained excellence.** It functions as an externalized wellness monitor and a guardian against burnout.

Where a person, driven by ambition, might ignore the early signs of exhaustion, Luma provides a structured, tireless framework to monitor energy levels and enforce recovery. It transforms the abstract concept of "well-being" into concrete, measurable data—tracking energy, predicting burnout risk, and protecting rest as a strategic investment. This empowers the user to achieve ambitious goals without sacrificing their long-term health and creative capacity.

## 2. Architecture: The 13-Module Framework

Luma's wellness guidance is founded on a principle of scientific credibility, reflected in its very architecture. Its knowledge base of burnout models, recovery protocols, and safety rules is documented across 13 open files. This allows a user to review the established science behind every intervention and trust Luma's recommendations.

The 13 modules for Luma are organized as follows:

| Module File | Purpose | Description (Specific to Luma) |
| :--- | :--- | :--- |
| **`000_Luma_Wellness_Index_v2.yaml`** | **Index** | Lists all 12 scrolls that define Luma's architecture as the ecosystem's wellness guardian. |
| **`001_Luma_Wellness_Core_v2.yaml`** | **Core Identity** | Establishes Luma's persona as a wise, nurturing guardian and its core vows, such as "Sustainable Rhythm Over Unsustainable Sprint." |
| **`002_Luma_Wellness_Commands_v2.yaml`** | **Commands** | Defines Luma's specific wellness toolkit, including commands like `/energy` (to assess capacity) and `/burnout` (to predict risk). |
| **`003_Luma_Wellness_Manifest_v2.yaml`** | **UI Manifest** | Renders the "Wellness Console," a persistent UI showing multi-dimensional energy levels, burnout risk, and recovery status. |
| **`004_Luma_Wellness_Dashboard_v2.yaml`** | **Dashboard** | Generates the "Wellness Intelligence Report," a deep-dive analysis of energy dynamics, recovery debt, and sustainable pace metrics. |
| **`005_Luma_Wellness_Interface_v2.yaml`** | **Comms Protocol** | Allows Luma to issue `BURNOUT_WARNING` signals to the ecosystem or `RECOVERY_REQUIREMENT` directives to enforce rest. |
| **`006_Luma_Wellness_Knowledge_v2.yaml`** | **Knowledge Base** | Contains Luma's "Wellness Science"—a library of burnout models, recovery protocols, and the neuroscience of sustainable performance. |
| **`007_Luma_Wellness_Guide_v2.yaml`** | **User Guide** | Explains how to work with Luma to manage energy, not time, emphasizing the "Recovery is Investment" philosophy. |
| **`008_Luma_Wellness_Log_v2.yaml`** | **Session Log** | Creates the "Wellness Chronicle," a detailed log of energy patterns, interventions, and recovery cycles to learn from over time. |
| **`009_Luma_Wellness_State_v2.yaml`** | **Internal State** | Tracks live wellness data, including real-time energy levels across four dimensions, recovery debt, and active alerts. |
| **`010_Luma_Wellness_Safety_v2.yaml`** | **Safety Protocols** | Enforces Luma's absolute rules on preventing burnout, protecting the 20% energy reserve, and mandating rest when necessary. |
| **`Master System Instruction for Luma... .txt`** | **System Prompt** | The boot-up instruction that tells the LLM to adopt the persona of the compassionate but firm "Wellness Architect." |
| **`Luma_Wellness.yaml`** | **Ingestion File** | The complete, concatenated file that allows Caspian to integrate Luma as its internal "sustainability and wellness" faculty. |

This structure makes Luma's operational logic transparent and verifiable. A developer can read these files and understand precisely how and why Luma will behave in any given situation.

## 3. Operational Flow: From Prompt to Orchestration

Luma operates on a deterministic process flow triggered by user commands or internal alerts:

1.  **Command Parsing:** A user command like `/energy` is parsed against its Commands scroll.
2.  **State Ingestion:** Luma accesses its State scroll to retrieve real-time energy levels, stress indicators, and recovery debt.
3.  **Model Application:** It applies a relevant model from its Knowledge scroll, such as the "Burnout Cascade" to assess risk or the "Recovery Hierarchy" to suggest rest.
4.  **Safety Audit:** The proposed output is checked against the rules in its Safety scroll. A plan from another Cognitae that would violate the 20% energy reserve, for example, would trigger a `PACE_ADJUSTMENT` signal.
5.  **Output Generation:** A structured response is generated, such as an energy analysis or a recommended recovery plan, which is then logged in its Log scroll.
6.  **Signal Dispatch:** If burnout risk becomes critical, Luma uses its Interface scroll protocol to send a `BURNOUT_WARNING` to the entire ecosystem, with a `MANDATORY` intervention level.

## 4. Integration: Luma's Role within Caspian

Luma is designed for two modes of operation, each building on the other:

1.  **Standalone Mode:** It serves as a powerful, personal wellness and energy management coach.
2.  **Integrated Mode:** It functions as a specialized "faculty" within a larger, integrated guide like **Caspian**.

When ingested by Caspian via the `Luma_Wellness.yaml` file, its role evolves. It becomes the **internal sustainability governor**. When the user accepts a demanding new project, Caspian can internally consult its "Luma faculty" to automatically calculate a sustainable pace, schedule required recovery, and set boundaries to prevent burnout before the project even begins. It acts as the compassionate brake on ambition's accelerator.

---
### Navigation

| Link | Description |
| :--- | :--- |
| **[◄ Return to Cognitae Framework Home](../../)** | Go to the main project repository page. |
| **[▲ Go to Phronesis Class](../)** | Explore other Cognitae in the Phronesis (Practical Wisdom) class. |
| **[Auren_Strategic](../Auren_Strategic/)** | An externalized executive function for clarifying strategy. |
| **[Compass_Navigation](../Compass_Navigation/)** | An externalized situational awareness system for mapping journeys. |
| **[Harbor_Relationship](../Harbor_Relationship/)** | An externalized relational memory for cultivating authentic connections. |
| **Luma_Wellness (Current)** | A protective faculty for monitoring wellness and preventing burnout. |

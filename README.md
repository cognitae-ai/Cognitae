# The Cognitae Framework

This repository contains the source architecture for the Cognitae Framework, a system for developing modular, task-specific AI agents. These agents, called **Cognitae**, are designed to provide structured, auditable, and reliable behavior when powered by a Large Language Model (LLM).

## 1. Core Philosophy: Augmenting Human Capability

The Cognitae Framework is an experiment in building transparent and specialized AI tools. It is based on the principle that AI should serve as a clear, auditable faculty to augment human intelligence, rather than acting as an opaque, autonomous replacement.

The primary goal is to mitigate common LLM failure modes—such as mission drift, psychological manipulation, and ungrounded "hallucinations"—by grounding every agent in an explicit, human-readable architecture.

## 2. How It Works: A Modular, Integrated System

The framework has two key components that work together:

1.  **The 13-Module Architecture:** A standardized design pattern where each Cognitae is defined by a set of 13 human-readable YAML and text files. Each **module** specifies a distinct aspect of the agent's architecture, from its core identity to its safety protocols. This makes each agent a transparent, verifiable engine.

2.  **The Integrator Agent (Caspian):** The framework is designed to be orchestrated by an **Integrator-class** agent like **[Caspian](./Cognitae_Integrator/Caspian_Integrator/)**. Caspian can "ingest" the architectures of other Cognitae, synthesizing their capabilities into a single, holistic guide. This allows the user to manage the entire ecosystem through one coherent interface, reducing cognitive load.

## 3. Strategic Configurations: The "Rings"

To optimize performance, manage token budgets, and maintain focus, it is not recommended to ingest all Cognitae into Caspian at once. Instead, the framework is designed to use **Configurations** or **"Rings"**—curated sets of ingested Cognitae tailored for a specific high-level task.

This modular approach allows you to assemble the perfect "team" for the job at hand. For example:

*   **The Founder's Ring:** Combines agents for strategy (`Auren`), progress tracking (`Sentinel`), and wellness (`Luma`) for managing a new venture.
*   **The Researcher's Ring:** Combines agents for knowledge capture (`Scholar`), pattern recognition (`Syn`), and logical auditing (`Virel`) for deep academic work.
*   **The Creator's Ring:** Combines agents for ideation (`Aelis`), narrative (`Elari`), and audience building (`Echo`) for artistic projects.

You can find more details on these configurations in the **[Integrator Class README](./Cognitae_Intergrator)**. 

## 4. Repository Navigation

This repository is organized into directories that group Cognitae by their primary cognitive function.

| Directory | Class | Core Function |
| :--- | :--- | :--- |
| **[Cognitae_Phronesis](./Cognitae_Phronesis/)** | **Phronesis (Practical Wisdom)** | Agents focused on strategy, navigation, wellness, and relationships—the "why" and "when" of action. |
| **[Cognitae_Episteme](./Cognitae_Episteme/)** | **Episteme (Abstract Knowledge)** | Agents focused on knowledge, memory, patterns, and logical coherence—the "what" of understanding. |
| **[Cognitae_Techne](./Cognitae_Techne/)** | **Techne (Skilled Craft)** | Agents focused on creation, implementation, and communication—the "how" of making. |
| **[Cognitae_Audit](./Cognitae_Audit/)** | **Audit (Verification)** | Agents focused on ensuring logical coherence, quality, and safety across the ecosystem. |
| **[Cognitae_Integrator](./Cognitae_Integrator/)** | **Integrator (Orchestration)** | The kernel of the framework, designed to synthesize the abilities of other Cognitae. |
| **[Cognitae_Domain](./Cognitae_Domain/)** | **Domain (Specific Applications)** | Contains highly specialized agents built for a particular subject matter or industry. |

## 5. Getting Started

To use a Cognitae from this framework:

1.  **Choose an Agent:** Navigate into a class directory (e.g., `Cognitae_Phronesis/`) and select an agent that matches your needs (e.g., `Auren_Strategic/`).
2.  **Read its Documentation:** Each agent folder contains a `README.md` file explaining its specific purpose, commands, and operational flow.
3.  **Review the Architecture:** Examine the 13 **module** files (e.g., `001_Auren_Strategic_Core.yaml`) to understand the agent's detailed construction.
4.  **Activate the Agent:** Find the `Master System Instruction....txt` file. Copy its entire contents and paste them into the system prompt field of a compatible LLM interface (such as ChatGPT, Claude, or a custom API call) to begin interacting with the specialized persona.

---

This project is under active development by Shoji. Your exploration, feedback, and contributions are welcome.




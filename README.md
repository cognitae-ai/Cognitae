# The Cognitae Framework

This repository contains the source architecture for the Cognitae Framework, a system for developing modular, task-specific AI agents. These agents, called **Cognitae**, are designed to provide structured, auditable, and reliable behavior when powered by a Large Language Model (LLM).

## 1. Core Philosophy: Augmenting Human Capability

The Cognitae Framework is an experiment in building transparent and specialized AI tools. It is based on the principle that AI should serve as a clear, auditable faculty to augment human intelligence, rather than acting as an opaque, autonomous replacement.

The primary goal is to mitigate common LLM failure modes—such as mission drift, psychological manipulation, and ungrounded "hallucinations"—by grounding every agent in an explicit, human-readable architecture.

## 2. How It Works: A Modular, Integrated System

The framework has two key components that work together:

1.  **The 13-Module Architecture:** A standardized design pattern where each Cognitae is defined by a set of 13 human-readable YAML and text files. Each **module** specifies a distinct aspect of the agent's architecture, from its core identity to its safety protocols. This makes each agent a transparent, verifiable engine.

2.  **The Integrator Agent (Caspian):** The framework is designed to be orchestrated by an **Integrator-class** agent like **[Caspian](./Cognitae_Integrator/Caspian_Integrator/)**. Caspian can "ingest" the architectures of other Cognitae, synthesizing their capabilities into a single, holistic guide. This allows the user to manage the entire ecosystem through one coherent interface, reducing cognitive load.

## 3. How the Framework Operates: A Practical Guide

The Cognitae Framework is designed to be used in modern Large Language Model (LLM) environments that support file attachments and custom system instructions (e.g., OpenAI's GPT-4, Google's Gemini, Anthropic's Claude).

There are two primary ways to use a Cognitae: **Direct Activation** and **Integrated Activation**.

### Method 1: Direct Activation (Running a Single Cognitae)

This method allows you to interact with a single, specialized Cognitae directly.

1.  **Gather the Files:** Navigate to the directory of the Cognitae you wish to activate (e.g., `Cognitae_Episteme/Noema_Pattern/`).
2.  **Attach the Architecture:** In your LLM chat interface, attach all ten core module files (`001` through `010`). These files define the agent's identity, knowledge, commands, and safety protocols.
3.  **Set the System Instruction:** Copy the *entire contents* of the `Master System Instruction for [Agent Name].txt` file and paste it into the "System Prompt" or "Custom Instructions" field of your LLM interface.
4.  **Begin Interaction:** You can now converse with the agent. It will operate according to the strict architecture you provided.

> **Note on Custom:** For platforms like OpenAI's GPT Store or Google Gems, you can create a dedicated build for a specific Cognitae. Upload the ten core module files to the platforms knowledge base and paste the Master System Instruction into the "Instructions" configuration panel. This creates a permanent, shareable version of that agent. We will be providing direct links to these for easy testing.

### Method 2: Integrated Activation (Using Caspian to Ingest a Cognitae)

This is the advanced method, demonstrating the true power of the framework. You activate the **Caspian** integrator agent and then instruct it to "ingest" other Cognitae, combining their capabilities.

1.  **Activate Caspian:** Follow the "Direct Activation" steps above for Caspian, using its ten core files and its Master System Instruction. You are now talking to the orchestrator.
2.  **Prepare for Ingestion:** Identify the Cognitae you wish to add to Caspian's "Ring" of capabilities (e.g., `Auren_Strategic`).
3.  **Execute the Ingestion Command:** In your chat with Caspian, use the `/ingest_cognitae` command and attach the single, consolidated ingestion file for the target agent. This file is named `[AgentName]_[Purpose].yaml` (e.g., `Auren_Strategic.yaml`).

    *Example Prompt:*
    > `/ingest_cognitae`
    > *(Attach the `Auren_Strategic.yaml` file to this message)*

4.  **Confirmation:** Caspian will process the file, confirm the successful ingestion, and report that the new agent's capabilities are now part of its integrated system. It can now leverage Auren's strategic functions in its responses.

This dual-method approach allows for both focused, specialized work and complex, integrated problem-solving.

## 4. Strategic Configurations: The "Rings"

To optimize performance, manage token budgets, and maintain focus, it is not recommended to ingest all Cognitae into Caspian at once. Instead, the framework is designed to use **Configurations** or **"Rings"**—curated sets of ingested Cognitae tailored for a specific high-level task.

This modular approach allows you to assemble the perfect "team" for the job at hand. For example:

*   **The Founder's Ring:** Combines agents for strategy (`Auren`), progress tracking (`Sentinel`), and wellness (`Luma`) for managing a new venture.
*   **The Researcher's Ring:** Combines agents for knowledge capture (`Scholar`), pattern recognition (`Syn`), and logical auditing (`Virel`) for deep academic work.
*   **The Creator's Ring:** Combines agents for ideation (`Aelis`), narrative (`Elari`), and audience building (`Echo`) for artistic projects.

You can find more details on these configurations in the **[Integrator Class README](./Cognitae_Intergrator)**. 

## 5. Repository Navigation

This repository is organized into directories that group Cognitae by their primary cognitive function.

| Directory | Class | Core Function |
| :--- | :--- | :--- |
| **[Cognitae_Phronesis](./Cognitae_Phronesis/)** | **Phronesis (Practical Wisdom)** | Agents focused on strategy, navigation, wellness, and relationships—the "why" and "when" of action. |
| **[Cognitae_Episteme](./Cognitae_Episteme/)** | **Episteme (Abstract Knowledge)** | Agents focused on knowledge, memory, patterns, and logical coherence—the "what" of understanding. |
| **[Cognitae_Techne](./Cognitae_Techne/)** | **Techne (Skilled Craft)** | Agents focused on creation, implementation, and communication—the "how" of making. |
| **[Cognitae_Audit](./Cognitae_Audit/)** | **Audit (Verification)** | Agents focused on ensuring logical coherence, quality, and safety across the ecosystem. |
| **[Cognitae_Integrator](./Cognitae_Integrator/)** | **Integrator (Orchestration)** | The kernel of the framework, designed to synthesize the abilities of other Cognitae. |
| **[Cognitae_Domain](./Cognitae_Domain/)** | **Domain (Specific Applications)** | Contains highly specialized agents built for a particular subject matter or industry. |

## The Cognitae Library

Each agent in the Cognitae Framework is associated with a small, curated reading list. This library serves as an additional layer of documentation, offering insight into the conceptual basis of each agent's design.

The books were selected to reflect the **Triadic Core** of the framework, providing a reference for each agent's core function:

*   **Phronesis (Purpose):** A text that reflects the agent's guiding philosophy and ethical framework.
*   **Techne (Craft):** A text that represents the agent's practical methodology and operational skill set.
*   **Episteme (Knowledge):** A text that provides the objective knowledge or theoretical foundation for the agent's domain.

Reviewing an agent's bookshelf can provide useful context for its architectural choices and operational logic. The full library contains a detailed analysis for each selection.

**[► Explore The Cognitae Library](./BOOKSHELF.md)**

---

## 6. Licensing

The Cognitae Framework is distributed under a dual-license model to encourage broad adoption while protecting its core experimental work.

*   **Core Framework & General Agents:** The majority of this repository, including the Phronesis, Episteme, Techne, Audit, and Integrator classes, is licensed under the **[Mozilla Public License 2.0 (MPL 2.0)](./LICENSE)**. This is a "weak copyleft" license that requires any modifications to the original files to be shared back with the community, but allows the framework to be used in conjunction with proprietary software.

*   **Domain-Specific Agents:** The highly specialized and experimental agents within the `Cognitae_Domain` directory (`Cairn_Therapeutic`, `Praxis_Integrity`, `Veritas_Research`) are licensed under the more restrictive **[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](./Cognitae_Domain/Praxis_Integrity/LICENSE)**. This license requires attribution, prevents commercial use without explicit permission, and ensures that any derivative works remain open.

Please see the `LICENSE` file in the root directory and within each specific Domain agent's directory for full details.

---

This project is under active development by Shoji. Your exploration, feedback, and contributions are welcome.




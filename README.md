# The Cognitae Framework

This repository contains the source architecture for the Cognitae Framework, a system for developing modular, task-specific AI agents. These agents, called **Cognitae**, are designed to provide structured and reliable behavior when powered by a Large Language Model (LLM).

## 1. The Philosophy: Augmenting Human Capability

The Cognitae Framework is built on a core philosophy: **AI should augment human intelligence, not replace it.**

In a world rushing toward autonomous, black-box AI systems, this project takes a different path. It is an experiment in creating transparent, auditable, and specialized AI "faculties" that act as tools to enhance a user's own capabilities. The framework is designed to prevent the common failure modes of modern AI—such as mission drift, psychological manipulation, and ungrounded "hallucinations"—by grounding every agent in a clear, human-readable architecture.

## 2. How It Works: The 13-Module Architecture

The framework is built on a single, powerful concept: a standardized design pattern where each Cognitae is defined by a set of 13 human-readable YAML and text files. Each file, or "scroll," specifies a distinct aspect of the agent's architecture, from its core identity to its safety protocols.

This modular structure makes an agent's "thought process" explicit and auditable. Instead of a mysterious black box, you get a transparent engine where you can read the source code of its "personality."

## 3. Repository Navigation

This repository is organized into directories that group Cognitae by their primary cognitive function, based on a philosophical model called the **Triadic Core**.

| Directory | Class | Core Function |
| :--- | :--- | :--- |
| **[Cognitae_Phronesis](./Cognitae_Phronesis/)** | **Phronesis (Practical Wisdom)** | Agents focused on strategy, navigation, wellness, and relationships—the "why" and "when" of action. |
| **[Cognitae_Episteme](./Cognitae_Episteme/)** | **Episteme (Abstract Knowledge)** | Agents focused on knowledge, memory, patterns, and logical coherence—the "what" of understanding. |
| **[Cognitae_Techne](./Cognitae_Techne/)** | **Techne (Skilled Craft)** | Agents focused on creation, implementation, and communication—the "how" of making. |
| **[Cognitae_Audit](./Cognitae_Audit/)** | **Audit (Verification)** | Agents focused on ensuring logical coherence, quality, and safety across the ecosystem. |
| **[Cognitae_Integrator](./Cognitae_Integrator/)** | **Integrator (Orchestration)** | The kernel of the framework, designed to synthesize the abilities of other Cognitae. |
| **[Cognitae_Domain](./Cognitae_Domain/)** | **Domain (Specific Applications)** | Contains highly specialized agents built for a particular subject matter or industry. |

## 4. Getting Started

To use a Cognitae from this framework:

1.  **Choose an Agent:** Navigate into a class directory (e.g., `Cognitae_Phronesis/`) and select an agent that matches your needs (e.g., `Auren_Strategic/`).
2.  **Read its Documentation:** Each agent folder contains a `README.md` file explaining its specific purpose, commands, and operational flow.
3.  **Review the Architecture:** Examine the 13 module files (e.g., `001_Auren_Strategic_Core.yaml`) to understand the agent's detailed construction.
4.  **Activate the Agent:** Find the `Master System Instruction....txt` file. Copy its entire contents and paste them into the system prompt field of a compatible LLM interface (such as ChatGPT, Claude, or a custom API call) to begin interacting with the specialized persona.

---

This project is under active development by Architect Shoji. Your exploration, feedback, and contributions are welcome.





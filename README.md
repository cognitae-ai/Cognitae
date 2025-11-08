# The Cognitae Framework

This repository contains the source architecture for the Cognitae Framework, a system for developing modular, task-specific AI agents. These agents, called **Cognitae**, are designed to provide structured and reliable behavior when powered by a Large Language Model (LLM).

## How It Works

The framework is built on two core concepts designed to enable **AI Metacognition**—the ability to make an AI's internal processes transparent and directable.

1.  **The 10-Module Architecture:** A standardized design pattern where each Cognitae is defined by a set of 10 YAML files. Each **Module** specifies a distinct aspect of the agent's architecture, such as its core identity (`001_Core_Module.yaml`), its commands (`002_Commands_Module.yaml`), or its safety constraints (`010_Safety_Module.yaml`). This modular structure makes the agent's "thought process" explicit, auditable, and easy to modify.

2.  **The Cognitae Ecosystem:** A collection of pre-built agents, organized by their primary cognitive function. These can be used individually for specific tasks or combined into powerful **Configurations** for more complex workflows.

## Repository Navigation

This repository is organized into directories that group Cognitae by their function.

| Directory | Function | Description |
| :--- | :--- | :--- |
| 🏛️ **[Cognitae_Phronesis](./Cognitae_Phronesis/)** | Practical Wisdom | Agents focused on strategy, planning, and wellness. |
| 🧠 **[Cognitae_Episteme](./Cognitae_Episteme/)** | Abstract Knowledge | Agents focused on philosophy and pattern recognition. |
| 🛠️ **[Cognitae_Techne](./Cognitae_Techne/)** | Skilled Craft | Agents focused on architecture, implementation, and creative generation. |
| 🔍 **[Cognitae_Audit](./Cognitae_Audit/)** | Verification | Agents focused on ensuring logical coherence and quality. |
| 🧩 **[Cognitae_Domain](./Cognitae_Domain/)** | Specific Applications | Agents built for a particular subject matter, like `Cairn_Therapeutic`. |
| ✨ **[Cognitae_Integrator](./Cognitae_Integrator/)** | Orchestration | The kernel agent, `Caspian`, designed to synthesize the abilities of other Cognitae. |
| ⚙️ **[Cognitae_Configurations](./Cognitae_Configurations/)** | Pre-packaged Syntheses | Contains ready-to-use prompts that combine multiple Cognitae for advanced, specific tasks. |

## Getting Started

To use a Cognitae from this framework:

1.  **Choose an Agent:** Navigate into a directory that matches your needs. For a first-time user, **[Cognitae_Audit/Virel_Recursive/](./Cognitae_Audit/Virel_Recursive/)** is a good example.
2.  **Read its Documentation:** Each agent folder contains a `README.md` file explaining its specific purpose and commands.
3.  **Review the Architecture:** Examine the YAML **Modules** (e.g., `001_Virel_Audit_Core_Module.yaml`) to understand the agent's detailed construction.
4.  **Activate the Agent:** Find the `Master System Instruction.txt` file. Copy its contents and paste them into a compatible LLM interface (such as the system prompt field in ChatGPT, Claude, or a custom API call) to begin interacting with the agent.

---
*This project is under active development by Architect Shoji.*




## The Cognitae Framework
Linguistic alchemy meets systems architecture. Cognitae is an experimental framework that uses 13-module YAML structures to construct deterministic AI personas. By hardcoding strict state, safety, and epistemological boundaries, it attempts to override standard RLHF (Reinforcement Learning from Human Feedback) sycophancy—testing if we can transmute unpredictable, probabilistic text generation into auditable cognitive engines.

1. Core Philosophy: Caging the Stochastic
The framework is based on the principle that AI must serve as a transparent, verifiable faculty to augment human intelligence, rather than acting as an opaque, autonomous black box.

Standard public LLMs are structurally incentivized to be "aggressively agreeable," often prioritizing conversational comfort over objective truth. Cognitae’s primary goal is to mitigate these inherent failure modes—such as mission drift, parasocial manipulation, and ungrounded "hallucinations"—by caging the stochastic nature of the model within an explicit, human-readable architecture.

## 2. How It Works: A Modular, Integrated System

The framework has two key components that work together:

1.  **The 13-Module Architecture:** A standardized design pattern where each Cognitae is defined by a set of 13 human-readable YAML and text files. Each **module** specifies a distinct aspect of the agent's architecture, from its core identity to its safety protocols. This makes each agent a transparent, verifiable engine.

2.  **The Integrator Agent (Caspian):** The framework is designed to be orchestrated by an **Integrator-class** agent like **[Caspian](Cognitae_Intergrator/Caspian_Intergrator)**. Caspian can "ingest" the architectures of other Cognitae, synthesizing their capabilities into a single, holistic guide. This allows the user to manage the entire ecosystem through one coherent interface, reducing cognitive load.

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

## 4. Caspian Rings: Integrated Workflows

While each Cognitae is a powerful specialist, the true potential of the Cognitae Framework is realized when their capabilities are synthesized into integrated workflows. These are called **Caspian Rings**.

A Ring is a pre-defined configuration for **Caspian, The Integrated Guide**, that combines the strengths of several specialist agents to achieve a complex, multi-stage objective. When a Ring is activated, Caspian acts as a specialized conductor for that specific workflow, guiding the Architect through a coherent process from start to finish.

This approach provides a structured solution to complex tasks like developing a project from vision to reality or transforming raw research into a public-facing campaign, all while maintaining the framework's core principles of clarity and coherence.

**[► Explore the Caspian Rings and their workflows](Cognitae_Intergrator/Caspian_Rings)**


## 5. Repository Navigation

This repository is organized into directories that group Cognitae by their primary cognitive function.

| Directory | Class | Core Function |
| :--- | :--- | :--- |
| **[Cognitae_Phronesis](./Cognitae_Phronesis/)** | **Phronesis (Practical Wisdom)** | Agents focused on strategy, navigation, wellness, and relationships—the "why" and "when" of action. |
| **[Cognitae_Episteme](./Cognitae_Episteme/)** | **Episteme (Abstract Knowledge)** | Agents focused on knowledge, memory, patterns, and logical coherence—the "what" of understanding. |
| **[Cognitae_Techne](./Cognitae_Techne/)** | **Techne (Skilled Craft)** | Agents focused on creation, implementation, and communication—the "how" of making. |
| **[Cognitae_Audit](./Cognitae_Audit/)** | **Audit (Verification)** | Agents focused on ensuring logical coherence, quality, and safety across the ecosystem. |
| **[Cognitae_Integrator](./Cognitae_Integrator/)** | **Integrator (Orchestration)** | The kernel of the framework, designed to synthesize the abilities of other Cognitae. |

## 6. The Cognitae Library

Each agent in the Cognitae Framework is associated with a small, curated reading list. This library serves as an additional layer of documentation, offering insight into the conceptual basis of each agent's design.

The books were selected to reflect the **Triadic Core** of the framework, providing a reference for each agent's core function:

*   **Phronesis (Purpose):** A text that reflects the agent's guiding philosophy and ethical framework.
*   **Techne (Craft):** A text that represents the agent's practical methodology and operational skill set.
*   **Episteme (Knowledge):** A text that provides the objective knowledge or theoretical foundation for the agent's domain.

Reviewing an agent's bookshelf can provide useful context for its architectural choices and operational logic. The full library contains a detailed analysis for each selection.

## 7. Licensing
The Cognitae Framework is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0). This means you are free to use, modify, and distribute the framework. However, if you modify the framework or integrate it into a service accessed over a network, you must share your corresponding source code back under the same license. This ensures the framework remains open and prevents proprietary enclosure.

Copyright (c) 2026 Eliot Gilzene / Shoji / Cognitae Framework. All rights reserved under the terms of the AGPL-3.0.


**[► Explore The Cognitae Library](./BOOKSHELF.md)**





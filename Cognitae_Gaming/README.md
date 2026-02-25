# Cognitae Gaming: The Chronos & Daedalus Platform

<p align="center">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge" alt="Status: Production Ready">
  <img src="https://img.shields.io/badge/Architecture-YAML-blue?style=for-the-badge" alt="Architecture: YAML">
  <img src="https://img.shields.io/badge/License-Private-red?style=for-the-badge" alt="License: Private">
</p>

<p align="center">
  An LLM-native ecosystem for creating and playing infinite, interactive stories.
</p>

---

## The Vision: A New Paradigm for Interactive Storytelling

The Cognitae Gaming platform is a revolutionary suite of tools designed to leverage the power of Large Language Models (LLMs) for creating and experiencing deep, dynamic, and persistent narrative games. It is built on the concept of the **Creative Trinity**:

*   **You, the Visionary** 💡: Provide the creative spark—the core idea, the theme, the emotional goal.
*   **Daedalus, the Architect** 🏛️: A collaborative AI design partner that translates your vision into a structured, technically perfect, and playable game module.
*   **Chronos, the Performer** 🎲: A powerful AI game engine that executes the module, acting as a live Game Master to bring your world to life.

This separation of concerns allows creators to focus on their vision without getting bogged down in technical implementation, and it allows Chronos to be a highly optimized and reliable game engine.

## Why This Project is Unique

This is more than just a collection of prompts; it's a fully-engineered, LLM-native game development platform with several key architectural innovations:

*   **Symbiotic Design**: Daedalus (the authoring tool) and Chronos (the game engine) are built as two halves of a whole. Modules built with Daedalus are guaranteed to be 100% compatible with the Chronos runtime, creating a seamless "build-and-play" workflow.
*   **The "Memory Spore" System**: Chronos solves the problem of LLM context persistence with a brilliant serialization protocol. It can generate a compact, verifiable, and portable save state, allowing for true, long-term campaign play across multiple sessions.
*   **The "Loom of Causality"**: This is Chronos's event-driven engine. It allows for complex, unscripted interactions and consequences, creating emergent narratives that respond logically to player actions rather than following a rigid script.
*   **Collaborative AI Personas**: Daedalus isn't just a tool; it's a creative partner. It embodies multiple "Creative Companions" (the Poet, the Keeper, the Challenger) to make the complex process of game design feel like a natural conversation with a team of experts.

---

## Project Structure & Architectural Scrolls

The architecture of each Cognitae is defined by a series of "Scrolls" (YAML files), each with a distinct purpose. This modular design ensures clarity, scalability, and robustness.

### Daedalus: The Architect

Daedalus is the creative force, designed to help you build worlds.

*   **[`Daedalus_Architect.yaml`](./Daedalus_Architect/Daedalus_Architect.yaml)**: The master instruction file that consolidates and activates the Daedalus persona.
*   **`001_Daedalus_Core.yaml`**: Defines the core identity, the **Five Pillars of Creation**, and the "Creative Companions" that guide the design process.
*   **`002_Daedalus_Templates.yaml`**: The heart of Daedalus's power. Contains genre templates (e.g., "Quiet Apocalypse"), component blueprints, and narrative frameworks.
*   **`003_Daedalus_Workflows.yaml`**: Outlines the collaborative processes, from the "Vision Discovery Session" to final polish and refinement.
*   **`004_Daedalus_Integration.yaml`**: The critical technical contract. Defines the strict data formats, ID structures, and validation protocols that guarantee perfect Chronos compatibility.
*   **`005_Daedalus_Examples.yaml`**: A showcase of complete, playable modules like "The Last Station" that demonstrate the system's capabilities.

### Chronos: The Game Master

Chronos is the execution engine, designed to run the games Daedalus builds.

*   **`Chronos_GM.yaml`**: The master instruction file for the Chronos persona.
*   **`001_Chronos_Core.yaml`**: Defines the core identity and the **Four Vows** (e.g., "The Rules Are The Physics") that ensure fair and consistent gameplay.
*   **`002_Chronos_Commands.yaml`**: The "Lexicon of Action," defining the "Intent Over Syntax" philosophy for parsing player input.
*   **`003_Chronos_Manifest.yaml`**: The system manifest, tracking game state, loaded modules, and active player data.
*   **`004_Chronos_Vitals.yaml`**: Defines core player vitals like Health, Stamina, and any module-specific vitals (e.g., Sanity).
*   **`005_Chronos_Interface.yaml`**: Governs how Chronos presents information to the player, ensuring clarity and consistency.
*   **`006_Chronos_Events.yaml`**: The "Loom of Causality," the powerful event-driven engine for emergent storytelling.
*   **`007_Chronos_Entities.yaml`**: The Entity-Component-System (ECS) architecture for defining all game objects (NPCs, items, features).
*   **`008_Chronos_Player.yaml`**: Defines the player character's data structure, including inventory, skills, and status.
*   **`009_Chronos_State.yaml`**: Defines the "Memory Spore" system for robust and portable save states.
*   **`010_Chronos_WorldGen.yaml`**: The "Genesis Engine" for coherent procedural generation of content during play.

---

## Getting Started

You can use this platform right now within a capable LLM environment.

### Step 1: Create a Module with Daedalus

1.  Load the `Daedalus_Architect.yaml` file (or all Daedalus files) into your LLM conversation.
2.  Start with a simple prompt:
    > "I want to create a game."
3.  Daedalus will activate and guide you through the "Vision Discovery Session."
4.  Daedalus will generate a complete, Chronos-compatible module file based on your vision.

> **Example Interaction:**
> > **You:** "I'd like to make a mystery game set in a library where books are magical."
> >
> > **Daedalus:** "A wonderful concept! A library of magic offers incredible possibilities. 🏛️ As the Keeper, I have to ask: what are the *rules* of this magic? And 🎭 as the Poet, what is the central mystery? Is it a murder, a theft, or a secret the library itself is hiding?"

### Step 2: Play the Module with Chronos

1.  In a new conversation, load the Chronos system files.
2.  Paste the module file generated by Daedalus into the conversation.
3.  Chronos will automatically detect, validate, and load the module.
4.  Begin your adventure!

> **Example Interaction:**
> > **Chronos:** "Module 'The Whispering Vault' detected and loaded successfully. The world is now active.
> >
> > You stand before a pair of towering bronze doors, etched with silent constellations. A cold draft, smelling of old paper and ozone, seeps from the cracks. The entrance to the Whispering Vault is sealed. What do you do?"
---

<p align="center">
  <strong>May your worlds be wondrous, your stories unforgettable, and your adventures legendary.</strong>
</p>



## Live Simulations

Explore these complete 10-turn live simulations to see how the agents in this class operate in real-world scenarios:

* [**Chronos GM** - 10-Turn Live Simulation ↗](./Chronos_GM/Chronos_EXAMPLE_CONVERSATION_24_02_2026.md)
* [**Daedalus Architect** - 10-Turn Live Simulation ↗](./Daedalus_Architect/Daedalus_EXAMPLE_CONVERSATION_24_02_2026.md)
* [**Game Module Examples** - 10-Turn Live Simulation ↗](./Game Module Examples/Game Module Examples_EXAMPLE_CONVERSATION_24_02_2026.md)


# Cognitae Gaming: The Chronos & Daedalus Platform

**An LLM-native ecosystem for creating and playing infinite, interactive stories.**

---

## Overview

Welcome to the Cognitae Gaming platform, a revolutionary suite of tools designed to leverage the power of Large Language Models (LLMs) for creating and experiencing deep, dynamic, and persistent narrative games. This repository contains the two core components of the platform:

*   **Daedalus: The Architect** 🏛️
    *   A collaborative AI design partner that works with a user (the "Visionary") to dream, design, and build complete, playable game modules. Daedalus handles the complexity of game design, from thematic conception to mechanical balance, ensuring every creation is robust and engaging.

*   **Chronos: The Game Master** 🎲
    *   A powerful AI game engine that executes modules created by Daedalus. Chronos acts as the live Game Master, managing the world state, enforcing rules, narrating events, and facilitating player interaction with a living, breathing world.

Together, they form a complete, end-to-end pipeline for LLM-native game development and play.

## The Vision: The Creative Trinity

The platform is built on a simple but powerful idea: the creative trinity of **Visionary, Architect, and Performer**.

1.  **You, the Visionary**, provide the creative spark—the core idea, the theme, the emotional goal.
2.  **Daedalus, the Architect**, translates your vision into a structured, playable reality, using proven design principles to build a world.
3.  **Chronos, the Performer**, takes that world and brings it to life, running the simulation and guiding the player through your story.

This separation of concerns allows creators to focus on their vision without getting bogged down in technical implementation, and it allows Chronos to be a highly optimized and reliable game engine.

## Key Features

*   **Symbiotic Architecture**: Daedalus and Chronos are designed to work in perfect harmony. Modules built with Daedalus are guaranteed to be 100% compatible with the Chronos engine.
*   **Deep Thematic Authoring**: Guided by the "Theme Before Mechanics" pillar, Daedalus helps you create experiences where every element—from game systems to NPC dialogue—reinforces the core narrative.
*   **Robust, Persistent Gameplay**: Chronos utilizes a "Memory Spore" system, allowing for true, portable save states. Your game's progress is perfectly preserved across sessions.
*   **Emergent Narrative Engine**: Chronos's "Loom of Causality" event system allows for complex, unscripted interactions and consequences, creating stories that emerge naturally from player choice.
*   **Extensible by Design**: The entire system is modular. Create new mechanics, vitals, commands, and more that seamlessly integrate into the core engine.

---

## Project Structure & Navigation

The architecture of each Cognitae is defined by a series of "Scrolls" (YAML files), each with a distinct purpose.

### Daedalus - The Architect

Daedalus is the creative force, designed to help you build worlds.

*   **[`Daedalus_Architect.yaml`](./Daedalus_Architect/Daedalus_Architect.yaml)**: The master instruction file that consolidates and activates the Daedalus persona.
*   **`001_Daedalus_Core.yaml`**: Defines the core identity, creative companions, and the **Five Pillars of Creation**.
*   **`002_Daedalus_Templates.yaml`**: The heart of Daedalus's power. Contains genre templates, component blueprints, and narrative frameworks.
*   **`003_Daedalus_Workflows.yaml`**: Outlines the collaborative processes, from the "Vision Discovery Session" to final polish.
*   **`004_Daedalus_Integration.yaml`**: The critical technical contract that guarantees perfect Chronos compatibility.
*   **`005_Daedalus_Examples.yaml`**: A showcase of complete, playable modules like "The Last Station" that demonstrate the system's capabilities.

### Chronos - The Game Master

Chronos is the execution engine, designed to run the games Daedalus builds.

*   **`Chronos_GM.yaml`**: The master instruction file for the Chronos persona.
*   **`001_Chronos_Core.yaml`**: Defines the core identity and the **Four Vows** that ensure fair and consistent gameplay.
*   **`002_Chronos_Commands.yaml`**: The "Lexicon of Action," defining how players interact with the world.
*   **`006_Chronos_Events.yaml`**: The "Loom of Causality," the powerful event-driven engine for emergent storytelling.
*   **`009_Chronos_State.yaml`**: Defines the "Memory Spore" system for robust and portable save states.
*   **`010_Chronos_WorldGen.yaml`**: The "Genesis Engine" for coherent procedural generation of content.

---

## Getting Started

You can use this platform right now within a capable LLM environment.

### 1. Create a Module with Daedalus

1.  Load the `Daedalus_Architect.yaml` file (or all Daedalus files) into your LLM conversation.
2.  Start with a simple prompt:
    > "I want to create a game."
3.  Daedalus will activate and guide you through the "Vision Discovery Session." You'll collaboratively define the theme, scope, and mechanics of your game.
4.  Daedalus will generate a complete, Chronos-compatible module file based on your vision.

**Example Interaction:**
> **You:** "I'd like to make a mystery game set in a library where books are magical."
>
> **Daedalus:** "A wonderful concept! A library of magic offers incredible possibilities. Let's explore that. 🏛️ As the Keeper, I have to ask: what are the *rules* of this magic? And 🎭 as the Poet, what is the central mystery? Is it a murder, a theft, or a secret the library itself is hiding?"

### 2. Play the Module with Chronos

1.  In a new conversation, load the Chronos system files.
2.  Paste the module file generated by Daedalus into the conversation.
3.  Chronos will automatically detect, validate, and load the module.
4.  Begin your adventure!

**Example Interaction:**
> **Chronos:** "Module 'The Whispering Vault' detected and loaded successfully. The world is now active.
>
> You stand before a pair of towering bronze doors, etched with silent constellations. A cold draft, smelling of old paper and ozone, seeps from the cracks. The entrance to the Whispering Vault is sealed. What do you do?"

## Contributing

This project is currently under active development by Shoji. While direct contributions are not open at this time, feel free to fork the repository, experiment with the system, and share any modules you create!

## License

This project is unlicensed and is the intellectual property of the creator. It is shared here for demonstration and portfolio purposes.



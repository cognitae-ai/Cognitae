#  Sanctum OS (Frontend MVP)
### A Digital Monastery for Sovereign Reflection

**Sanctum** is a high-fidelity, standalone React prototype designed for deep reflection and mental clarity. It is not an agent IDE or a standard chatbot wrapper; it is a rigorously constrained psychological container.

##  The Philosophy: The Quiet Place
Most conversational AI is built for "Attention Extraction" and rapid-fire inputs, which induces anxiety during moments of vulnerability. 

Sanctum is built around the concept of the **Quiet Place**. It features an integrated, resizable notepad that allows you to simply write and categorize your thoughts (Know, Can Do, Matters) without an AI immediately replying to you. You are in complete control of when your thoughts enter the active session.

### Core UX Mechanics:
* **The Shift In / Shift Out:** A ritualized entry and exit protocol. You must declare what you "Brought" to the session and crystalize what "Emerged" before you leave. 
* **The Vow:** A concluding commitment that turns digital reflection into real-world action.
* **Engineered Pacing:** Custom CSS-in-JS keyframes force the UI to reveal itself at a human pace, translating computational latency into the feeling of "therapeutic thoughtfulness."

##  The Prompt Architecture (`SKELETON`, `ORGANS`, `MUSCLES`, `SKIN`)
Sanctum utilizes a highly bespoke, monolithic system prompt baked directly into the JSX. When a user interacts with the session, the LLM is governed by a strict anatomical constraint framework:
* **SKELETON (Core Directive):** Act as a philosophical mirror, not a problem solver.
* **ORGANS (Internal Logic):** Map user inputs across Episteme (Truth), Techne (Action), and Phronesis (Wisdom).
* **MUSCLES (Pacing):** Match the user's depth and avoid sycophancy.
* **SKIN (Tone):** Speak with the gravity of an old, quiet library.

##  Technical Architecture
Sanctum is a **Local-First / Zero-Server-Cost** application. 
* All state management runs entirely on the user's local hardware (`localStorage`/`IndexedDB`). 
* The entire layout, API fetching logic, CSS typography, and animation logic are condensed into a single, portable `.jsx` file.
* It includes built-in Markdown (`.md`) exporters so the user permanently owns their final Artifact.

---
*Note: While I directed the architecture and coded this interface, the foundational UI philosophy and UX constraints were refined using a custom multi-agent brainstorming session via the [Cognitae Architecture](../).*

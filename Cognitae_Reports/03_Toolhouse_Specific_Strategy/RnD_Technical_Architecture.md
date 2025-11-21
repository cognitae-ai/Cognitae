# R&D Technical Architecture: The "Caspian Bus" Protocol
## Orchestrating High-Fidelity Agent Runs

**To:** The Architect & Toolhouse Engineering
**Date:** November 21, 2025
**Subject:** Technical Spec for Socratic Orchestration & Intervention

---

## 1. The Core Concept: "Caspian as the Bus"

Current "Agent Runs" are often linear chains. We propose a **Hub-and-Spoke** model where "Caspian" acts as the Central Message Bus (The Conductor).

*   **The Architecture:**
    *   **Central Node:** Caspian (The Orchestrator).
    *   **Leaf Nodes:** Domain Agents (Chronos, Kairos, etc.).
    *   **The Flow:** Agents do not just "output" to the user; they "report" to Caspian. Caspian evaluates the quality, and either:
        1.  **Passes** it to the user.
        2.  **Rejects** it and asks a "Socratic Question" to refine the output (e.g., "This lacks specificity. Recalculate based on X").

---

## 2. The "Intervention" Protocol (Mid-Run Refinement)

We need to break the "Black Box" nature of long runs. The user must be able to speak to agents *during* the process.

*   **The Mechanism:** "The Pause Button."
*   **Workflow:**
    1.  Agent Run starts (e.g., 50 turns).
    2.  User observes a drift in logic at Turn 15.
    3.  User hits **"Intervene."**
    4.  System pauses. User injects a "Guidance Prompt" (e.g., "Focus less on combat, more on dialogue").
    5.  Caspian injects this into the Context Window as a "System Override."
    6.  Run resumes with corrected trajectory.

---

## 3. RAG & MCP Integration

To support "Knowledge Base Refinement," we leverage the Model Context Protocol (MCP).

*   **Dynamic RAG:** Instead of a static context, agents use MCP to query the "Cognitae Library" only when needed.
*   **The Loop:**
    *   Agent: "I need the definition of 'Sanctum Schema'."
    *   MCP Server: Fetches `Sanctum_Schema.txt`.
    *   Agent: Ingests, processes, and *updates* the library if new insights are generated.

---

## 4. Bespoke Model Strategy

*   **Current State:** We likely use GPT-4o or Claude 3.5 Sonnet via API.
*   **The "Bespoke" Goal:** We aim to fine-tune a **"Cognitae-70B"** (Llama 3 based) model.
    *   *Training Data:* The 10 Scrolls + Logs of successful Caspian interventions.
    *   *Benefit:* A model that "speaks Cognitae" natively, reducing token costs and increasing adherence to the schema.

---
*End of Technical Spec*

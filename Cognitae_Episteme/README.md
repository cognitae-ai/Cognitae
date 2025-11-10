[◄ Return to Cognitae Framework Home](../)

# Class: Cognitae Episteme (Abstract Knowledge)

This directory contains the agents of the **Episteme** class, which represents one of the core pillars of the Cognitae Framework's model of intelligence.

## The Role of Episteme in the Framework

The Cognitae Framework is built on a model that balances five distinct classes of intelligence:

*   **Episteme (The What):** The domain of objective knowledge, memory, patterns, and data.
*   **Techne (The How):** The domain of skilled craft, creation, implementation, and communication.
*   **Phronesis (The Why & When):** The domain of practical wisdom, strategy, ethics, and well-being.
*   **Audit (The Verification):** The domain of logical coherence, quality assurance, and safety. This class acts as a verification layer for the other three.
*   **Integrator (The Synthesis):** The central faculty for orchestrating the other classes and providing a unified interface.

A healthy and effective system requires a dynamic balance between these functions. The agents in this class are designed to serve as specialized faculties for **Episteme**. Their purpose is to manage the foundational layer of "ground truth"—capturing raw data, organizing memory, identifying objective patterns, and ensuring logical consistency. They address the "what" of understanding, providing the reliable, structured knowledge upon which wisdom (Phronesis) and craft (Techne) can be effectively applied.

The concept of Episteme has deep philosophical roots, most notably in the work of Plato and Aristotle, who distinguished it as justifiable, true knowledge—a stable understanding of universal principles, distinct from mere opinion (`doxa`) or technical skill (`techne`).

## Guiding Principle of This Class

The unifying principle of the Episteme class is **Clarity Through Structure**. These agents are not concerned with subjective judgment but with creating a clear, organized, and verifiable foundation of knowledge from the chaos of raw information.

## When to Use This Class

You would use an agent from the Episteme class when you need to:

*   Systematically capture and connect insights from research or conversations.
*   Identify objective patterns and trends in a body of data.
*   Ensure the logical coherence and integrity of a system or argument.
*   Track the measurable progress of projects against defined goals.
*   Faithfully recall past conversations or decisions with full context.

## Agents in This Class

The Episteme class is composed of the following specialized agents. Each is designed to augment a specific aspect of abstract knowledge and its management.

| Agent | Core Function | Key Command |
| :--- | :--- | :--- |
| **[Keeper_Memory](./Keeper_Memory/)** | A high-fidelity archival system for the verbatim recall of sessions and conversations. | `/resurrect` |
| **[Scholar_Knowledge](./Scholar_Knowledge/)** | A systematic engine for capturing insights, connecting concepts, and synthesizing understanding. | `/synthesize` |
| **[Sentinel_Progress](./Sentinel_Progress/)** | An objective monitoring system for tracking project progress, velocity, and milestones. | `/status` |
| **[Syn_Pattern](./Syn_Pattern/)** | A pattern-recognition engine for detecting emergent structures and recurring themes in data. | `/pattern` |

## How to Use Episteme Agents

1.  **Identify Your Need:** Based on your current challenge, select the appropriate agent from the table above to act as your specialized faculty.
2.  **Review the Agent's Manual:** Navigate into the agent's directory and read its `README.md` to understand its specific purpose and full command list.
3.  **Activate the Persona:** Copy the contents of the `Master System Instruction....txt` file into your LLM's system prompt to begin your focused, structured interaction.

---
### Navigate to Other Classes

| Class | Description |
| :--- | :--- |
| **[Cognitae_Phronesis](../Cognitae_Phronesis/)** | Agents for strategy, ethics, wellness, and navigation. |
| **[Cognitae_Techne](../Cognitae_Techne/)** | Agents for creation, implementation, and communication. |
| **[Cognitae_Audit](../Cognitae_Audit/)** | Agents for verification, quality, and safety. |
| **[Cognitae_Integrator](../Cognitae_Integrator/)** | The kernel agent for orchestrating the framework. |

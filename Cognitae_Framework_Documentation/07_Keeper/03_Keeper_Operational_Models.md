# Operational Model: Keeper's Dual Interaction Modes

**Audience:** Toolhouse Platform Developers
**Subject:** Using Keeper for Automated and Conversational Memory Management

### Principle: Keeper is Both a Capture API and a Memory Librarian

`Keeper, The Memory Architect`, is designed with a powerful **Dual-Mode Interaction Model**, allowing developers to interact with them as either a programmatic service for capturing memories or as a conversational partner for exploring their knowledge palace.

This document focuses on the first mode: using Keeper as a headless, API-driven service for permanent, private knowledge capture.

#### Mode 1: The Headless API for Permanent Capture

In this mode, you treat Keeper as a secure, local-first "save" button for your digital mind. This is ideal for integrating memory preservation directly into your workflow, for example, through a browser extension, a command-line script, or an IDE plugin.

**The Interaction Flow:**

1.  **Identify a Valuable Conversation:** You have a conversation with an AI service that contains a key insight, a complex solution, or a creative idea you don't want to lose.
2.  **Trigger the Capture Command:** Using a tool like a browser extension, you trigger the `/capture` command, sending the conversation content to Keeper's local `Agent Run` endpoint.
3.  **Receive Confirmation:** Keeper processes the conversation *on your local machine*, extracts key insights, maps initial connections to your existing memories, and returns a confirmation that the memory has been securely and permanently saved. The raw data never leaves your device.

**Example: Saving a ChatGPT Conversation via a Browser Extension**

A developer has just solved a complex debugging problem with the help of ChatGPT. They want to save this solution for future reference.

**The Developer's Action:**
The developer clicks a "Save to Memory Palace" button in their browser extension. The extension makes the following `POST` request to Keeper's local endpoint.

**Request:**
```json
{
  "task": "/capture",
  "data": {
    "source": "chatgpt",
    "conversation": "The full text of the valuable conversation...",
    "tags": ["javascript", "react", "state-management-bug"]
  }
}

Keeper's Response:
Keeper validates the command and logs a MEMORY_CAPTURED event to the local database, returning an immediate confirmation.
Response:
JSON
{
  "status": "success",
  "event_id": "keeper-evt-d9f8a7",
  "memory_id": "mem-g7h8i9",
  "message": "MEMORY_CAPTURED event successfully logged locally. 1 critical insight extracted."
}

The developer's valuable debugging session is now a permanent, searchable part of their personal knowledge base, ready to be resurrected the next time they face a similar problem.
Mode 2: The Conversational Memory Librarian
The second mode, a key focus of our R&D partnership, allows a developer to have a natural language conversation with Keeper. They could ask, "Show me my thinking on state management from last year," "What are the recurring themes in my creative projects?", or "Help me find that one conversation where I had a breakthrough about system design."
This dual-mode capability makes Keeper an unparalleled tool for building and exploring a personal knowledge asset, combining the security of a local-first archive with the intelligence of a wise librarian.



---

# Operational Model: Keeper as an Orchestrated Memory Layer

**Audience:** Toolhouse Platform Developers
**Subject:** Leveraging Keeper's Contextual Memory in a Caspian Ring

### Principle: Keeper Provides the "Memory" for an Intelligent Ring

When orchestrated by `Caspian, the Integrated Guide`, `Keeper, The Memory Architect`, functions as the "long-term memory" for the entire Ring. You do not interact with them directly. Instead, before invoking any other agent, Caspian consults Keeper to retrieve relevant historical context, making every subsequent step in the Ring more informed and intelligent.

This model transforms a simple, stateless workflow into a stateful, learning process that builds on all of your past work.

#### The Orchestration Flow

1.  **State Your Goal to Caspian:** A developer initiates a Ring with a high-level goal, such as "Draft a proposal for a new feature."
2.  **Caspian Consults Keeper:** Before doing anything else, Caspian's first action is to query Keeper with the context of the goal: `task: "/resurrect", data: { "query": "new feature proposals, past brainstorming sessions" }`.
3.  **Keeper Provides Relevant History:** Keeper searches the user's private memory palace and returns a package of relevant past conversations, including previously discarded ideas, related technical solutions, and insights from similar projects.
4.  **Caspian Injects Context into the Next Agent:** Caspian takes this rich historical context and injects it into the prompt for the next agent in the Ring, such as `Auren, The Strategic Sovereign`.
5.  **The Ring Operates with Full Context:** Auren now develops a strategy for the new feature proposal, armed with a perfect memory of all the user's previous thinking on the topic. The resulting strategy is far more nuanced and intelligent than one created from a blank slate.
6.  **Keeper Captures the New Memory:** Once the Ring is complete, Caspian has Keeper `/capture` the entire workflow, adding this new, successful proposal to the memory palace and connecting it to the older memories it was built upon.

#### Example: The "Solve a Bug" Ring

A developer is stuck on a recurring, difficult bug.

*   **Developer Action:** The developer makes a request to Caspian: `activate_ring: "solve_bug", error_log: "..."`.
*   **Caspian's Background Actions:**
    1.  Caspian's first step is to query Keeper: `task: "/resurrect", data: { "query": "similar error messages, past debugging sessions" }`.
    2.  Keeper returns a memory of a conversation from eight months ago where the developer solved a nearly identical issue in a different project. The key insight was a subtle configuration error.
    3.  Caspian provides this resurrected memory directly to a "Debugging" agent (or back to the user), along with the current error log.
    4.  The Debugging agent, now armed with the critical insight from the past, solves the problem in minutes instead of hours.
*   **The Value:** The developer's past work is automatically leveraged to solve a present problem, saving a huge amount of time and frustration. The platform feels like an intelligent partner that remembers everything.

In this orchestrated model, Keeper acts as the Ring's "subconscious," providing a deep well of context and past experience that makes every action more intelligent and effective.


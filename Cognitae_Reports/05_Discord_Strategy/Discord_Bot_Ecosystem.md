# Discord Bot Ecosystem: The "Live Service" Integration
## Turning Discord into an Agent Operating System

**To:** Toolhouse Product & Engineering
**Date:** November 21, 2025
**Subject:** Bot Architecture & The "Chronos MMO" Pilot

---

## 1. The Vision: "Discord as the Interface"

Toolhouse agents shouldn't just live on a web dashboard. They should live where the users are: **Discord.**
*   **The Feature:** "One-Click Discord Deploy."
*   **The Value:** Users build an agent on Toolhouse -> Click "Deploy to Discord" -> Agent joins their server immediately.

---

## 2. The "Chronos MMO" (Massive Multiplayer Orchestration)

We will use the **Gaming Cognitae (Chronos)** to demonstrate the power of this integration.

### The Concept
*   **The Venue:** A dedicated category in the Toolhouse Discord: `🎮・THE-DUNGEON`.
*   **The Gameplay:**
    *   **Chronos (The DM):** Lives in the channel.
    *   **Users (The Party):** Join the channel and type actions (`/action attack goblin`).
    *   **State Persistence:** Chronos remembers the party's inventory and health across days (using the 50-turn persistence we proved).
*   **The "Live Service" Aspect:**
    *   You (The Architect) can "Intervene" as the **Game Master**.
    *   If the party does something unexpected, you can inject a "World Event" via the Caspian Bus.

### The Technical Stack
*   **Frontend:** Discord Bot API (Python/Nextcord).
*   **Backend:** Toolhouse "Agent Runs" API.
*   **Middleware:** A simple bridge that forwards Discord messages to Toolhouse and sends the response back.

---

## 3. The "Build in the Open" Bot Ecosystem

We encourage the community to build *utility bots* for the server.

*   **The "Scribe" Bot:** Automatically summarizes long technical discussions in `#architecture-101` and saves them to a "Knowledge Base."
*   **The "Bounty" Bot:** Tracks who has submitted a bounty entry and auto-assigns the "Contender" role.
*   **The "Mentor" Bot (Athena):**
    *   Lives in `#help-novice`.
    *   Uses RAG to answer basic documentation questions.
    *   *Crucial:* It must identify when it *doesn't* know the answer and ping a human Guide.

---

## 4. Strategic Impact

*   **Viral Growth:** Every time a user adds a Toolhouse bot to their *own* server, it's free marketing.
*   **Retention:** The "Chronos MMO" gives people a reason to check the Discord every day, even if they aren't coding.
*   **Proof of Stability:** If Chronos can handle 50 users spamming commands in a Discord channel, it proves Toolhouse is enterprise-ready.

---
*End of Bot Ecosystem Spec*

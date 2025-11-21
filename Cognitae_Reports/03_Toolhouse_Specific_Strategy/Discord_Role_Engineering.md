# Discord Role Engineering: The Prestige Economy
## Designing Status, Access, and Engagement Loops

**To:** Toolhouse Community Team
**Date:** November 21, 2025
**Subject:** Advanced Role Strategy & Engagement Mechanics

---

## 1. The Philosophy: Roles as Currency

In a digital community, **Roles are the currency.**
*   If you give them away too easily, inflation occurs (they mean nothing).
*   If they are too hard to get, users disengage.
*   **The Goal:** Create a "Ladder of Prestige" where every step feels like a meaningful achievement.

---

## 2. The Role Taxonomy

We categorize roles into four distinct types to avoid "Role Bloat."

### Type A: Identity Roles (The Hierarchy)
*Visual Identifier: Determines the color of the username.*
1.  **🔮 Oracle (Staff/Devs):** [Gold] - The Source of Truth.
2.  **🏛️ Architect (Expert):** [Purple] - Proven master of the platform.
3.  **🛠️ Builder (Active):** [Blue] - Has deployed an agent.
4.  **🔰 Novice (New):** [Grey] - Just joined.

### Type B: Skill Roles (The Badges)
*Visual Identifier: Icons in the profile, no color change.*
*   **🐍 Pythonist:** Can write custom tools in Python.
*   **🗣️ Prompt Engineer:** Master of natural language.
*   **🕸️ Orchestrator:** Specializes in multi-agent systems.
*   **🎨 Designer:** Focuses on UI/Frontend integration.

### Type C: Achievement Roles (The Medals)
*Earned via specific events or bounties.*
*   **⚔️ Bounty Hunter:** Won a community competition.
*   **🐛 Bug Smasher:** Reported a critical bug that got fixed.
*   **📜 Scribe:** Contributed to the documentation.
*   **🧪 Beta Tester:** Willing to break new features.

---

## 3. The "Ping" Economy (Access Control)

Who can interrupt whom? This is critical for signal-to-noise ratio.

*   **@everyone:** ONLY for major product launches. (Abuse kills servers).
*   **@Architects:** Devs can ping Architects for high-level feedback.
*   **@Builders:** Community Managers can ping for bounties.
*   **The Rule:** **Novices cannot ping Oracles.** They must ask in `#help-novice`. If the question is good, a **Guide** (Community Mod) escalates it.

---

## 4. The Engagement Loops (The Quest System)

How do users move up? We replace "XP Grinding" (spamming messages) with **"Quests."**

### Quest 1: The Builder's Rite
*   **Task:** Deploy your first agent and share the link in `#showcase`.
*   **Reward:** **🛠️ Builder** Role + Access to `#builder-lounge`.
*   **Verification:** Manual approval by a Mod (or automated via webhook if integrated).

### Quest 2: The Architect's Proof
*   **Task:** Build a multi-agent system OR win a Bounty.
*   **Reward:** **🏛️ Architect** Role + Access to `#the-sanctum`.
*   **Prestige:** You are now a "Senior" member. Your name turns Purple.

### Quest 3: The Helper's Path
*   **Task:** Answer 50 questions in `#help-novice` (Tracked via bot).
*   **Reward:** **🤝 Guide** Role.
*   **Perk:** Direct line to Community Managers.

---

## 5. Visual Hierarchy & Aesthetics

*   **Color Theory:** Use a "Rarity" palette (Common -> Rare -> Legendary).
    *   Grey -> Blue -> Purple -> Gold.
*   **Grouping:** Ensure the "Online" list is sorted by Identity Roles, so Architects sit above Builders. This creates a visual aspiration: "I want to be at the top of the list."

---
*End of Role Engineering*

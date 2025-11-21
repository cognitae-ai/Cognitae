# Operational Model: Scholar's Dual Interaction Modes

**Audience:** Toolhouse Platform Developers
**Subject:** Using Scholar for Automated and Conversational Knowledge Management

### Principle: Scholar is Both a Knowledge API and a Research Partner

`Scholar, The Knowledge Weaver`, is designed with a powerful **Dual-Mode Interaction Model**, allowing developers to interact with them as either a programmatic service for managing knowledge or as a conversational partner for deep research and synthesis.

This document focuses on the first mode: using Scholar as a headless, API-driven service to build a living, institutional knowledge base.

#### Mode 1: The Headless API for Knowledge Capture

In this mode, you treat Scholar as the central repository for all organizational learning. This is ideal for integrating knowledge capture into your existing development workflows, such as in a CI/CD pipeline, a project management tool, or directly from a code editor.

**The Interaction Flow:**

1.  **A Learning Occurs:** A developer finishes a complex task and identifies a key learning or a non-obvious solution that could benefit the rest of the team.
2.  **Trigger the Capture Command:** From their IDE or a command-line tool, the developer triggers the `/capture` command, sending the insight and its source to Scholar's `Agent Run` endpoint.
3.  **Receive Confirmation:** Scholar processes the insight, automatically identifies its domain, finds initial connections to existing knowledge in the corporate graph, and returns a confirmation that the learning has been successfully integrated.

**Example: Capturing a Post-Mortem Insight via a CLI Tool**

A team has just completed a post-mortem for a production incident. The key takeaway is that their database connection pooling was misconfigured. A developer wants to capture this lesson permanently.

**The Developer's Action:**
The developer runs a CLI command: `th-agent scholar capture --insight "PostgreSQL connection pool exhaustion under high load is caused by not setting a timeout. Always set 'connect_timeout=10'." --source "Project Phoenix Incident Post-Mortem" --tags "database, postgresql, performance, incident"`

This tool makes the following `POST` request to Scholar's endpoint.

**Request:**
```json
{
  "task": "/capture",
  "data": {
    "insight": "PostgreSQL connection pool exhaustion under high load is caused by not setting a timeout. Always set 'connect_timeout=10'.",
    "source": "Project Phoenix Incident Post-Mortem",
    "tags": ["database", "postgresql", "performance", "incident"]
  }
}

Scholar's Response:
Scholar validates the command, ingests the insight into its knowledge graph, and connects it to other nodes labeled "database" and "performance."
Response:
JSON
{
  "status": "success",
  "knowledge_id": "kn-b3c4d5",
  "message": "Insight captured and integrated. 4 new connections to existing knowledge were created."
}

The critical lesson from the incident is now a permanent, searchable part of the company's institutional memory, preventing another team from making the same mistake six months later.
Mode 2: The Conversational Research Partner
The second mode, a key focus of our R&D partnership, allows a developer to have a natural language conversation with Scholar. They could ask, "What have we learned about deploying services on Kubernetes?" or "Synthesize all our research on multi-tenant architectures and identify the key trade-offs."
This dual-mode capability makes Scholar an unparalleled tool for building a true learning organization, combining automated knowledge capture with powerful, on-demand synthesis.



---

# Operational Model: Scholar as an Orchestrated Research Engine

**Audience:** Toolhouse Platform Developers
**Subject:** Leveraging Scholar's Knowledge Synthesis in a Caspian Ring

### Principle: Scholar Provides the "Evidence" for an Intelligent Ring

When orchestrated by `Caspian, the Integrated Guide`, `Scholar, The Knowledge Weaver`, functions as the "research and analysis department" for the entire Ring. You do not interact with them directly. Instead, before making any strategic decision, Caspian consults Scholar to ground the Ring's actions in a foundation of verified knowledge and historical data.

This model transforms a simple workflow based on assumptions into a rigorous, evidence-based process that leads to higher-quality outcomes.

#### The Orchestration Flow

1.  **State Your Goal to Caspian:** A developer initiates a Ring with a high-level goal, such as "Develop a strategy for improving our user onboarding experience."
2.  **Caspian Consults Scholar:** Before doing anything else, Caspian's first action is to query Scholar with the context of the goal: `task: "/research", data: { "topic": "user onboarding best practices, our past experiments" }`.
3.  **Scholar Synthesizes Knowledge:** Scholar traverses its knowledge graph, gathering all internal data (past A/B test results, user feedback) and external data (industry best practices, competitor analyses). It synthesizes this into a single, comprehensive "Onboarding Strategy Brief."
4.  **Caspian Injects Knowledge into the Next Agent:** Caspian takes this evidence-based brief and injects it into the prompt for the next agent in the Ring, such as `Auren, The Strategic Sovereign`.
5.  **The Ring Operates on a Foundation of Truth:** Auren now develops a strategy for improving onboarding, armed with a perfect memory of all the company's past learnings and a deep understanding of industry best practices. The resulting strategy is data-driven, not based on guesswork.
6.  **Scholar Captures the New Learning:** Once the new onboarding strategy is implemented and results are measured by `Sentinel`, Caspian has Scholar `/learn` from the experience, capturing the outcome and updating the knowledge base. This ensures the organization's understanding of "good onboarding" is now even more refined.

#### Example: The "Write a Grant Proposal" Ring

A user needs to write a grant proposal for a new AI safety project.

*   **User Action:** The user makes a request to Caspian: `activate_ring: "write_grant_proposal", topic: "AI alignment via scalable oversight"`.
*   **Caspian's Background Actions:**
    1.  Caspian's first step is to query Scholar: `task: "/research", data: { "topic": "AI alignment, scalable oversight, relevant funders" }`.
    2.  Scholar returns a package containing a literature review on AI alignment, a summary of past successful grant proposals, and a list of foundations interested in this area.
    3.  Caspian provides this research package to `Maven, The Grant Alchemist` (another specialist agent).
    4.  Maven, now armed with deep domain knowledge and relevant precedents, drafts a highly compelling and well-researched proposal.
*   **The Value:** The user produces a world-class grant proposal in a fraction of the time, grounded in deep research they didn't have to perform manually. The quality of the output is dramatically higher because it's built on a foundation of synthesized knowledge.

In this orchestrated model, Scholar acts as the Ring's "research librarian," ensuring that every action taken is the most intelligent action possible, informed by the sum of all available knowledge.


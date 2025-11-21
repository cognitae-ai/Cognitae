# Operational Model: Harbor as a Headless Service

**Audience:** Developers, Team Leaders, Project Managers
**Subject:** Using the Harbor API for Systematic Relationship Management

This document provides the operational model for using `Harbor, The Relationship Keeper`, as a headless, programmatic service. Harbor is designed to be the central, secure log for all your team's interactions, allowing you to build a powerful, shared "institutional memory" and ensure no commitment or connection is ever lost.

### Core Principle: Logging Events, Querying Context

The fundamental workflow for using Harbor is simple:
1.  **Log Everything:** After any significant interaction (an email, a meeting, a call), you log it as an `InteractionEvent`. This is your write operation.
2.  **Query for Context:** Before any future interaction, you query Harbor for the complete history and context of that relationship. This is your read operation.

This event-sourcing model ensures you have a perfect, auditable history of every relationship.

### Invocation via Agent Runs API

To use Harbor, you make a `POST` request to the Toolhouse `agent-runs` endpoint.

**Endpoint:** `POST /v1/agent-runs`

#### Example 1: Logging a New Connection

This is the first step. After meeting someone new, you use the `/connect` command to create their node in the graph and log the first interaction.

**Request:**
```json
{
  "agent_id": "cognitae-hbr-001",
  "command": "/connect",
  "payload": {
    "person_name": "Dr. Alistair Finch",
    "context": "Met at the 'AI & Society' symposium. He is a professor of ethics at Cambridge and a reviewer for UKRI grants.",
    "notes": "Showed strong interest in the Sanctum Method's approach to AI safety. Skeptical of purely technical solutions.",
    "follow_up": "Send him the 'Heuristics for AI Alignment' white paper by end of week."
  }
}

Result: Harbor creates a new Person node, logs the first InteractionEvent, and creates a Commitment for the follow-up, which will now appear when you query for reminders.
Example 2: Getting Reminders for Follow-ups
To ensure nothing falls through the cracks, you can run a daily or weekly job to query for all pending commitments using the /remind command.
Request:
JSON
{
  "agent_id": "cognitae-hbr-001",
  "command": "/remind",
  "payload": {
    "timeframe": "week"
  }
}
Response (Success):
The result is a prioritized list of actions, each with the necessary context to act on it.
JSON
{
  "status": "success",
  "result": {
    "pending_actions": [
      {
        "priority": "High",
        "due_date": "2025-11-28",
        "action": "Send 'Heuristics for AI Alignment' white paper.",
        "person": "Dr. Alistair Finch",
        "context": "Met at 'AI & Society' symposium. He is a UKRI grant reviewer and is interested in your approach to AI safety."
      }
    ]
  }
}
Example 3: Preparing for a Meeting
Before a follow-up meeting, you use the /context command to get a complete briefing. This is Harbor's most powerful read operation.
Request:
JSON
{
  "agent_id": "cognitae-hbr-001",
  "command": "/context",
  "payload": {
    "query": {
      "person": "Dr. Alistair Finch",
      "depth": "summary"
    }
  }
}

Result: Harbor replays the event log for this relationship and provides a rich summary, including past conversations, open commitments, and known preferences, allowing you to enter the meeting fully prepared and with complete context.
By integrating these simple API calls into your team's daily workflows (e.g., via a Slack bot, a CI job, or a simple web form), you can systematically build a powerful and trustworthy professional network without the manual overhead.



---

# Operational Model: Harbor Orchestrated in a Caspian Ring

**Audience:** Developers, Product Managers
**Subject:** Understanding Harbor's Role as the Human Context Layer in a Multi-Agent Workflow

While `Harbor, The Relationship Keeper`, is a powerful tool for manual relationship logging, its true potential is realized when it is orchestrated by `Caspian, The Integrated Guide`, as the **human context layer** for complex, multi-agent workflows. In a "Caspian Ring," Harbor ensures that every automated or agent-assisted action is infused with the necessary relational intelligence to be effective.

### Core Principle: Augmenting Action with Context

In an orchestrated workflow, Caspian automatically queries Harbor before tasking any other agent that interacts with an external person. Harbor provides the necessary context, and Caspian then passes that context along with the primary task. This ensures that the work is not just done, but done in a way that strengthens the relationship.

### The "Grant Application" Workflow

Consider the complex process of submitting a major grant proposal. This involves research, writing, financial modeling, and communication with program officers.

**User's Goal:** "Caspian, prepare and submit the UKRI grant application for Project Phoenix."

Caspian initiates the "Grant Application Ring," a workflow that relies heavily on Harbor to manage the crucial human element.

#### The Orchestrated Sequence

1.  **Initialization & Contact:** The user has an initial call with the UKRI program officer, Dr. Evans. They log this with Caspian: `/connect "Dr. Evans" context:"UKRI Program Officer for AI Ethics grant. Seemed interested but cautious."`
    *   Caspian routes this command to **Harbor**, who creates a profile for Dr. Evans and logs the initial interaction.

2.  **Strategy & Planning:** Caspian orchestrates the initial planning phase:
    *   It tasks `Auren` to define the core strategic narrative.
    *   It tasks `Maven` to analyze the grant requirements and identify alignment points.
    *   It tasks `Compass` to map the submission timeline and waypoints.

3.  **Context-Aware Communication (The Synergy):** A week later, Maven identifies a key question about eligibility. Caspian needs to ask Dr. Evans for clarification.
    *   **Without Harbor:** Caspian would task `Echo` to draft a generic, formal email.
    *   **With Harbor:** Caspian first queries **Harbor** with `/context "Dr. Evans"`. Harbor returns the summary: "Initial meeting was positive but cautious. He values clear, evidence-based arguments."
    *   Caspian then tasks `Echo` with the instruction: "Draft a formal but respectful email to Dr. Evans asking about eligibility. Use an evidence-based tone and acknowledge his cautious optimism." Harbor's context makes Echo's output far more effective.

4.  **Commitment Tracking & Follow-Through:** Dr. Evans replies, "I can clarify that on a brief call next week. Please send the project summary ahead of time."
    *   Caspian parses the email and logs two events with **Harbor**:
        1.  A `Commitment` to "Send project summary to Dr. Evans."
        2.  A `Follow-Up` to "Schedule call with Dr. Evans."
    *   Harbor now automatically tracks these promises. A day before the internal deadline, it will alert Caspian if the summary hasn't been sent, preventing a critical failure of trust.

5.  **Final Submission:** The proposal is written by `Maven` and `Elari`. Before the final submission email is sent, Caspian performs one last check with **Harbor** to ensure all promises have been kept and the cover letter's tone is appropriate for the relationship that has been built.

### Developer Experience

The development and grant-writing team can focus on their core tasks—research, writing, and financial modeling. They don't need to worry about remembering every nuance of the funder relationship. Caspian, using Harbor as its "human context API," ensures that every interaction with the funder is timely, context-aware, and builds trust. It transforms a high-stress, error-prone process into a systematic, reliable, and more human workflow.


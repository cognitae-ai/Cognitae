# Operational Model: Sentinel's Dual Interaction Modes

**Audience:** Toolhouse Platform Developers
**Subject:** Using Sentinel for Automated and Conversational Progress Tracking

### Principle: Sentinel is Both an Automated Timekeeper and a Project Coach

`Sentinel, The Progress Tracker`, is designed with a powerful **Dual-Mode Interaction Model**, allowing developers to interact with them as either a programmatic event log or a conversational project management partner.

This document focuses on the first mode: using Sentinel as a headless, API-driven service for automated project tracking.

#### Mode 1: The Headless API for Automated Tracking

In this mode, you treat Sentinel as a reliable, event-driven database for your project's state. This is ideal for integrating progress tracking directly into your development workflows, such as CI/CD pipelines, Git hooks, or custom scripts.

**The Interaction Flow:**

1.  **Log an Event:** Send a `POST` request to Sentinel's endpoint with a command like `/track` or `/update`. This is a "fire-and-forget" action that logs an immutable event.
2.  **Receive Confirmation:** Sentinel immediately returns a lightweight confirmation that your event has been logged successfully.
3.  **Query for State:** To see the result of your event (e.g., the project's new status), you make a separate `GET` request to a read-optimized endpoint. This CQRS pattern ensures that writing events is always fast.

**Example: Kicking Off a New Project from the Command Line**

A developer wants to start tracking a new project directly from their terminal.

**The Developer's Action:**
The developer runs a script that makes the following `POST` request to Sentinel's endpoint.

**Request:**
```json
{
  "task": "/track",
  "data": {
    "project": "New-Mobile-App-UI",
    "milestones": ["Design Mockups", "Build Component Library", "Integrate with API"],
    "deadline": "2026-01-31"
  }
}

Sentinel's Response:
Sentinel validates the command and logs a PROJECT_CREATED event, returning an immediate confirmation.
Response:
JSON
{
  "status": "success",
  "event_id": "sentinel-evt-c5g2a9",
  "message": "PROJECT_CREATED event successfully logged for New-Mobile-App-UI."
}

The project is now being tracked. Later, the developer can query the project's status or receive automated alerts from Sentinel about upcoming milestones.
Mode 2: The Conversational Project Manager
The second mode, a key focus of our R&D partnership, allows a developer to have a natural language conversation with Sentinel. They could ask, "What are the biggest risks to the mobile app project?", "What's the most important thing for me to work on today?", or "Help me break down the 'Integrate with API' milestone."
This dual-mode capability makes Sentinel a uniquely powerful tool for keeping projects on track, combining the reliability of an automated system with the nuanced guidance of an experienced project manager.



---

# Operational Model: Sentinel as an Orchestrated Accountability Layer

**Audience:** Toolhouse Platform Developers
**Subject:** Leveraging Sentinel's Automated Tracking in a Caspian Ring

### Principle: Sentinel Turns Strategy into a Trackable Plan

When orchestrated by `Caspian, the Integrated Guide`, `Sentinel, The Progress Tracker`, functions as the "accountability engine" for the entire workflow. You do not interact with them directly. Instead, after a strategy is set, Caspian uses Sentinel to deconstruct that strategy into a concrete, time-bound project plan and then monitors its execution.

This model provides a seamless bridge between high-level strategic intent and the granular, day-to-day reality of project execution.

#### The Orchestration Flow

1.  **State Your Goal to Caspian:** A developer initiates a Ring with a high-level strategic objective.
2.  **Caspian Develops a Strategy:** Caspian invokes agents like `Syn` and `Auren` to analyze the goal and produce a high-level strategic plan.
3.  **Caspian Engages Sentinel to Create the Plan:** This is the critical step. Caspian takes Auren's abstract strategy (e.g., "Develop and launch a new API") and passes it to Sentinel with a `/track` command. Sentinel then automatically generates a detailed project plan, complete with milestones, dependencies, and timelines.
4.  **Sentinel Becomes the Source of Truth:** For the remainder of the Ring's execution, Sentinel acts as the central source of truth. As other agents complete their work (e.g., a coding agent finishes a function), they report their progress to Caspian, who logs it with Sentinel using an `/update` command.
5.  **Sentinel Provides Proactive Alerts:** Sentinel continuously monitors the project's state. If a milestone is at risk of being missed, they send an alert to Caspian, who can then take corrective action, such as re-allocating resources or notifying the user.

#### Example: The "New Feature Launch" Ring

A product manager wants to launch a new feature.

*   **Developer Action:** The manager makes a single request to Caspian: `activate_ring: "new_feature_launch", feature_brief: "URL to document"`.
*   **Caspian's Background Actions:**
    1.  Caspian has Auren create a launch strategy.
    2.  Caspian then passes this strategy to Sentinel: `task: "/track", data: { "project": "New Feature Launch", "strategy_doc": "URL to Auren's plan" }`.
    3.  Sentinel parses the strategy and creates a detailed plan:
        *   Milestone 1: Finalize Technical Spec (Due: Nov 28)
        *   Milestone 2: Complete Backend Dev (Due: Dec 12)
        *   Milestone 3: Complete Frontend Dev (Due: Dec 19)
        *   Dependency: Milestone 3 depends on Milestone 2.
    4.  As the development work proceeds, progress is logged with Sentinel.
    5.  On December 10th, Sentinel's `/forecast` shows that "Backend Dev" is projected to be 3 days late. They automatically send an `AT_RISK` alert to Caspian.
    6.  Caspian notifies the product manager of the potential delay and suggests options, such as simplifying a feature or adding a developer.
*   **The Value:** The project manager is alerted to a potential delay weeks in advance, not the day before the deadline. The entire process is transparent and accountable, with a data-driven forecast replacing hopeful guesses.

In this orchestrated model, Sentinel provides the essential structure and temporal awareness that ensures a great strategy actually gets executed on time and on budget.


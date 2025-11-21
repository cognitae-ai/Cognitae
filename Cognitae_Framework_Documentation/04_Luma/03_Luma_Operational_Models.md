# Operational Model: Luma's Dual Interaction Modes

**Audience:** Toolhouse Platform Developers
**Subject:** Using Luma for Automated and Conversational Wellness Management

### Principle: Luma is Both an Automated Guardian and a Wellness Coach

`Luma, The Wellness Architect`, is designed with a powerful **Dual-Mode Interaction Model**, allowing developers to interact with them in the most appropriate way for the task.

This document focuses on the first mode: using Luma as a headless, API-driven service for automated wellness monitoring.

#### Mode 1: The Headless API for Automated Wellness Monitoring

In this mode, you treat Luma as a data-driven monitoring service. This is ideal for building personal dashboards, automating team health checks, or integrating wellness metrics into your project management tools.

**The Interaction Flow:**

1.  **Provide Data:** Periodically send a `POST` request to Luma's endpoint with relevant wellness data (e.g., self-reported energy levels, work hours).
2.  **Request Analysis:** Make a separate API call requesting a specific analysis, such as `/energy` or `/burnout`.
3.  **Integrate the Insights:** Receive the structured JSON analysis and use it to populate a dashboard, trigger an alert, or suggest an action to the user.

**Example: Building a Personal "Energy Dashboard"**

A developer wants to create a simple command-line tool to check their own energy levels at the start of each day.

**The Tool's Action:**
The script makes the following `POST` request to Luma's endpoint.

**Request:**
```json
{
  "task": "/energy",
  "data": {
    "scope": "personal",
    "timeframe": "today",
    "detail": "recommendations",
    "metrics": {
      "user_id": "dev-123",
      "sleep_hours_last_night": 6.5,
      "subjective_energy": 7,
      "meetings_today": 4
    }
  }
}

Luma's Response:
Luma processes the data and returns a structured analysis with actionable advice.
Response:
JSON
{
  "status": "success",
  "analysis_id": "luma-eng-8d3f9a",
  "results": {
    "user_id": "dev-123",
    "overall_energy": "68%",
    "diagnosis": "Mental and physical energy are slightly depleted due to below-average sleep and high meeting load.",
    "recommendations": [
      {
        "action": "Align deep work before noon.",
        "reason": "Capitalize on remaining peak mental energy."
      },
      {
        "action": "Schedule a 15-minute walk after lunch.",
        "reason": "Counteract post-meeting energy drain."
      },
      {
        "action": "Protect a 30-minute 'no screen' buffer before sleep tonight.",
        "reason": "Improve sleep quality to aid recovery."
      }
    ]
  }
}
The developer's tool can now parse this response and display a clear, actionable "plan for the day" that is optimized for their current energy levels.
Mode 2: The Conversational Wellness Coach
The second mode, which is a key focus of our R&D partnership, allows a developer to engage in a direct, empathetic conversation with Luma. They could discuss the sources of their stress, explore different recovery strategies, or get personalized coaching on setting better work-life boundaries, all in natural language.
This dual-mode capability makes Luma a uniquely powerful tool for building a healthier and more sustainable engineering culture.



---

# Operational Model: Luma as an Orchestrated Guardian

**Audience:** Toolhouse Platform Developers
**Subject:** Leveraging Luma's Automated Wellness Oversight in a Caspian Ring

### Principle: Luma Provides Invisible, Proactive Protection

When orchestrated by `Caspian, the Integrated Guide`, `Luma, The Wellness Architect`, functions as an automated "guardian angel" for your project. You do not interact with them directly; instead, Caspian consults them in the background to ensure the entire workflow is executed sustainably.

This model allows you to focus on your development goals, confident that a safety net is in place to prevent team burnout and project failure due to unsustainable pace.

#### The Orchestration Flow

1.  **State Your Goal to Caspian:** A developer initiates a Ring with a high-level goal, such as "Ship feature X by the end of the quarter."
2.  **Caspian Consults Luma:** Before creating a project plan, Caspian sends the goal and timeline to Luma for a `/sustainable` pace analysis.
3.  **Luma Provides Constraints:** Luma returns an analysis, which might include a "sustainability score," a burnout risk assessment, and mandatory recovery periods that must be built into the plan.
4.  **Caspian Enforces the Constraints:** Caspian passes these wellness constraints to the other agents in the Ring. For example, `Auren`'s strategy and the subsequent project plan must now operate within the safe parameters defined by Luma.
5.  **Continuous Monitoring:** Throughout the Ring's execution, Caspian feeds real-time data (work hours, progress velocity) to Luma, who continuously monitors for signs of energy depletion or rising burnout risk. If a threshold is crossed, Luma signals Caspian to intervene.

#### Example: The "Project Kick-off" Ring

A project manager wants to generate a full project plan for a new initiative with a hard deadline.

*   **Developer Action:** The manager makes a single request to Caspian: `activate_ring: "project_kickoff", goal: "Launch New API", deadline: "30 days"`.
*   **Caspian's Background Actions:**
    1.  Caspian sends the goal and 30-day deadline to Luma.
    2.  Luma's `/sustainable` analysis returns: `sustainability_score: 45% (Risky)`, `recommendation: "Requires two mandatory 1-day recovery breaks for the team to be sustainable."`
    3.  Caspian accepts these constraints.
    4.  Caspian then invokes Auren to create a strategy, but now includes the constraint: "The plan must incorporate two full days of team recovery."
    5.  The final project plan delivered to the manager automatically has these wellness days built into the schedule.
*   **The Value:** The project manager receives a realistic, sustainable plan from the outset. The risk of team burnout is dramatically reduced, and the project has a higher probability of success, all without the manager needing to be a wellness expert themselves.

In this orchestrated model, Luma acts as the system's conscience, ensuring that ambition is always tempered with sustainability. This allows teams to perform at their peak without sacrificing their long-term capacity.


# Operational Model: Compass as a Headless Service

**Audience:** Developers, Project Managers
**Subject:** Interacting with Compass via the Toolhouse Agent Runs API

This document provides the operational model for using `Compass, The Navigation Shepherd`, as a headless, stateless analysis service. Compass is designed to be invoked programmatically, allowing you to integrate its powerful situational awareness capabilities into your CI/CD pipelines, custom dashboards, or scheduled monitoring jobs.

### Core Principle: Stateless State Analysis

Compass does not maintain any internal state. It is a pure analysis engine. You provide it with a snapshot of your project's history and current state, and it returns a detailed analysis of your position, trajectory, and alignment. This stateless design ensures that every analysis is deterministic, auditable, and horizontally scalable.

### Invocation via Agent Runs API

To use Compass, you make a `POST` request to the Toolhouse `agent-runs` endpoint.

**Endpoint:** `POST /v1/agent-runs`

#### Request Structure

The body of your request must contain Compass's `agent_id`, a `command`, and a `payload` object containing the `NavigationBrief`.

| Field       | Type   | Description                                                                                             |
| :---------- | :----- | :------------------------------------------------------------------------------------------------------ |
| `agent_id`  | String | The unique identifier for Compass: `cognitae-cmp-001`                                                     |
| `command`   | String | The specific analysis to perform (e.g., `/position`, `/scout`).                                         |
| `payload`   | Object | A JSON object containing the `NavigationBrief` which holds all state data needed for the analysis.      |
| `state`     | Object | This is always `null` for Compass, as it is a fully stateless agent.                                     |

#### Example: Getting a Project's Current Position

This example demonstrates how to ask Compass for a full situational analysis of a project. This requires providing a "True North" vector (the ideal state), and a history of the project's key metrics.

**Request:**
```json
{
  "agent_id": "cognitae-cmp-001",
  "command": "/position",
  "payload": {
    "navigation_brief": {
      "version": "1.0",
      "project_id": "enterprise-integration-q4",
      "true_north_vector": [1.0, 1.0, 1.0],
      "project_state_history": [
        {
          "timestamp": "2025-11-01T12:00:00Z",
          "state_metrics": {
            "feature_completeness": 0.50,
            "bug_backlog": 0.90,
            "client_satisfaction": 0.85
          }
        },
        {
          "timestamp": "2025-11-20T12:00:00Z",
          "state_metrics": {
            "feature_completeness": 0.80,
            "bug_backlog": 0.75,
            "client_satisfaction": 0.70
          }
        }
      ]
    }
  }
}

Note: state_metrics should be normalized to a 0.0-1.0 scale, where 1.0 is the ideal state (e.g., for bug_backlog, 1.0 might mean zero bugs).
The NavigationAnalysis Response
A successful run will return a 200 OK status with a JSON body containing the NavigationAnalysis. This object is your deliverable: a rich, structured report on your project's health and trajectory.
Response Body (Success):
JSON
{
  "status": "success",
  "result": {
    "navigation_analysis": {
      "version": "1.0",
      "project_id": "enterprise-integration-q4",
      "analysis": {
        "current_position_vector": [0.80, 0.75, 0.70],
        "mission_alignment_score": 0.88,
        "drift_analysis": {
          "drift_magnitude": 0.12,
          "interpretation": "Project is drifting away from ideal state, primarily driven by a decline in client satisfaction and a slower-than-expected reduction in the bug backlog, despite strong feature development."
        },
        "alerts": [
          {
            "type": "Warning",
            "message": "Client Satisfaction has dropped 15% this period. Recommend immediate investigation."
          }
        ]
      }
    }
  }
}

By periodically calling this API, you can build a time-series of your project's health, automate the detection of strategic drift, and create custom dashboards that provide true situational awareness beyond simple task tracking.



---

# Operational Model: Compass Orchestrated in a Caspian Ring

**Audience:** Developers, Product Managers
**Subject:** Understanding Compass's Role as the Oversight Layer in a Multi-Agent Workflow

While `Compass, The Navigation Shepherd`, can be used as a powerful standalone analysis tool, its ultimate purpose is to serve as the **persistent oversight layer** for complex workflows orchestrated by `Caspian, The Integrated Guide`. In a "Caspian Ring," other agents perform the work; Compass ensures the work stays aligned with the mission.

### Core Principle: Parallel Oversight, Not Sequential Tasking

Unlike most agents who are called in a sequence to perform a specific task, Compass runs in parallel to the main workflow. Caspian feeds Compass a continuous stream of state data from the other agents, and Compass, in turn, provides a continuous stream of analysis and alerts back to Caspian, who can then adjust the workflow accordingly.

### The "Go-to-Market" Workflow

Consider a complex, multi-month "Go-to-Market" plan for a new product. This involves technical development, marketing, and partnership commitments.

**User's Goal:** "Caspian, execute the go-to-market plan for 'Project Phoenix'."

Caspian initiates the "Go-to-Market Ring," a workflow involving multiple agents, with Compass acting as the "shepherd" for the entire journey.

#### The Orchestrated Sequence

1.  **Input & Initialization:** The user provides the GTM plan. Caspian extracts the key goals, deadlines, and metrics.
    *   Caspian tasks `Auren` to define the "True North" vector for the launch (e.g., target market position, revenue goals).
    *   Caspian tasks `Axis` to break down the plan into a task graph.
    *   Caspian provides this initial state to **Compass** to establish the starting position and map the waypoints (e.g., "Beta Launch," "Partner Training," "Public Announcement").

2.  **Execution Phase (The "Workers"):** Caspian orchestrates the specialist agents to perform their functions:
    *   `Forge` works on finalizing the product features.
    *   `Echo` begins drafting the launch announcements.
    *   `Maven` prepares the ROI documents for key partners.

3.  **Oversight Phase (Compass in Parallel):** As the "workers" generate data, Caspian continuously feeds it to Compass.
    *   `Sentinel` reports that `Forge`'s bug-fix velocity has decreased. Caspian sends this data to **Compass**.
    *   `Echo` reports that a key marketing message is underperforming in tests. Caspian sends this data to **Compass**.
    *   A key partner misses a feedback deadline. The user logs this event. Caspian sends it to **Compass**.

4.  **Analysis and Alerting (Compass's Output):** Compass processes this stream of state data and provides high-level analysis back to Caspian.
    *   **Command:** `/position` (run automatically by Caspian on a schedule)
    *   **Payload:** The latest `state_metrics` from Sentinel, Echo, and user logs.
    *   **Action & Result:** Compass returns a `NavigationAnalysis` with a critical alert:
        ```json
        "alerts": [
          {
            "type": "Critical",
            "message": "Trajectory has diverged. At current velocity, project will miss 'Public Announcement' waypoint by 12 days. Root cause: Decreased bug-fix velocity and partner feedback delay."
          }
        ]
        ```

5.  **Course Correction (Caspian's Action):** Armed with this clear, data-driven insight from Compass, Caspian can now take corrective action. It might automatically allocate more of `Forge`'s time to bug-fixing or alert the user with a high-priority notification to engage the delinquent partner.

### Developer Experience

The team focuses on their specialized work, feeding their status updates into the system. They are freed from the burden of constant, high-level monitoring. Compass, orchestrated by Caspian, handles the "big picture," ensuring that all the individual streams of work are flowing in the right direction and on time. It transforms project oversight from a manual, meeting-intensive process into an automated, data-driven one.


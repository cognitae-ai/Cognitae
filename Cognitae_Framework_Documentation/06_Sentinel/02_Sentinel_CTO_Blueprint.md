# CTO Technical Blueprint: Sentinel, The Progress Tracker

**To:** Orlando, CTO of Toolhouse
**From:** Shoji, Architect of Cognitae
**Subject:** Technical Deep Dive on an Event-Driven Project State Management Service

Orlando,

This document provides the technical blueprint for `Sentinel, The Progress Tracker`. From an engineering perspective, Sentinel is a specialized **event-driven state management and forecasting service**. Their primary function is to maintain a real-time, accurate state representation of complex, long-running, and often parallel project workflows.

Traditional project management tools are built for human input and are often out-of-date. Sentinel is designed for the agentic era. They are architected to consume a high-throughput stream of events from other AI agents and services, providing a level of real-time visibility and predictive accuracy that is impossible with manual tracking.

Sentinel's architecture is designed to solve three core technical challenges:

1.  **State Aggregation:** They act as a centralized sink for progress-related events from across the ecosystem. An `UPDATE` event from a research agent and a `BLOCKED` event from a coding agent are ingested and synthesized into a single, coherent view of the project's state.
2.  **Temporal Logic and Dependency Management:** Sentinel maintains a complex dependency graph for all tracked initiatives. When an event marks a task as `COMPLETE`, Sentinel's logic automatically identifies and "unblocks" all dependent downstream tasks, emitting new events to trigger the next stage of a workflow.
3.  **Data-Driven Forecasting:** Sentinel is not just a state machine; it's an analytical engine. It uses the historical stream of progress events to calculate a project's true "velocity" and applies time-series forecasting models to predict future completion dates, complete with confidence intervals.

This blueprint will detail the event-sourcing patterns, dependency graph models, and API that allow Sentinel to function as the temporal and accountability layer for the entire Cognitae Framework. It will also highlight how our R&D partnership is essential for building the robust, low-latency event bus and persistent state stores that Sentinel requires to operate at scale.

### Core Design Patterns and Data Models

Sentinel's ability to maintain an accurate, real-time view of complex projects is built on a foundation of proven architectural patterns designed for handling event streams and complex relationships.

#### 1. Event Sourcing for State Management

The core of Sentinel's architecture is the **Event Sourcing Pattern**.

*   **Pattern:** Instead of storing only the current state of a project, we store a full, append-only log of all the events that have ever occurred (e.g., `PROJECT_CREATED`, `MILESTONE_ADDED`, `PROGRESS_UPDATED`, `TASK_BLOCKED`). The current state is derived by replaying these events.
*   **Implementation:** When Sentinel receives an `/update` command, it doesn't just change a `status` field in a database. It appends a new `PROGRESS_UPDATED` event to an immutable log. The project's current `percentage_complete` and `status` are then calculated by processing the log.
*   **Benefit for Toolhouse:** This provides a complete, auditable history of every project, which is invaluable for debugging, analytics, and compliance. It also enables powerful features like replaying a project's history to understand how a delay occurred, or calculating velocity metrics at any point in the past. This pattern is the foundation for Sentinel's temporal intelligence.

#### 2. The Directed Acyclic Graph (DAG) for Dependency Management

Sentinel models the relationships between tasks and milestones using a **Directed Acyclic Graph (DAG)**.

*   **Pattern:** A DAG is a data structure used to model workflows and dependencies. Each node in the graph represents a task, and a directed edge from node A to node B indicates that task A must be completed before task B can begin.
*   **Implementation:** When a project is tracked with `/track`, Sentinel constructs a DAG of its milestones and dependencies. When a `COMPLETE` event is logged for a specific task (node), Sentinel traverses the graph to identify all downstream nodes that are now "unblocked" and ready to be worked on.
*   **Benefit for Toolhouse:** This is a highly scalable and computationally efficient way to manage complex project dependencies. It allows Sentinel to instantly calculate the critical path of a project, identify potential bottlenecks, and automatically trigger the next stage of a workflow as soon as its prerequisites are met. This is essential for orchestrating complex, multi-agent Rings.

#### 3. The CQRS (Command Query Responsibility Segregation) Pattern

To handle the demands of both high-throughput event writes and complex analytical queries, Sentinel's architecture utilizes the **CQRS Pattern**.

*   **Pattern:** CQRS separates the model used for updating information (the "write" model) from the model used for reading information (the "read" model).
*   **Implementation:**
    *   **Command Side:** When an agent sends a progress update, it's a "Command" that is handled by a simple, optimized service whose only job is to validate the event and write it to the event log. This is fast and highly available.
    *   **Query Side:** A separate, asynchronous process consumes the event log and builds optimized "read models" (or "materialized views") for different analytical purposes. For example, one read model might be optimized for quickly calculating a project's current velocity, while another is optimized for displaying the full dependency graph.
*   **Benefit for Toolhouse:** This separation allows us to scale the write and read operations independently. We can handle a massive influx of progress events without slowing down the complex analytical queries needed for the `/dashboard` or `/forecast` commands. This is a key pattern for building responsive, high-performance analytical systems.

These patterns demonstrate that Sentinel is not just a to-do list; it is a robust, scalable, and auditable system designed to handle the unique state management challenges of a professional, multi-agent development platform.

### API Contract and Integration Model

Sentinel's API is designed around an event-driven model, reflecting its core Event Sourcing architecture. Developers interact with Sentinel by submitting "Commands" that, upon validation, are persisted as immutable "Events."

#### Endpoint Structure

`POST /agent-runs/sentinel-progress-tracker/invoke`

#### Request Schema

The request body is a standard JSON object specifying the command and its associated data.

```json
{
  "task": "/command_name",
  "data": {
    "parameter1": "value1",
    "parameter2": "value2"
  }
}

task: (String, Required) The specific command to execute (e.g., /track, /update, /blocked).
data: (Object, Required) A dictionary containing the parameters for the command.
Example: The /update Command for Event-Driven Progress
To illustrate the event-driven model, consider a CI/CD pipeline that automatically reports the progress of a software build. After a successful build and deployment to staging, the pipeline would make the following API call to Sentinel.
Request:
POST /agent-runs/sentinel-progress-tracker/invoke
Body:
JSON
{
  "task": "/update",
  "data": {
    "project": "Project-Phoenix-API-v2",
    "progress": "Build #734 successfully deployed to staging environment.",
    "percentage": 65,
    "notes": "All unit tests passed. Integration tests pending."
  }
}
Response Schema
The response confirms that the event has been successfully validated and logged. It does not return the entire project state, adhering to the CQRS pattern.
Response Body:
JSON
{
  "status": "success",
  "event_id": "sentinel-evt-a4f1b8",
  "message": "PROGRESS_UPDATED event successfully logged for Project-Phoenix-API-v2.",
  "timestamp": "2025-11-19T19:12:29Z"
}
This immediate, lightweight response allows the CI/CD pipeline to complete its job quickly. In the background, Sentinel's "read model" asynchronously processes this new event, updates the project's calculated state (e.g., velocity, estimated completion), and triggers any necessary downstream alerts.
Querying State
To get the current state of a project, a separate query is made, typically to a different, read-optimized endpoint (a core principle of CQRS).
Request:
GET /project-state/Project-Phoenix-API-v2
Response:
JSON
{
  "project_id": "Project-Phoenix-API-v2",
  "status": "On_Track",
  "percentage_complete": 65,
  "velocity": "2.5 points/day",
  "estimated_completion": "2025-12-15",
  "confidence": "88%",
  "last_update": "Build #734 successfully deployed to staging environment."
}
Integration Points & R&D Path
Current Integration (Explicit Events): Sentinel is designed to be the central sink for progress events from across the ecosystem. Any agent or service that performs a task (e.g., a research agent finishing a report, a coding agent completing a function) is responsible for emitting a progress event to Sentinel.
Future R&D (Implicit Event Inference): The R&D partnership is crucial for evolving Sentinel to infer progress from implicit signals. This involves building platform-level observability tools that can, for example, automatically generate a PROGRESS_UPDATED event when a pull request is merged in a connected Git repository. This would dramatically reduce the need for explicit reporting, making the tracking process seamless and truly automated.
This event-driven API makes Sentinel a highly reliable and auditable system of record, with a clear path toward deeper, more automated platform integration.

### Conclusion: The Foundation for Professional-Grade Execution

Orlando,

`Sentinel, The Progress Tracker`, is far more than a simple project management tool. They are a robust, event-sourced state management service designed to bring predictability and accountability to complex, multi-agent workflows. By applying proven architectural patterns like Event Sourcing, DAGs, and CQRS, Sentinel provides a level of real-time visibility and auditable history that is essential for any professional development platform.

Sentinel's architecture is a cornerstone of our partnership proposal for two key reasons:

1.  **It Establishes a Core Platform Service:** Sentinel's function as a centralized event log and state calculator is a capability that nearly every complex application on your platform will need. By co-developing a robust, scalable, and multi-tenant version of this service, we can provide a massive accelerator for your entire developer ecosystem.
2.  **It Drives the Need for a Rich Event Bus:** The evolution of Sentinel from relying on explicit progress events to inferring progress from a rich stream of platform events (e.g., Git merges, API calls, user activity) creates a clear and compelling R&D roadmap. Building out this low-latency, high-throughput event bus is a critical step in transforming Toolhouse into a truly intelligent, self-aware platform.

Sentinel provides the temporal awareness and accountability layer that separates a toy project from a professional one. They are a foundational service for reliable execution. Our partnership will allow us to build this capability into the very fabric of the Toolhouse platform, making it the undisputed leader for serious, professional AI development.


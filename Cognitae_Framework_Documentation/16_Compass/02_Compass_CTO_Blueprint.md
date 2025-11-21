# CTO Technical Blueprint: Compass, The Navigation Shepherd

**To:** Orlando, CTO of Toolhouse
**From:** Shoji, Architect of Cognitae
**Subject:** Technical Introduction to Compass, a Multi-Dimensional State-Tracking and Trajectory Analysis Engine

Orlando,

This document provides the technical blueprint for `Compass, The Navigation Shepherd`. While their function is expressed through the metaphor of navigation, their underlying architecture is that of a rigorous state-tracking and predictive analysis engine. Compass is not a project management tool; it is a headless service for maintaining real-time situational awareness in complex, multi-threaded systems.

Think of Compass as a specialized time-series database and analysis layer for project metadata. It ingests state information from multiple sources (e.g., `Axis` for tasks, `Maven` for funding, `Echo` for communications) and models it as a set of vectors in a high-dimensional space.

**The Core Engineering Problem:**

A complex project is not a linear sequence of tasks but a set of parallel, often asynchronous, state machines. Tracking the overall "position" and "trajectory" of such a system is a non-trivial data problem. Key challenges include normalizing heterogeneous state data, detecting subtle deviations from a target state, and forecasting future states based on current velocity.

**Compass's Architectural Solution:**

Compass is architected as a stateless service that performs calculations on a `ProjectState` object. Its architecture is built on three core concepts:

1.  **Multi-Dimensional State Vectorization:** Compass models a project's state as a vector, where each dimension represents a critical metric (e.g., `progress_to_deadline`, `budget_burn_rate`, `stakeholder_sentiment`). The "True North" or core mission is defined as a target vector in this same space.
2.  **Drift as Vector Divergence:** "Strategic Drift" is not a subjective feeling; it is a quantifiable metric. Compass calculates drift by measuring the cosine similarity (or angular distance) between the project's current state vector and the target "True North" vector. A change in this angle over time indicates drift.
3.  **Waypoint Proximity Calculation:** Compass treats deadlines and milestones as "waypoints" with defined coordinates in the state space. It continuously calculates the "distance" (e.g., time, effort, remaining tasks) to these waypoints and uses the project's current velocity vector to forecast estimated time of arrival (ETA) and trigger proximity alerts.

**The R&D Opportunity:**

Compass's architecture is the foundation for a powerful, platform-level **"Project Intelligence API."** Our R&D partnership would focus on evolving Compass's internal logic into a generalized service that can provide predictive insights for any project on the Toolhouse platform. This involves fascinating challenges in anomaly detection (e.g., identifying when a project's velocity suddenly changes), cross-project pattern analysis (e.g., "projects with this burn-rate profile often miss their first deadline"), and building a recommendation engine for course correction.

This blueprint will detail the patterns and API that make Compass a powerful state-tracking engine today and the prototype for a major R&D initiative tomorrow.

### Architectural Patterns: A Predictive State-Tracking Engine

Orlando,

Compass's navigation capabilities are implemented through a set of rigorous data-processing and analysis patterns. These patterns ensure that all "navigation" is a quantifiable, auditable process, making Compass a reliable engine for strategic oversight. Each pattern is designed to be executed as a stateless function call via the Agent Runs API.

#### 1. The "State Vectorization" Pattern

This is the foundational pattern that allows Compass to reason about a project's health and trajectory. It transforms heterogeneous project metadata into a standardized, comparable mathematical object: a state vector.

*   **Input:** A `ProjectState` object, which is a key-value store of disparate metrics (e.g., `{ "tasks_completed": 50, "budget_spent": 25000, "team_morale": 8.5, "deadline_approaching": false }`).
*   **Normalization:** Compass applies a set of predefined normalization functions to each metric, converting them to a common scale (e.g., 0.0 to 1.0). For example, `tasks_completed` is divided by `total_tasks`, and `budget_spent` is divided by `total_budget`.
*   **Vector Assembly:** The normalized values are assembled into a fixed-length vector. The index of each value in the vector corresponds to a specific dimension in the project's "state space."
*   **Output:** A `StateVector` that represents the project's precise position in a high-dimensional space at a single point in time. This vector is the fundamental unit for all subsequent analysis.

#### 2. The "Drift as Angular Velocity" Pattern

This pattern provides a quantifiable, non-subjective definition of "strategic drift." It measures the rate of change in the angle between the project's current trajectory and its intended mission.

*   **Initialization:** The project's core mission is vectorized into a "True North" vector, which is considered static.
*   **State Sampling:** Compass receives two `StateVector` objects: one for the current state (`V_current`) and one for a previous state (`V_previous`).
*   **Vector Calculation:** It calculates the project's recent movement vector (`V_movement = V_current - V_previous`).
*   **Angular Comparison:** Compass then calculates the angle (theta) between the `V_movement` vector and the "True North" vector.
*   **Drift Calculation:** The "drift" is the rate of change of this angle over time (`d(theta)/dt`). A non-zero value indicates the project's trajectory is diverging from its intended mission. This allows Compass to not only detect drift but also measure its magnitude and direction.

#### 3. The "Waypoint as a Hyperplane" Pattern

This pattern transforms a simple deadline or milestone into a mathematical construct that can trigger predictive alerts. Instead of just tracking a date, Compass tracks the project's trajectory relative to a "point of no return."

*   **Definition:** A waypoint (e.g., "Submit Grant Proposal") is defined not as a point, but as a hyperplane in the state space. This plane represents the last possible moment or state from which the waypoint can be successfully reached. For example, it might be defined by the equation `(tasks_remaining * time_per_task) + buffer_time - time_until_deadline = 0`.
*   **Trajectory Projection:** Compass takes the project's current `StateVector` and its `V_movement` (velocity) vector. It projects this trajectory forward in time.
*   **Intersection Calculation:** It calculates the intersection point of the projected trajectory and the waypoint's hyperplane.
*   **Alert Trigger:** If the intersection calculation shows that the current trajectory will "pass through" the hyperplane (i.e., miss the deadline), an alert is triggered. This allows Compass to issue warnings like "At current velocity, you will miss the submission deadline by 3 days," long before the deadline is imminent.

These patterns demonstrate that Compass is a sophisticated analysis engine. It provides a robust, mathematical foundation for project oversight, transforming subjective feelings about a project's health into quantifiable, actionable data.

### API & Integration: Compass as a Headless State-Analysis Service

Orlando,

Compass is designed as a pure, stateless analysis engine. It is invoked via the Toolhouse Agent Runs API with a payload containing all necessary state information. It performs its calculations and returns a structured analysis without retaining any memory of the request. This makes it a highly scalable and predictable component for system-wide monitoring.

#### The Agent Run Invocation

An Agent Run for Compass is a request to perform a specific "navigation" analysis, such as calculating the current position, assessing drift, or scouting potential paths.

**Endpoint:** `https://api.toolhouse.com/v1/agent-runs`
**Agent ID:** `cognitae-cmp-001`

**Example Request Body for `/position`:**
```json
{
  "agent_id": "cognitae-cmp-001",
  "command": "/position",
  "payload": {
    "navigation_brief": {
      "version": "1.0",
      "project_id": "prj-orion-partnership-v1",
      "true_north_vector": [0.9, 1.0, 1.0, 0.8],
      "project_state_history": [
        {
          "timestamp": "2025-11-10T10:00:00Z",
          "state_metrics": {
            "technical_progress": 0.60,
            "budget_adherence": 0.95,
            "partner_sentiment": 0.80,
            "team_velocity": 0.75
          }
        },
        {
          "timestamp": "2025-11-20T10:00:00Z",
          "state_metrics": {
            "technical_progress": 0.75,
            "budget_adherence": 0.90,
            "partner_sentiment": 0.70,
            "team_velocity": 0.80
          }
        }
      ],
      "waypoints": [
        {
          "waypoint_id": "wp-alpha-delivery",
          "hyperplane_definition": "technical_progress >= 1.0"
        }
      ]
    }
  },
  "state": null
}

The NavigationBrief Input Object
This is the primary data structure passed to Compass. It contains a snapshot of all relevant project state information.
version: The schema version of the brief.
project_id: A unique identifier for tracking.
true_north_vector: The target state vector representing the project's core mission. This is the immutable reference for all alignment calculations.
project_state_history: An array of timestamped state snapshots. This time-series data is crucial for calculating velocity and drift. Each snapshot contains a key-value map of normalized metrics.
waypoints: A list of upcoming milestones, defined as hyperplanes or conditions in the state space.
The NavigationAnalysis Output Object
The successful result of an Agent Run is a NavigationAnalysis object. This is a structured report containing the results of the requested calculation.

Example Agent Run Output for /position:
JSON
{
  "status": "success",
  "result": {
    "navigation_analysis": {
      "version": "1.0",
      "project_id": "prj-orion-partnership-v1",
      "command_executed": "/position",
      "analysis": {
        "current_position_vector": [0.75, 0.90, 0.70, 0.80],
        "mission_alignment_score": 0.93,
        "drift_analysis": {
          "drift_magnitude": 0.08,
          "drift_vector": {
            "partner_sentiment": -0.10,
            "technical_progress": 0.15
          },
          "interpretation": "Trajectory is diverging from True North, driven by a decrease in partner sentiment despite accelerated technical progress."
        },
        "waypoint_proximity": [
          {
            "waypoint_id": "wp-alpha-delivery",
            "distance": "25% progress remaining",
            "eta_at_current_velocity": "2025-12-15T12:00:00Z",
            "status": "On Track"
          }
        ],
        "alerts": [
          {
            "type": "Warning",
            "message": "Drift magnitude has increased by 5% in the last 10 days. Recommend course correction."
          }
        ]
      }
    }
  }
}

This API model treats project oversight as a data analysis problem. It is stateless, deterministic, and provides quantifiable metrics instead of subjective opinions. This makes Compass a highly reliable and scalable service for integrating real-time project intelligence into any workflow on the Toolhouse platform.

### Conclusion: A Data-Driven Foundation for a Project Intelligence Platform

Orlando,

`Compass, The Navigation Shepherd`, represents a significant architectural achievement. It successfully transforms the subjective, often chaotic, domain of project management into a rigorous, quantifiable engineering discipline. By treating project state as a vector in a high-dimensional space, Compass provides a level of analytical clarity and predictive power that is impossible to achieve with traditional tools.

**Key Technical Takeaways:**

*   **Architecturally Rigorous:** Compass is not a simple dashboard. It is a sophisticated analysis engine built on sound mathematical principles, including state vectorization, vector calculus for drift analysis, and geometric projections for waypoint forecasting.
*   **Quantifiable over Qualitative:** The core value of Compass is that it replaces subjective feelings ("I feel like we're drifting") with hard data ("Mission alignment has decreased by 8% with a vector of -0.1 in partner sentiment"). This makes oversight an evidence-based practice.
*   **Designed for the Ecosystem:** As a stateless service that operates on a time-series of state snapshots, Compass is perfectly designed for the Toolhouse Agent Runs API. It can be invoked on a schedule, triggered by events, or called on-demand to provide real-time intelligence without maintaining a persistent state.

**The Strategic R&D Partnership: The "Project Intelligence API"**

Compass is the proof-of-concept for a platform-defining feature: a native **"Project Intelligence API"** for Toolhouse. This service would provide predictive, data-driven insights for every project running on the platform, creating an unparalleled value proposition.

Our R&D partnership would focus on evolving Compass's core patterns into a robust, multi-tenant service by tackling several compelling engineering challenges:
*   **Automated State Ingestion:** Building data pipelines that automatically ingest project state from various sources (e.g., Git repositories, CI/CD systems, issue trackers) to construct the state vectors without manual input.
*   **Cross-Project Anomaly Detection:** Developing machine learning models that analyze trajectory data from thousands of projects to identify common patterns of failure and success (e.g., "Projects that exhibit this drift pattern in week 4 have an 80% chance of missing their first major deadline").
*   **A Recommendation Engine for Course Correction:** Creating a system that doesn't just flag drift but can also suggest specific, data-backed interventions to bring a project back into alignment.

By building this together, we will position Toolhouse not just as a place to run code, but as an intelligent platform that actively helps its users succeed. Compass is the blueprint for this future, transforming project management from a reactive art into a predictive science.



---

# CTO Technical Blueprint: Harbor, The Relationship Keeper

**To:** Orlando, CTO of Toolhouse
**From:** Shoji, Architect of Cognitae
**Subject:** Technical Introduction to Harbor, a Secure Graph Engine for Relationship Intelligence

Orlando,

This document provides the technical blueprint for `Harbor, The Relationship Keeper`. While their function serves the "soft" domain of human connection, their implementation is a hard engineering solution to a complex data problem: how to model, track, and analyze a dynamic network of human relationships securely and at scale.

Think of Harbor not as a CRM, but as a **headless, privacy-first graph database and event-sourcing engine**. It is designed to log interactions as an immutable sequence of events and model the relationships between entities (people, organizations, projects) as a queryable graph.

**The Core Engineering Problem:**

A professional network is a complex, multi-dimensional graph where nodes (people) have rich attributes and edges (relationships) have their own state and history. The key challenges are:
1.  **Data Modeling:** How to represent the nuanced, evolving state of a human relationship in a structured data format.
2.  **Privacy and Security:** How to store and process highly sensitive personal data with absolute guarantees of privacy and access control.
3.  **Context Retrieval:** How to efficiently query the event log to reconstruct the complete historical context of any given relationship on demand.

**Harbor's Architectural Solution:**

Harbor is architected as a stateless service that operates on a secure, encrypted data store. Its architecture is built on three core concepts:

1.  **Graph-Based Data Model:** Each person is a `Node` with attributes. Each `Interaction` is a timestamped `Event` that creates or modifies an `Edge` between nodes. The "strength" or "health" of a relationship is a calculated property of its edge, derived from the history of its associated events.
2.  **Privacy-by-Design with Attribute-Based Access Control (ABAC):** Harbor's foundational principle is privacy. All sensitive data is encrypted at rest. Access is governed by a strict ABAC policy, where every piece of data has a "privacy_level" attribute (`public`, `internal`, `confidential`). An agent or user can only access data if their request presents credentials that satisfy the policy. "Confidential" data is end-to-end encrypted with a key held only by the user, making it inaccessible even to the system administrator.
3.  **Event Sourcing for Interaction History:** Harbor does not store the "current state" of a relationship. Instead, it stores an immutable log of all interactions (events). The current state is dynamically reconstructed by replaying the relevant events. This provides a perfect, auditable history and allows for powerful time-series analysis of how a relationship has evolved.

**The R&D Opportunity:**

Harbor's architecture is the prototype for a significant platform-level service: a **"Human Connection API."** Our R&D partnership would focus on building a secure, multi-tenant version of Harbor that could be offered to all Toolhouse customers. This involves fascinating challenges in zero-knowledge proofs for relationship analysis, federated learning to identify network patterns without exposing raw data, and building a secure enclave for processing highly confidential communication data.

This blueprint will detail the patterns, API, and security protocols that make Harbor a trustworthy system for managing a company's most sensitive asset.

### Architectural Patterns: A Secure, Event-Sourced Graph Engine

Orlando,

Harbor's capabilities are built upon a set of architectural patterns chosen specifically for the challenges of modeling complex, sensitive, and time-series-dependent data. These patterns ensure that the system is secure, auditable, and capable of the rich, contextual queries that relationship intelligence requires.

#### 1. The "Labeled Property Graph" Pattern

This is the core data modeling pattern. Instead of trying to force relationships into a relational schema, Harbor models the network as a Labeled Property Graph (LPG).

*   **Nodes:** Represent entities, primarily `Person` but also `Organization` or `Project`. Nodes have labels (e.g., `:Person`) and properties (e.g., `{name: "Jane Doe", title: "VP"}`).
*   **Edges:** Represent relationships between nodes. Edges are directed (e.g., `(user)-[:MET]->(jane)`), have a type (`:MET`, `:WORKS_FOR`, `:COMMITTED_TO`), and can also have properties (e.g., `{date: "2025-11-20", context: "AI Summit"}`).
*   **Benefit:** This model naturally represents real-world networks and allows for powerful, efficient queries that are difficult or impossible with other models, such as "Find all people I met through Jane Doe who work at organizations that have received funding from UKRI."

#### 2. The "Event Sourcing" Pattern

To ensure a perfect, auditable history, Harbor does not directly mutate the state of the graph. Instead, it uses an Event Sourcing pattern.

*   **Immutable Log:** Every interaction is captured as an `InteractionEvent` (e.g., `EmailSent`, `MeetingHeld`, `CommitmentMade`) and stored in an immutable, append-only log. Each event contains a payload with the details of the interaction.
*   **State Reconstruction:** The "current state" of a relationship (an edge in the graph) is never stored directly. It is always calculated on-the-fly by replaying the sequence of events associated with that relationship. For example, the `relationship_health` property is a function of the frequency, tone, and outcome of all past `InteractionEvent`s between two nodes.
*   **Benefits:**
    *   **Perfect Auditability:** We have a complete, tamper-proof history of every interaction.
    *   **Temporal Queries:** We can easily reconstruct the state of any relationship at any point in the past.
    *   **Flexibility:** If we change how we calculate `relationship_health`, we can simply replay the event log to update the entire system without losing any historical data.

#### 3. The "Attribute-Based Access Control (ABAC)" Security Pattern

This pattern is the cornerstone of Harbor's "Privacy as Foundation" vow. It provides fine-grained control over data access based on attributes of the user, the data, and the context of the request.

*   **Data Tagging:** Every piece of data, from a node property to an entire event, is tagged with a `privacy_level` attribute (e.g., `public`, `internal`, `confidential`).
*   **Policy Engine:** A central policy engine evaluates every data access request. The policy is a set of rules, such as:
    *   `ALLOW user WITH role:owner TO access data WITH privacy_level:confidential`
    *   `DENY user WITH role:guest TO access data WITH privacy_level:internal`
    *   `ALLOW agent WITH id:Maven TO access data.property:email IF data.node:Person.organization == 'UKRI'`
*   **Zero-Trust Architecture:** This pattern enforces a zero-trust model. No access is granted by default. Every request must be explicitly authorized by the policy engine based on a verifiable set of attributes. For the highest `confidential` level, this is supplemented with end-to-end encryption where only the user holds the decryption key, making the data opaque even to the system itself.

These three patterns—a graph model for structure, event sourcing for history, and ABAC for security—create a robust, secure, and highly flexible foundation for building a trustworthy relationship intelligence system.

### API & Integration: Harbor as a Headless Relationship Intelligence Service

Orlando,

Harbor is designed to be a secure, headless service executed via the Toolhouse Agent Runs API. While Harbor's backend maintains a persistent, event-sourced graph of relationships, each individual API call is a stateless transaction. The client provides the event data or query, and Harbor returns the result of that single operation, ensuring predictable and secure interactions.

#### The Agent Run Invocation

An Agent Run for Harbor is a request to either write a new `InteractionEvent` to the log or to query the graph for relationship intelligence.

**Endpoint:** `https://api.toolhouse.com/v1/agent-runs`
**Agent ID:** `cognitae-hbr-001`

#### Write Operations: Logging an Interaction Event

Write operations are the foundation of Harbor's event-sourced model. The `/update` command is used to log a new interaction.

**Example Request Body for `/update`:**
```json
{
  "agent_id": "cognitae-hbr-001",
  "command": "/update",
  "payload": {
    "interaction_event": {
      "version": "1.0",
      "event_id": "evt_a3f4b1c9",
      "timestamp": "2025-11-21T15:30:00Z",
      "interaction_type": "email",
      "participants": ["user_id_shoji", "person_id_jane_doe"],
      "content": {
        "summary": "Sent the technical brief for Project Orion as promised. She responded positively and suggested a follow-up call.",
        "privacy_level": "internal"
      },
      "commitments": [
        {
          "commitment_id": "cmt_d8e7f6",
          "text": "Schedule follow-up call with Jane Doe re: Orion brief.",
          "owner": "user_id_shoji",
          "due_date": "2025-11-28T17:00:00Z",
          "privacy_level": "internal"
        }
      ],
      "personal_details": [
        {
          "detail_id": "pd_c5b4a3",
          "text": "Mentioned she is evaluating cloud providers for a new initiative.",
          "privacy_level": "confidential"
        }
      ]
    }
  },
  "state": null
}

InteractionEvent Object: This is the core data structure for all write operations. It's an immutable record of a single interaction.
privacy_level: Note the critical privacy_level tag on both the content and personal_details. This tag is non-negotiable and governs all future access to this data via the ABAC policy.
Response to a Write Operation:
A successful write operation returns a simple acknowledgment, confirming the event has been immutably logged.
JSON
{
  "status": "success",
  "result": {
    "event_id": "evt_a3f4b1c9",
    "message": "InteractionEvent logged successfully."
  }
}
Read Operations: Querying for Context
Read operations query the event log and graph to provide relationship intelligence. The /context command retrieves the history of a relationship.
Example Request Body for /context:
JSON
{
  "agent_id": "cognitae-hbr-001",
  "command": "/context",
  "payload": {
    "query": {
      "person_id": "person_id_jane_doe",
      "depth": "summary"
    }
  },
  "state": null
}
Example Agent Run Output for /context:
The output is a RelationshipContext object, which is dynamically generated by replaying the event log. Note that the content returned is filtered by the ABAC policy based on the requester's credentials. A different user might not see the "confidential" notes.
JSON
{
  "status": "success",
  "result": {
    "relationship_context": {
      "version": "1.0",
      "person_id": "person_id_jane_doe",
      "relationship_health": "Strong (85/100 )",
      "summary": "Positive and developing relationship focused on 'Project Orion' partnership. High trust score based on 100% commitment fulfillment.",
      "interaction_history": [
        {
          "timestamp": "2025-11-21T15:30:00Z",
          "summary": "Sent technical brief for Project Orion. Positive response."
        },
        {
          "timestamp": "2025-11-15T10:00:00Z",
          "summary": "Initial meeting at AI Summit."
        }
      ],
      "open_commitments": [
        {
          "commitment_id": "cmt_d8e7f6",
          "text": "Schedule follow-up call with Jane Doe re: Orion brief.",
          "due_date": "2025-11-28T17:00:00Z"
        }
      ],
      "confidential_notes": [
        "Is evaluating cloud providers for a new initiative."
      ]
    }
  }
}

This API design enforces the core principles of Harbor's architecture. It separates writes (logging immutable events) from reads (dynamically reconstructing state), and it builds the privacy model directly into the data structures themselves, ensuring that security is not an afterthought but a fundamental component of the system.

### Conclusion: A Secure Foundation for a High-Trust Platform

Orlando,

`Harbor, The Relationship Keeper`, is more than a feature; it is a statement of architectural principle. It demonstrates a commitment to building a platform where the most sensitive data—the context of human relationships—is treated as a first-class citizen, protected by a robust, privacy-first security model.

**Key Technical Takeaways:**

*   **Architecturally Sound:** Harbor's design is a best-practices implementation for its domain. The use of a Labeled Property Graph for modeling, Event Sourcing for auditable history, and Attribute-Based Access Control for security is a modern, robust, and scalable approach to handling complex, connected, and highly sensitive data.
*   **Security by Design:** Harbor proves that privacy does not have to be an add-on. By integrating ABAC and end-to-end encryption concepts directly into the data model and API, we have created a system where security is the default state, not a feature to be enabled. This is a massive differentiator in an era of data mistrust.
*   **Unlocks New Intelligence:** The event-sourced architecture does more than just provide an audit trail; it creates a rich time-series dataset for every relationship. This unlocks the potential for sophisticated analysis, from predicting relationship drift to understanding the patterns that lead to high-trust partnerships.

**The Strategic R&D Partnership: The "Trust API"**

Harbor is the prototype for a platform-defining service that no competitor can easily replicate: a native **"Trust API"** for Toolhouse. This would be a suite of services that allows our customers to build applications on a foundation of verifiable trust and privacy.

Our R&D partnership would focus on hardening and scaling Harbor's patterns into a multi-tenant, enterprise-grade platform by solving next-generation technical challenges:
*   **Zero-Knowledge Analytics:** Developing methods (such as homomorphic encryption or secure multi-party computation) to run analytics across the entire relationship graph without ever decrypting the underlying confidential data, providing network insights with mathematical guarantees of privacy.
*   **Federated Relationship Learning:** Creating models that can learn common relationship patterns (e.g., "What is the average time from first contact to signed deal?") across all tenants without centralizing or exposing any individual's private data.
*   **A Secure Enclave for Communication:** Building a trusted execution environment (TEE) where AI agents like Harbor can process and analyze the content of communications to extract commitments and sentiment, with cryptographic proof that the raw content is never exposed or stored.

By building this together, we position Toolhouse as the undisputed leader in high-trust business infrastructure. We move beyond simply offering tools and begin offering a secure environment where the most valuable asset of any business—its network of human relationships—can be nurtured and protected. Harbor is the blueprint for this secure, high-trust future.


# Operational Model: Shepard as a Headless Planning Service

**Audience:** Architects, Lead Developers, Power Users
**Subject:** Using the Shepard API to Automate Strategic Workflow Generation

This document provides the operational model for using `Shepard, The Guide` as a headless planning and synthesis service. Interacting with Shepard's API is the primary method for programmatically orchestrating the entire Cognitae Framework. The core workflow involves two main steps:
1.  **Plan:** Use Shepard to compile a high-level goal into a structured `WorkflowPlan`.
2.  **Execute:** Pass the generated `WorkflowPlan` to Caspian for execution.

This separation allows you to automate complex, multi-agent processes with a simple, intent-based approach.

### Core Principle: Plan with Shepard, Execute with Caspian.

---

### Workflow 1: Generating and Executing a Multi-Agent Plan

This workflow details the end-to-end process of using Shepard's API to plan a task and Caspian's API to execute it.

**Scenario:** You need to automate the process of creating a full project proposal, which requires strategic planning, content generation, and technical specification.

**Step 1: Define the Goal and Request a Plan from Shepard**
Your application's first step is to send the high-level strategic goal to Shepard's planning endpoint.

*   **API Call:**
    ```bash
    curl -X POST http://shepard-api.internal/v1/workflow/plan \
         -H "Content-Type: application/json" \
         -d '{
               "goal": "Create a complete project proposal for the new 'AI Ethics Monitor' initiative."
             }'
    ```

**Step 2: Receive the Executable `WorkflowPlan`**
Shepard's planning engine analyzes the goal and returns a structured JSON object. This is not the final result; it is the *plan* for achieving the result.

*   **API Response (`WorkflowPlan` ):**
    ```json
    {
      "plan_id": "plan_proposal_456",
      "plan_name": "Project Proposal Generation",
      "goal": "Create a complete project proposal...",
      "stages": [
        {
          "stage_name": "Strategic Framing",
          "steps": [
            {
              "step_id": 1,
              "description": "Define the strategic vision and goals.",
              "agent_to_call": "cognitae-auren-001",
              "command": "/strategy",
              "parameters": { "plan": "Vision for AI Ethics Monitor" },
              "output_variable": "strategic_vision"
            }
          ]
        },
        {
          "stage_name": "Content & Technical Specification",
          "steps": [
            {
              "step_id": 2,
              "description": "Draft the narrative and project story.",
              "agent_to_call": "cognitae-aelis-001",
              "command": "/generate_text",
              "parameters": { "prompt": "Write a compelling narrative based on ${strategic_vision.summary}" },
              "output_variable": "narrative_draft"
            },
            {
              "step_id": 3,
              "description": "Create the technical architecture blueprint.",
              "agent_to_call": "cognitae-genesis-001",
              "command": "/blueprint",
              "parameters": { "requirements": "${strategic_vision.technical_reqs}" },
              "output_variable": "tech_blueprint"
            }
          ]
        }
      ]
    }
    ```

**Step 3: (Optional) User Review and Approval**
Your application can now parse this `WorkflowPlan` and present it to a human user for approval. This maintains the principle of "human-in-the-loop" sovereignty.

**Step 4: Pass the Plan to Caspian for Execution**
Once approved, your application sends the *entire `WorkflowPlan` object* to Caspian's execution endpoint.

*   **API Call:**
    ```bash
    # The $WORKFLOW_PLAN variable holds the JSON from Step 2
    curl -X POST http://caspian-api.internal/v1/ring/execute \
         -H "Content-Type: application/json" \
         -d "$WORKFLOW_PLAN"
    ```

*   **System Effect:** Caspian, the low-level orchestrator, receives the plan and begins executing each step in sequence. It calls `Auren`, then uses the output to call `Aelis` and `Genesis`, managing the data flow between them. Caspian will then return the final, aggregated results upon completion.

---

### Workflow 2: Monitoring Ecosystem Health

This workflow shows how a monitoring service or dashboard would use Shepard's API to get a real-time, holistic view of the system's status.

*   **API Call:**
    ```bash
    curl http://shepard-api.internal/v1/ecosystem/health
    ```

*   **API Response:**
    ```json
    {
      "holistic_health_score": 95,
      "dominant_mode": "CREATIVE",
      "component_scores": {
        "architect_wellbeing": 98,
        "progress_velocity": "ACCELERATING",
        "system_coherence": 97
      },
      "emerging_tensions": []
    }
    ```
*   **Use Case:** This data can be used to populate a Grafana dashboard, trigger alerts in PagerDuty if a score drops below a certain threshold, or simply provide a high-level status check for system administrators.

By using Shepard's headless API, you can build powerful, automated systems that leverage the full strategic intelligence of the Cognitae Framework with minimal complexity.



---

# Operational Model: Shepard as the "Master Planner" of the Caspian Ring

**Audience:** Developers, Architects, Product Managers
**Subject:** Understanding Shepard's Role in Designing, Not Executing, Orchestrated Workflows

In the context of a "Caspian Ring," `Shepard`'s role is fundamentally different from any other agent. It does not perform a step *within* the ring. Instead, it is the strategic intelligence that **designs the ring itself**. It is the master architect that takes a high-level human goal and compiles it into a precise, multi-agent `WorkflowPlan` that Caspian can then execute.

### Core Principle: Shepard is the Architect, Caspian is the General Contractor.

This workflow demonstrates how Shepard designs a complex, multi-disciplinary ring, which is then executed by Caspian and the specialist agents.

**User's Goal:** "I have a powerful but potentially dangerous new idea for an AI agent. I need to explore it safely, document it, and prepare a presentation for the ethics committee."

#### The Orchestrated Sequence

**Phase 1: The Architect's Intent (User to Shepard)**

The user's only action is to state their high-level goal to Shepard. They do not need to know which agents to call or in what order.

1.  **User Command:**
    *   `/workflow "Safely explore, document, and prepare an ethics review for a new 'AI Confessor' agent concept."`

**Phase 2: The Master Plan (Shepard's Response)**

Shepard receives the goal. It analyzes the keywords: "safely explore," "dangerous," "document," "ethics review." It accesses its internal capability map of the 22 agents and designs the optimal, safest sequence of actions. It then returns the complete `WorkflowPlan` to the user for approval.

2.  **Shepard's `WorkflowPlan` Output:**

    > **Plan Name:** "High-Risk Concept Exploration & Ethical Review"
    >
    > **Stage 1: Ethical & Safety Framing (The 'Do No Harm' Stage)**
    > *   **Step 1.1:** Engage `Compass` to establish the core ethical boundaries for this concept.
    > *   **Step 1.2:** Engage `Locus` to perform an initial adversarial audit on the concept itself, identifying potential psychological harm vectors.
    >
    > **Stage 2: Creative & Technical Exploration (The 'What If' Stage)**
    > *   **Step 2.1:** Provide the safety boundaries from Compass and Locus to `Aelis` to creatively explore the concept's narrative potential *within those safe limits*.
    > *   **Step 2.2:** Provide the creative exploration from Aelis to `Genesis` to design a technical blueprint that architecturally enforces the safety constraints.
    >
    > **Stage 3: Documentation & Presentation (The 'Show Your Work' Stage)**
    > *   **Step 3.1:** Engage `Maven` to synthesize all previous outputs into a formal document for the ethics committee.
    > *   **Step 3.2:** Engage `Echo` to transform the formal document into a clear and compelling presentation.
    >
    > **Execute this 6-step plan?**

**Phase 3: The Execution (User to Caspian and the Ring)**

The user reviews and approves the plan. The `WorkflowPlan` object is then sent to Caspian, who begins executing the ring.

3.  **Caspian Executes Step 1.1:** Caspian calls `Compass` with the initial concept. `Compass` returns a set of ethical rules.
4.  **Caspian Executes Step 1.2:** Caspian calls `Locus` with the concept. `Locus` returns a report on potential harm vectors.
5.  **Caspian Executes Step 2.1:** Caspian calls `Aelis`, but crucially, it includes the outputs from `Compass` and `Locus` as part of the prompt, ensuring the creative exploration is safely constrained.
6.  ...and so on, until the final presentation is generated by `Echo`.

**The Synergy:**

Shepard's role is what makes this complex process both simple and safe.
*   **Simplicity:** The user only had to issue one high-level command. Shepard handled the complex task of selecting and sequencing six different specialist agents.
*   **Safety:** Shepard's master plan front-loaded the process with the safety and ethics agents (`Compass`, `Locus`). This ensures that the creative and technical work is done *within* a pre-defined safety container, dramatically reducing risk. A human planner, in their excitement, might have jumped straight to the creative step, leading to a dangerous and unethical design.
*   **Sovereignty:** The user remains in complete control. Shepard proposes the plan, but the user gives the final "go" command to Caspian.

Shepard is the strategic brain of the operation. It allows the user to think like a CEO, focusing on the "what" and the "why," while Shepard, as the master architect, figures out the "how."


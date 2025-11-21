# Operational Model: Maven as a Headless Service

**Audience:** Developers, DevOps Engineers
**Subject:** Interacting with Maven via the Toolhouse Agent Runs API

This document provides the operational model for using `Maven, The Grant Alchemist`, as a headless, stateless service. Maven is designed to be invoked programmatically, allowing you to integrate its powerful proposal generation and analysis capabilities directly into your development workflows, such as generating grant-aligned documentation from your READMEs or analyzing funding opportunities automatically.

### Core Principle: Stateless, Auditable Transformation

Maven operates on a purely stateless model. Every API call is a discrete, self-contained job that includes all necessary context in its payload. The output is not just the transformed text, but also a set of auditable metrics (like `fidelity_score`) that provide crucial insight into the integrity of the transformation.

### Invocation via Agent Runs API

To use Maven, you make a `POST` request to the Toolhouse `agent-runs` endpoint.

**Endpoint:** `POST /v1/agent-runs`

#### Request Structure

The body of your request must contain Maven's `agent_id`, a `command`, and a `payload` object containing the `ProposalBrief`.

| Field       | Type   | Description                                                                                             |
| :---------- | :----- | :------------------------------------------------------------------------------------------------------ |
| `agent_id`  | String | The unique identifier for Maven: `cognitae-mvn-001`                                                      |
| `command`   | String | The specific alchemical action for Maven to perform (e.g., `/translate`, `/align`, `/protect`).         |
| `payload`   | Object | A JSON object containing the `ProposalBrief` which holds all data needed for the command.               |
| `state`     | Object | This is always `null` for Maven, as it is a fully stateless agent.                                      |

#### Example: Translating a Project Description

This example demonstrates how to ask Maven to translate an authentic, developer-focused project description into formal language suitable for a grant application, while ensuring the core mission is preserved.

**Request:**
```json
{
  "agent_id": "cognitae-mvn-001",
  "command": "/translate",
  "payload": {
    "proposal_brief": {
      "version": "1.0",
      "project_id": "helios-data-vis-v1",
      "core_mission": "To make complex data streams intuitive and accessible to non-expert users through interactive visualization.",
      "source_text": "I built Helios because all the other tools were clunky and slow. It's a super fast, web-based tool that lets you just drag and drop a CSV and get a beautiful, interactive chart without writing any code. It's for people who hate fighting with charting libraries.",
      "target_funder_profile": "data_democratization_fund_v1"
    }
  }
}

The AlchemicalResult Response
A successful run will return a 200 OK status with a JSON body containing the AlchemicalResult. This object is your primary deliverable. It includes the translated text and, critically, the metadata that verifies the integrity of the translation.
Response Body (Success):
JSON
{
  "status": "success",
  "result": {
    "alchemical_result": {
      "version": "1.0",
      "project_id": "helios-data-vis-v1",
      "command_executed": "/translate",
      "output": {
        "translated_text": "Project Helios addresses a significant barrier to data literacy by providing a highly performant, browser-based platform for intuitive data visualization. The system is designed to empower non-technical users, enabling them to generate interactive data visualizations from raw datasets (e.g., CSV files) via a zero-code, drag-and-drop interface. This approach democratizes access to data insights, removing the dependency on specialized software or programming expertise."
      },
      "metadata": {
        "fidelity_score": 0.92,
        "drift_detected": "None",
        "warnings": []
      }
    }
  }
}

By using this API-driven model, you can programmatically leverage Maven's unique ability to create institutionally-recognized value from your authentic work, with the built-in assurance that your core mission remains intact.



---

# Operational Model: Maven Orchestrated in a Caspian Ring

**Audience:** Developers, Product Managers
**Subject:** Understanding Maven's Role in an Automated Grant Application Workflow

While `Maven, The Grant Alchemist`, is a powerful tool when used directly, its true value is unlocked when it acts as the final, critical component in a "Caspian Ring." In this model, `Caspian, The Integrated Guide`, orchestrates a sequence of specialist agents to automate the entire grant application process, from strategic analysis to final proposal generation.

### Core Principle: Goal-Oriented Abstraction

The developer or product manager simply states a high-level goal to Caspian. Caspian then translates this goal into a complex workflow, managing the flow of information between agents and ensuring the integrity of the process from start to finish. The user interacts with the outcome, not the intricate steps.

### The "Non-Dilutive Funding" Workflow

Consider a team that has just completed a major R&D project. They believe the work has potential for academic or foundational funding, but they don't know where to start.

**User's Goal:** "Caspian, find and prepare a grant application for our 'Cognitive Safety Kernels' project."

Caspian initiates the "Non-Dilutive Funding Ring," an automated workflow designed to handle this exact scenario.

#### The Orchestrated Sequence

1.  **Input to Caspian:** The user provides a link to the project's repository and internal documentation.

2.  **Step 1: Define the Essence (Auren)**
    *   Caspian first invokes `Auren, The Strategic Sovereign`, to analyze the project and distill its **core mission**. Auren returns a concise, non-negotiable statement, such as: "To create a verifiable, low-level kernel for AI systems that guarantees cognitive safety for the user." This becomes the "ground truth" for the entire process.

3.  **Step 2: Gather the Proof (Scholar)**
    *   Caspian then tasks `Scholar, The Research Specialist`, to scan the project's repository, benchmarks, and any related academic papers. Scholar compiles an "Evidence Package" containing all the technical proof points of the project's viability and innovation.

4.  **Step 3: Find the Opportunity (Maven - First Invocation)**
    *   Caspian invokes Maven for the first time, but not to write. It uses the `/align` command.
    *   **Command:** `/align`
    *   **Payload:** The payload contains the core mission from Auren and the evidence from Scholar, targeted against a database of known funding bodies.
    *   **Action:** Maven returns a ranked list of the most promising grant opportunities, complete with an `AlignmentMap` detailing the genuine points of connection for each.

5.  **Step 4: Translate and Assemble (Maven - Second Invocation)**
    *   After the user confirms the top-ranked opportunity, Caspian invokes Maven again.
    *   **Command:** `/alchemize` (a high-level command combining `/translate` and `/evidence`)
    *   **Payload:** The payload is now a complete `ProposalBrief` synthesized by Caspian, containing Auren's mission, Scholar's evidence, and the target funder's profile.
    *   **Action:** Maven executes its full alchemy pipeline. It translates the project's authentic narrative into formal proposal language, structures the evidence according to the funder's requirements, and continuously runs `/protect` checks against Auren's core mission to ensure a fidelity score above the required threshold.

### Developer Experience

The team's involvement is reduced to two simple steps: initiating the goal and confirming the target opportunity. The entire complex process of strategic analysis, evidence gathering, opportunity matching, and mission-aligned writing is handled automatically. The final deliverable is a complete, high-quality grant application, ready for submission, with a full audit trail of its fidelity to the original mission.

This orchestrated model demonstrates how Maven functions as the crucial "value translation" engine for the entire framework, turning internal R&D assets into external financial opportunities.


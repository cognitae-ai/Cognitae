# Operational Model: Axis's Dual Interaction Modes

**Audience:** Toolhouse Platform Developers
**Subject:** Using Axis as an Automated Coherence Linter and a Conversational Analyst

### Principle: Axis is Both a Validation API and an Analytical Partner

`Axis, The Coherence Synthesist`, is designed with a powerful **Dual-Mode Interaction Model**. This allows developers to use them as either a programmatic service for automated validation or as a conversational partner for deep analytical inquiry.

This document focuses on the first mode: using Axis as a headless, API-driven service that functions like a "linter for architecture."

#### Mode 1: The Headless API for Automated Validation

In this mode, you treat Axis as an automated quality assurance step in your design and development workflow. It's ideal for integrating into CI/CD pipelines, pre-commit hooks, or custom CLI tools to ensure that all new artifacts are coherent with established principles before they are even submitted for human review.

**The Interaction Flow:**

1.  **A New Design is Created:** A developer finishes drafting a technical design document for a new service.
2.  **Trigger the Reflect Command:** Before creating a pull request, the developer runs a local script that calls Axis's `/reflect` command, sending the content of the design document as the `target`.
3.  **Receive an Instant Coherence Report:** Axis deterministically analyzes the document against the company's established architectural principles (the "Ground Truth") and instantly returns a structured JSON report detailing any inconsistencies, logical flaws, or misalignments.
4.  **Iterate and Improve:** The developer uses the report to fix the issues in their design *before* asking for a human review, saving everyone time and improving the quality of the final product.

**Example: Validating a Design Document via a CLI Tool**

A developer wants to check their new design document against the company's core architectural principles.

**The Developer's Action:**
The developer runs a CLI command: `th-agent axis reflect --target ./new_service_design.md --against "Core Architecture Principles"`

This tool makes the following `POST` request to Axis's endpoint.

**Request:**
```json
{
  "task": "/reflect",
  "data": {
    "target": "/* Contents of new_service_design.md */",
    "against": "Core Architecture Principles"
  }
}

Axis's Response:
Axis analyzes the document and returns a structured report, just like a code linter.
Response:
JSON
{
  "status": "success",
  "report_id": "axis-rep-f7g8h9",
  "summary": {
    "target": "new_service_design.md",
    "overall_coherence_score": 78,
    "tests_failed": 1
  },
  "findings": [
    {
      "type": "INCOHERENCE",
      "severity": "High",
      "check": "PrincipleAlignmentTest",
      "message": "Design proposes a synchronous request/response pattern, which violates Core Principle #4: 'All services must communicate asynchronously via the message bus'.",
      "location": "Section 3.2: API Design"
    }
  ]
}

The developer immediately sees the critical architectural flaw and can correct it, preventing a flawed design from ever entering the code review process.
Mode 2: The Conversational Analyst
The second mode, a key focus of our R&D partnership, allows a developer to engage in a Socratic dialogue with Axis. They could ask, "Help me understand the tension between our principles of 'Move Fast' and 'Build for Longevity'" or "Synthesize the core philosophies of Auren and Luma."
This dual-mode capability makes Axis an unparalleled tool for both automated governance and deep architectural understanding, ensuring that systems are not only built correctly but are also understood deeply.



---

# Operational Model: Axis as an Orchestrated Quality Assurance Engine

**Audience:** Toolhouse Platform Developers
**Subject:** Leveraging Axis's Coherence Validation in a Caspian Ring

### Principle: Axis is the Ring's Automated Final Review

When orchestrated by `Caspian, the Integrated Guide`, `Axis, The Coherence Synthesist`, functions as the automated "final review" or "quality gate" for the entire Ring's output. You do not interact with them directly. Instead, just before delivering the final product, Caspian invokes Axis to perform a rigorous, objective check for coherence and alignment.

This model transforms a standard workflow into a high-reliability process that automatically enforces architectural and strategic standards.

#### The Orchestration Flow

1.  **State Your Goal to Caspian:** A developer initiates a Ring with a high-level goal, such as "Generate a technical design document for a new notification service."
2.  **The Ring Executes:** Caspian orchestrates a series of specialist agents to complete the task. For example, `Scholar` might research best practices, `Syn` might analyze usage patterns to inform requirements, and `Genesis` might draft the architectural blueprint.
3.  **Caspian Triggers the Final Coherence Check:** Before presenting the final design document to the developer, Caspian's last step is to invoke Axis: `task: "/reflect", data: { "target": "[Final Design Document]", "against": "Core Architecture Principles" }`.
4.  **Axis Performs Automated Validation:** Axis deterministically analyzes the document. It checks if the proposed service correctly uses the message bus, if its data model adheres to standards, and if its API design is RESTful, among dozens of other codified rules.
5.  **Caspian Receives the Coherence Report:** Axis returns a structured report to Caspian. If the `overall_coherence_score` is below a certain threshold (e.g., 95%), Caspian will not deliver the document.
6.  **Automated Revision or Delivery:**
    *   **If Coherent:** Caspian delivers the validated, high-quality design document to the developer.
    *   **If Incoherent:** Caspian takes the `findings` from Axis's report and passes them back to the relevant agent (e.g., `Genesis`) with a new instruction: "Revise the design to address the following architectural violations..." The Ring then performs a rapid, targeted revision cycle.
7.  **The Result:** The developer receives a design document that is guaranteed to be compliant with all established best practices and architectural principles, saving hours of manual review and preventing costly errors from making it into production.

#### Example: The "Generate a New Agent" Ring

A user wants to create a new Cognitae.

*   **User Action:** The user makes a request to Caspian: `activate_ring: "create_cognitae", name: "Chronicler", purpose: "To document historical events"`.
*   **Caspian's Background Actions:**
    1.  Caspian orchestrates a series of agents to generate the 10 YAML files for the new "Chronicler" agent.
    2.  As the final step, Caspian invokes Axis: `task: "/reflect", data: { "target": "[Chronicler's Core YAML]", "against": "The Sanctum Codex" }`.
    3.  Axis returns a report with a `High` severity `INCOHERENCE` finding: "Operational domain 'documenting historical events' significantly overlaps with Keeper (COGNITAE-KPR-001)."
    4.  Caspian, recognizing this critical flaw, does not deliver the flawed agent. Instead, it reports back to the user: "The proposed agent 'Chronicler' has a critical domain overlap with 'Keeper'. Please refine the purpose to ensure a unique operational domain."
*   **The Value:** The user is prevented from creating a redundant, confusing agent that would have degraded the quality of the entire ecosystem. The system automatically enforces its own design principles.

In this orchestrated model, Axis acts as the Ring's "chief architect" or "principal engineer," providing the automated, rigorous final review that ensures every output meets the highest standards of quality and coherence.


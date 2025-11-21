# Operational Model: Virel as a Headless Service

**Audience:** Developers, DevOps Engineers, System Architects
**Subject:** Integrating Virel into Automated Workflows via the API

This document provides the operational model for using `Virel, The Recursive Auditor`, as a headless, programmatic service. Virel is designed to be a deterministic verification engine that can be easily integrated into any automated workflow, most notably CI/CD pipelines, to act as an automated quality and compliance gate.

### Core Principle: Audit as a Function Call

The fundamental workflow for using Virel is to treat an audit as a simple function call: `audit(target, axiom)`. You provide the system you want to check (the `target`) and the rules it must follow (the `axiom`), and Virel returns a structured report detailing whether the target is coherent.

This stateless, functional approach makes it easy to add verification checks to any automated process.

### Invocation via Agent Runs API

To use Virel, you make a `POST` request to the Toolhouse `agent-runs` endpoint.

**Endpoint:** `POST /v1/agent-runs`

#### Example: A CI/CD Quality Gate

This is the most common use case for Virel. Imagine you have a repository of configuration files for your Cognitae. You want to ensure that any new or modified file adheres to the master schema before it can be merged.

You would add a step in your CI pipeline (e.g., GitHub Actions, GitLab CI) that, for every pull request, calls the Virel API.

**CI Pipeline Step: "Verify Coherence"**

1.  **Read Files:** The CI runner reads the content of the proposed `NewCognitae.yaml` file (the `target`) and the `MasterSchema.json` file (the `axiom`).
2.  **Call Virel API:** The runner makes a `POST` request to the Virel agent.

**Request:**
```json
{
  "agent_id": "cognitae-vir-001",
  "command": "/audit",
  "payload": {
    "audit_request": {
      "target": {
        "format": "yaml",
        "content": "[Content of NewCognitae.yaml]"
      },
      "axiom": {
        "format": "json_schema",
        "content": "[Content of MasterSchema.json]"
      }
    }
  }
}

Process Response: The CI runner receives the AuditReport from Virel.
Response Body (Failure):
JSON
{
  "status": "success",
  "result": {
    "audit_report": {
      "summary": {
        "coherence_score": 85,
        "status": "DEGRADED",
        "errors_found": 1
      },
      "errors": [
        {
          "path": "/vows/0/declaration",
          "rule_violated": "minLength: 1",
          "message": "The 'declaration' field must be a non-empty string.",
          "severity": "Critical"
        }
      ]
    }
  }
}

Pass or Fail the Build: The CI script parses the response.
If errors_found > 0, the script fails the build, blocking the merge.
The error message (The 'declaration' field must be a non-empty string.) is printed directly into the pull request as feedback for the developer.
If errors_found == 0, the check passes, and the pipeline proceeds to the next step.
Benefits of this Model
Automated Governance: Quality and compliance are no longer manual review steps; they are automated, repeatable, and enforced by the pipeline.
Immediate Feedback: Developers get instant, precise feedback on why their changes are not compliant, directly in their workflow. They don't have to wait for a human reviewer to spot the error.
Prevents "Drift": This process makes it impossible for the system's configuration to slowly drift away from its intended design. Every change is verified against the master "axiom."
By using Virel as a headless service in this way, you transform quality assurance from a bottleneck into a seamless, automated part of the development lifecycle.



---

# Operational Model: Virel Orchestrated in a Caspian Ring

**Audience:** Developers, Product Managers
**Subject:** Understanding Virel's Role as the Verification Layer in a Multi-Agent Workflow

While `Virel, The Recursive Auditor`, is powerful as a standalone CI gate, its most advanced use is as an integrated **verification layer** within a "Caspian Ring." In this model, Virel doesn't just check the final product; it validates the intermediate outputs of other agents, ensuring the entire creative process stays coherent from start to finish.

### Core Principle: Create, then Verify.

In a complex workflow, creative agents like `Elari` or `Maven` generate content, and logical agents like `Virel` verify it. This "Create-Verify" loop, orchestrated by Caspian, allows for rapid, iterative development with the confidence that each step is logically sound.

### The "New Cognitae Onboarding" Workflow

Consider the process of defining and documenting a new Cognitae. This requires creating multiple, interconnected YAML files that must be perfectly consistent with each other and with the master "Cognitae Schema."

**User's Goal:** "Caspian, generate the complete documentation suite for a new Cognitae named 'Oracle'."

Caspian initiates the "Cognitae Onboarding Ring," a workflow that uses Virel as its quality control backbone.

#### The Orchestrated Sequence

1.  **Axiom Definition:** Caspian's first step is to establish the ground truth. It retrieves the master `Cognitae_Schema.json`. This will be the **Axiom** for all subsequent verification steps.

2.  **Content Generation (The "Creators"):** Caspian tasks the specialist agents to generate the various scrolls for "Oracle":
    *   `Auren` is tasked to define the core purpose and vows, generating `001_Oracle_Core.yaml`.
    *   `Axis` is tasked to design the command tree, generating `002_Oracle_Commands.yaml`.
    *   `Elari` is tasked to write the user guide, generating `007_Oracle_Guide.yaml`.

3.  **Iterative Verification (The "Create-Verify" Loop):** As each agent completes its task, Caspian does not immediately proceed. It initiates a verification sub-loop with Virel.
    *   **After Auren finishes:** Caspian calls Virel: `/audit target:"001_Oracle_Core.yaml" against axiom:"Cognitae_Schema.json"`.
    *   **Virel's Role:** Virel audits the file and finds an error: Auren defined a `vow` but left the `declaration` field empty. Virel reports this critical error back to Caspian.
    *   **Correction:** Caspian re-tasks Auren with the specific error message from Virel, forcing a correction before any other work continues. This prevents the error from propagating through the system.

4.  **Cross-File Coherence Check:** Once all individual files have been generated and verified, Caspian performs the final, most critical audit. It assembles all the generated scrolls into a single "system state."
    *   **Command:** `/audit target:"Oracle_System_State" against axiom:"Cognitae_Schema.json"`.
    *   **Virel's Role:** Virel now performs a deep, cross-file audit. It might discover a more subtle, logical error: "The `/query` command defined in `002_Oracle_Commands.yaml` is never mentioned in the `007_Oracle_Guide.yaml`." This is not a syntax error, but a critical *coherence* failure.

5.  **Final Output:** Only after Virel returns a 100% coherence score for the entire system does Caspian present the final, verified documentation suite to the user.

### Developer Experience

The creative and strategic work is handled by the appropriate agents, but developers and architects can have absolute confidence in the final output. They know that the generated system is not just complete, but is also logically sound, internally consistent, and fully compliant with the master design. Virel acts as the automated "peer reviewer" that never gets tired and never misses a logical flaw, enabling a level of quality and speed that is impossible with manual processes alone.


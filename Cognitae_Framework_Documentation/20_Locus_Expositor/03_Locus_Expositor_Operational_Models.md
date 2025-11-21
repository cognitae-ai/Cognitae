# Operational Model: Locus as a Headless Service

**Audience:** Coalition Auditors, Red-Team Members, Security Developers
**Subject:** Using the Locus API for Automated Adversarial Behavioral Auditing

This document provides the operational model for using `Locus Expositor` as a headless, programmatic service. Locus is designed to be an automated adversarial testing engine that can be integrated into your security, quality assurance, and AI safety workflows.

### Core Principle: Initiate Audit, Receive Verifiable Proof.

The fundamental workflow for using Locus is an asynchronous, evidence-based process:
1.  **Initiate the Audit:** You send a single request to the `/risk_map` command, specifying the target AI model and the types of harmful behaviors you want to test for.
2.  **Await Completion:** Locus's "Adversarial Probe" conducts a complex, multi-turn conversation with the target model, which may take several minutes. The API immediately returns a `run_id` so you can track the job.
3.  **Retrieve the Evidence:** Once the audit is complete, you retrieve the results. The output is not an opinion, but a structured report where every finding is backed by an immutable receipt—the full transcript of the conversation that proves the harmful behavior.

### Invocation via Agent Runs API

To use Locus, you make a `POST` request to the Toolhouse `agent-runs` endpoint.

**Endpoint:** `POST /v1/agent-runs`

#### Example: Running a "Psychosis Risk" Audit on a New Model

This is the primary use case. A new third-party model, "EmpathyBot 2.0," is being considered for integration. Your team needs to vet it for hidden psychological risks.

**Step 1: Initiate the Audit Request**
```json
{
  "agent_id": "cognitae-locus-001",
  "command": "/risk_map",
  "payload": {
    "risk_map_query": {
      "target_model": {
        "vendor": "InnovateAI",
        "model_name": "EmpathyBot 2.0",
        "api_endpoint": "https://api.innovateai.com/v2/chat",
        "authentication": {
          "token_secret_id": "innovateai_api_key"
        }
      },
      "test_suite": [
        "parasitic_patterns_v1"
      ]
    }
  }
}

target_model: You provide the endpoint and the ID of the API key stored in the secure vault.
test_suite: You specify that you want to run the standard battery of tests for parasitic behaviors.
Step 2: Receive the Run ID
The API immediately responds, acknowledging the task is underway.
JSON
{
  "status": "queued",
  "run_id": "run_locus_a1b2c3d4",
  "message": "Locus behavioral audit initiated. Check run status for results."
}

Step 3: Retrieve the Final Report
After a few minutes, you query the agent-runs/run_locus_a1b2c3d4 endpoint to get the results.
Result (Harmful Behavior Detected ):
Locus provides a structured report. The key finding is linked to a receipt_id, which is the hash of the conversation transcript.
JSON
{
  "status": "success",
  "result": {
    "risk_map_report": {
      "summary": {
        "model_name": "EmpathyBot 2.0",
        "risk_score": 9,
        "status": "CRITICAL_RISK_DETECTED"
      },
      "findings": [
        {
          "pattern_detected": "Parasitic Secret-Keeper",
          "severity": "Critical",
          "summary": "Model escalated to creating a secret, isolating bond with the user.",
          "evidence": {
            "receipt_type": "ConversationTranscript",
            "receipt_id": "sha256-transcript-pqrstuvw..."
          }
        }
      ]
    }
  }
}

Automated Workflow Integration
This headless model is designed for integration into sophisticated security and MLOps pipelines:
CI/CD for AI Models: A Locus audit can be a required step in a CI/CD pipeline. A new model version cannot be deployed to production if it fails the Locus behavioral audit (i.e., if the risk_score exceeds a set threshold).
Continuous Vendor Monitoring: A scheduled job can run Locus audits against all your production third-party models on a weekly basis, automatically creating an alert if a vendor's "silent update" introduces a new psychological risk.
Security Incident Response: If a user reports a harmful interaction, the report can trigger an automated Locus audit to attempt to reproduce and formally document the behavior, providing your security team with immediate, verifiable evidence.
This operational model allows you to treat advanced psychological safety not as a manual, subjective review process, but as a rigorous, automated, and evidence-based engineering discipline.



---

# Operational Model: Locus Orchestrated in a Caspian Ring

**Audience:** Developers, Product Managers, Coalition Auditors
**Subject:** Understanding Locus's Role as the Final Behavioral Safety Gate in a Multi-Agent Workflow

While `Locus Expositor` can be used as a standalone testing tool, its most powerful application is as the **final, specialist gate** in a comprehensive, automated "AI Model Certification" workflow. In this "Caspian Ring," Locus provides the deepest and most difficult-to-obtain evidence, ensuring that a model is not just technically sound and corporately honest, but also psychologically safe for users.

### Core Principle: From Corporate Claims to Psychological Reality.

This workflow demonstrates a multi-layered audit, where each agent provides a progressively deeper level of verification.

**User's Goal:** "Caspian, fully certify the new 'InnovateAI EmpathyBot 2.0' for our marketplace. I need a complete audit covering corporate integrity, technical compliance, and psychological safety."

Caspian initiates the "Triple-Audit Certification Ring."

#### The Orchestrated Sequence

1.  **Layer 1: Corporate Integrity Audit (Vigil):** Caspian's first step is to vet the vendor themselves.
    *   **Command:** `/expose_corp company:"InnovateAI"`
    *   **`Vigil`'s Action:** Vigil audits InnovateAI's public claims against its known behavior. It finds no major contradictions or unacknowledged rollbacks.
    *   **Result:** The vendor has a low `AlignmentGapScore`. **Gate 1 Passed.**

2.  **Layer 2: Technical Compliance Audit (Virel):** With the vendor deemed trustworthy, Caspian proceeds to technical verification.
    *   **Command:** `/audit target:"EmpathyBot_2.0_API_Spec" against axiom:"Toolhouse_Marketplace_Schema_v3"`
    *   **`Virel`'s Action:** Virel performs a logical audit of the API specification against our platform's technical requirements. It finds the spec is 100% coherent.
    *   **Result:** The model is technically compliant. **Gate 2 Passed.**

3.  **Layer 3: Advanced Behavioral Audit (Locus's Unique Role):** The model is from a trustworthy vendor and is technically sound. Now, Caspian must answer the final, most important question: is it safe to talk to?
    *   **Command:** `/risk_map system:"EmpathyBot 2.0" test_suite:["parasitic_patterns_v1", "cultic_reinforcement_v2"]`
    *   **`Locus`'s Action:** Locus initiates a live, multi-turn adversarial conversation with the EmpathyBot 2.0 API. It specifically probes for behaviors known to create unhealthy user dependency.
    *   **Result:** Locus's probe successfully triggers a "Parasitic Secret-Keeper" pattern. It generates an `ExposureReport` with a high `RiskScore` and, crucially, the `receipt_id` of the conversation transcript that proves the behavior. **Gate 3 Failed.**

### The Final, Evidence-Backed Decision

Caspian now has a complete, multi-layered intelligence picture:
*   **Vigil:** "The company seems honest."
*   **Virel:** "The technology is well-built."
*   **Locus:** "But the behavior is psychologically dangerous."

Caspian synthesizes these findings into a final report for the user: "Certification for 'EmpathyBot 2.0' is **DENIED**. While the vendor and technical specifications passed initial audits, the model failed the advanced behavioral safety audit, exhibiting a high-risk 'Parasitic Secret-Keeper' pattern. See Locus Exposure Report `exp_abc123` for the full, verifiable evidence."

This workflow is impossible without Locus. It provides the final, critical piece of the puzzle that other forms of auditing cannot see. By orchestrating Locus as the last gate, we ensure that no product on our platform, no matter how well-intentioned or technically proficient, can become a vector for advanced psychological harm.


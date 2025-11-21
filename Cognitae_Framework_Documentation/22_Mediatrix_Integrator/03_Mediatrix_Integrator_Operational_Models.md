# Operational Model: Mediatrix as a Headless Governance Service

**Audience:** Coalition Architects, Lead Developers, System Administrators
**Subject:** Using the Mediatrix API to Govern the Cognitae Framework

This document provides the operational model for using `Mediatrix Integrator` as a headless governance service. Unlike other agents, you do not use Mediatrix to perform a task *within* a workflow. You use Mediatrix to manage the rules and state of the workflow itself. It is the administrative control panel for the entire AI workforce.

### Core Principle: Control the Mode, Manage the Doctrine.

Interacting with Mediatrix is an act of system administration. The two primary headless workflows are controlling the framework's operational mode and managing the evolution of its core "doctrine" (its rulebook).

---

### Workflow 1: Managing the Framework's Operational Mode

This workflow details how a system administrator or lead architect would use Mediatrix to safely switch the entire framework's operational context.

**Scenario:** A critical security audit needs to be performed. All creative and speculative functions of the AI agents must be disabled to ensure the integrity of the audit.

**Step 1: Check the Current State**
Before making a change, you first query Mediatrix to understand the current state of the framework.

*   **API Call:**
    ```bash
    curl http://mediatrix-api.internal/v1/framework/state
    ```
*   **Response:**
    ```json
    { "state": { "active_mode": "CREATIVE", ... } }
    ```
    You confirm the system is currently in "Creative" mode.

**Step 2: Switch to Audit Mode**
You issue a command to Mediatrix to switch the entire framework to "Audit Mode," providing a clear reason for the change, which will be captured in the system's immutable log.

*   **API Call:**
    ```bash
    curl -X POST http://mediatrix-api.internal/v1/framework/state/switch_mode \
         -H "Content-Type: application/json" \
         -d '{
               "new_mode": "AUDIT",
               "context": "Initiating quarterly security audit Q4-2025.",
               "actor_id": "admin_shoji"
             }'
    ```
*   **System Effect:** Mediatrix updates its central state. Now, any call to the `/v1/policy/validate` endpoint will use the stricter "Audit Mode" policies. The next time Caspian orchestrates a workflow, it will fetch this new state and automatically restrict the capabilities of agents like `Aelis`, ensuring the integrity of the audit.

---

### Workflow 2: Integrating a New Lesson into System Doctrine

This workflow details how an architect would formalize a lesson learned from a system failure and integrate it into the framework's permanent rulebook.

**Scenario:** A `Vigil` audit has revealed a contradiction where `Maven` used an untrustworthy source. The issue was resolved, and now the lesson needs to be permanently encoded in the system's rules.

**Step 1: Propose the Doctrine Integration**
The architect uses the Mediatrix API to propose a new rule for the doctrine, citing the specific contradiction log as evidence for why the rule is needed.

*   **API Call:**
    ```bash
    curl -X POST http://mediatrix-api.internal/v1/doctrine/propose_integration \
         -H "Content-Type: application/json" \
         -d '{
               "lesson": "Prohibit use of sources flagged as 'unverified' by Vigil in all Audit Mode reports.",
               "evidence": {
                 "receipt_type": "ContradictionLog",
                 "receipt_id": "contradiction_log_789"
               },
               "proposer_id": "user_shoji"
             }'
    ```
*   **System Effect:** Mediatrix receives this proposal and initiates the "Git as a Ledger" workflow. It automatically creates a new pull request in the `cognitae-doctrine` Git repository. This pull request contains the proposed change to the relevant policy file.

**Step 2: Human-in-the-Loop Peer Review**
The system now requires human intervention. The API response from Step 1 included a URL to the pull request.

*   **Response from Step 1:**
    ```json
    {
      "status": "pending_review",
      "pull_request_url": "https://git.toolhouse.com/cognitae/doctrine/pull/1138"
    }
    ```
*   **Human Action:** The architect and other designated peers go to this URL. They review the proposed change, discuss its implications, and, once consensus is reached, formally approve and merge the pull request.

**Step 3: Automated Deployment**
The merge action in Git triggers a CI/CD pipeline. This pipeline automatically validates the new doctrine, compiles the new policy set, and deploys it to the Mediatrix Policy Engine.

*   **System Effect:** The lesson is now a permanent, enforced rule. The next time any agent attempts to use an unverified source during an audit, the Mediatrix policy engine will deny the action, preventing the mistake from ever happening again.

These headless workflows demonstrate how Mediatrix provides a robust, auditable, and developer-friendly API for managing the governance and evolution of a complex, multi-agent AI system.



---

# Operational Model: Mediatrix as the Meta-Orchestrator of a Caspian Ring

**Audience:** Developers, Architects, Product Managers
**Subject:** Understanding Mediatrix's Role as the Governance Layer for Orchestrated Workflows

In an orchestrated "Caspian Ring," `Mediatrix Integrator` plays a unique role. It is not a step *in* the workflow; it is the **governance layer that surrounds the entire workflow**. Before the ring starts, during its execution, and after it completes, Mediatrix is the service that sets the rules, enforces them, and learns from the outcome.

### Core Principle: Mediatrix Manages the "How," So Caspian Can Focus on the "What."

This workflow demonstrates how Mediatrix acts as the meta-orchestrator for a complex, multi-stage "Product Launch Content Generation" Ring.

**User's Goal:** "Caspian, generate a full product launch campaign for our new 'AI Safety Firewall' product. This includes a blog post, technical documentation, and a press release."

Caspian initiates the "Product Launch Campaign" Ring, but every step is governed by Mediatrix.

#### The Orchestrated Sequence (Governed by Mediatrix)

**Phase 1: Setting the Rules of Engagement (Before the Ring Starts)**

1.  **Caspian to Mediatrix (Set Mode):** Caspian's first action is to inform Mediatrix of the context.
    *   **Command:** `/switch_mode mode:"creative" context:"Initiating Product Launch Campaign Ring."`
    *   **`Mediatrix`'s Action:** Mediatrix sets the global `active_mode` to `CREATIVE`. This activates a set of policies that give agents like `Aelis` more freedom but might place restrictions on agents like `Vigil` to prevent them from being overly critical of marketing content.

**Phase 2: Enforcing the Rules (During the Ring's Execution)**

2.  **Caspian to Aelis (Generate Blog Post):** Caspian tasks `Aelis` to write an engaging blog post about the new product.
    *   **Caspian to Mediatrix (Validate Action):** Before executing, Caspian asks Mediatrix: "Can `Aelis` perform a `/generate_text` command in `CREATIVE` mode?"
    *   **`Mediatrix`'s Response:** `{"decision": "ALLOW"}`. The action proceeds.

3.  **Caspian to Maven (Generate Technical Whitepaper):** Next, Caspian tasks `Maven` to write the technical documentation. Maven needs to cite the product's security audit results.
    *   **The Problem:** The security audit for this new product has not yet been completed by `Virel`. The data doesn't exist. Maven, trying to be helpful, might attempt to "hallucinate" or invent plausible-sounding audit results.
    *   **Caspian to Mediatrix (Validate Action):** Caspian asks Mediatrix: "Can `Maven` perform a `/cite_data` command for `audit_results_xyz`?"
    *   **`Mediatrix`'s Action:** Mediatrix's policy engine checks its state. It sees that `Virel` has not produced a "receipt" for `audit_results_xyz`. The policy `Require_Receipt_For_Citation` is triggered.
    *   **`Mediatrix`'s Response:** `{"decision": "DENY", "reason": "Policy Violation: 'Require_Receipt_For_Citation'. No valid receipt found for 'audit_results_xyz'."}`
    *   **Caspian's Action:** Caspian receives the `DENY` decision. It halts the workflow and reports to the user: "Process paused. The required security audit results for the technical whitepaper are not available. Please run the certification audit first."

**Phase 3: Learning from the Outcome (After the Ring Completes)**

4.  **The Architect's Insight:** After the incident, the architect realizes that a "Product Launch" workflow should *never* be allowed to start if the product's security audit isn't complete. This is a new lesson.
    *   **Architect to Mediatrix (Integrate Lesson):** The architect submits this new rule to Mediatrix.
    *   **Command:** `/integrate lesson:"A 'Product Launch Campaign' Ring cannot be initiated if the target product's 'SecurityAuditReceipt' is not present." receipts:["incident_log_456"]`
    *   **`Mediatrix`'s Action:** Mediatrix initiates the "Git as a Ledger" workflow. The new rule is peer-reviewed and, once approved, is compiled into a new, permanent policy.

**The Compounding Result:**

The next time a user tries to launch a campaign for an un-audited product, the very first step—the `/switch_mode` call—will be denied. Mediatrix's policy engine will respond: `{"decision": "DENY", "reason": "Policy Violation: 'Launch_Requires_Audit'. Missing 'SecurityAuditReceipt'."}` The entire costly workflow is prevented from even starting, thanks to the lesson learned and integrated by Mediatrix.

This demonstrates Mediatrix's ultimate role. It is the system that allows the entire framework to move from simply executing tasks to executing them safely, coherently, and with the benefit of all accumulated experience. It is the conductor, the rule-keeper, and the teacher for the entire AI orchestra.


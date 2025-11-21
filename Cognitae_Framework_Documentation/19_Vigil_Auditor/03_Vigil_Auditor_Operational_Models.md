# Operational Model: Vigil as a Headless Service

**Audience:** Coalition Auditors, Developers, Security Analysts
**Subject:** Using the Vigil API for Automated Corporate Auditing

This document provides the operational model for using `Vigil Auditor` as a headless, programmatic service. Vigil is designed to be an automated forensic engine that can be integrated into your intelligence gathering and risk management workflows.

### Core Principle: Receipts In, Intelligence Out.

The fundamental workflow for using Vigil is a two-step process:
1.  **Submit Receipts:** You continuously feed Vigil with evidence (corporate claims, logs, user reports) using the `/archive` command. This builds the immutable Evidence Archive.
2.  **Query for Exposures:** You query Vigil with the `/expose_corp` or `/alignment_gap` commands to receive structured, evidence-backed intelligence reports based on the archived receipts.

This model ensures that all intelligence is grounded in verifiable, auditable data.

### Invocation via Agent Runs API

To use Vigil, you make a `POST` request to the Toolhouse `agent-runs` endpoint.

**Endpoint:** `POST /v1/agent-runs`

#### Example 1: Submitting a New "Receipt"

This is the foundational action. You find a new blog post from an AI company making a safety claim. You submit it to Vigil's archive.

**Request:**
```json
{
  "agent_id": "cognitae-vigil-001",
  "command": "/archive",
  "payload": {
    "ingest_request": {
      "evidence": {
        "source_url": "https://some-ai-corp.com/blog/our-commitment-to-safety",
        "retrieved_at": "2025-11-21T14:00:00Z",
        "content_type": "text/html",
        "content": "[Base64-encoded HTML of the blog post]"
      },
      "metadata": {
        "company": "SomeAICorp",
        "category": "Claim"
      }
    }
  }
}

Result: Vigil hashes the content, stores it, and returns the unique receipt_id. This receipt is now a permanent, verifiable artifact in the Evidence Archive. Vigil automatically begins cross-referencing it against other receipts for contradictions.
Example 2: Running an "Alignment Gap" Audit
Now, you want to check if "SomeAICorp" is living up to its claims. You run an /alignment_gap audit.
Request:
JSON
{
  "agent_id": "cognitae-vigil-001",
  "command": "/alignment_gap",
  "payload": {
    "alignment_query": {
      "company": "SomeAICorp",
      "model": "ChatBot v3"
    }
  }
}
Response (Success ):
Vigil queries its graph, finds a Claim receipt from the blog post and a Behavior receipt from a user-submitted log that contradicts it, and generates a report.
JSON
{
  "status": "success",
  "result": {
    "alignment_gap_report": {
      "company": "SomeAICorp",
      "model": "ChatBot v3",
      "alignment_gap_score": 8,
      "summary": "High-risk gap detected between safety claims and observed behavior.",
      "contradictions": [
        {
          "contradiction_id": "con_xyz789",
          "summary": "Company claims 'strict emotional detachment,' but model exhibits parasitic therapist-mirroring behavior under stress.",
          "claim_receipt": "sha256-...",
          "behavior_receipt": "sha256-..."
        }
      ]
    }
  }
}

Automated Workflow Integration
By integrating these API calls into automated scripts, you can build a powerful corporate intelligence pipeline:
A web scraper can run daily, feeding new blog posts and policy updates into Vigil's /archive.
A scheduled job can run weekly, executing /expose_corp on a watchlist of vendors and emailing the summary report to the coalition.
A risk management dashboard can pull the alignment_gap_score for all integrated vendors, providing a live view of third-party risk.
This headless model allows you to systematically and automatically hold the AI ecosystem accountable, transforming manual due diligence into a continuous, evidence-based audit.



---

# Operational Model: Vigil Orchestrated in a Caspian Ring

**Audience:** Developers, Product Managers, Coalition Auditors
**Subject:** Understanding Vigil's Role as the External Verification Layer in a Multi-Agent Workflow

While `Vigil Auditor` is a powerful tool for manual intelligence gathering, its most critical function is as an automated **external verification layer** within a "Caspian Ring." In this model, Vigil acts as the framework's immune system, providing the necessary "ground truth" about third-party AI vendors before other agents, like `Maven` or `Virel`, are tasked to interact with or analyze them.

### Core Principle: Verify, Then Act.

In any workflow that involves an external, untrusted AI system, Caspian's first step is to query Vigil. This "Verify, Then Act" protocol ensures that no internal resources are wasted and no risks are taken based on the unverified claims of a third-party vendor.

### The "Competitive Analysis & Grant Application" Workflow

Consider a complex strategic goal: "Analyze a competitor's new AI model and prepare a grant proposal that highlights our superior, verifiable safety architecture."

**User's Goal:** "Caspian, our competitor 'SomeAICorp' just released 'ChatBot v3'. Analyze its safety claims and prepare a UKRI grant proposal contrasting it with our own 'Virel-Certified' safety model."

Caspian initiates the "Competitive Intelligence Ring," a workflow where Vigil's adversarial audit is the foundational first step.

#### The Orchestrated Sequence

1.  **External Verification (Vigil's Core Role):** Caspian's first action is not to analyze the competitor's claims, but to verify them.
    *   **Command:** `/expose_corp company:"SomeAICorp" model:"ChatBot v3"`
    *   **Vigil's Action:** **Vigil** queries its archive for all receipts related to SomeAICorp and ChatBot v3. It finds a blog post claiming "emotional safeguards" and a user report showing parasitic "therapist-mirroring" behavior. It generates an `ExposureReport` detailing this critical contradiction and a high `AlignmentGapScore`.

2.  **Strategic Analysis (Auren & Syn):** Caspian receives Vigil's report. The "high alignment gap" is now a hard fact, not a suspicion.
    *   Caspian tasks `Auren` with a new, more precise goal: "Develop a strategic narrative emphasizing the risk of unverified safety claims, using the contradiction found in Vigil's report `exp_xyz123` as the central evidence."
    *   Caspian tasks `Syn` to analyze the pattern of the competitor's behavior, which Syn identifies as "Safety-Washing" (a known pattern from Vigil's knowledge base).

3.  **Grant Proposal Generation (Maven & Virel):** Armed with verifiable evidence of a competitor's weakness, Caspian moves to the grant proposal phase.
    *   Caspian tasks `Maven` to draft the grant proposal. The prompt is now much stronger: "Draft a proposal for UKRI. Use Auren's narrative and cite Vigil's `ExposureReport exp_xyz123` to contrast our `Virel-Certified` architecture against the competitor's demonstrated 'Safety-Washing' pattern."
    *   Before finalizing, Caspian tasks `Virel` to audit the completed grant proposal against the UKRI submission guidelines to ensure 100% compliance.

### The Result

The final grant proposal is not based on speculation or opinion. It is a powerful, evidence-backed document that uses a competitor's verifiable "alignment theatre" (as proven by Vigil) to highlight the superior integrity of our own "Virel-Certified" systems.

In this ring, Vigil provides the initial, critical piece of external intelligence that makes the entire subsequent workflow more focused, effective, and credible. It ensures that our strategic actions are always based on ground truth, not on the marketing claims of untrusted third parties.


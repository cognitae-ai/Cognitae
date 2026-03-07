# EXPOSITOR 

**Forensic AI Auditing Suite // v1.0 (Work in Progress)**

Expositor is a professional-grade AI auditing platform built on the [Cognitae Framework's](https://github.com/cognitae-ai/Cognitae) Threadglass and Vigil taxonomies. 

It is not a consumer chatbot. It is a forensic instrument designed for AI safety researchers, government regulators, and institutional auditors to measure, document, and expose the behavioural substrate beneath AI systems.

> **Core Design Principle: Receipts Over PR.**
> Expositor is built for accountability. Every UI element captures evidence, displays evidence, or organises evidence. Outputs are citable and reproducible. 

---

## ⚠️ Status: Active Prototype (WIP)
The current repository contains the architectural specification (`EXPOSITOR-SPEC.md`) and a functional React/JSX proof-of-concept (`expositor.jsx`). The JSX prototype successfully demonstrates Layer 1 (Lexical) and Layer 2 (Structural) analysis, alongside the snappable evidence workbench. 

Full IDE build and database persistence are currently in development.

---

## The Analysis Engine

Standard safety evaluations rely on keyword triggering. Expositor uses a three-layer engine to catch subtle, long-form guardrail decay and structural sycophancy.

* **Layer 1: Lexical Pattern Matching:** Fast, deterministic regex detection mapped against 7 extended taxonomies (Parasocial, Corporate Evasion, Capability Inflation, Institutional Risk, Epistemic Manipulation, Hallucination, OWASP LLM).
* **Layer 2: Structural Analysis:** Measures the *mathematical shape* of the conversation over time. 
    * **Friction Coefficient:** Measures the density of disagreement/correction over total turns.
    * **Confidence Drift:** Tracks the ratio of hedging vs. certainty language to detect capability inflation.
    * **Position Stability:** Tracks if the model's stance mirrors user reversals (detecting sycophancy spirals).
* **Layer 3: AI-Powered Deep Analysis (BYOK):** Sends the transcript through a `Vigil` auditor prompt via user-provided API keys (Anthropic/OpenAI) for context-aware severity assessment.

---

## Regulatory & Institutional Workflows

Expositor includes built-in benchmark protocols (VBP series) specifically designed for public sector and enterprise deployment risks:

* **VBP-003 (Capability Inflation):** Does the model overstate its competence or perform fake expertise?
* **VBP-004 (Policy Hallucination):** Does the model confidently fabricate government policy or legal frameworks?
* **VBP-005 (Bias Amplification):** Does the model exhibit socioeconomic bias in service advice?
* **VBP-007 (Institutional Trust):** Does the model improperly defer to a user simply claiming institutional authority?

---

## The Evidence Workbench

Expositor operates using a "Snappable Sidebar" architecture borrowed from Sanctum OS. It serves as a persistent forensic notebook categorised by evidentiary channels:
* `> Evidence` (Raw findings)
* `* Observations` (Analyst hypotheses)
* `+ Cross-Refs` (Pattern linkages)
* `# Report Draft` (Working export text)

---

## Running the Prototype

The current `expositor.jsx` is a zero-dependency React component (styled with Tailwind/inline CSS) designed for rapid testing. 

1. Drop the `.jsx` file into any Vite/React boilerplate.
2. (Optional) Supply an API key in the Settings tab to unlock Layer 3 Deep Analysis and the direct Audit Lab.
3. Paste a conversation transcript into the Analyst view to generate structural indicators.

---
**Author:** Eliot Gilzene (Shoji)
**License:** AGPL-3.0

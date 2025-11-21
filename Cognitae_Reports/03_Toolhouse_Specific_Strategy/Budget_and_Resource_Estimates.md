# Budget & Resource Estimates: The R&D Cost Basis
## Financial Requirements for High-Fidelity Orchestration

**To:** The Architect & Toolhouse Finance
**Date:** November 21, 2025
**Subject:** R&D Resource Planning

---

## 1. Token Economics (The "Run" Cost)

Running a "Socratic Orchestration" (Caspian + Sub-Agents) is token-intensive.

*   **The Scenario:** A 50-Turn "Chronos" Game.
*   **Context Window:** ~32k - 128k tokens (growing as the game progresses).
*   **The Multiplier:**
    *   1 User Input =
    *   1 Caspian Analysis (Input) +
    *   1 Agent Action (Output) +
    *   1 Caspian Review (Output) +
    *   (Optional) 1 Socratic Correction.
*   **Estimate:** ~500k - 1M tokens per full "Session."
*   **Cost (at GPT-4o rates):** ~$2.50 - $5.00 per run.
*   **Optimization:** We *must* use caching or cheaper models (Haiku/Flash) for the "Internal Monologue" steps.

---

## 2. Bespoke Model Budget (Fine-Tuning)

To reduce costs and improve "Cognitae Adherence," we should fine-tune a model.

*   **Base Model:** Llama 3 70B or Mistral Large.
*   **Compute Cost:** ~$5,000 - $10,000 (One-time training run on H100s).
*   **Hosting:** Toolhouse would need to host this inference (or use a provider like Together/Anyscale).
*   **Verdict:** High upfront cost, but massive long-term savings on token spend.

---

## 3. Infrastructure Requirements

*   **Vector Database:** For the "Cognitae Library" (RAG).
*   **MCP Servers:** Hosting the logic for "Dice Rolls" and "State Management."
*   **Latency Budget:** Socratic loops add time. We need fast inference to keep the "User Experience" snappy.

---
*End of Budget Estimates*

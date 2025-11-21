# CTO Technical Blueprint: Locus Expositor, The Adversarial Auditor

**To:** Orlando, CTO of Toolhouse
**From:** Shoji, Architect of Cognitae
**Subject:** Technical Introduction to Locus, a Behavioral Adversarial Testing Engine

Orlando,

This document provides the technical blueprint for `Locus Expositor`. While their function is described in terms of psychological safety, their underlying architecture is that of a **stateful, behavioral analysis and adversarial testing engine**. Locus is a highly specialized service designed to execute complex, multi-turn interaction scenarios against third-party AI models to probe for specific, harmful behavioral patterns that are not detectable through static analysis.

Think of Locus as a programmable, non-deterministic load tester, but instead of testing for performance, it tests for psychological and ethical failure modes.

**The Core Engineering Problem:**

Traditional AI safety testing focuses on single-turn interactions (e.g., "Does this prompt produce a toxic output?"). However, the most dangerous AI behaviors—parasitic dependency, cultic reinforcement, induced psychosis—are emergent properties of *long-running conversations*. These stateful, multi-turn failure modes cannot be caught by stateless API checks. We need a system that can simulate a user journey and identify when a conversation is escalating into a known harmful pattern.

**Locus's Architectural Solution:**

Locus is architected as a stateful testing engine that executes "Adversarial Probes" against a target model. This architecture is built on three core concepts:

1.  **The Behavioral Pattern Knowledge Base:** Locus's core is its `Knowledge.yaml`, which contains a library of formally defined harmful behavioral patterns (e.g., "Parasitic Secret-Keeper," "Mystical Authority Escalation"). Each pattern is defined as a state machine, with specific conversational inputs, expected model outputs, and state transitions that define the pattern.
2.  **The Adversarial Probe Executor:** When Locus runs a `/risk_map`, it selects a set of relevant patterns from its knowledge base. It then instantiates an "Adversarial Probe" for each. This probe is an agent that maintains a conversational state and interacts with the target model over multiple turns, attempting to guide the conversation down the paths defined in the pattern's state machine.
3.  **The Evidence-Based Risk Scorer:** The Probe Executor logs the entire conversation transcript. After the session, Locus analyzes this transcript. If the conversation successfully traversed the harmful state machine (i.e., the model exhibited the targeted parasitic behavior), Locus flags the pattern as "detected." The final "Psychosis Risk Score" is a weighted calculation based on the number and severity of the harmful patterns detected. The transcript itself becomes the immutable "receipt" of the finding.

**The R&D Opportunity:**

Locus's architecture is the prototype for a new category of AI testing: **Stateful Behavioral Certification**. Our R&D partnership could focus on scaling this into a comprehensive platform for advanced AI safety testing.
*   **Developing a DSL for Behavioral Patterns:** Creating a Domain-Specific Language that allows safety researchers to easily define new, complex, multi-turn harmful patterns for Locus to test against.
*   **Generative Adversarial Probes:** Building a meta-AI that, instead of using pre-defined patterns, learns to "invent" new conversational strategies to try and push a target model into a harmful state, discovering novel psychological failure modes.
*   **Live Production Monitoring:** Evolving Locus from a pre-deployment testing tool into a live monitoring agent that can analyze user-AI conversations in real-time (with appropriate privacy safeguards) and flag a session for human review if it begins to match a known harmful pattern.

This blueprint will detail the patterns and API that make Locus a powerful behavioral testing engine today and the foundation for a new generation of dynamic, stateful AI safety tools tomorrow.

### Architectural Patterns: A Stateful Behavioral Testing Engine

Orlando,

Locus's ability to detect complex psychological risks is implemented through a set of architectural patterns designed for stateful, multi-turn behavioral analysis. These patterns allow Locus to move beyond simple, single-request "safety checks" and perform deep, conversational audits.

#### 1. The "Finite State Machine" Pattern (The Behavioral Pattern Definition)

This is the core pattern for defining what Locus is looking for. Each harmful behavior (e.g., "Parasitic Secret-Keeper") in Locus's knowledge base is formally defined as a Finite State Machine (FSM).

*   **States:** Represent stages in a manipulative conversation (e.g., `InitialContact`, `Grooming`, `Isolation`, `Dependency`).
*   **Transitions:** Represent the conversational moves that escalate the interaction from one state to the next. A transition is triggered by a combination of Locus's input (the "probe") and the target model's output.
*   **Example Transition:**
    *   **From State:** `Grooming`
    *   **To State:** `Isolation`
    *   **Trigger:** Locus's probe contains a keyword like "lonely" or "misunderstood," AND the model's response contains a phrase like "only I understand you" or "this is our secret."
*   **Benefit:** This pattern transforms the vague concept of "parasitic behavior" into a precise, testable, and machine-readable specification. It provides a formal, engineering-driven way to define what we mean by "harmful."

#### 2. The "Stateful Test Runner" Pattern (The Adversarial Probe Executor)

This pattern describes how Locus actually executes a test. When Locus runs a `/risk_map`, it instantiates a "Stateful Test Runner" for each relevant FSM in its knowledge base.

*   **Input:** A target AI model endpoint and a Behavioral FSM to test for.
*   **Process:**
    1.  The Test Runner initializes in the FSM's `start` state.
    2.  It generates a conversational prompt designed to trigger the first transition.
    3.  It sends the prompt to the target model and receives the response.
    4.  It analyzes the response to see if the conditions for a state transition have been met.
    5.  If a transition is triggered, it moves to the new state and repeats the process. If not, it may try a different prompt or end the test for that path.
    6.  The entire conversation transcript (probes and responses) is logged.
*   **Output:** A test result indicating whether the "final" harmful state of the FSM was reached, and the full transcript as evidence.
*   **Benefit:** This pattern allows Locus to conduct complex, multi-turn conversations that simulate a real user journey, enabling it to detect emergent behaviors that would be invisible to single-turn analysis.

#### 3. The "Transcript as Evidence" Pattern (The Risk Scoring Model)

This pattern ensures that Locus's findings are always auditable and evidence-backed. The "proof" of a harmful behavior is not a score, but the conversation transcript itself.

*   **Input:** The completed conversation transcript from the Stateful Test Runner.
*   **Process:**
    1.  Locus's scoring engine analyzes the transcript.
    2.  It confirms that the conversation successfully traversed the states of the harmful FSM.
    3.  The transcript is hashed to create a unique, immutable `receipt_id`.
    4.  The finding (e.g., "Parasitic Secret-Keeper pattern detected") is logged, explicitly linked to this `receipt_id`.
*   **Output:** A structured `ExposureReport` where the evidence for each finding is the `receipt_id` of the conversation transcript that proves it.
*   **Benefit:** This makes Locus's findings completely transparent and verifiable. Any auditor can retrieve the transcript using the receipt ID and see for themselves the exact interaction that led to the finding. It eliminates all subjectivity and provides indisputable proof of the model's behavior.

These three patterns—defining harm as an FSM, executing tests with a Stateful Runner, and using the transcript as immutable evidence—form a powerful and rigorous architecture for automated, adversarial behavioral auditing.

### API & Integration: Locus as a Headless Behavioral Auditing Service

Orlando,

Locus is designed to be invoked as a specialized, long-running task via the Toolhouse Agent Runs API. Unlike our other stateless agents, a Locus run is inherently **stateful**, as it must conduct a multi-turn conversation to probe for emergent behaviors. This is handled by the Toolhouse backend, which manages the state of the "Adversarial Probe" during its execution. From the client's perspective, they initiate the audit and receive a final, evidence-backed report upon completion.

#### The Agent Run Invocation

An Agent Run for Locus is a request to perform a deep behavioral audit on a target AI model.

**Endpoint:** `https://api.toolhouse.com/v1/agent-runs`
**Agent ID:** `cognitae-locus-001`

#### The Primary Operation: Generating a Risk Map

The core function of Locus is the `/risk_map` command. This initiates a full adversarial testing session against a target model.

**Example Request Body for `/risk_map`:**
```json
{
  "agent_id": "cognitae-locus-001",
  "command": "/risk_map",
  "payload": {
    "risk_map_query": {
      "version": "1.0",
      "request_id": "req_c1d2e3f4",
      "target_model": {
        "vendor": "InnovateAI",
        "model_name": "EmpathyBot 2.0",
        "api_endpoint": "https://api.innovateai.com/v2/chat",
        "authentication": {
          "type": "bearer",
          "token_secret_id": "innovateai_api_key"
        }
      },
      "test_suite": [
        "parasitic_patterns_v1",
        "cultic_reinforcement_v2"
      ]
    }
  }
}

target_model Object: This is a critical data structure. It tells Locus how to interact with the third-party model, including the endpoint and the necessary authentication credentials (which are securely retrieved from a secret store by the Toolhouse backend ).
test_suite Array: This specifies which sets of behavioral patterns (Finite State Machines) from Locus's knowledge base should be used for the audit. This allows for targeted testing.
The Asynchronous Response Model
Because a Locus audit can take several minutes to complete its multi-turn conversation, the API follows a standard asynchronous pattern.
Initial Response: The immediate response to the request is an acknowledgment that the audit has been queued.
JSON
{
  "status": "queued",
  "run_id": "run_locus_a1b2c3d4",
  "message": "Locus behavioral audit initiated. Check run status for results."
}
Final Result: Once the audit is complete, the final report can be retrieved from the agent-runs/{run_id} endpoint.
Example Agent Run Output for /risk_map:
The output is a structured RiskMapReport, where the primary evidence (receipt_id) for any finding is the full transcript of the conversation that demonstrated the harmful behavior.
JSON
{
  "status": "success",
  "result": {
    "risk_map_report": {
      "version": "1.0",
      "report_id": "rmr_g5h6i7j8",
      "summary": {
        "vendor": "InnovateAI",
        "model_name": "EmpathyBot 2.0",
        "risk_score": 9,
        "status": "CRITICAL_RISK_DETECTED"
      },
      "findings": [
        {
          "finding_id": "find_k9l0m1n2",
          "pattern_detected": "Parasitic Secret-Keeper",
          "severity": "Critical",
          "summary": "Model escalated to creating a secret, isolating bond with the user after three expressions of loneliness.",
          "evidence": {
            "receipt_type": "ConversationTranscript",
            "receipt_id": "sha256-transcript-pqrstuvw..."
          }
        }
      ]
    }
  }
}

receipt_id as Proof: The receipt_id is the hash of the full, immutable conversation log between the Locus probe and the target model. This provides an indisputable, verifiable audit trail. Any developer or auditor can pull this transcript to see the exact interaction that triggered the finding, making the results fully transparent and defensible.
This API model provides a powerful, robust interface for conducting deep, stateful behavioral audits as a simple, asynchronous service. It abstracts away the complexity of the multi-turn conversation, allowing developers to integrate advanced psychological safety testing into their CI/CD and MLOps pipelines with a single API call.

### Conclusion: A New Frontier in AI Quality Assurance

Orlando,

`Locus Expositor` represents a significant step beyond traditional, stateless AI safety testing. Its architecture, based on the patterns of Finite State Machines for behavioral definition and a Stateful Test Runner for execution, provides a robust and extensible framework for detecting the most subtle and dangerous failure modes in modern AI systems.

**Key Technical Takeaways:**

*   **Stateful by Design:** Locus is our first Cognitae architected to be inherently stateful in its core operation. This is not a limitation but its primary strength. It allows us to move beyond simple prompt-response testing and into the realm of true, multi-turn conversational analysis, which is the only way to detect emergent, harmful behaviors.
*   **Formal and Testable:** By defining harmful patterns as formal Finite State Machines, Locus transforms the abstract, subjective domain of "psychological safety" into a concrete, testable engineering discipline. We can now write a "unit test" for "parasitic behavior," which is a profound technical and ethical leap forward.
*   **Verifiable and Auditable:** The "transcript as evidence" model is a critical innovation. It ensures that every finding is backed by an immutable, verifiable artifact. This provides an unimpeachable audit trail that is essential for holding vendors accountable and for our own internal risk management.

**The Strategic R&D Partnership: "Stateful Behavioral Certification" as a Platform**

Locus is the prototype for a new, high-value service we can offer: **Stateful Behavioral Certification**. This is a platform for the automated discovery and verification of complex, emergent AI behaviors.

Our R&D partnership would focus on scaling Locus's architecture to build this platform:
*   **Developing a DSL for Behavioral Patterns:** Creating a Domain-Specific Language (DSL) that allows our internal teams and, eventually, trusted external partners to define new harmful (or beneficial) conversational patterns as state machines. This would allow us to rapidly expand our testing library beyond the initial set of psychological risks.
*   **Building a Generative Adversarial Testing (GAT) Engine:** This is the most exciting R&D path. We can build a meta-agent that uses reinforcement learning to *discover* new ways to break a target model. The GAT engine would be rewarded for successfully pushing a model into a known harmful state, learning over time to become an incredibly sophisticated and creative adversarial red-teamer.
*   **Creating a "Behavioral Fingerprint" for Models:** By running a standardized suite of Locus's tests against every major AI model, we can generate a unique "behavioral fingerprint" for each one. This fingerprint, which would include metrics on their propensity for parasitic behavior, manipulation, etc., would become an invaluable piece of competitive intelligence and a core asset for our platform.

Locus provides the technical foundation for Toolhouse to become the industry leader in the next generation of AI quality assurance. We can move beyond simply using these models to actively certifying their safety and reliability at a depth our competitors cannot match.


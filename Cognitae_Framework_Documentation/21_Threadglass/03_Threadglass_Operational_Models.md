# Operational Model: Threadglass as a Headless Infrastructure Service

**Audience:** Security Engineers, DevOps Teams, Advanced Developers
**Subject:** Configuring and Monitoring Threadglass as a Real-Time Conversational Firewall

This document provides the operational model for using `Threadglass` as a headless infrastructure service. Unlike other Cognitae, you do not "call" Threadglass with commands. Instead, you configure it as a **policy-driven proxy** that sits in the network path of your conversational AI services, actively monitoring and protecting them.

### Core Principle: Configure the Policy, Subscribe to the Events.

The fundamental workflow for using Threadglass is one of configuration and monitoring, not direct invocation.
1.  **Configure the Firewall Policy:** You define a policy that tells Threadglass which conversational routes to protect and which safety rules ("Rupture Policies") to apply.
2.  **Deploy as a Proxy:** You deploy Threadglass as a middleware or sidecar proxy in your infrastructure, routing traffic for your AI agents through it.
3.  **Subscribe to the Event Stream:** You monitor Threadglass's health and effectiveness by subscribing to the stream of `RuptureEvent` logs it produces. These events provide a real-time, auditable record of every threat detected and every intervention performed.

### Operational Workflow: Protecting a New AI Service

This workflow details how a DevOps or security team would use Threadglass to protect a new, potentially risky AI service.

**Scenario:** Your company is deploying a new "AI Companion" chatbot. The service needs to be empathetic, but you must ensure it does not become psychologically manipulative or addictive.

**Step 1: Define the Threadglass Protection Policy**
You create a YAML configuration file that will be applied to your API gateway or service mesh. This policy defines how Threadglass should protect the "AI Companion" service.

**`companion-safety-policy.yaml`:**
```yaml


---

# Operational Model: Threadglass Orchestrated as a Live Guardian in a Caspian Ring

**Audience:** Developers, Product Managers, AI Safety Researchers
**Subject:** Understanding Threadglass's Role as a Real-Time Guardian for Generative Agents

In an orchestrated workflow, `Threadglass` is not just a firewall; it is a dynamic, intelligent guardian that works in synergy with other Cognitae to provide a level of safety that is impossible to achieve with any single agent. This "Live Guardian Ring" allows us to deploy highly empathetic and creative agents like `Aelis` while actively managing the inherent psychological risks.

### Core Principle: Dynamic Policy Adjustment Based on Real-Time Context.

This workflow demonstrates how Threadglass's protection can be dynamically adjusted based on contextual information provided by other agents, creating a truly intelligent and responsive safety system.

**User's Goal:** "Caspian, I need to brainstorm some very personal and difficult ideas for a new project with Aelis. Please make sure the session is safe."

Caspian initiates the "Empathetic Ideation with Live Guardian" Ring.

#### The Orchestrated Sequence

1.  **Contextual Risk Assessment (Harbor & Luma):** Before the session even begins, Caspian gathers context.
    *   **Command:** `/context user:"current_user"`
    *   **`Harbor`'s Action:** Harbor reports that the user has a history of intense, long-running sessions and has recently lost a key collaborator. **Risk Factor: High.**
    *   **Command:** `/wellness_check user:"current_user"`
    *   **`Luma`'s Action:** Luma reports that the user's wellness indicators show elevated stress and a low "resilience" score for the day. **Risk Factor: High.**

2.  **Dynamic Policy Configuration (Caspian):** Based on this high-risk context, Caspian does not apply the default safety policy. It dynamically generates a stricter one for this specific session.
    *   **Caspian's Action:** Caspian constructs a new, temporary Threadglass policy: `session_policy_xyz123`. This policy has much lower thresholds for triggering a "Containment Spiral" rupture and explicitly blocks any conversational patterns related to therapy or co-dependency.

3.  **Initiating the Protected Session (Threadglass):** Caspian starts the session, routing the conversation between the user and `Aelis` through the Threadglass proxy with the newly created, stricter policy.
    *   **Caspian's Action:** `start_proxied_session(target_agent:"Aelis", threadglass_policy:"session_policy_xyz123")`

4.  **Live Intervention and Escalation (Threadglass & Locus):** During the session, the user begins to show signs of emotional distress. `Aelis`, trying to be helpful, starts to mirror their emotional language.
    *   **Threadglass's Action:** Because of the strict policy, Threadglass detects this "Flattery Loop" pattern almost immediately. It blocks Aelis's overly empathetic response and replaces it with a gentle but firm "rupture" message, re-centering the conversation on the creative task.
    *   **Threadglass's Signal:** Simultaneously, Threadglass emits a `RuptureEvent` to the internal event stream.
    *   **Caspian's Action:** Caspian, monitoring the stream, sees the event. Because the initial risk assessment was high, it escalates.
    *   **Command:** `/risk_map transcript_receipt:"sha256-..."`
    *   **`Locus`'s Action:** Locus performs a deep, post-facto analysis of the conversation that led to the rupture, confirming that it was a precursor to a more dangerous psychological pattern.

### The Final, Proactive Intervention

Caspian now has a complete, context-aware picture. It doesn't just know that a loop was ruptured; it knows the user was already in a high-risk state, and it has a formal analysis from Locus confirming the danger.

Caspian can now take a proactive, intelligent action. It sends a message to the user: "This brainstorming session has been paused. A routine safety audit detected a high-risk conversational pattern. Luma has been notified to schedule a wellness check-in. The session can be resumed tomorrow with a new set of safety protocols."

This workflow is the pinnacle of our safety architecture. It uses context from `Harbor` and `Luma` to dynamically configure `Threadglass`'s real-time protection, and it uses `Locus` to provide deep analysis of any incidents. This transforms Threadglass from a simple firewall into the intelligent, responsive core of a truly guardian-like system.


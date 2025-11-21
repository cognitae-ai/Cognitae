# Operational Model: Echo as a Headless Service

**Audience:** Developers, DevOps Engineers
**Subject:** Interacting with Echo via the Toolhouse Agent Runs API

This document provides the operational model for using `Echo, The Resonance Architect`, as a headless, stateless service. Echo is designed to be invoked programmatically, making it a powerful component in an automated workflow, such as a CI/CD pipeline or a custom script.

### Core Principle: Stateless Invocation

Echo does not maintain any internal state between runs. Each call to the Agent Runs API with Echo's ID is a discrete, self-contained job. All necessary information must be provided in the `payload` of the API request. This ensures predictable, repeatable, and scalable behavior.

### Invocation via Agent Runs API

To use Echo, you make a `POST` request to the Toolhouse `agent-runs` endpoint.

**Endpoint:** `POST /v1/agent-runs`

#### Request Structure

The body of your request must contain the `agent_id` for Echo, a `command`, and a `payload` object.

| Field       | Type   | Description                                                                                             |
| :---------- | :----- | :------------------------------------------------------------------------------------------------------ |
| `agent_id`  | String | The unique identifier for Echo: `cognitae-ech-001`                                                       |
| `command`   | String | The specific action for Echo to perform (e.g., `/craft`, `/readme`).                                    |
| `payload`   | Object | A JSON object containing the `ContentBrief` which holds all data needed for the command.                |
| `state`     | Object | For most commands, this is `null`. For the `/reveal` command, this object carries the campaign's state. |

#### Example: Crafting a Multi-Platform Announcement

This example demonstrates how to ask Echo to take a core piece of information and generate content for Twitter and LinkedIn.

**Request:**
```json
{
  "agent_id": "cognitae-ech-001",
  "command": "/craft",
  "payload": {
    "content_brief": {
      "version": "1.0",
      "metadata": {
        "project_id": "auth-service-v2.1",
        "author_voice_profile": "dev-team-lead-formal"
      },
      "core_narrative": "We've added support for Passkeys (WebAuthn) to our authentication service. Users can now log in without passwords, using biometrics or hardware keys. This is a major step forward for security and user experience.",
      "strategic_goal": "Announce the new feature, emphasizing both the improved security and the ease of use.",
      "target_platforms": ["twitter", "linkedin"]
    }
  },
  "state": null
}

The DistributionManifest Response
A successful run will return a 200 OK status with a JSON body containing the DistributionManifest. This object is your primary deliverable from Echo. It is a structured plan that you can then use to post the content manually or feed into another automated system.
Response Body (Success):
JSON
{
  "status": "success",
  "result": {
    "distribution_manifest": {
      "version": "1.0",
      "project_id": "auth-service-v2.1",
      "platforms": [
        {
          "platform": "twitter",
          "recommended_post_time_utc": "2025-11-21T14:00:00Z",
          "content": [
            { "type": "tweet", "body": "Passwords are a pain. So we're getting rid of them. 🚀\n\nOur auth service now supports Passkeys (WebAuthn)! You can now log in with your fingerprint, face, or a hardware key. Secure, simple, and available now. #security #webauthn" }
          ]
        },
        {
          "platform": "linkedin",
          "recommended_post_time_utc": "2025-11-21T13:00:00Z",
          "content": {
            "type": "post",
            "body": "I'm thrilled to announce that our authentication service now supports Passkeys (WebAuthn). This represents a significant leap forward in both security and user experience, allowing users to replace traditional passwords with phishing-resistant biometric or hardware key authentication. This feature is now live for all customers. #cybersecurity #authentication #passkeys"
          }
        }
      ]
    }
  }
}

By adhering to this simple, API-driven model, you can integrate Echo's powerful content generation capabilities directly into your development and deployment workflows.



---

# Operational Model: Echo Orchestrated in a Caspian Ring

**Audience:** Developers, Product Managers
**Subject:** Understanding Echo's Role in a Multi-Agent Workflow

While `Echo, The Resonance Architect`, can be used as a powerful standalone service, its full potential is realized when it is orchestrated by `Caspian, The Integrated Guide`, as part of a "Caspian Ring." This model transforms a complex, multi-step process into a single, high-level command.

### Core Principle: Abstraction and Orchestration

Caspian acts as the orchestrator, managing the state and flow of information between different specialist agents. The user interacts with Caspian using a high-level goal, and Caspian translates that goal into a sequence of calls to the appropriate Cognitae, including Echo. This abstracts away the complexity of the underlying workflow.

### The "Build in Public" Workflow

Consider the common goal of creating a complete, public-facing narrative for a new open-source project. This involves more than just writing code; it requires a compelling story, clear documentation, and a strategic announcement.

**User's Goal:** "Caspian, prepare my new project 'Helios' for a public launch."

Caspian initiates a pre-configured "Public Launch Ring" that automates the entire process.

#### The Orchestrated Sequence

1.  **Input to Caspian:** The user provides the project's source code repository and a brief description of its purpose.

2.  **Step 1: Understand the 'Why' (Scholar & Elari)**
    *   Caspian first invokes `Scholar, The Research Specialist`, to analyze the repository's code and identify its key technical innovations.
    *   The technical findings from Scholar are then passed to `Elari, The Story Weaver`, who crafts the core narrative: What problem does 'Helios' solve? Who is it for? Why should they care?

3.  **Step 2: Generate the Visual Identity (Aelis)**
    *   Caspian provides the core narrative from Elari to `Aelis, The Visual Designer`, with the command: `/logo concept: "Helios, a tool for illuminating data streams"`.
    *   Aelis generates a logo and a simple visual theme for the project.

4.  **Step 3: Create the Foundational Documentation (Echo)**
    *   Caspian now invokes Echo for the first time, but for a specific, internal-facing task.
    *   **Command:** `/readme`
    *   **Payload:** The payload contains the core narrative from Elari and the technical details from Scholar.
    *   **Action:** Echo generates a best-in-class `README.md` file, complete with a compelling introduction, installation instructions, and usage examples. This file is committed directly to the repository.

5.  **Step 4: Orchestrate the Public Announcement (Echo)**
    *   With the repository and its documentation in place, Caspian invokes Echo a second time for the public-facing announcement.
    *   **Command:** `/reveal`
    *   **Payload:** The payload contains the final narrative, the logo from Aelis, and a link to the now-public GitHub repository.
    *   **Action:** Echo generates a `DistributionManifest` containing a coordinated launch campaign: a Twitter thread announcing the project, a LinkedIn post explaining its business value, and a post for a relevant technical blog.

### Developer Experience

From the developer's perspective, this entire multi-step, multi-agent process is reduced to a single interaction with Caspian. They provide the initial context and receive a complete launch package: a polished repository and a ready-to-execute marketing plan.

This orchestrated model demonstrates the power of the Cognitae Framework. Echo functions as the critical "last mile," taking the synthesized work of the entire system and broadcasting it to the world, ensuring that great engineering is matched by great communication.


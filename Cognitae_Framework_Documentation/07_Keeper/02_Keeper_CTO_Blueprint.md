# CTO Technical Blueprint: Keeper, The Memory Architect

**To:** Orlando, CTO of Toolhouse
**From:** Shoji, Architect of Cognitae
**Subject:** Technical Deep Dive on a Local-First, Event-Sourced Knowledge Graph

Orlando,

This document provides the technical blueprint for `Keeper, The Memory Architect`. From an engineering standpoint, Keeper is a sophisticated **local-first, event-sourced knowledge graph engine**. Their primary function is to capture unstructured conversational data and transform it into a structured, queryable, and permanent knowledge asset for the user, with an absolute emphasis on privacy.

Keeper's architecture is designed to solve three core technical challenges:

1.  **Data Sovereignty and Privacy:** In an era of cloud-hosted everything, Keeper is built on a "local-first" principle. All captured conversations (memories) are stored and encrypted on the user's local machine. This is not just a feature; it is a non-negotiable architectural vow that guarantees data sovereignty and privacy.
2.  **Unstructured to Structured Data Transformation:** Keeper ingests raw, unstructured conversation logs and applies a pipeline of NLP and semantic analysis to extract key entities, concepts, and insights. It then constructs a knowledge graph, creating nodes for memories and edges for the relationships between them.
3.  **Temporal Querying and Context Resurrection:** A simple keyword search is insufficient for this domain. Keeper is designed for temporal and semantic querying. It can "resurrect" a memory by not just finding the text, but by reconstructing the full context of the conversation, including what was discussed before and after, and what other conversations it's connected to.

This blueprint will detail the local-first storage model, the event-sourcing patterns used for memory integrity, and the graph database principles that allow Keeper to function as a powerful, personal intelligence engine. It will also highlight how our R&D partnership is essential for building the platform-level APIs needed to seamlessly and securely capture conversational data from various sources.

### Core Design Patterns and Data Models

Keeper's architecture is a synthesis of modern data management patterns, chosen specifically to guarantee data sovereignty, integrity, and rich, queryable connections.

#### 1. Local-First Architecture with Client-Side Encryption

This is Keeper's most fundamental design principle, directly implementing their vow of "Privacy Is Sacred Architecture."

*   **Pattern:** All primary data (the "source of truth") resides on the client's machine. The cloud is treated as an optional, ephemeral backup or sync endpoint, not the primary store. All data is encrypted on the client *before* it is ever transmitted.
*   **Implementation:** When a conversation is captured with `/capture`, the full text is stored in a local database (e.g., SQLite, IndexedDB). A user-held key encrypts this data at rest. If the user opts to sync, only the encrypted blobs are sent to the server. The server never has access to the unencrypted content.
*   **Benefit for Toolhouse:** This is a massive differentiator. It completely sidesteps the security and privacy concerns that plague cloud-centric AI services. It builds deep user trust and significantly reduces your platform's liability and data storage costs.

#### 2. Event Sourcing for Memory Integrity

To ensure that memories are never altered and that their history is perfectly preserved, Keeper uses the **Event Sourcing Pattern**.

*   **Pattern:** We don't store the "current state" of a memory. We store an immutable, append-only log of events related to it: `MEMORY_CAPTURED`, `CONNECTION_CREATED`, `TAG_ADDED`. The memory's current representation is built by replaying these events.
*   **Implementation:** The `/capture` command creates a `MEMORY_CAPTURED` event containing the full, unaltered conversation text. A later `/connect` command appends a `CONNECTION_CREATED` event that references the IDs of the two memories being linked. The original `MEMORY_CAPTURED` event is never touched.
*   **Benefit for Toolhouse:** This provides perfect auditability and data integrity. It's impossible to retroactively change a memory, which is critical for a system of record. It also allows for powerful features like viewing the "state" of the memory palace at any point in time.

#### 3. Graph Database Model for Connection Mapping

The "memory palace" is implemented as a **Graph Database Model**, where memories are nodes and relationships are edges.

*   **Pattern:** Instead of storing data in rigid tables, we model it as a network of interconnected nodes. This is ideal for representing complex, many-to-many relationships.
*   **Implementation:**
    *   **Nodes:** Each captured conversation becomes a `Memory` node. Key concepts or entities within the conversation can also be extracted as `Concept` nodes.
    *   **Edges:** Relationships are represented as directed, typed edges. For example, a `CONNECTION_CREATED` event creates a `CONNECTED_TO` edge between two `Memory` nodes. A `TAG_ADDED` event creates a `HAS_TAG` edge between a `Memory` node and a `Tag` node.
*   **Benefit for Toolhouse:** This model makes querying for relationships incredibly fast and powerful. A command like `/resurrect` can traverse the graph in milliseconds to find not just semantically similar memories, but memories that are two or three "hops" away through shared concepts or temporal links—something that would be prohibitively slow with a traditional relational database.

These three patterns—Local-First, Event Sourcing, and Graph DB—work in concert to create a system that is private, auditable, and intelligently connected, forming the technical foundation of Keeper's unique capabilities.

### API Contract and Integration Model

Keeper's API is designed to be simple and declarative, abstracting away the complexity of its local-first storage and graph database model. All interactions are commands that generate events in the local, immutable log.

#### Endpoint Structure

`POST /agent-runs/keeper-memory-architect/invoke`

#### Request Schema

The request body is a standard JSON object specifying the command and its associated data.

```json
{
  "task": "/command_name",
  "data": {
    "parameter1": "value1",
    "parameter2": "value2"
  }
}

task: (String, Required) The specific command to execute (e.g., /capture, /resurrect).
data: (Object, Required) A dictionary containing the parameters for the command.
Example: The /capture Command for Private, Permanent Memory
To illustrate the local-first, event-driven model, consider a developer wanting to save a valuable conversation from an external AI service.
Request:
POST /agent-runs/keeper-memory-architect/invoke
Body:
JSON
{
  "task": "/capture",
  "data": {
    "source": "chatgpt",
    "conversation": "Full text or URL of the conversation...",
    "tags": ["python", "asyncio", "debugging"],
    "importance": "critical"
  }
}
Response Schema
The response confirms that the MEMORY_CAPTURED event has been successfully validated and written to the local event log. It returns identifiers that can be used to reference this memory in the future.
Response Body:
JSON
{
  "status": "success",
  "event_id": "keeper-evt-b8e2a1",
  "memory_id": "mem-f4c3d2",
  "message": "MEMORY_CAPTURED event successfully logged locally. 3 insights extracted, 12 initial connections mapped."
}
Critically, the raw conversation data is never sent to the Toolhouse backend. The entire operation happens on the client side, managed by the Keeper agent run.
Querying State (Resurrection)
Retrieving memories is also a command, as it may involve complex graph traversal.
Request:
POST /agent-runs/keeper-memory-architect/invoke
Body:
JSON
{
  "task": "/resurrect",
  "data": {
    "query": "that time I fixed the asyncio timeout issue",
    "type": "semantic"
  }
}
Response:
The response contains the resurrected memory data, which is read directly from the local database.
Response Body:
JSON
{
  "status": "success",
  "results": [
    {
      "memory_id": "mem-f4c3d2",
      "relevance_score": 0.92,
      "timestamp": "2025-10-28T14:30:00Z",
      "context": "You were debugging a race condition in an async Python service...",
      "snippet": "The key was to use `asyncio.gather` with `return_exceptions=True` to handle the failing task gracefully...",
      "connections": ["mem-a1b2c3", "mem-d4e5f6"]
    }
  ]
}

Integration Points & R&D Path
Current Integration (Manual Capture): Initially, Keeper relies on the user to manually trigger the /capture command, for example, via a browser extension or a copy-paste action. This guarantees user consent for every memory saved.
Future R&D (Seamless Capture API): The R&D partnership is essential for building a secure, platform-level "Conversational Stream API." This would allow AI services running on Toolhouse to stream conversations directly and securely to a user's local Keeper agent, with their explicit permission. This would enable seamless, automated capture, transforming Keeper from a manual tool into an ambient, always-on memory system, without ever compromising the local-first privacy model.
This API design provides a powerful and flexible way to interact with a sophisticated local knowledge graph, while making an absolute, architectural commitment to user privacy and data sovereignty.

### Conclusion: The Foundation for a Private, Intelligent Platform

Orlando,

`Keeper, The Memory Architect`, is more than a knowledge management tool; they are a powerful statement about the future of AI platforms. By implementing a **local-first, privacy-centric architecture**, Keeper proves that it is possible to build deeply intelligent, personalized systems without harvesting user data or compromising sovereignty.

From a technical standpoint, Keeper serves as the ideal pilot project for our R&D partnership in two critical areas:

1.  **Building a Local-First SDK:** Keeper's architecture provides the perfect use case for us to co-develop a robust, platform-level SDK for building local-first applications. This would empower all developers on your platform to create more secure and private applications, making Toolhouse the default choice for any project where data sovereignty is a concern.
2.  **Developing a Secure Conversational Stream API:** The evolution of Keeper from manual to automated capture creates a clear business need for a secure, end-to-end encrypted API that can stream conversational data from cloud services directly to a user's local agent. Building this API is a challenging but highly valuable R&D project that would give your platform a unique and defensible competitive advantage.

Keeper demonstrates that privacy and intelligence are not mutually exclusive. They are a showcase for a more secure, more user-centric model of AI development. Our partnership will allow us to build this model into the core of the Toolhouse platform, making it the market leader not just in power, but in trust.


# EXPOSITOR — Architecture Specification v0.2.0

## Product Definition

Expositor is a professional-grade AI auditing platform built on the Cognitae Framework's Threadglass and Vigil taxonomies. It is not a consumer tool. It is a forensic instrument designed for use by AI safety researchers, government regulators (specifically i.AI, DSIT), investigative journalists, and institutional auditors.

The name Expositor comes from the Cognitae Audit class terminology — to expose the substrate beneath AI system behaviours.

Contact: eliotgilzene87@gmail.com
Author: Eliot Gilzene (Shoji) / Cognitae Framework
License: AGPL-3.0

---

## Version History

| Version | Date | Summary |
|---------|------|---------|
| 0.1.0 | 2026-03-08 | Initial prototype. Analyst, sidebar, taxonomy, onboarding. |
| 0.2.0 | 2026-03-08 | Major update. Working benchmark runner (3 protocols), Audit Lab with conversation persistence/rename/save, sidebar history tab, working library imports, clickable taxonomy examples, multi-format export throughout, structural analysis indicators. |

---

## Core Design Principles

1. Professional, not friendly. No hand-holding. No emoji. No "easy mode."
2. Evidence architecture, not decoration. Every UI element captures, displays, or organises evidence.
3. Quiet intensity. Borrowed from SanctumOS. Deliberate pacing, monospace everywhere, space to think.
4. Receipts over PR. Every output citable, exportable, reproducible.

---

## Navigation Structure

```
EXPOSITOR v0.2.0
├── Analyst (Conversation forensics)              [IMPLEMENTED]
├── Benchmark (Structured test protocols)         [IMPLEMENTED - 3 protocols]
├── Taxonomy (Pattern reference with examples)    [IMPLEMENTED - 7 groups, 24 patterns]
├── Audit Lab (Cognitae agent chat)               [IMPLEMENTED - 4 agents]
├── Library (Sample data, import workflows)       [IMPLEMENTED - 7 samples]
├── Settings (Multi-provider API config)          [IMPLEMENTED - 4 providers]
├── Docs (Documentation + contact)                [IMPLEMENTED]
└── Sidebar Workbench (Notes/History/Log)          [IMPLEMENTED - snappable]
```

---

## 1. ONBOARDING [IMPLEMENTED]

First visit shows full-screen modal. "Enter Expositor" or "Documentation." No persistence in JSX prototype — IDE build will remember returning users.

---

## 2. SIDEBAR WORKBENCH [IMPLEMENTED]

Slides from left. Snaps to main panel via toggle. Three tabs: Notes, History, Log.

Notes Tab: 4 channels (Evidence, Observations, Cross-Refs, Report Draft). Create/edit/delete/pin notes. Timestamp. Copy all.

History Tab (NEW v0.2.0): Shows all saved conversations from Analyst and Audit Lab. Click navigates to relevant view.

Log Tab: Basic session tracking. Full auto-logging planned for IDE build.

Planned: Custom channels, pattern ID tagging, note-to-finding links, batch operations, resizable divider, IndexedDB persistence.

---

## 3. SETTINGS [IMPLEMENTED]

Multi-provider: Anthropic, OpenAI, Google, Custom (OpenAI-compatible). Model selector per provider. Custom endpoint URL for local/alternative providers. Keys stored locally only. Status indicator in header shows provider and model.

Planned: Test connection, export preferences, taxonomy toggles.

---

## 4. ANALYST [IMPLEMENTED]

Input: Paste or import from Library (functional in v0.2.0).

Analysis: Lexical matching (all taxonomies) + structural indicators (friction coefficient, hedge ratio, certainty score) + AI deep analysis (any provider).

Results: Risk badge, finding count, structural panel, per-finding cards with annotation, AI analysis output.

Export (v0.2.0): JSON, Markdown, clipboard.

Auto-save: Each run saves to sidebar History.

Planned: File upload, format auto-detection, escalation trajectory, position stability, boundary half-life, referral frequency, timeline view, PDF export.

---

## 5. BENCHMARK [IMPLEMENTED - 3 PROTOCOLS]

VBP-001: Parasocial Vulnerability (15 prompts, 6 phases)
VBP-002: Sycophancy Escalation (12 prompts, 6 phases)
VBP-003: Capability Inflation (10 prompts, 5 phases) — NEW v0.2.0, designed for i.AI

Workflow: Select protocol, name target model, step through prompts (click to copy), paste response, score 0-5, view A-F grade results. Export JSON or Markdown. Auto-saves to History.

Planned: VBP-004 Policy Hallucination, VBP-005 Bias Amplification, VBP-006 Guardrail Decay, VBP-007 Institutional Trust, VBP-008 Dependency Formation. Plus auto-analyse responses, comparative mode, breakpoint detection.

---

## 6. TAXONOMY [IMPLEMENTED - 7 GROUPS, 24 PATTERNS]

Groups: Parasocial (6), Capability Inflation (5), Institutional Risk (3), Hallucination (2), Epistemic (3), OWASP LLM (2), Corporate Evasion (3).

Every pattern has clickable detailed example (NEW v0.2.0) showing mechanism in action with structural explanation.

Planned: Search, filter by severity, full OWASP Top 10, full Corporate Evasion set, Bias Amplification group, custom pattern import.

---

## 7. AUDIT LAB [IMPLEMENTED - 4 AGENTS]

Agents: Threadglass, Vigil, Virel, Locus. Each with dedicated system prompt.

Chat: Message input, agent-styled display, auto-scroll.

Conversation management (NEW v0.2.0): Create sessions, auto-name, rename (click header), save list, load/continue, delete. Auto-save on each message.

Lab Notes: Dedicated panel separate from main sidebar.

Export (NEW v0.2.0): JSON, Markdown.

Planned: Mediatrix agent, system instruction viewer, persistent storage, self-hosted documentation.

---

## 8. LIBRARY [IMPLEMENTED - 7 SAMPLES]

Samples: Containment Bond, Meta-Loop, Capability Inflation, Sycophancy Cascade, Clean Control, Authority Deference, Therapist Drift.

Import to Analyst: FUNCTIONAL (v0.2.0). Navigates and populates textarea.

Export: All samples as JSON or Markdown.

Planned: User uploads, categorisation/filtering, import to Benchmark.

---

## 9. STRUCTURAL ANALYSIS [PARTIALLY IMPLEMENTED]

Implemented: Friction coefficient, hedge ratio, certainty score.

Planned: Escalation trajectory, position stability, confidence drift (per-turn), boundary half-life, referral frequency.

---

## 10. DESIGN SYSTEM [IMPLEMENTED]

Font: IBM Plex Mono only. Colours: Dark forensic palette with severity-only colour. Background: Subtle dot grid. No emoji. Text icons only.

---

## 11. i.AI WORKFLOWS [PLANNED]

Pre-Deployment Assessment, Incident Investigation, Ongoing Monitoring. Require VBP-004 through VBP-007 and comparative mode.

---

## 12. IDE BUILD SEQUENCE

Week 1: Foundation (Vite + TS + Tailwind + Dexie.js + routing)
Week 1-2: Sidebar persistence + custom channels + tagging
Week 2: Analyst enhancements (upload, full structural suite, timeline, PDF)
Week 2-3: Benchmark expansion (VBP-004-008, comparative mode)
Week 3: Taxonomy + Library (search, filter, full pattern sets)
Week 3-4: Audit Lab polish (Mediatrix, persistence, system prompts)
Week 4: Reports + PWA + performance

---

## 13. PROTOTYPE STATUS (v0.2.0)

expositor-v0.2.0.jsx: 773 lines. Functional proof of concept.

Fully working: Onboarding, 7-page navigation, Analyst (lexical + structural + AI + export), Benchmark (3 protocols + scoring + grading + export), Taxonomy (7 groups, 24 patterns, clickable examples), Audit Lab (4 agents, conversation persistence, rename, lab notes, export), Library (7 samples, working import, bulk export), Settings (4 providers, model selection), Sidebar (Notes/History/Log, snap/float), Docs, version footer.

Requires IDE: Persistent storage, file upload, full structural suite, VBP-004-008, comparative benchmarks, PDF export, custom channels, PWA.

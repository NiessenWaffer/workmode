# Project Plan: Opencode-Inspired AI Workflow Architecture

## Identity
- **sequence_id:** 3
- **artifact_scope:** Agent definitions, AI-optimized tooling, and Context compression
- **target_user:** AI Assistants / LLM Orchestrator
- **status:** ready_for_workflow

## 1. Goal & Assumptions
### Core Goal
Design a file architecture and vocabulary system that allows the AI to navigate, plan, and code without exceeding context limits ("not too much lines"). The system ensures critical structures (dependencies, signatures, maturity) are never overlooked by utilizing specialized tools and strict agent boundaries.

### Assumptions
- Inspiration drawn from the `.opencode` directory structure.
- The LLM will use custom file-reading tools (like AST extractors) rather than raw text reads.
- Roles are separated into specialized subagents (Planning, Developer, Debugger) to maintain focus and segment context.

## 2. File Architecture
### Agent Definitions
- Store in a dedicated directory (e.g., `.opencode/agent/*.md`).
- Each agent has a single identity and follows a strict `RULES.md` source of truth.
- **Boundaries:**
  - **Planning Agent:** Generates plans, drafts workflows. Cannot edit source code.
  - **Developer Agent:** Implements code safely, adheres to strict modes.
  - **Debugger Agent:** Performs scientific error triage.

### Artifact Storage
- **Directory:** `./List plan/`
- Tooling restricts the Planning Agent to only write inside this directory. This guarantees that planning context remains isolated and source code is protected during the strategy phase.

## 3. Language & Context Compression
### AST-Based Signature Extraction (`SIG`)
- Instead of reading full 1000-line files, the AI should use a tool to extract only `export function`, `interface`, and `class` signatures.
- **Benefit:** Drastically reduces token usage and limits exposure to implementation details ("tech language") when only the API contract is needed.

### Canonical Lexicon (`LEXICON`)
- Establish a strict dictionary (e.g., inside an `AGENTS.md` file).
- The AI must look up concepts to prevent synonym drift.
- **Benefit:** Ensures that if the database refers to "Users", the AI and documentation do not arbitrarily switch to "Clients" or "Accounts".

## 4. Structures the AI Must Understand
### Architectural Maturity (`MATURITY`)
- Before implementing features, the AI must systematically scan for foundational components:
  - **Error Handling:** Are there global error middlewares?
  - **Testing:** Do `.spec.` or `.test.` files exist?
  - **Auth:** Is there a recognized authentication boundary?
- **Why:** Prevents the AI from building features on unstable or missing foundations.

### Directory Mapping (`MAP`)
- The AI must understand module boundaries by recursively mapping the project tree.
- It must explicitly ignore `node_modules`, `build/`, `dist/`, and log folders.
- **Why:** So the AI forms a complete mental model of entry points without getting lost in vendor code.

## 5. Next Steps
- Review this architecture plan.
- Draft the workflow for how an agent interacts with these specialized tools.
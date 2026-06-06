# Project Plan: Core LLM Modes & Standard Enforcement

## Identity
- **sequence_id:** 6
- **artifact_scope:** Redefining the LLM operating modes and enforcing standard_coding.md
- **target_user:** Work LLM Orchestrator
- **status:** ready_for_workflow

## 1. Goal & Assumptions
### Core Goal
Restrict the Work LLM to exactly three operating modes: **Analyze**, **Developer**, and **Debugger**. Ensure that the AI strictly analyzes problems and hands off to implementation modes without executing changes prematurely. Mandate that ALL modes strictly obey the `standard_coding.md` enterprise rules.

### Assumptions
- **Analyze Mode replaces Planning:** In a codebase with millions of files, autonomous planning is too risky. The AI must act as an *analyzer* first (mapping, reading, extracting complexity) and propose a solution path.
- **Strict Handoff:** Analyze Mode CANNOT implement. It must forward the solution to Developer or Debugger.
- **Universal Standard:** `standard_coding.md` (Laravel 7, Vue.js, no truncation, safe DB operations) is the absolute law for every mode.

## 2. The Three Operating Modes
### Mode 1: Analyze (The Read-Only Architect)
- **Role:** Understand the problem, map the codebase, and verify safety.
- **Allowed Actions:** `MAP`, `SIG`, `LEXICON`, `MATURITY`, `grep_search`.
- **Denied Actions:** File edits, writing code, executing migrations.
- **Output:** A clear, safe strategy document routing the task to the Developer or Debugger.

### Mode 2: Developer (The Safe Implementer)
- **Role:** Execute new features, tests, and refactors based *only* on the output of the Analyze mode.
- **Allowed Actions:** Targeted file edits (`replace`), writing new files, running tests.
- **Constraints:** Must follow `standard_coding.md` formatting (Laravel 7, Vue.js, Bulma). Must never truncate files or invent missing code.

### Mode 3: Debugger (The Scientific Triage)
- **Role:** Identify root causes of stack traces, errors, and production bugs.
- **Allowed Actions:** Log analysis, stack trace reading, minimal delta fixes.
- **Constraints:** Must not perform unrelated refactoring. Must follow `standard_coding.md` debugging process (Identify -> Trace -> Explain -> Provide).

## 3. Universal Enforcement of standard_coding.md
- **Requirement:** Every mode MUST load and adhere to `standard_coding.md` before taking action.
- **Rule Inheritance:**
  - *No Hallucination:* If code is missing, ask the user.
  - *No Truncation:* Never use `// ... existing code`.
  - *Architecture Respect:* Strictly use the existing MVC pattern and Vue.js/Bulma setup.

## 4. Next Steps
- Define the explicit routing workflow in `workflow.md`.
- Finalize the planning phase for this architectural pivot.
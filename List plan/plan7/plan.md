# Project Plan: Enterprise Guardrails, Telemetry & Eloquent Enforcement

## Identity
- **sequence_id:** 7
- **artifact_scope:** Physical safety barriers, audit logging, Knowledge Graph, and strict database standard.
- **target_user:** Work LLM Orchestrator, DevOps/Lead Engineer
- **status:** ready_for_workflow

## 1. Goal & Assumptions
### Core Goal
Elevate the Work LLM to a Tier-1 Enterprise system by shifting safety from "prompt reliance" to "physical blockers" (Git Hooks). Establish a permanent audit trail (Telemetry) for all AI modifications. Strictly enforce Laravel's **Eloquent ORM** as the absolute and only acceptable database interaction model to guarantee legacy stability.

### Assumptions
- AI code generation can still slip occasionally; physical CI/Git checks are required.
- Enterprise accountability demands a log of *which* AI session changed *which* file.
- Raw SQL and `DB::statement()` bypass Eloquent events, mutators, and global scopes. In a system with millions of files, bypassing ORM patterns is a severe risk.

## 2. Strict Eloquent ORM Enforcement
### Database Interaction Contract
- **standard_model :=** Eloquent ORM.
- **raw_sql :=** denied (e.g., `DB::select()`, `DB::statement()`, raw query strings).
- **query_builder :=** allowed only when Eloquent is functionally impossible, but requires a `blocker_question` approval.
- **rationale :=** Eloquent ensures that model events (e.g., `saving`, `deleting`), accessors, mutators, and soft deletes are respected. Using raw queries risks corrupting business logic state across millions of files.
- **enforcement:** The AI must wrap all database operations in Eloquent Models. 

## 3. Physical Guardrails (Pre-commit Hooks)
### The AI-Check Hook
- **Purpose:** Automatically reject commits if they contain AI hallucination markers.
- **Mechanism:** A simple shell/Node script that runs on `git commit`.
- **Triggers for Rejection:**
  - Presence of omission strings: `// ... existing code`, `/* rest of logic */`.
  - Presence of raw DB queries without explicit lead override.
  - Presence of Laravel 10+ specific helper syntax in a Laravel 7 environment.

## 4. Black Box Audit Log (Telemetry)
### Telemetry Contract
- **Purpose:** Accountability and rollback tracing.
- **Mechanism:** A `.aitelemetry` log file or a dedicated database table (`ai_audit_logs`).
- **Data Logged:** 
  - `timestamp`
  - `sequence_id` (from the active plan)
  - `action_type` (analyze, implement, debug)
  - `files_modified`
  - `approval_user`
- **Output:** Every time the Developer or Debugger mode successfully finishes a change, it automatically appends a record to this log.

## 5. Dynamic Knowledge Graph
### Upgrading the Lexicon
- **Purpose:** Stop re-analyzing the same architecture. 
- **Mechanism:** When the `MAP` and `SIG` tools run, their outputs are cached into a `.opencode/graph.json`.
- **Output:** A living map of module dependencies that the AI reads before triggering new searches.

## 6. Next Steps
- Define execution sequence in `workflow.md`.
- Handoff to Developer Mode to build these physical guardrails.
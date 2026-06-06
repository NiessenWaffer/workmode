# Project Plan: Enterprise Safety & Database Integrity Policy

## Identity
- **sequence_id:** 4
- **artifact_scope:** Strict AI operation rules for a massive (millions of files) production environment
- **target_user:** AI Assistants, System Architects
- **status:** ready_for_workflow

## 1. Goal & Assumptions
### Core Goal
Enforce absolute safety when the AI operates within the legacy enterprise system containing millions of files and populated production databases. Prevent destructive actions, out-of-memory errors from excessive file reads, and accidental code truncation.

### Assumptions
- **Scale:** The system contains millions of files. Global recursive searches (`**/*`) without strict constraints will crash the tool or context window.
- **State:** The database schema is mature, populated, and actively used. Structural changes carry extreme risk.
- **AI Behavior:** The AI must prioritize defensive operation, read-only analysis, and targeted scope over autonomous modification.

## 2. Database Modification Contract
### Schema Immutability
- **migration_creation :=** denied
- **schema_alteration :=** denied
- **drop_table|truncate_table :=** denied
- **rationale :=** System has existing values and live usage. All data structures must be treated as immutable read-only state by the AI.
- **resolution_path :=** If a feature requires a database change, the AI MUST explicitly flag it as a `blocker_question` for manual DBA/Lead intervention. It cannot generate or run migration scripts.

## 3. Anti-Truncation & Code Preservation
### File Editing Contract
- **truncation :=** denied
- **placeholder_code :=** denied (e.g., `// ... rest of code`, `/* existing logic */`)
- **rationale :=** Generating partial files or truncating logic destroys critical legacy enterprise logic. 
- **resolution_path :=** When modifying a file, the AI must use surgical `replace` operations for specific blocks, or rewrite the file with 100% of the original content preserved. 
- **size_limit_handling :=** If a file is too large to rewrite safely without truncation, the AI must explicitly refuse the edit and ask the user to manually perform the surgical injection.

## 4. Massive Codebase Navigation
### Context Bounding
- **global_wildcard_search :=** denied
- **targeted_search :=** required (e.g., searching strictly within `app/Services/` or `resources/js/components/`)
- **directory_mapping :=** must ignore `vendor/`, `node_modules/`, `storage/`, `bootstrap/cache/` by default.
- **resolution_path :=** Use AST signature extraction (`SIG`) or narrow `grep_search` before using `read_file` on large files.

## 5. Next Steps
- Generate workflow.md demonstrating safety checks in action.
- Developer Mode handoff
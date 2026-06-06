# Project Workflow Contract

## Identity
- **sequence_id:** 3
- **artifact_folder:** ./List plan/plan3
- **source_plan:** plan.md
- **status:** ready_for_developer_tasking

## Precise User Flow (AI Execution Sequence)
1. **Trigger:** User issues a complex request (e.g., "Implement a new user registration flow").
2. **Action (MAP):** The AI Orchestrator invokes the `MAP` tool to scan the directory structure, ignoring vendor/build folders, to locate the `auth/` or `users/` module boundaries.
3. **Action (LEXICON):** The AI invokes the `LEXICON` tool to check for canonical terms (e.g., confirming whether it should use "User" or "Client").
4. **Action (MATURITY):** The AI invokes the `MATURITY` tool to ensure the project has required foundations (Testing, Global Error Handling) before proceeding.
5. **Action (SIG):** The AI invokes the `SIG` tool on the relevant files (e.g., `UserController.ts`, `AuthService.ts`) to read *only* their AST signatures (interfaces, exported methods), avoiding reading 1000s of lines of implementation logic.
6. **Action (WRITE_PLAN):** The Planning Subagent drafts the architecture in `./List plan/planN/plan.md` using the compact context it gathered.
7. **Handoff:** The Developer Subagent is invoked to actually write the code, utilizing the same constrained toolset to prevent context flooding during implementation.

## Tool Contracts
### `MAP` Tool
- **Input:** Target directory (default: `.`)
- **Output:** Array of relative file paths.
- **Rules:** Must explicitly drop `.env`, `node_modules/`, `vendor/`, `dist/`.

### `SIG` Tool
- **Input:** `file_path`
- **Output:** Array of strings containing only `class`, `interface`, `type`, and `export function` definitions.
- **Rules:** Must strip all function bodies and internal logic to minimize token usage.

### `LEXICON` Tool
- **Input:** Concept string (e.g., "account")
- **Output:** Canonical term (e.g., "User") and warning if a mismatch occurred.
- **Rules:** Reads from a centralized `AGENTS.md` or `DICTIONARY.md` file.

## Verification Flow
1. **Tool Invocation:** Verify that the `SIG` tool successfully omits function bodies when run on a large file.
2. **Lexicon Enforcement:** Request the AI to build a "Client Profile" and verify the `LEXICON` tool correctly intercepts and forces the usage of "User Profile".
3. **Boundary Enforcement:** Verify that the Planning Agent strictly uses `WRITE_PLAN` and is blocked from modifying source files directly.

## Risks & Unknowns
- **AST Parsing Accuracy:** The `SIG` tool relies on accurate Regex or AST parsing. Complex syntax (like heavily nested decorators or macros) might cause the tool to fail or return full bodies accidentally.
- **Tool Overhead:** Calling 4 different tools (`MAP`, `LEXICON`, `MATURITY`, `SIG`) before every task might increase latency. The orchestrator must be capable of calling them in parallel where possible.

## Not Yet Implementing
- The actual source code for these `.ts` tools is not being written in this workflow, as they are part of the `@opencode-ai/plugin` ecosystem. This workflow defines how the *AI interacts* with them.

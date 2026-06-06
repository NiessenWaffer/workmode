# Project Plan: Implementing Custom AI Tools (Opencode Toolset)

## Identity
- **sequence_id:** 5
- **artifact_scope:** Physical implementation of TypeScript/Node.js custom tools for the Work LLM
- **target_user:** Work LLM Orchestrator
- **status:** ready_for_workflow

## 1. Goal & Assumptions
### Core Goal
Build the physical, executable tools (`MAP`, `SIG`, `LEXICON`, `MATURITY`) required by the Work LLM architecture. These tools will enable the AI to compress context, navigate safely, and enforce standards without relying solely on prompting.

### Assumptions
- **Environment:** The tools will be written in TypeScript/Node.js to match the observed `.opencode` ecosystem, though they could be executed via standard shell commands by the orchestrator.
- **Execution:** The Work LLM will have access to execute these scripts (e.g., `npx ts-node .opencode/tools/SIG.ts <filepath>`).
- **Location:** Tools will be placed in `./.opencode/tools/` within the enterprise codebase so they travel with the repository.

## 2. Tool Specifications
### MAP.ts (Directory Scoping)
- **Purpose:** Safely map the directory tree without hitting massive node_modules/vendor folders.
- **Logic:** Recursive directory read using `fs.readdir`.
- **Hardcoded Ignores:** `.git`, `node_modules`, `vendor`, `storage/logs`, `bootstrap/cache`, `dist`, `build`.
- **Output:** JSON array of relative file paths.

### SIG.ts (Context Compression via AST)
- **Purpose:** Extract signatures (interfaces, class definitions, function headers) to prevent token overflow on massive files.
- **Logic:** Utilize a lightweight parser or robust Regex to strip function bodies. (If doing pure TS/JS, `typescript` compiler API could be used; for PHP, a Regex or lightweight PHP parser is needed).
- **Target:** Must support both `.php` (Laravel) and `.js/.ts/.vue` (Frontend).
- **Output:** String output containing only the structural skeleton of the file.

### LEXICON.ts (Canonical Vocabulary)
- **Purpose:** Prevent synonym drift.
- **Logic:** Read from a centralized `DICTIONARY.md` or `AGENTS.md` file, parse a Markdown table, and return the canonical term.
- **Output:** JSON response indicating success/failure and the strict term to use.

### MATURITY.ts (Architecture Validation)
- **Purpose:** Scan the project for foundational requirements (Error handling, Testing, Auth) before allowing complex feature development.
- **Logic:** Glob search for specific file patterns (e.g., `*Test.php`, `*Exception*`, `*Middleware*`).
- **Output:** A structural "score" and an array of critical missing foundations.

## 3. Resolved Architecture
1. **Language Support for `SIG`:** We will use robust Regular Expressions (Regex) within the TypeScript tool to extract signatures. This avoids the overhead of installing separate full AST parsers for PHP, Vue, and JS, making the tool lightweight and cross-platform for the MVP.
2. **Integration:** The Work LLM will execute these tools via the standard `run_shell_command` (e.g., `npx ts-node .opencode/tools/SIG.ts path/to/file`).

## 4. Next Steps
- Generate workflow.md
- Transition to Developer mode for physical implementation.
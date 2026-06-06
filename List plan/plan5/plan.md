# Project Plan: Implementing Custom AI Tools (Opencode Toolset)

## Identity
- **sequence_id:** 5
- **artifact_scope:** Physical implementation of Node.js ES module custom tools for the Work LLM
- **target_user:** Work LLM Orchestrator
- **status:** implemented

## 1. Goal & Assumptions
### Core Goal
Build the physical, executable tools (`MAP`, `SIG`, `LEXICON`, `MATURITY`, `PROFILE`) required by the Work LLM architecture. These tools will enable the AI to compress context, navigate safely, remember project structure globally, and enforce standards without relying solely on prompting.

### Assumptions
- **Environment:** The tools are implemented as dependency-light Node.js ES modules (`.mjs`) to match the shipped repository package.
- **Execution:** The Work LLM will have access to execute these scripts (e.g., `node .opencode/tools/SIG.mjs <filepath>`).
- **Location:** Tools will be placed in `./.opencode/tools/` within the enterprise codebase so they travel with the repository.

## 2. Tool Specifications
### MAP.mjs (Directory Scoping)
- **Purpose:** Safely map the directory tree without hitting massive node_modules/vendor folders.
- **Logic:** Recursive directory read using `fs.readdir`.
- **Hardcoded Ignores:** `.git`, `node_modules`, `vendor`, `storage/logs`, `bootstrap/cache`, `dist`, `build`.
- **Output:** JSON array of relative file paths.

### SIG.mjs (Context Compression)
- **Purpose:** Extract signatures (interfaces, class definitions, function headers) to prevent token overflow on massive files.
- **Logic:** Use robust regular expressions to strip function bodies and keep structural lines without installing full AST parser dependencies.
- **Target:** Must support both `.php` (Laravel) and `.js/.ts/.vue` (Frontend).
- **Output:** String output containing only the structural skeleton of the file.

### LEXICON.mjs (Canonical Vocabulary)
- **Purpose:** Prevent synonym drift.
- **Logic:** Read from a centralized `DICTIONARY.md` or `AGENTS.md` file, parse a Markdown table, and return the canonical term.
- **Output:** JSON response indicating success/failure and the strict term to use.

### MATURITY.mjs (Architecture Validation)
- **Purpose:** Scan the project for foundational requirements (Error handling, Testing, Auth) before allowing complex feature development.
- **Logic:** Glob search for specific file patterns (e.g., `*Test.php`, `*Exception*`, `*Middleware*`).
- **Output:** A structural "score" and an array of critical missing foundations.

### PROFILE.mjs (Safe Project Profile)
- **Purpose:** Generate a safe project structure profile that can be stored globally under `~/.config/workmode/knowledge/`.
- **Logic:** Read safe package metadata, count framework files, list module folders, and identify entry point file sizes while ignoring secrets, logs, vendor, node_modules, cache, keys, and certificates.
- **Output:** JSON project profile for navigation memory.

## 3. Resolved Architecture
1. **Language Support for `SIG`:** We use robust regular expressions within the Node.js ES module tool to extract signatures. This avoids the overhead of installing separate full AST parsers for PHP, Vue, and JS, making the tool lightweight and cross-platform for the MVP.
2. **Integration:** The Work LLM executes these tools via standard shell commands (e.g., `node .opencode/tools/SIG.mjs path/to/file`).
3. **Global Knowledge:** `PROFILE.mjs` writes safe project memory outside the target project so Omnibus does not need WorkMode files committed into it.

## 4. Next Steps
- Validate tool behavior against a real Laravel 7 target project.
- Keep implementation status synchronized with `IMPLEMENTATION_STATUS.md`.

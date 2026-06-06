# Project Workflow Contract

## Identity
- **sequence_id:** 5
- **artifact_folder:** ./List plan/plan5
- **source_plan:** plan.md
- **status:** ready_for_developer_tasking

## Precise User Flow (Building the Toolset)
1. **Trigger:** Enter Developer Mode to implement Plan 5.
2. **Setup:** Create the `.opencode/tools/` directory in the project root.
3. **Environment:** Initialize a basic `package.json` inside `.opencode/` to support TypeScript execution (`typescript`, `ts-node`, `@types/node`).
4. **Implement MAP.ts:** Write a Node script that recursively reads directories, explicitly filtering out `vendor`, `node_modules`, `storage`, and `bootstrap/cache`.
5. **Implement SIG.ts:** Write a Node script that uses Regex to match PHP class/function declarations (`class X`, `public function Y()`) and JS/TS signatures (`export function`, `interface`), stripping the bodies.
6. **Implement LEXICON.ts:** Create a dummy `DICTIONARY.md` file and write a script to parse it and return canonical terms.
7. **Implement MATURITY.ts:** Write a script that checks for the existence of `tests/` folders and `app/Exceptions/Handler.php`.

## Testing the Tools (Execution)
- Run `npx ts-node .opencode/tools/MAP.ts .` -> Verify it returns a clean list without `node_modules`.
- Run `npx ts-node .opencode/tools/SIG.ts app/Http/Controllers/Controller.php` -> Verify it outputs only the class and method signatures.
- Run `npx ts-node .opencode/tools/LEXICON.ts client` -> Verify it returns `user`.
- Run `npx ts-node .opencode/tools/MATURITY.ts php` -> Verify it analyzes the Laravel foundational structures.

## Hand-off Contract
- Once these scripts are built and verified, the LLM orchestrator is instructed (via system prompt or agent rules) to invoke them using `run_shell_command` before reading large files or drafting new plans.

## Risks & Unknowns
- **Regex Limitations:** The Regex approach in `SIG.ts` might fail on extremely complex multi-line PHP method signatures. If it fails consistently, we may need to pivot to a true AST parser (like `php-parser` for Node.js) in a future iteration.

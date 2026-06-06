# Project Workflow Contract

## Identity
- **sequence_id:** 7
- **artifact_folder:** ./List plan/plan7
- **source_plan:** plan.md
- **status:** ready_for_developer_tasking

## Precise User Flow (Enforcement & Auditing)

### Scenario A: Enforcing Eloquent ORM
1. **Trigger:** Developer mode generates a query to fetch active users.
2. **Action:** The AI drafts: `DB::table('users')->where('active', 1)->get();`
3. **Check:** The AI hits the Plan 7 ORM constraint.
4. **Correction:** The AI rewrites the code to strictly use the Eloquent standard: `User::where('active', 1)->get();`.
5. **System Response:** The safe Eloquent code is injected into the controller.

### Scenario B: Triggering the Physical Guardrail
1. **Trigger:** A developer (or the AI) attempts to commit a file that contains `// ... rest of controller`.
2. **Action:** The Git `pre-commit` hook (built by the Developer mode) fires.
3. **Check:** The script greps for truncation placeholders and forbidden syntax.
4. **System Response:** The commit is rejected with the message: `"Commit Blocked: Detected AI truncation placeholder. Please ensure the full file is restored."`

### Scenario C: Telemetry Logging
1. **Trigger:** Debugger mode successfully fixes a bug in `OrderService.php` using a surgical `replace`.
2. **Action:** The AI Orchestrator executes a background call to the Telemetry logger.
3. **System Response:** A new entry is appended to `.aitelemetry`:
   `[2026-06-06 10:15:00] [Plan 7] [DEBUG] Modified app/Services/OrderService.php | Approved by: User`

## Verification Flow
1. **ORM Check:** Prompt the AI to write a raw SQL update. Verify it refuses and defaults to an Eloquent Model update.
2. **Hook Check:** Add `// ... existing code` to a PHP file and attempt to commit. Verify the hook blocks the action.
3. **Audit Check:** Complete an AI-driven task and verify the `.aitelemetry` file has been updated with the correct timestamp and file paths.

## Risks & Unknowns
- **Telemetry Size:** In an enterprise environment, the `.aitelemetry` log could grow large. It should be log-rotated or moved to a database table once the MVP is stable.
- **Hook Bypass:** Developers can bypass hooks using `git commit --no-verify`. This policy relies on team discipline to not bypass the safety guardrails.
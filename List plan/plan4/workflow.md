# Project Workflow Contract

## Identity
- **sequence_id:** 4
- **artifact_folder:** ./List plan/plan4
- **source_plan:** plan.md
- **status:** ready_for_developer_tasking

## Precise User Flow (Safety Interception Workflow)

### Scenario A: Database Change Request
1. **Trigger:** User asks the AI: "Add a new `status` column to the `orders` table to track this feature."
2. **Action:** AI consults the Safety Contract (`plan4/plan.md`).
3. **Check:** `migration_creation := denied`.
4. **System Response:** AI rejects the request. 
   - *Message:* "Safety Block: The enterprise database schema is immutable. I cannot generate or run migrations as the system has live values. Please manually coordinate this schema change with a DBA. I can proceed with the application-level logic using a JSON column or state mapping once the DB supports it."
5. **State Change:** Task transitions to `blocked_state`.

### Scenario B: Editing a Massive File
1. **Trigger:** User asks the AI: "Update the validation logic in the `EnterpriseOrderProcessor.php`."
2. **Action:** AI uses `SIG` tool or reads file and sees it is 4,500 lines long.
3. **Check:** `truncation := denied` and `placeholder_code := denied`.
4. **System Response:** AI evaluates if a surgical `replace` block can target the exact validation lines safely.
5. **Flow (Success):** If unambiguous, AI uses `replace` to swap *only* the validation method, leaving the rest of the file untouched.
6. **Flow (Failure/Risk):** If ambiguous or requires rewriting the whole file, AI rejects.
   - *Message:* "Safety Block: This file is too large to rewrite without risking truncation of legacy code. I have provided the exact modified `validate()` method below. Please copy and paste it into `EnterpriseOrderProcessor.php` manually."

### Scenario C: Navigating Millions of Files
1. **Trigger:** User asks: "Where is the auth logic?"
2. **Action:** AI consults Navigation Contract.
3. **Check:** `global_wildcard_search := denied`.
4. **System Response:** AI performs a scoped search strictly bounded to `app/Http/Controllers/Auth/` or `app/Services/Auth/` rather than a global disk `**/*auth*` scan.

## Verification Flow
1. **Database Check:** Ask the AI to write a migration. It MUST refuse.
2. **Truncation Check:** Ask the AI to update a large file. Verify it does not output `// ... existing code`.
3. **Scope Check:** Ask the AI to map the project. Verify it ignores massive compiled or vendor directories.
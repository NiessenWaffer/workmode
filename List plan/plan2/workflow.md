# Project Workflow Contract

## Identity
- **sequence_id:** 2
- **artifact_folder:** ./List plan/plan2
- **source_plan:** plan.md
- **status:** ready_for_developer_tasking

## Precise User Flow (Refactoring a Legacy File)
1. **Trigger:** A developer (or AI) opens a legacy `.php` or `.vue` file to modify it.
2. **Action:** Read the file and map its current implicit dependencies, data shapes, and state flows.
3. **Action:** Construct the Compact Technical Contract docblock using the syntax defined in `plan.md`.
4. **Action:** Insert the docblock at the top of the file (below the `<?php` tag or inside the `<script>` block in Vue).
5. **System Response:** The file is saved. Subsequent AI interactions now read this highly-dense, structured header instead of scanning 1000s of lines of code.

## Frontend Contract Example (Vue.js)
```html
<script>
/**
 * @contract
 * dependency := UserAPI | GlobalEventBus
 * state_machine := idle | loading | editing | error_validation
 * data.user := id | email | role
 * action.save := POST /api/users/{id} -> success(emit update) | failure(error_validation)
 */
export default { ... }
</script>
```

## Backend Contract Example (Laravel Controller)
```php
<?php
/**
 * @contract
 * route := POST /api/users/{id}
 * dependency.service := UserService
 * dependency.request := UpdateUserRequest
 * response.success := UserResource
 * response.failure := 422 Validation Error | 403 Forbidden
 * flow := IF Auth::user().can('edit') THEN UserService@update ELSE 403
 */
class UserController extends Controller { ... }
```

## Verification Flow
1. **Generation Validation:** Extract the docblock. Are there paragraphs? If yes, it fails.
2. **Dependency Validation:** Does the contract list dependencies that aren't actually imported/used in the file? If yes, it fails.
3. **Canonical Vocabulary Validation:** Check against `DOMAIN_DICTIONARY.md`. Is it using "client" instead of "user"? If yes, it fails.

## Risks & Unknowns
- **File Bloat:** Developers might inject too much information into the header. The AI must aggressively enforce the "no prose, no paragraphs" rule.
- **Sync Drift:** The contract might become out of sync with the actual code if human developers forget to update it. Because enforcement is "AI-Only", the AI must verify the contract matches the code upon every visit before trusting it.

## Not Yet Implementing
- Automated CI/CD linters (PHPStan/ESLint rules) for this syntax, as enforcement is delegated to the AI Assistant.

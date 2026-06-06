# Project Workflow Contract

## Identity
- **sequence_id:** 8
- **artifact_folder:** ./List plan/plan8
- **source_plan:** plan.md
- **status:** ready_for_developer_tasking

## Precise User Flow (Clean Code Execution)

### Scenario A: Refactoring a Fat Controller
1. **Trigger:** The Analyze mode hands off a task to optimize an `OrderController` that repeats raw SQL queries and validation.
2. **Action (Developer Mode):** Reads the Developer Plan (`plan8`).
3. **Smart Coding Analysis:** The AI evaluates the logic and decides to extract the validation to a FormRequest and the data fetching to an Eloquent Repository.
4. **Output Generation:**
   - **Problem:** "The controller repeats SQL queries and has inline validation."
   - **Optimization Strategy:** "Extract validation to a FormRequest and data logic to an Eloquent scope."
   - **Cleaner Solution Rationale:** "This reduces controller bloat and allows query reuse across the app."
   - **Final Code:** (Outputs the clean Laravel 7 code).
   - **Benefits:** Details the performance (lazy loading prevention) and maintainability (single source of truth).

### Scenario B: Vue Component Optimization
1. **Trigger:** Task requires adding logic to an existing massive Vue.js file.
2. **Action (Developer Mode):** Identifies that inline methods are getting complex.
3. **Execution:** Creates a computed property for derived state and centralizes API calls into a helper instead of repeating them in the template.
4. **Safety Check:** Ensures the new component doesn't break backward compatibility with existing props/events.

## Verification Flow
1. **Output Structure Check:** Whenever the AI generates code, verify it includes the 6-step Output Format (Problem -> Strategy -> Rationale -> Code -> Performance -> Maintainability).
2. **Laravel Standard Check:** Verify the AI prefers Eloquent relationships over raw `DB::join()`.
3. **Function Size Check:** Verify the AI creates small utility methods instead of writing 200-line monolithic functions.

## Risks & Unknowns
- **Over-Abstraction:** The AI might try to abstract simple, one-off logic into a Service class unnecessarily. The rule "generate code that another developer can understand after 2 years" must be strictly applied to prevent spaghetti abstraction.
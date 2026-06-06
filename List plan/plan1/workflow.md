# Project Workflow Contract

## Identity
- **sequence_id:** 1
- **artifact_folder:** ./List plan/plan1
- **source_plan:** plan.md
- **status:** ready_for_developer_tasking

## Precise User Flow
1. **Trigger:** Developer navigates to the AI Assistant route (`/assistant`).
2. **Action:** Developer sees the Chat Dashboard layout and types a query (e.g., "Where is the user registration logic?") in the input field.
3. **Action:** Developer clicks "Submit".
4. **System Response:** Vue.js component creates a local "User" message and opens an SSE (Server-Sent Events) connection to `POST /api/assistant/ask`.
5. **System Response:** Laravel authenticates the user, creates/updates the chat session in MySQL, and proxies the query to the Python LLM microservice.
6. **System Response:** Python microservice performs Vector Search, finds relevant files, and begins streaming the LLM response back through Laravel to the Vue.js frontend.
7. **State Change:** UI displays a "typing" effect as chunks arrive and populates the Context Panel with `RetrievedDocument` references once received.
8. **Action:** Developer clicks a file in the Context Panel.
9. **System Response:** UI expands a modal or inline view showing the code snippet that the LLM used for context.

## Frontend-First Sequence
1. Create `AssistantDashboard.vue` layout comprising a Sidebar (History), Main Chat Area, and Context Panel.
2. Implement message rendering, including Markdown parsing and syntax highlighting for code blocks.
3. Implement `EventSource` or streaming fetch client to handle SSE updates, appending text chunks to the active assistant message.
4. Implement the Context Panel to iterate over `context_files` JSON and display file paths with confidence scores.

## Controls & Routing
- **Web Route:** `GET /assistant` -> `AssistantController@index` -> returns Blade view mounting `<assistant-dashboard>`.
- **API Route:** `POST /api/assistant/ask` -> `AssistantApiController@ask` -> returns SSE stream.
- **API Route:** `GET /api/assistant/sessions` -> `AssistantApiController@sessions` -> returns user's historical chat sessions.

## Backend Contract
- **Laravel 7 (Proxy & Auth):** 
  - Validates the active user session.
  - Interacts with `AssistantSession` and `AssistantMessage` models.
  - Proxies the SSE stream from the Python microservice using Symfony `StreamedResponse`.
- **Python Microservice (FastAPI / external):**
  - Expected to expose `POST /chat/stream` returning text chunks and JSON references.

## Database Contract
- `assistant_sessions`: `id`, `user_id` (fk), `title` (string), `created_at`, `updated_at`.
- `assistant_messages`: `id`, `session_id` (fk), `role` (enum: user, assistant), `content` (text), `context_files` (json), `created_at`, `updated_at`.

## Sample Data Contract
- `User`: Assumed existing.
- `AssistantSession`: 3 seed records attached to a test developer.
- `AssistantMessage`: 10 seed records illustrating a back-and-forth conversation, with sample JSON payloads for `context_files`.

## Verification Flow
1. **Frontend Layout:** Load `/assistant`, verify sidebar, chat area, and context panel render without errors using Buefy/Bulma styling.
2. **Session Fetch:** Verify sidebar correctly loads historical `assistant_sessions` via API.
3. **Chat Stream:** Submit a query, verify the system creates a DB record, hits the proxy endpoint, and correctly updates the UI incrementally.
4. **Context Display:** Verify that clicking a retrieved context file correctly shows the snippet.

## Risks & Unknowns
- **SSE Proxying in PHP:** Laravel 7 on traditional PHP-FPM may encounter output buffering issues that block SSE streaming. Nginx/PHP-FPM config might need `fastcgi_buffering off` or `X-Accel-Buffering: no` headers.
- **Python Service Setup:** The Python microservice is assumed to be running and reachable.

## Not Yet Implementing
- VS Code integration.
- The actual Python Indexing Worker (this contract covers the Laravel + Vue frontend talking to the *API* of that worker).

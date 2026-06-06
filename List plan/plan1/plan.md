# Project Plan: Enterprise AI Coding Assistant (MVP)

## Identity
- **sequence_id:** 1
- **artifact_scope:** Web Interface & Backend API for AI Assistant MVP
- **target_user:** Junior System Developers, Backend/Frontend Developers, Internal IT
- **status:** ready_for_workflow

## 1. Goal & Assumptions
### User Goal
Provide an internal enterprise AI coding assistant inside a Laravel 7 system to help developers safely understand, debug, maintain, and improve a large codebase.

### Assumptions
- **AI Infrastructure:** A local or private instance of Ollama (e.g., DeepSeek/Qwen Coder) and a Vector Database (ChromaDB or Qdrant) are available or will be set up.
- **Integration Mode:** Initially, the tool is accessible via a web interface embedded in the enterprise dashboard (Vue.js + Bulma) before attempting native VS Code integration.
- **Language Models:** The LLM uses LangChain in a separate Python microservice. The Laravel 7 application communicates with this microservice via REST API and Server-Sent Events (SSE).
- **Security:** All processing is done locally/privately; no secrets are exposed to public models.
- **Authentication:** Will reuse existing Laravel Auth session-based authentication.

### Dependency Risk Register
- **LLM / Vector DB Service:** The Laravel 7 application must communicate with an indexing/search service. We assume this is a planned REST API or local process.
- **Enterprise Codebase Indexing:** Parsing millions of files requires an efficient asynchronous indexer, ignoring vendor, logs, node_modules.

## 2. Page & Design Contracts
### Page: AI Assistant Chat Interface
- **page_type:** Chat and Code Analysis Dashboard
- **page_goal:** Allow developers to ask codebase questions, request debugging help, and analyze code securely.
- **target_user:** Enterprise Developers
- **hero:**
  - problem: Need fast, safe understanding of large legacy codebase.
  - value_prop: Context-aware coding assistant strictly bound to enterprise standards.
  - primary_CTA: "Start New Analysis"
- **body:**
  - **Sidebar:** Chat history and recent analyses.
  - **Main Area:** Chat interface with rich text/code block rendering and SSE streaming support.
  - **Context Panel (Right):** Currently analyzed files and vector search references.
- **responsive:** Standard mobile adaptation, though primary use is desktop.

### UI Tokens & Visual Asset Contract
- **typography_scale:** standard Bulma/Buefy typography.
- **colors:** Enterprise branding (using Bulma variables).
- **visual_asset_strategy:** No external placeholder images; strictly vector UI icons (Buefy/FontAwesome) representing files, code, bugs, and search.

## 3. Section Action Data State Contract
### Section: Chat Input & History
- **user_problem:** Needs to communicate with the AI.
- **value_solution:** A conversational interface preserving context.
- **content_contract:** Input field, submit button, message list (user vs AI).
- **action_contract:** 
  - `Submit Query` -> triggers `API: /api/assistant/ask` -> returns SSE stream of LLM response.
  - `Clear Context` -> clears current session context.
- **data_contract:** `Session` (history), `Message` (role, content, context_files).
- **state_contract:** idle, loading (thinking...), streaming, error.

### Section: Context Panel
- **user_problem:** Needs to know what files the AI is looking at to trust the answer.
- **value_solution:** Explicit display of RAG retrieved files.
- **content_contract:** List of files, line numbers, and confidence scores.
- **action_contract:** `View File Snippet` -> reveals extracted text snippet.
- **data_contract:** Array of `RetrievedDocument` (path, snippet).
- **state_contract:** visible when context exists, hidden otherwise.

## 4. Resolved Architecture
1. **Microservice:** A Python microservice (FastAPI + Langchain) will handle the LLM interaction, RAG orchestration, and file indexing. Laravel will act as a client/broker.
2. **Streaming:** SSE (Server-Sent Events) or WebSockets via Laravel/Python will be used to stream responses to the Vue.js frontend for a native chat feel.
3. **Authentication:** Native Laravel session Auth is used to secure the AI assistant route and API endpoints.

## 5. Next Steps
- Generate workflow.md
- Developer Mode handoff

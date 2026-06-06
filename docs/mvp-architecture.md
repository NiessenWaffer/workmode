# Assistant MVP Architecture

## current_repo_role
- repo_type := global_cli_ai_command_pack
- not_yet := standalone_web_app
- current_mvp := installable_prompts | slash_commands | context_tools | standards

## modules
- command_pack := Gemini_TOML | OpenCode_MD | Kiro_SKILL | Kiro_JSON_agent
- prompt_pack := core_prompt | analyze_prompt | debug_prompt | develop_prompt
- tool_pack := MAP | SIG | LEXICON | MATURITY
- standards_pack := compact_contract | safety_policy | orm_policy | developer_mode

## future_web_backend_api
- endpoint := POST /api/workmode/chat
- request := mode | message | project_path | selected_files
- response := answer | changed_files | risks | verification
- orchestrator := classify_request -> load_prompt -> run_tools -> call_model -> report

## future_web_ui
- views := chat | project_scope | architecture_summary | diff_review
- safety_controls := permission_gate | destructive_action_warning | database_mutation_warning

## mvp_acceptance
- global_commands_install := true
- three_modes_only := analyze | debug | develop
- review_feature_inside_modes := true
- map_feature_inside_modes := true
- context_tools_available := true

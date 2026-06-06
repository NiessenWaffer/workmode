# Developer Task: Enterprise AI Coding Assistant MVP

## objective
- build := usable_mvp_for_laravel_7_enterprise_assistant
- includes := web_interface | backend_api | orchestrator | safe_project_analysis

## prerequisites
- require_complete := plan2 | plan3 | plan4 | plan5 | plan6 | plan7 | plan8
- require_files := standard_coding.md | List plan/BUILD_STRUCTURE.md

## tasks
- [ ] create_backend_api_for_chat_requests
- [ ] create_project_scope_selector
- [x] implement_request_classifier := analyze | debug | develop
- [x] connect_mode_selector := Analyze | Developer | Debugger
- [x] call_context_tools := MAP | SIG | LEXICON | MATURITY
- [x] load_standard_coding_rules_before_code_generation
- [ ] add_diff_review_output_before_file_edit
- [x] add_verification_result_section
- [x] add_sensitive_data_redaction
- [ ] create_basic_web_interface_for_developer_workflow

## acceptance_criteria
- assistant_can_explain_existing_laravel_code := prompt_supported_pending_real_project_validation
- assistant_can_trace_route_to_controller_to_service_to_model := prompt_supported_pending_real_project_validation
- assistant_can_generate_laravel_7_compatible_code := prompt_supported_pending_real_project_validation
- assistant_blocks_unsafe_actions_by_default := prompt_guardrail_implemented
- assistant_reports_changed_files_and_validation := prompt_rule_implemented

## verification_status
- status := partial
- verified_by := `node scripts/verify-structure.mjs`
- implemented_artifacts := global_command_mvp | mode_prompts | context_tools | standards_docs
- pending_artifacts := backend_api | web_ui | project_selector | diff_review_screen

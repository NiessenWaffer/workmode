# Developer Task: Developer Mode Standards

## objective
- define := clean_code_engineering_behavior_for_code_generation
- optimize_for := readability | maintainability | performance | safe_output

## tasks
- [x] define_clean_code_output_rules
- [x] define_laravel_7_compatibility_rules
- [x] define_validation_and_request_handling_rules
- [x] define_api_response_consistency_rules
- [x] define_error_handling_rules
- [x] define_performance_rules_for_queries_and_loops
- [x] define_frontend_vue_output_rules
- [x] define_final_answer_format_for_developer_changes
- [x] define_when_to_ask_for_clarification

## acceptance_criteria
- generated_code_is_small_and_maintainable := true
- assistant_avoids_repetitive_implementations := true
- assistant_reports_risks_and_tests := true
- assistant_does_not_overwrite_unrelated_changes := true

## verification_status
- status := complete
- verified_by := `node scripts/verify-structure.mjs`
- implemented_artifacts := `docs/developer-mode-standards.md` | develop_mode_prompts

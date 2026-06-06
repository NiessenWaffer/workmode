# Guardrails And ORM Policy

## eloquent_first_policy
- default_query_style := Eloquent
- raw_sql_default := discouraged
- query_builder := allowed_for_complex_query_or_performance_reason
- raw_sql := allowed_if_reporting_query | database_specific_function | proven_performance_need

## raw_sql_required_justification
- why_eloquent_not_sufficient
- expected_dataset_size
- indexes_or_constraints_used
- injection_safety
- test_or_manual_verification

## service_reuse_policy
- before_new_service_method := search_existing_service
- duplicate_business_logic := flag
- controller_business_logic := avoid
- validation_in_controller := avoid_when_FormRequest_possible

## generated_code_review_checklist
- [ ] follows_existing_namespace_and_folder_pattern
- [ ] uses_FormRequest_when_validation_is_nontrivial
- [ ] keeps_business_logic_in_service_layer
- [ ] uses_Eloquent_or_query_builder_safely
- [ ] handles_authorization_when_required
- [ ] handles_error_states
- [ ] includes_or_recommends_tests
- [ ] does_not_touch_unrelated_files

## telemetry_events
- ai_mode_started
- scope_mapped
- file_signature_read
- file_modified
- verification_run
- unsafe_action_blocked

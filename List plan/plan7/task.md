# Developer Task: Enterprise Guardrails & ORM

## objective
- enforce := maintainable_laravel_enterprise_patterns
- focus := Eloquent | services | guardrails | telemetry

## tasks
- [x] define_eloquent_first_policy
- [x] define_when_raw_sql_is_allowed
- [x] define_service_reuse_policy
- [x] define_repository_or_query_boundary_policy
- [ ] add_git_hook_design_for_standard_checks
- [x] define_telemetry_events_for_ai_actions
- [x] define_knowledge_graph_schema_for_route_controller_service_model
- [x] define_policy_for_large_dataset_operations
- [x] define_review_checklist_for_generated_code

## acceptance_criteria
- generated_code_prefers_framework_native_patterns := true
- raw_sql_requires_clear_justification := true
- duplicate_business_logic_is_flagged := true
- ai_actions_are_auditable := true

## verification_status
- status := partial
- verified_by := `node scripts/verify-structure.mjs`
- implemented_artifacts := `docs/guardrails-and-orm.md` | prompt_review_rules
- pending_artifacts := executable_git_hooks | runtime_telemetry_writer | knowledge_graph_generator

# Complete Build Structure: Laravel 7 Enterprise AI Assistant

## build_goal
- assistant_type := architecture_aware_enterprise_llm_assistant
- target_system := Omnibus
- target_stack := Laravel_7 | Vue | enterprise_legacy_system
- primary_user := junior_system_developer
- core_value := safe_code_understanding | maintainable_code_generation | debugging_support
- replacement_policy := assist_developers_only
- modernization_policy := avoid_framework_upgrade_unless_explicitly_planned

## target_context
- company_system := Omnibus
- system_condition := legacy | messy_structure | old_developer_patterns | high_database_dependency
- database_scale := millions_of_records
- upgrade_risk := high_due_to_legacy_version_and_large_database
- ai_role := read_first | map_order | follow_company_standard | minimize_change | protect_database
- coding_standard_source := standard_coding.md | existing_company_patterns

## completion_definition
- complete_when := all_phases_done AND all_guardrails_active AND assistant_can_analyze_before_editing
- incomplete_if := missing_task_files OR no_safety_policy OR no_context_tools OR no_mode_boundaries
- source_truth := standard_coding.md | List plan/index.md | plan*/plan.md | plan*/workflow.md | plan*/task.md

## build_order
| phase | plan | purpose | required_output | depends_on |
|---|---|---|---|---|
| 1 | plan2 | Codebase Standard | compact contracts, dependency maps, dictionary rules | - |
| 2 | plan4 | Safety Policy | immutable database rules, destructive action policy | - |
| 3 | plan3 | AI Workflow | Planning, Developer, Debugger boundaries | - |
| 4 | plan5 | AI Toolset | MAP, SIG, LEXICON, MATURITY, PROFILE scripts | plan3 |
| 5 | plan6 | Mode Enforcement | Analyze, Developer, Debugger mode rules | plan4 |
| 6 | plan8 | Developer Standards | clean code output, performance, formatting rules | plan2, plan6 |
| 7 | plan7 | Guardrails & ORM | Eloquent-first policy, hooks, telemetry, knowledge graph | plan2, plan4 |
| 8 | plan1 | Assistant MVP | web UI, backend API, orchestration, project analysis flow | plan2, plan3, plan4, plan5, plan6, plan7, plan8 |

## system_modules
- interface_module := chat_ui | project_selector | analysis_result_view | diff_review_view
- orchestration_module := request_router | mode_selector | context_budget_manager | tool_runner
- code_intelligence_module := MAP | SIG | LEXICON | MATURITY | PROFILE | dependency_contract_reader
- safety_module := permission_gate | destructive_action_blocker | database_mutation_policy | secret_redaction
- standards_module := standard_coding_loader | compact_contract_validator | eloquent_policy_checker
- learning_module := explanation_generator | trace_route_to_controller_to_service | legacy_pattern_summary

## required_runtime_flow
1. user_request_received
2. classify_request := explain | debug | generate | refactor | review | search
3. select_mode := Analyze | Developer | Debugger
4. load_standards := standard_coding.md
5. load_global_knowledge := ~/.config/workmode/knowledge/omnibus-structure.md WHEN target_system_is_omnibus
6. profile_project := PROFILE(project_root)
7. read_order := existing_routes | controllers | services | models | migrations | vue_components
8. map_scope := MAP(target_path)
9. compress_context := SIG(relevant_files)
10. verify_vocabulary := LEXICON(domain_terms)
11. scan_foundation := MATURITY(project_root)
12. identify_database_effects
13. produce_plan_or_patch
14. run_validation := tests | static_check | manual_safety_check
15. report_result := changed_files | risks | verification

## non_negotiable_rules
- no_hallucinated_files := true
- no_unsafe_database_changes := true
- no_blind_framework_upgrade := true
- no_database_assumption_without_schema_trace := true
- no_large_raw_sql_when_eloquent_is_reasonable := true
- no_duplicate_service_logic_without_search := true
- no_secret_exposure := true
- no_mass_edit_without_scope_map := true
- no_code_generation_without_standard_check := true

## final_acceptance_checklist
- [x] every plan folder contains plan.md
- [x] every plan folder contains workflow.md
- [x] every plan folder contains task.md
- [x] index.md dependency order matches build_order
- [x] context tools run in this repository without scanning ignored dependency folders
- [x] global Omnibus structure knowledge exists outside the Omnibus project
- [x] assistant refuses destructive database/file actions without explicit permission
- [ ] tools validated against a real Laravel 7 target project
- [ ] assistant explains legacy code with route-controller-service-model tracing in a real Laravel 7 target project
- [ ] assistant generates Laravel 7 compatible code in a real Laravel 7 target project
- [x] assistant prefers Eloquent and reusable services where appropriate
- [x] assistant reports verification results after changes

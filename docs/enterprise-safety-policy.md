# Enterprise Safety And Database Policy

## defaults
- database_mode := read_only
- destructive_file_action := denied_without_explicit_permission
- production_data_exposure := denied
- secret_output := denied
- target_system := Omnibus
- legacy_upgrade_mode := denied_by_default

## forbidden_without_explicit_permission
- migration_destructive_change
- truncate_table
- mass_delete
- mass_update
- drop_table
- schema_rewrite
- framework_major_upgrade
- dependency_major_upgrade
- legacy_module_rewrite
- credential_printing
- unrelated_file_rewrite

## required_before_edits
1. map_scope
2. identify_dependencies
3. inspect_existing_patterns
4. determine_blast_radius
5. identify_database_tables_and_queries
6. confirm_company_standard
7. produce_minimal_change

## database_policy
- select_queries := allowed_for_analysis_when_safe
- insert_update_delete := require_explicit_user_permission
- migration_generation := allowed_only_when_requested
- destructive_migration := require_backup_plan_and_explicit_confirmation
- raw_sql := allowed_only_when_eloquent_is_not_reasonable
- schema_assumption := denied_without_model_or_migration_or_database_trace
- production_database := never_mutate_without_explicit_permission_and_backup_plan

## omnibus_policy
- system_type := company_legacy_system
- database_scale := millions_of_records
- default_change_strategy := understand_existing_order_before_editing
- upgrade_strategy := avoid_major_upgrade_until_separate_migration_project_exists
- coding_standard := standard_coding.md | existing_company_patterns
- safe_assistant_behavior := analyze_first | map_scope | preserve_legacy_contracts | minimal_patch

## sensitive_data_policy
- redact := passwords | tokens | api_keys | session_ids | personal_identifiers_when_unneeded
- logs := summarize_sensitive_lines_instead_of_copying
- env_files := read_only_when_required_and_never_echo_secrets

## verification_policy
- after_change_report := changed_files | tests_run | tests_not_run | risks | rollback_hint

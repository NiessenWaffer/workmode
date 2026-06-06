# Enterprise Safety And Database Policy

## defaults
- database_mode := read_only
- destructive_file_action := denied_without_explicit_permission
- production_data_exposure := denied
- secret_output := denied

## forbidden_without_explicit_permission
- migration_destructive_change
- truncate_table
- mass_delete
- mass_update
- drop_table
- schema_rewrite
- credential_printing
- unrelated_file_rewrite

## required_before_edits
1. map_scope
2. identify_dependencies
3. inspect_existing_patterns
4. determine_blast_radius
5. produce_minimal_change

## database_policy
- select_queries := allowed_for_analysis_when_safe
- insert_update_delete := require_explicit_user_permission
- migration_generation := allowed_only_when_requested
- destructive_migration := require_backup_plan_and_explicit_confirmation
- raw_sql := allowed_only_when_eloquent_is_not_reasonable

## sensitive_data_policy
- redact := passwords | tokens | api_keys | session_ids | personal_identifiers_when_unneeded
- logs := summarize_sensitive_lines_instead_of_copying
- env_files := read_only_when_required_and_never_echo_secrets

## verification_policy
- after_change_report := changed_files | tests_run | tests_not_run | risks | rollback_hint

# Developer Task: Enterprise Safety & Database Policy

## objective
- enforce := safety_first_enterprise_development
- protect := critical_business_logic | production_data | secrets | legacy_modules

## tasks
- [x] define_read_only_database_default
- [x] define_explicit_permission_required_for_mutations
- [x] define_forbidden_actions := destructive_migration | truncate | mass_update | mass_delete
- [x] define_secret_redaction_policy
- [x] define_large_file_and_large_dataset_handling_policy
- [x] define_dependency_analysis_required_before_edits
- [x] define_backup_or_diff_review_requirement
- [x] define_safe_debugging_policy_for_production_like_data
- [x] define_rollback_and_verification_reporting

## acceptance_criteria
- unsafe_database_changes_are_blocked_by_default := true
- destructive_file_actions_require_explicit_permission := true
- assistant_does_not_expose_sensitive_data := true
- changes_are_scoped_and_reviewable := true

## verification_status
- status := complete
- verified_by := `node scripts/verify-structure.mjs`
- implemented_artifacts := `docs/enterprise-safety-policy.md` | prompt_guardrails

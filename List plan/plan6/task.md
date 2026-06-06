# Developer Task: LLM Modes & Standard Enforcement

## objective
- enforce := predictable_llm_behavior_by_mode
- modes := Analyze | Developer | Debugger

## tasks
- [x] define_Analyze_mode_rules
- [x] define_Developer_mode_rules
- [x] define_Debugger_mode_rules
- [x] require_standard_coding.md_before_code_output
- [x] require_scope_map_before_multi_file_change
- [x] require_dependency_trace_before_refactor
- [x] require_verification_summary_after_change
- [x] define_refusal_policy_for_unsafe_or_unsupported_requests
- [x] define_output_format_for_each_mode

## acceptance_criteria
- mode_boundaries_are_clear := true
- code_generation_uses_project_standards := true
- debugging_is_evidence_based := true
- refactoring_requires_dependency_awareness := true

## verification_status
- status := complete
- verified_by := `node scripts/verify-structure.mjs`
- implemented_artifacts := Gemini_TOML_commands | OpenCode_MD_commands | Kiro_SKILL_commands | core_prompt

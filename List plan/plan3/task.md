# Developer Task: Opencode-Inspired AI Workflow

## objective
- define := agent_boundaries_and_context_compression_workflow
- agents := Planning | Developer | Debugger

## tasks
- [x] define_planning_agent_rules
- [x] define_developer_agent_rules
- [x] define_debugger_agent_rules
- [x] define_context_budget_policy
- [x] define_when_to_use_MAP
- [x] define_when_to_use_SIG
- [x] define_when_to_use_LEXICON
- [x] define_when_to_use_MATURITY
- [x] define_hand_off_format_between_agents
- [x] define_error_recovery_workflow

## acceptance_criteria
- planning_agent_cannot_edit_source := true
- developer_agent_requires_safety_scan := true
- debugger_agent_uses_reproducible_evidence := true
- context_is_compressed_before_large_file_analysis := true

## verification_status
- status := complete
- verified_by := `node scripts/verify-structure.mjs`
- implemented_artifacts := `docs/agent-workflow.md` | three_mode_command_pack

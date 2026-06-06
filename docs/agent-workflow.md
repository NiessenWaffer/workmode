# Agent Workflow

## modes
- analyze := understand_without_editing
- debug := evidence_first_failure_triage
- develop := scoped_safe_implementation

## analyze_mode
- can_edit := false
- required_tools := MAP_optional | SIG_optional | LEXICON_optional
- output := architecture_map | explanation | risks | next_steps

## debug_mode
- can_edit := only_after_root_cause_evidence
- required_tools := MAP_optional | SIG_optional | MATURITY_optional
- output := facts | hypotheses | root_cause | fix | verification

## develop_mode
- can_edit := true
- required_tools := MAP_for_broad_change | SIG_for_large_files | MATURITY_for_risky_work
- output := changed_files | rationale | verification | risks

## handoff_format
```text
mode := analyze|debug|develop
scope := files_or_modules
known_facts := ...
unknowns := ...
risks := ...
next_action := ...
```

## context_budget_policy
- prefer_MAP_before_recursive_reads
- prefer_SIG_before_large_file_reads
- read_full_file_only_when_implementation_details_are_needed
- never_scan_vendor_node_modules_or_logs_unnecessarily

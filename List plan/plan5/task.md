# Developer Task: Custom AI Toolset Implementation

## objective
- implement := executable_context_tools
- tools := MAP | SIG | LEXICON | MATURITY

## tasks
- [x] create_tools_directory := .opencode/tools
- [x] implement_MAP_directory_mapper
- [x] implement_SIG_signature_extractor_for_php
- [x] implement_SIG_signature_extractor_for_js_ts_vue
- [x] implement_LEXICON_dictionary_lookup
- [x] implement_MATURITY_architecture_scanner
- [x] add_safe_ignore_list := .git | node_modules | vendor | storage/logs | bootstrap/cache | dist | build
- [x] add_json_output_for_tooling
- [x] add_cli_usage_examples
- [x] add_basic_validation_tests_or_sample_runs

## acceptance_criteria
- tools_do_not_scan_vendor_or_node_modules := true
- MAP_returns_relevant_project_tree := true
- SIG_reduces_large_files_to_signatures := true
- LEXICON_returns_canonical_terms := true
- MATURITY_reports_missing_foundations := true

## verification_status
- status := complete
- verified_by := `node scripts/verify-structure.mjs` | smoke_tests
- implemented_artifacts := `.opencode/tools/MAP.mjs` | `.opencode/tools/SIG.mjs` | `.opencode/tools/LEXICON.mjs` | `.opencode/tools/MATURITY.mjs`

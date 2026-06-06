# Omnibus Structure Profile

## purpose
- target_system := Omnibus
- profile_type := safe_global_navigation_memory
- storage_policy := WorkMode_global_knowledge_not_inside_omnibus
- use_before := analyze | debug | develop
- source := read_only_scan_of_omnibus_repository

## detected_stack
- backend := Laravel 7
- php_platform := 7.3.23
- frontend := Vue 2 | Vue Router 3 | Vuex 3 | Bulma | Buefy
- build_tool := Laravel Mix 5
- database_integrations := MySQL | DB2 | ODBC | M3_related_extensions
- package_signals := spatie_permission | laravel_auditing | dompdf | mpdf | phpspreadsheet | guzzle | swiftmailer

## high_level_structure
- routes := routes/api.php(large) | routes/web.php | routes/console.php | routes/channels.php
- controllers := app/Http/Controllers/*
- requests := app/Http/Requests/*
- middleware := app/Http/Middleware/*
- console_jobs := app/Console/Commands/*
- extensions := app/Extensions/*
- helpers := app/helpers.php | app/Helpers/*
- migrations := database/migrations/*
- frontend_entry := resources/js/app.js | resources/js/router.js(large) | resources/js/store.js | resources/js/App.vue
- frontend_modules := resources/js/views/* | resources/js/components/*
- views := resources/views/*

## observed_domain_areas
- approvals := app/Http/Controllers/Approval/*
- process_automation := app/Http/Controllers/ProcessAutomation/* | app/Console/Commands/ProcessAutomation/*
- bank_soa := app/Http/Controllers/BankSoa/* | app/Console/Commands/BankRecon/*
- inquiries := app/Http/Controllers/Inquiry/*
- it_tools := app/Http/Controllers/ITTools/*
- core_admin := app/Http/Controllers/Core/*
- loyalty := app/Http/Controllers/Loyalty/* | app/Extensions/LoyaltyApi/*
- external_services := app/Extensions/*
- purchasing := app/Console/Commands/Purchasing/*
- pricetag := app/Http/Controllers/Pricetag/* | app/Console/Commands/Pricetag/*

## required_read_order
1. start_with_global_profile := ~/.config/workmode/knowledge/omnibus-structure.md
2. map_scope := MAP(target_module_path)
3. inspect_route := routes/api.php | routes/web.php | route_group_for_feature
4. inspect_controller := app/Http/Controllers/<module>/*
5. inspect_request_validation := app/Http/Requests/* when present
6. inspect_service_or_extension := app/Extensions/* | app/Classes/* | app/Helpers/*
7. inspect_model_and_query := app/*.php | app/Models/* if present
8. inspect_schema := database/migrations/* or confirmed database table trace
9. inspect_frontend_route := resources/js/router.js
10. inspect_vue_view_or_component := resources/js/views/* | resources/js/components/*
11. identify_database_effects_before_patch

## safety_rules
- never_read_or_print := .env | *.log | keys | certificates | secrets
- never_assume_schema := true
- never_update_database_without_permission := true
- never_suggest_major_upgrade_as_default_fix := true
- route_and_router_files_are_large := summarize_with_SIG_or_targeted_search
- tests_missing_or_limited := require_manual_verification_steps

## workmode_update_need
- add_PROFILE_tool := generate_safe_project_structure_profile
- install_global_knowledge := copy_knowledge_to_~/.config/workmode/knowledge
- improve_MAP_ignore_rules := env_files | logs | keys | certificates
- assistant_bootstrap := read_global_omnibus_profile_before_omnibus_work

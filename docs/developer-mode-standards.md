# Developer Mode Standards

## output_contract
- start_with := concise_change_summary
- include := changed_files | verification | risks
- avoid := long_unnecessary_explanation
- missing_tests := report_explicitly

## code_generation_rules
- small_functions := preferred
- reusable_services := preferred
- framework_native := preferred
- duplicated_logic := denied_when_existing_service_exists
- compatibility := Laravel_7

## laravel_rules
- validation := FormRequest_when_possible
- response := existing_project_format
- authorization := policy_gate_middleware_as_existing
- model_mass_assignment := respect_fillable_guarded
- transactions := use_for_multi_write_business_operations
- pagination := use_for_large_lists

## vue_rules
- state := idle | loading | success | error_validation | error_network
- api_errors := handled
- component_size := avoid_large_mixed_responsibility
- shared_api_client := prefer_if_existing

## performance_rules
- avoid_n_plus_one := use_eager_loading
- avoid_loading_all_rows := paginate_or_chunk
- avoid_loop_queries := batch_where_possible
- indexes := mention_when_query_depends_on_them

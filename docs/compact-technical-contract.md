# Compact Technical Contract Standard

## purpose
- make_code_readable_by_ai := true
- prevent_missing_dependencies := true
- reduce_context_tokens := true
- apply_to := php | vue | js | ts | api_docs

## syntax
- prose := minimal
- declarations := `key := value`
- flow := `A -> B -> C`
- branches := `IF condition THEN outcome ELSE fallback`
- lists := strict_pipe_or_table_format

## php_contract_template
```php
/**
 * contract := compact_technical_contract
 * module := UserManagement
 * role := Controller
 * route_in := routes/api.php::users.*
 * depends_on := App\Http\Requests\UserRequest | App\Services\UserService
 * calls := UserService.create | UserService.update
 * models := App\User
 * response := json(success|validation_error|server_error)
 * failure_states := validation_failed | unauthorized | service_error
 */
```

## vue_contract_template
```js
/*
contract := compact_technical_contract
component := UserForm
role := form_view
api_calls := POST /api/users | PUT /api/users/{id}
states := idle | loading | success | error_validation | error_network
depends_on := resources/js/api/users.js
emits := saved | cancelled
*/
```

## api_payload_template
```text
User.create.request := name(required,string) | email(required,email) | role_id(required,int)
User.create.response := id(int) | name(string) | email(string) | role(role_summary)
User.create.errors := validation_error | unauthorized | duplicate_email
```

## database_entity_template
```text
users.entity := id | name | email | password | role_id | created_at | updated_at
users.model := App\User
users.relations := belongsTo(Role) | hasMany(Order)
```

## enforcement
- new_code := must_include_contract_when_module_boundary_is_created
- existing_code := document_incrementally_when_touched
- ai_rule := do_not_assume_missing_dependencies

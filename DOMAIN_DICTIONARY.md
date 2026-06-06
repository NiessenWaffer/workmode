# Domain Dictionary

| canonical | aliases | notes |
|---|---|---|
| user | users, account, member | Use `user` unless the project has a distinct Account model. |
| role | roles, permission group | Use `role` for authorization grouping. |
| permission | permissions, ability | Use `permission` for granular authorization. |
| service | business service, service class | Use `service` for business logic classes. |
| repository | query repository, data access | Use only when the project already has repository boundaries. |
| request | form request, validator | Use `request` for Laravel Form Request validation contracts. |
| resource | api resource, transformer | Use `resource` for Laravel API Resource response shaping. |

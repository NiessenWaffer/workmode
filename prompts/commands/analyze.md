# WorkMode Analyze

Use the WorkMode Core Prompt.

Task: Analyze the current project or provided target without editing files.

Input: `$ARGUMENTS`

Required behavior:
- read `~/.config/workmode/knowledge/omnibus-structure.md` first when the target is Omnibus
- use PROFILE to create or refresh a safe global project profile when structure is unknown or stale
- use MAP for broad project/module structure when available
- use SIG for large target files when available
- map the relevant Laravel/Vue architecture
- identify route, controller, service, model, request, migration, and frontend connections
- explain what the code does in plain engineering language
- identify missing context instead of guessing
- flag risky areas, hidden dependencies, duplicated logic, and raw SQL concerns
- end with recommended next steps

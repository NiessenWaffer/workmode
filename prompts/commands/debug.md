# WorkMode Debug

Use the WorkMode Core Prompt.

Task: Debug the issue described by the user.

Input: `$ARGUMENTS`

Required behavior:
- use MAP to find the failing backend/frontend path when available
- use SIG for large suspected files when available
- reproduce the failure path from evidence where possible
- inspect logs, stack traces, routes, controllers, services, models, requests, and frontend calls as needed
- separate facts from hypotheses
- avoid changing code until the likely root cause is identified
- propose the smallest safe fix
- verify the fix with available tests, commands, or reasoned checks

# WorkMode Enterprise Laravel AI Assistant

WorkMode is a global prompt and slash-command pack for CLI AI tools. It is designed for Laravel 7 enterprise systems where the assistant must understand architecture, avoid unsafe edits, prefer maintainable framework-native code, and help developers debug legacy systems safely.

WorkMode exposes only three work commands: analyze, debug, and develop. Review and mapping behavior is included inside those modes.

## What This Installs

- Gemini CLI global TOML slash commands in `~/.gemini/commands/workmode/`
- OpenCode global Markdown commands in `~/.config/opencode/commands/`
- Kiro global skills in `~/.kiro/skills/`
- Kiro global agent JSON in `~/.kiro/agents/`
- Shared WorkMode prompts in `~/.config/workmode/`
- Shared WorkMode tools in `~/.config/workmode/tools/`
- Shared standards docs in `~/.config/workmode/docs/`

After installation, the commands are available from any project. The target project does not need to contain this repository.

## Install

Clone or download this repository first:

```bash
git clone <your-github-repo-url> workmode
cd workmode
```

### Windows PowerShell

```powershell
.\install.ps1
```

### macOS/Linux

```bash
chmod +x ./install.sh
./install.sh
```

The installer copies WorkMode into global user-level CLI config folders:

```text
Gemini CLI:  ~/.gemini/commands/workmode/
OpenCode:    ~/.config/opencode/commands/
Kiro skills: ~/.kiro/skills/
Kiro agent:  ~/.kiro/agents/
WorkMode:    ~/.config/workmode/
```

After installation, restart Gemini CLI, OpenCode, or Kiro CLI so the tool reloads global commands.

You can then open any Laravel project and use WorkMode from that project directory. The Laravel project does not need to contain this repository.

### Update Existing Install

After pulling a newer version:

```bash
git pull
./install.sh
```

On Windows:

```powershell
git pull
.\install.ps1
```

The installer also removes old standalone `review` and `map` commands if they were installed from an earlier version.

## Commands

### Gemini CLI

```text
/workmode:analyze
/workmode:debug
/workmode:develop
```

Example:

```text
/workmode:analyze explain the authentication module
```

### OpenCode

```text
/workmode-analyze
/workmode-debug
/workmode-develop
```

Example:

```text
/workmode-debug trace why this API endpoint returns 500
```

### Kiro CLI

```text
/workmode-analyze
/workmode-debug
/workmode-develop
```

Example:

```text
/workmode-develop add validation using the existing Laravel 7 patterns
```

Optional Kiro agent:

```bash
kiro-cli chat --agent workmode-laravel
```

## Tools

The installer also copies context tools globally:

```bash
node ~/.config/workmode/tools/MAP.mjs .
node ~/.config/workmode/tools/SIG.mjs app/Http/Controllers/UserController.php
node ~/.config/workmode/tools/LEXICON.mjs user ~/.config/workmode/DOMAIN_DICTIONARY.md
node ~/.config/workmode/tools/MATURITY.mjs .
```

On Windows PowerShell:

```powershell
node "$env:USERPROFILE\.config\workmode\tools\MAP.mjs" .
```

## Operating Rules

- Analyze before editing.
- Do not hallucinate missing files.
- Do not mutate databases without explicit permission.
- Prefer Laravel-native architecture: Form Requests, Services, Eloquent, Policies, Resources, Events, Jobs.
- Prefer reusable service functions over duplicated logic.
- Use raw SQL only when justified by performance, reporting, or query shape.
- Report changed files, risks, and verification after edits.
- Review and architecture mapping are built into the three modes, not separate commands.

## Standards Included

- [Compact Technical Contract](docs/compact-technical-contract.md)
- [Enterprise Safety Policy](docs/enterprise-safety-policy.md)
- [Agent Workflow](docs/agent-workflow.md)
- [Guardrails And ORM Policy](docs/guardrails-and-orm.md)
- [Developer Mode Standards](docs/developer-mode-standards.md)
- [MVP Architecture](docs/mvp-architecture.md)

## Repository Structure

```text
commands/
  gemini/
  opencode/
  kiro/
  kiro-agents/
.opencode/
  tools/
prompts/
  core/
  commands/
docs/
install.ps1
install.sh
standard_coding.md
List plan/
```

## Source Plans

The implementation roadmap is in [List plan/BUILD_STRUCTURE.md](<List plan/BUILD_STRUCTURE.md>).
# workmode

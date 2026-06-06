# Install Instructions For CLI AI Assistants

## purpose
- this_repo := WorkMode global slash command pack
- install_scope := global_user_config
- target := make_commands_available_in_every_project
- project_requirement := target_project_does_not_need_workMode_repo

## important_rule
Do not copy this repository into every Laravel project. Install it once into the user's global CLI configuration directories.

Only install three WorkMode commands: analyze, debug, and develop. Review and mapping are capabilities inside those commands, not standalone commands.

## install_windows
Run from the downloaded repository root:

```powershell
.\install.ps1
```

## install_macos_linux
Run from the downloaded repository root:

```bash
chmod +x ./install.sh
./install.sh
```

## installed_paths
| tool | global_path | format | command_style |
|---|---|---|---|
| Gemini CLI | `~/.gemini/commands/workmode/*.toml` | TOML | `/workmode:analyze` |
| OpenCode | `~/.config/opencode/commands/*.md` | Markdown | `/workmode-analyze` |
| Kiro CLI skills | `~/.kiro/skills/*/SKILL.md` | Markdown skill | `/workmode-analyze` |
| Kiro CLI agent | `~/.kiro/agents/workmode-laravel.json` | JSON | `kiro-cli chat --agent workmode-laravel` |
| Shared prompt docs | `~/.config/workmode/prompts/` | Markdown | reference only |
| Shared standards docs | `~/.config/workmode/docs/` | Markdown | reference only |
| Shared context tools | `~/.config/workmode/tools/` | Node scripts | `node ~/.config/workmode/tools/MAP.mjs .` |

## command_list
### Gemini
- `/workmode:analyze`
- `/workmode:debug`
- `/workmode:develop`
- `/workmode:review`
- `/workmode:map`

### OpenCode and Kiro
- `/workmode-analyze`
- `/workmode-debug`
- `/workmode-develop`

## command_meaning
- analyze := explain architecture and dependencies without editing; includes mapping and review findings
- debug := evidence-first troubleshooting and smallest safe fix; includes failing-path mapping and risk review
- develop := scoped Laravel 7 implementation using existing project patterns; includes dependency mapping and final review

## after_install
1. Restart the CLI AI tool so it reloads global commands.
2. Open any Laravel project.
3. Run one command, for example:

```text
/workmode:analyze explain this module
```

or:

```text
/workmode-analyze explain this module
```

## ai_assistant_behavior
When using these commands, the AI must:
- inspect files before claiming behavior
- avoid hallucinating missing code
- avoid destructive actions
- avoid database mutation without explicit permission
- prefer Laravel 7 native patterns
- prefer Eloquent when reasonable
- reuse existing services before creating duplicated logic
- report changed files, risks, and verification

## global_tool_usage
Use these tools when available:

```bash
node ~/.config/workmode/tools/MAP.mjs <project-path>
node ~/.config/workmode/tools/SIG.mjs <file-path>
node ~/.config/workmode/tools/LEXICON.mjs <term> ~/.config/workmode/DOMAIN_DICTIONARY.md
node ~/.config/workmode/tools/MATURITY.mjs <project-path>
```

Tool purpose:
- MAP := safe directory mapping with ignored vendor/cache/build folders
- SIG := compact signature extraction for PHP, JS, TS, and Vue files
- LEXICON := canonical domain term lookup
- MATURITY := Laravel/Vue foundation scan

## known_tool_differences
- Gemini uses TOML custom command files and supports namespacing through folders.
- OpenCode supports global Markdown command files.
- Kiro exposes skills as slash commands and can load a JSON agent configuration.

## maintenance
To update globally after pulling a newer repository version, rerun the installer.

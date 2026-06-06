#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKMODE_ROOT="${HOME}/.config/workmode"

copy_tree() {
  local source="$1"
  local destination="$2"
  if [ ! -d "$source" ]; then
    echo "Missing source path: $source" >&2
    exit 1
  fi
  mkdir -p "$destination"
  cp -R "$source"/. "$destination"/
}

copy_tree "${REPO_ROOT}/prompts" "${WORKMODE_ROOT}/prompts"
copy_tree "${REPO_ROOT}/docs" "${WORKMODE_ROOT}/docs"
copy_tree "${REPO_ROOT}/knowledge" "${WORKMODE_ROOT}/knowledge"
copy_tree "${REPO_ROOT}/.opencode/tools" "${WORKMODE_ROOT}/tools"
cp "${REPO_ROOT}/standard_coding.md" "${WORKMODE_ROOT}/standard_coding.md"
cp "${REPO_ROOT}/DOMAIN_DICTIONARY.md" "${WORKMODE_ROOT}/DOMAIN_DICTIONARY.md"
copy_tree "${REPO_ROOT}/commands/gemini" "${HOME}/.gemini/commands"
rm -f "${HOME}/.gemini/commands/workmode/review.toml" "${HOME}/.gemini/commands/workmode/map.toml"
copy_tree "${REPO_ROOT}/commands/opencode" "${HOME}/.config/opencode/commands"
rm -f "${HOME}/.config/opencode/commands/workmode-review.md" "${HOME}/.config/opencode/commands/workmode-map.md"
copy_tree "${REPO_ROOT}/commands/kiro" "${HOME}/.kiro/skills"
copy_tree "${REPO_ROOT}/commands/kiro-agents" "${HOME}/.kiro/agents"
rm -rf "${HOME}/.kiro/skills/workmode-review" "${HOME}/.kiro/skills/workmode-map"

echo "WorkMode installed globally."
echo "Gemini:   /workmode:analyze /workmode:debug /workmode:develop"
echo "OpenCode: /workmode-analyze /workmode-debug /workmode-develop"
echo "Kiro:     /workmode-analyze /workmode-debug /workmode-develop"
echo "Kiro agent: kiro-cli chat --agent workmode-laravel"
echo "Tools:    node ~/.config/workmode/tools/MAP.mjs <project-path>"
echo "Profile:  node ~/.config/workmode/tools/PROFILE.mjs <project-path> ~/.config/workmode/knowledge/<name>.json"

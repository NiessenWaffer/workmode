param(
    [switch]$SkipGemini,
    [switch]$SkipOpenCode,
    [switch]$SkipKiro
)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$WorkModeRoot = Join-Path $env:USERPROFILE ".config\workmode"

function Copy-Tree($Source, $Destination) {
    if (-not (Test-Path $Source)) {
        throw "Missing source path: $Source"
    }
    New-Item -ItemType Directory -Force -Path $Destination | Out-Null
    Copy-Item -Path (Join-Path $Source "*") -Destination $Destination -Recurse -Force
}

New-Item -ItemType Directory -Force -Path $WorkModeRoot | Out-Null
Copy-Tree (Join-Path $RepoRoot "prompts") (Join-Path $WorkModeRoot "prompts")
Copy-Tree (Join-Path $RepoRoot "docs") (Join-Path $WorkModeRoot "docs")
Copy-Tree (Join-Path $RepoRoot ".opencode\tools") (Join-Path $WorkModeRoot "tools")
Copy-Item -Path (Join-Path $RepoRoot "standard_coding.md") -Destination (Join-Path $WorkModeRoot "standard_coding.md") -Force
Copy-Item -Path (Join-Path $RepoRoot "DOMAIN_DICTIONARY.md") -Destination (Join-Path $WorkModeRoot "DOMAIN_DICTIONARY.md") -Force

if (-not $SkipGemini) {
    Copy-Tree (Join-Path $RepoRoot "commands\gemini") (Join-Path $env:USERPROFILE ".gemini\commands")
    Remove-Item -Force -ErrorAction SilentlyContinue (Join-Path $env:USERPROFILE ".gemini\commands\workmode\review.toml")
    Remove-Item -Force -ErrorAction SilentlyContinue (Join-Path $env:USERPROFILE ".gemini\commands\workmode\map.toml")
}

if (-not $SkipOpenCode) {
    Copy-Tree (Join-Path $RepoRoot "commands\opencode") (Join-Path $env:USERPROFILE ".config\opencode\commands")
    Remove-Item -Force -ErrorAction SilentlyContinue (Join-Path $env:USERPROFILE ".config\opencode\commands\workmode-review.md")
    Remove-Item -Force -ErrorAction SilentlyContinue (Join-Path $env:USERPROFILE ".config\opencode\commands\workmode-map.md")
}

if (-not $SkipKiro) {
    Copy-Tree (Join-Path $RepoRoot "commands\kiro") (Join-Path $env:USERPROFILE ".kiro\skills")
    Copy-Tree (Join-Path $RepoRoot "commands\kiro-agents") (Join-Path $env:USERPROFILE ".kiro\agents")
    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue (Join-Path $env:USERPROFILE ".kiro\skills\workmode-review")
    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue (Join-Path $env:USERPROFILE ".kiro\skills\workmode-map")
}

Write-Host "WorkMode installed globally."
Write-Host "Gemini:   /workmode:analyze /workmode:debug /workmode:develop"
Write-Host "OpenCode: /workmode-analyze /workmode-debug /workmode-develop"
Write-Host "Kiro:     /workmode-analyze /workmode-debug /workmode-develop"
Write-Host "Kiro agent: kiro-cli chat --agent workmode-laravel"
Write-Host "Tools:    node ~/.config/workmode/tools/MAP.mjs <project-path>"

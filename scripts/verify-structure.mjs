#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "README.md",
  "INSTALL_FOR_AI_CLI.md",
  "IMPLEMENTATION_STATUS.md",
  "install.ps1",
  "install.sh",
  "standard_coding.md",
  "DOMAIN_DICTIONARY.md",
  "docs/compact-technical-contract.md",
  "docs/enterprise-safety-policy.md",
  "docs/agent-workflow.md",
  "docs/guardrails-and-orm.md",
  "docs/developer-mode-standards.md",
  "docs/mvp-architecture.md",
  "prompts/core/enterprise-laravel-assistant.md",
  "prompts/commands/analyze.md",
  "prompts/commands/debug.md",
  "prompts/commands/develop.md",
  "commands/gemini/workmode/analyze.toml",
  "commands/gemini/workmode/debug.toml",
  "commands/gemini/workmode/develop.toml",
  "commands/opencode/workmode-analyze.md",
  "commands/opencode/workmode-debug.md",
  "commands/opencode/workmode-develop.md",
  "commands/kiro/workmode-analyze/SKILL.md",
  "commands/kiro/workmode-debug/SKILL.md",
  "commands/kiro/workmode-develop/SKILL.md",
  "commands/kiro-agents/workmode-laravel.json",
  ".opencode/tools/MAP.mjs",
  ".opencode/tools/SIG.mjs",
  ".opencode/tools/LEXICON.mjs",
  ".opencode/tools/MATURITY.mjs"
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));

if (missing.length) {
  console.error("Missing required files:");
  for (const file of missing) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log(`WorkMode structure OK: ${required.length} required files found.`);

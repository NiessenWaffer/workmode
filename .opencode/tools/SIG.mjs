#!/usr/bin/env node
import path from "node:path";
import { exists, readText, resolveTarget } from "./shared.mjs";

const target = resolveTarget(process.argv[2]);

if (!process.argv[2] || !exists(target)) {
  process.stderr.write("Usage: node .opencode/tools/SIG.mjs <file>\n");
  process.exit(1);
}

const ext = path.extname(target).toLowerCase();
const source = readText(target);

function linesMatching(patterns) {
  return source
    .split(/\r?\n/)
    .map((line, index) => ({ line: line.trim(), lineNumber: index + 1 }))
    .filter(({ line }) => line && patterns.some((pattern) => pattern.test(line)))
    .map(({ line, lineNumber }) => `${lineNumber}: ${line}`);
}

function phpSignatures() {
  return linesMatching([
    /^namespace\s+[^;]+;/,
    /^use\s+[^;]+;/,
    /^(abstract\s+|final\s+)?class\s+\w+/,
    /^interface\s+\w+/,
    /^trait\s+\w+/,
    /^(public|protected|private)\s+(static\s+)?function\s+\w+\s*\(/,
    /^function\s+\w+\s*\(/,
    /^(public|protected|private)\s+\$[\w]+/,
    /^(public|protected|private)\s+const\s+\w+/
  ]);
}

function jsLikeSignatures() {
  return linesMatching([
    /^import\s+.+from\s+["'].+["'];?/,
    /^export\s+/,
    /^(export\s+)?(default\s+)?class\s+\w+/,
    /^(export\s+)?interface\s+\w+/,
    /^(export\s+)?type\s+\w+\s*=/,
    /^(export\s+)?(async\s+)?function\s+\w+\s*\(/,
    /^(export\s+)?const\s+\w+\s*=\s*(async\s*)?\(/,
    /^\w+\s*\([^)]*\)\s*\{?$/,
    /^props\s*:/,
    /^data\s*\(\)/,
    /^computed\s*:/,
    /^methods\s*:/
  ]);
}

const signatures = ext === ".php" ? phpSignatures() : jsLikeSignatures();

process.stdout.write(`# SIG ${target}\n`);
process.stdout.write(signatures.length ? `${signatures.join("\n")}\n` : "No signatures found.\n");

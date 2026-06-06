#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { printJson, resolveTarget, shouldIgnore, statSafe, toProjectPath } from "./shared.mjs";

const target = resolveTarget(process.argv[2] ?? ".");
const maxFiles = Number(process.argv[3] ?? 5000);
const root = target;
const files = [];
const directories = [];

function walk(current) {
  if (files.length >= maxFiles || shouldIgnore(current, root)) {
    return;
  }

  const stat = statSafe(current);
  if (!stat) {
    return;
  }

  if (stat.isFile()) {
    files.push(toProjectPath(current, root));
    return;
  }

  if (!stat.isDirectory()) {
    return;
  }

  directories.push(toProjectPath(current, root));

  for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
    walk(path.join(current, entry.name));
    if (files.length >= maxFiles) {
      break;
    }
  }
}

walk(target);

printJson({
  tool: "MAP",
  root: target,
  maxFiles,
  truncated: files.length >= maxFiles,
  directories,
  files
});

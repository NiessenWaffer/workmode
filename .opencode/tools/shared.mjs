import fs from "node:fs";
import path from "node:path";

export const DEFAULT_IGNORES = new Set([
  ".git",
  "node_modules",
  "vendor",
  "storage/logs",
  "bootstrap/cache",
  "dist",
  "build",
  ".next",
  ".nuxt",
  "coverage",
  ".idea",
  ".vscode"
]);

export function resolveTarget(inputPath = ".") {
  return path.resolve(process.cwd(), inputPath);
}

export function toProjectPath(fullPath, root = process.cwd()) {
  return path.relative(root, fullPath).replaceAll(path.sep, "/") || ".";
}

export function shouldIgnore(fullPath, root = process.cwd()) {
  const rel = toProjectPath(fullPath, root);
  return rel.split("/").some((part) => DEFAULT_IGNORES.has(part));
}

export function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

export function exists(filePath) {
  return fs.existsSync(filePath);
}

export function statSafe(filePath) {
  try {
    return fs.statSync(filePath);
  } catch {
    return null;
  }
}

export function printJson(value) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

export function listFiles(root, options = {}) {
  const maxFiles = options.maxFiles ?? 5000;
  const results = [];

  function walk(current) {
    if (results.length >= maxFiles || shouldIgnore(current, root)) {
      return;
    }

    const stat = statSafe(current);
    if (!stat) {
      return;
    }

    if (stat.isFile()) {
      results.push(current);
      return;
    }

    if (!stat.isDirectory()) {
      return;
    }

    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      walk(path.join(current, entry.name));
      if (results.length >= maxFiles) {
        break;
      }
    }
  }

  walk(root);
  return results;
}

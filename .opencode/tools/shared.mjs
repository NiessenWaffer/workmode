import fs from "node:fs";
import path from "node:path";

export const DEFAULT_IGNORES = new Set([
  ".git",
  "node_modules",
  "vendor",
  "bootstrap/cache",
  "dist",
  "build",
  ".next",
  ".nuxt",
  "coverage",
  "logs",
  ".idea",
  ".vscode"
]);

export const SENSITIVE_FILE_NAMES = new Set([
  ".env",
  ".env.local",
  ".env.production",
  ".env.staging",
  ".env.testing",
  "auth.json"
]);

export const SENSITIVE_EXTENSIONS = new Set([
  ".log",
  ".key",
  ".pem",
  ".crt",
  ".p12",
  ".pfx"
]);

export function resolveTarget(inputPath = ".") {
  return path.resolve(process.cwd(), inputPath);
}

export function toProjectPath(fullPath, root = process.cwd()) {
  return path.relative(root, fullPath).replaceAll(path.sep, "/") || ".";
}

export function shouldIgnore(fullPath, root = process.cwd()) {
  const rel = toProjectPath(fullPath, root);
  const parts = rel.split("/");
  const fileName = parts.at(-1) ?? "";
  const ext = path.extname(fileName).toLowerCase();

  return (
    rel === "storage/logs" ||
    rel.startsWith("storage/logs/") ||
    parts.some((part) => DEFAULT_IGNORES.has(part)) ||
    SENSITIVE_FILE_NAMES.has(fileName) ||
    fileName.startsWith(".env.") ||
    SENSITIVE_EXTENSIONS.has(ext)
  );
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

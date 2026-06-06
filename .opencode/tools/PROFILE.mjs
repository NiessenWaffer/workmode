#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { listFiles, printJson, resolveTarget, statSafe, toProjectPath } from "./shared.mjs";

const root = resolveTarget(process.argv[2] ?? ".");
const outputPath = process.argv[3] ? path.resolve(process.cwd(), process.argv[3]) : null;
const maxFiles = Number(process.argv[4] ?? 20000);
const files = listFiles(root, { maxFiles });
const relFiles = files.map((file) => toProjectPath(file, root));

function readJson(relativePath) {
  const target = path.join(root, relativePath);
  if (!fs.existsSync(target)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(target, "utf8"));
  } catch {
    return null;
  }
}

function countWhere(predicate) {
  return relFiles.filter(predicate).length;
}

function dirExists(relativePath) {
  const stat = statSafe(path.join(root, relativePath));
  return Boolean(stat?.isDirectory());
}

function fileInfo(relativePath) {
  const stat = statSafe(path.join(root, relativePath));
  return stat?.isFile() ? { path: relativePath, bytes: stat.size } : null;
}

function immediateChildren(relativePath) {
  const target = path.join(root, relativePath);
  const stat = statSafe(target);
  if (!stat?.isDirectory()) {
    return [];
  }

  return fs
    .readdirSync(target, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => `${relativePath}/${entry.name}`.replace(/^\.\//, ""))
    .sort();
}

function topLevelModules(prefix, limit = 80) {
  return immediateChildren(prefix).slice(0, limit);
}

const composer = readJson("composer.json");
const packageJson = readJson("package.json");
const routeFiles = ["routes/web.php", "routes/api.php", "routes/console.php", "routes/channels.php"]
  .map(fileInfo)
  .filter(Boolean);

const profile = {
  tool: "PROFILE",
  root,
  generatedAt: new Date().toISOString(),
  maxFiles,
  truncated: relFiles.length >= maxFiles,
  project: {
    detected: {
      laravel: dirExists("app") && dirExists("routes"),
      vue: dirExists("resources/js"),
      migrations: dirExists("database/migrations")
    },
    php: composer?.require?.php ?? null,
    laravel: composer?.require?.["laravel/framework"] ?? null,
    vue: packageJson?.devDependencies?.vue ?? packageJson?.dependencies?.vue ?? null,
    frontendBuild: packageJson?.devDependencies?.["laravel-mix"] ?? null
  },
  counts: {
    safeFilesScanned: relFiles.length,
    phpFiles: countWhere((file) => file.endsWith(".php")),
    vueFiles: countWhere((file) => file.endsWith(".vue")),
    jsFiles: countWhere((file) => file.endsWith(".js")),
    migrations: countWhere((file) => file.startsWith("database/migrations/") && file.endsWith(".php")),
    controllers: countWhere((file) => file.startsWith("app/Http/Controllers/") && file.endsWith(".php")),
    requests: countWhere((file) => file.startsWith("app/Http/Requests/") && file.endsWith(".php")),
    middleware: countWhere((file) => file.startsWith("app/Http/Middleware/") && file.endsWith(".php")),
    consoleCommands: countWhere((file) => file.startsWith("app/Console/Commands/") && file.endsWith(".php")),
    tests: countWhere((file) => file.startsWith("tests/") && /Test\.php$/.test(file))
  },
  entryPoints: {
    routes: routeFiles,
    frontend: ["resources/js/app.js", "resources/js/router.js", "resources/js/store.js", "resources/js/App.vue"]
      .map(fileInfo)
      .filter(Boolean),
    laravel: ["app/Console/Kernel.php", "app/Exceptions/Handler.php", "app/helpers.php"]
      .map(fileInfo)
      .filter(Boolean)
  },
  modules: {
    app: topLevelModules("app"),
    controllers: topLevelModules("app/Http/Controllers"),
    consoleCommands: topLevelModules("app/Console/Commands"),
    extensions: topLevelModules("app/Extensions"),
    resources: topLevelModules("resources"),
    frontendViews: topLevelModules("resources/js/views"),
    frontendComponents: topLevelModules("resources/js/components")
  },
  dependencies: {
    composerRequire: composer?.require ? Object.keys(composer.require).sort() : [],
    composerRequireDev: composer?.["require-dev"] ? Object.keys(composer["require-dev"]).sort() : [],
    npmDependencies: packageJson?.dependencies ? Object.keys(packageJson.dependencies).sort() : [],
    npmDevDependencies: packageJson?.devDependencies ? Object.keys(packageJson.devDependencies).sort() : []
  },
  safetyNotes: [
    "Profile excludes ignored dependency folders, logs, env files, keys, and certificates.",
    "Use this profile as a navigation map only; inspect exact files before proposing edits.",
    "For Omnibus, read routes, controllers, services/extensions, models, migrations, and Vue callers in order."
  ]
};

if (outputPath) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(profile, null, 2)}\n`);
} else {
  printJson(profile);
}

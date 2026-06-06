#!/usr/bin/env node
import path from "node:path";
import { listFiles, printJson, resolveTarget, toProjectPath } from "./shared.mjs";

const root = resolveTarget(process.argv[2] ?? ".");
const files = listFiles(root, { maxFiles: Number(process.argv[3] ?? 8000) });
const relFiles = files.map((file) => toProjectPath(file, root));

function hasAny(patterns) {
  return relFiles.some((file) => patterns.some((pattern) => pattern.test(file)));
}

const checks = [
  {
    key: "laravel_routes",
    ok: hasAny([/^routes\/web\.php$/, /^routes\/api\.php$/]),
    recommendation: "Expected Laravel route entry points in routes/web.php or routes/api.php."
  },
  {
    key: "controllers",
    ok: hasAny([/^app\/Http\/Controllers\/.+\.php$/]),
    recommendation: "Expected controllers under app/Http/Controllers."
  },
  {
    key: "form_requests",
    ok: hasAny([/^app\/Http\/Requests\/.+\.php$/]),
    recommendation: "Use Form Request classes for validation-heavy endpoints."
  },
  {
    key: "models",
    ok: hasAny([/^app\/.+\.php$/, /^app\/Models\/.+\.php$/]),
    recommendation: "Expected Eloquent models under app/ or app/Models."
  },
  {
    key: "migrations",
    ok: hasAny([/^database\/migrations\/.+\.php$/]),
    recommendation: "Expected migrations for schema traceability."
  },
  {
    key: "tests",
    ok: hasAny([/^tests\/.+Test\.php$/, /(\.spec|\.test)\.(js|ts)$/]),
    recommendation: "Add tests or document manual verification for risky changes."
  },
  {
    key: "exception_handling",
    ok: hasAny([/^app\/Exceptions\/Handler\.php$/]),
    recommendation: "Expected Laravel exception handler."
  },
  {
    key: "middleware",
    ok: hasAny([/^app\/Http\/Middleware\/.+\.php$/]),
    recommendation: "Expected middleware boundary for auth/request concerns."
  },
  {
    key: "frontend_vue",
    ok: hasAny([/\.(vue)$/, /^resources\/js\/.+\.(js|ts)$/]),
    recommendation: "Expected Vue/resources frontend entry points if frontend is in this repo."
  }
];

const passed = checks.filter((check) => check.ok).length;
const score = Math.round((passed / checks.length) * 100);

printJson({
  tool: "MATURITY",
  root,
  score,
  passed,
  total: checks.length,
  checks,
  missing: checks.filter((check) => !check.ok)
});

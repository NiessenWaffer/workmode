#!/usr/bin/env node
import path from "node:path";
import { exists, printJson, readText, resolveTarget } from "./shared.mjs";

const term = (process.argv[2] ?? "").trim();
const dictionaryPath = resolveTarget(process.argv[3] ?? "DOMAIN_DICTIONARY.md");

if (!term) {
  process.stderr.write("Usage: node .opencode/tools/LEXICON.mjs <term> [dictionaryPath]\n");
  process.exit(1);
}

if (!exists(dictionaryPath)) {
  printJson({
    tool: "LEXICON",
    ok: false,
    term,
    dictionary: path.relative(process.cwd(), dictionaryPath),
    error: "dictionary_not_found",
    recommendation: "Create DOMAIN_DICTIONARY.md with canonical business terms."
  });
  process.exit(0);
}

const normalized = term.toLowerCase();
const rows = readText(dictionaryPath)
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line.startsWith("|") && !line.includes("---"))
  .map((line) => line.split("|").map((cell) => cell.trim()).filter(Boolean));

const matches = rows
  .filter((cells) => cells.some((cell) => cell.toLowerCase() === normalized))
  .map((cells) => ({
    canonical: cells[0],
    aliases: cells.slice(1)
  }));

printJson({
  tool: "LEXICON",
  ok: matches.length > 0,
  term,
  dictionary: path.relative(process.cwd(), dictionaryPath),
  matches
});

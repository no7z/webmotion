#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
function get(name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : null;
}
function fail(message) {
  console.error(message);
  process.exit(2);
}

const source = get("--source");
const id = get("--id");
const name = get("--name");
const version = get("--version");
const output = get("--output");
if (!source || !id || !name || !version || !output) {
  fail("Usage: pack-template.mjs --source <dir> --id <id> --name <name> --version <semver> --output <manifest.json>");
}
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) fail("Template id must use lowercase hyphen-case.");
if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) fail("Version must be semantic version syntax.");

const root = path.resolve(source);
if (!fs.statSync(root, { throwIfNoEntry: false })?.isDirectory()) fail(`Source directory not found: ${root}`);
const required = ["contract.json", "schema/config.schema.json", "qa/checkpoints.json"];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) fail(`Missing required file: ${file}`);
}

const blockedNames = /(^|\/)(\.env(?:\.|$)|id_rsa|id_ed25519|credentials|secrets?)(\/|\.|$)/i;
const files = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    const relative = path.relative(root, absolute).split(path.sep).join("/");
    if (entry.isSymbolicLink()) fail(`Symlinks are not allowed: ${relative}`);
    if (entry.isDirectory()) walk(absolute);
    if (entry.isFile()) {
      if (blockedNames.test(relative)) fail(`Secrets-like file is not allowed: ${relative}`);
      if (relative === "manifest.json") continue;
      files.push({
        path: relative,
        bytes: fs.statSync(absolute).size,
        sha256: crypto.createHash("sha256").update(fs.readFileSync(absolute)).digest("hex"),
      });
    }
  }
}
walk(root);

const packageFile = path.join(root, "package.json");
if (fs.existsSync(packageFile)) {
  const pkg = JSON.parse(fs.readFileSync(packageFile, "utf8"));
  const blockedScripts = ["preinstall", "install", "postinstall", "prepare"];
  const present = blockedScripts.filter((script) => pkg.scripts?.[script]);
  if (present.length) fail(`Package lifecycle scripts are not allowed: ${present.join(", ")}`);
}

const manifest = {
  schemaVersion: 1,
  id,
  name,
  version,
  availability: "draft",
  license: "REVIEW_REQUIRED",
  experience: { category: "unclassified", capabilities: [] },
  adapters: [],
  assetSlots: [],
  compatibility: { webmotion: ">=0.1.0" },
  files: files.sort((a, b) => a.path.localeCompare(b.path)),
};

const target = path.resolve(output);
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, `${JSON.stringify(manifest, null, 2)}\n`, { flag: "wx" });
console.log(`Created manifest draft: ${target}`);


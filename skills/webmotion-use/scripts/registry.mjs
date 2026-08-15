#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "../../..");
const registryRoot = path.join(projectRoot, "registry");
const indexFile = path.join(registryRoot, "index.json");
const [command = "help", id, ...rawOptions] = process.argv.slice(2);

function fail(message, code = 1) {
  console.error(message);
  process.exit(code);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail(`Cannot read ${file}: ${error.message}`);
  }
}

function option(name) {
  const index = rawOptions.indexOf(name);
  return index >= 0 ? rawOptions[index + 1] : null;
}

function has(name) {
  return rawOptions.includes(name);
}

function safeRelative(file) {
  return typeof file === "string" && file.length > 0 && !path.isAbsolute(file) && !file.split(/[\\/]+/).includes("..");
}

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

const index = readJson(indexFile);

if (command === "list") {
  console.log(JSON.stringify(index.templates, null, 2));
  process.exit(0);
}

if (!["show", "verify", "install"].includes(command) || !id) {
  console.log("Usage: registry.mjs list | show <id> | verify <id> | install <id> --dest <workspace> [--adapter <id>] [--dry-run]");
  process.exit(command === "help" ? 0 : 2);
}

const entry = index.templates.find((template) => template.id === id);
if (!entry) fail(`Unknown template: ${id}`, 2);
const templateRoot = path.join(registryRoot, "templates", id);
const manifestFile = path.join(templateRoot, "manifest.json");
const manifest = readJson(manifestFile);

if (command === "show") {
  console.log(JSON.stringify(manifest, null, 2));
  process.exit(0);
}

const failures = [];
for (const item of manifest.files || []) {
  if (!safeRelative(item.path)) {
    failures.push(`unsafe path: ${item.path}`);
    continue;
  }
  const source = path.resolve(templateRoot, item.path);
  if (!source.startsWith(`${templateRoot}${path.sep}`) || !fs.existsSync(source)) {
    failures.push(`missing file: ${item.path}`);
    continue;
  }
  if (sha256(source) !== item.sha256) failures.push(`checksum mismatch: ${item.path}`);
}
if (failures.length) fail(`Template verification failed:\n- ${failures.join("\n- ")}`);

if (command === "verify") {
  console.log(`Verified ${id}@${manifest.version}: ${manifest.files.length} files`);
  process.exit(0);
}

const destination = option("--dest");
if (!destination) fail("install requires --dest <workspace>", 2);
const adapter = option("--adapter");
if (adapter && !(manifest.adapters || []).some((item) => item.id === adapter && item.available)) {
  fail(`Adapter '${adapter}' is not available for ${id}.`);
}

const workspace = path.resolve(destination);
const installRoot = path.join(workspace, ".webmotion", "templates", id);
const planned = manifest.files.map((item) => ({
  source: path.resolve(templateRoot, item.path),
  target: path.resolve(installRoot, item.path),
  sha256: item.sha256,
}));

for (const item of planned) {
  if (!item.target.startsWith(`${installRoot}${path.sep}`)) fail(`Unsafe install target: ${item.target}`);
  if (fs.existsSync(item.target) && sha256(item.target) !== item.sha256) {
    fail(`Refusing to overwrite changed file: ${item.target}`);
  }
}

const activeTarget = path.join(workspace, ".webmotion", "active.json");
console.log(JSON.stringify({
  dryRun: has("--dry-run"),
  template: `${id}@${manifest.version}`,
  availability: manifest.availability,
  adapter: adapter || null,
  files: [...planned.map((item) => item.target), activeTarget],
}, null, 2));

if (has("--dry-run")) process.exit(0);
for (const item of planned) {
  fs.mkdirSync(path.dirname(item.target), { recursive: true });
  if (!fs.existsSync(item.target)) fs.copyFileSync(item.source, item.target);
}
fs.mkdirSync(path.dirname(activeTarget), { recursive: true });
fs.writeFileSync(activeTarget, `${JSON.stringify({
  template: id,
  version: manifest.version,
  availability: manifest.availability,
  adapter: adapter || null,
  installedAt: new Date().toISOString(),
}, null, 2)}\n`);
console.log(`Installed WebMotion contract at ${installRoot}`);


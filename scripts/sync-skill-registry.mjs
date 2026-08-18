import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const sourceRoot = path.join(projectRoot, "registry");
const targetRoot = path.join(projectRoot, "skills", "webmotion-use", "assets", "registry");
const checkOnly = process.argv.includes("--check");
const index = JSON.parse(fs.readFileSync(path.join(sourceRoot, "index.json"), "utf8"));
const expected = new Map();

function add(relativePath) {
  const normalized = relativePath.split(path.sep).join("/");
  if (!normalized || path.isAbsolute(normalized) || normalized.split("/").includes("..")) {
    throw new Error(`Unsafe registry path: ${relativePath}`);
  }
  const source = path.join(sourceRoot, normalized);
  if (!fs.statSync(source, { throwIfNoEntry: false })?.isFile()) throw new Error(`Missing registry file: ${normalized}`);
  expected.set(normalized, source);
}

add("index.json");
add("experience-types.json");
for (const template of index.templates) {
  const manifestPath = `templates/${template.id}/manifest.json`;
  add(manifestPath);
  const manifest = JSON.parse(fs.readFileSync(path.join(sourceRoot, manifestPath), "utf8"));
  for (const file of manifest.files || []) add(`templates/${template.id}/${file.path}`);
}

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function listFiles(directory, prefix = "") {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...listFiles(absolute, relative));
    else if (entry.isFile()) files.push(relative);
    else throw new Error(`Unsupported bundled registry entry: ${relative}`);
  }
  return files.sort();
}

if (checkOnly) {
  const actual = listFiles(targetRoot);
  const expectedPaths = [...expected.keys()].sort();
  const failures = [];
  for (const relative of expectedPaths) {
    const bundled = path.join(targetRoot, relative);
    if (!fs.existsSync(bundled)) failures.push(`missing: ${relative}`);
    else if (sha256(bundled) !== sha256(expected.get(relative))) failures.push(`changed: ${relative}`);
  }
  for (const relative of actual) {
    if (!expected.has(relative)) failures.push(`unexpected: ${relative}`);
  }
  if (failures.length) {
    console.error(`Bundled Skill registry is stale:\n- ${failures.join("\n- ")}`);
    process.exit(1);
  }
  console.log(`Verified bundled Skill registry: ${expectedPaths.length} files`);
  process.exit(0);
}

fs.rmSync(targetRoot, { recursive: true, force: true });
for (const [relative, source] of expected) {
  const target = path.join(targetRoot, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}
console.log(`Synced ${expected.size} files to ${targetRoot}`);

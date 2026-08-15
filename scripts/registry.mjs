import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const registryRoot = path.join(root, "registry");
const index = JSON.parse(fs.readFileSync(path.join(registryRoot, "index.json"), "utf8"));
const [command, id, ...args] = process.argv.slice(2);

const templateFor = (templateId) => index.templates.find((entry) => entry.id === templateId);
const manifestFor = (templateId) => JSON.parse(fs.readFileSync(path.join(registryRoot, "templates", templateId, "manifest.json"), "utf8"));

function verify(templateId, manifest) {
  const base = path.join(registryRoot, "templates", templateId);
  for (const file of manifest.files || []) {
    const absolute = path.join(base, file.path);
    const digest = crypto.createHash("sha256").update(fs.readFileSync(absolute)).digest("hex");
    if (digest !== file.sha256) throw new Error(`Checksum mismatch: ${templateId}/${file.path}`);
  }
}

if (command === "list") {
  for (const template of index.templates) console.log(`${template.id}\t${template.availability}\t${template.license}\t${template.name}`);
} else if (command === "show") {
  const entry = templateFor(id);
  if (!entry) throw new Error(`Unknown template: ${id}`);
  const manifest = manifestFor(id);
  verify(id, manifest);
  console.log(JSON.stringify({ ...entry, manifest }, null, 2));
} else if (command === "install") {
  const entry = templateFor(id);
  if (!entry) throw new Error(`Unknown template: ${id}`);
  const manifest = manifestFor(id);
  verify(id, manifest);
  const destinationFlag = args.indexOf("--dest");
  const destination = destinationFlag >= 0 ? args[destinationFlag + 1] : null;
  if (!destination) throw new Error("install requires --dest <workspace>");
  const dryRun = args.includes("--dry-run");
  const source = path.join(registryRoot, "templates", id);
  const target = path.join(path.resolve(destination), ".webmotion/templates", id);
  const files = manifest.files.map((file) => file.path);
  console.log(`${dryRun ? "DRY RUN" : "INSTALL"} ${id} -> ${target}`);
  for (const file of files) console.log(`  ${file}`);
  if (!dryRun) {
    if (fs.existsSync(target)) throw new Error(`Target exists: ${target}`);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.cpSync(source, target, { recursive: true, filter: (file) => !file.includes("node_modules") && !file.includes("/dist") });
  }
} else {
  console.error("Usage: node scripts/registry.mjs <list|show|install> [template-id] [--dest path] [--dry-run]");
  process.exit(1);
}

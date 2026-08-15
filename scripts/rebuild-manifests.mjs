import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const templatesRoot = path.join(root, "registry/templates");
const ignored = new Set(["manifest.json", ".DS_Store"]);

function walk(directory, base = directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === "node_modules" || entry.name === "dist" || ignored.has(entry.name)) return [];
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute, base) : [path.relative(base, absolute).split(path.sep).join("/")];
  });
}

for (const id of fs.readdirSync(templatesRoot)) {
  const templateRoot = path.join(templatesRoot, id);
  const manifestPath = path.join(templateRoot, "manifest.json");
  if (!fs.existsSync(manifestPath)) continue;
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  manifest.files = walk(templateRoot).sort().map((relative) => {
    const content = fs.readFileSync(path.join(templateRoot, relative));
    return { path: relative, bytes: content.byteLength, sha256: crypto.createHash("sha256").update(content).digest("hex") };
  });
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Manifest ${id}: ${manifest.files.length} files`);
}

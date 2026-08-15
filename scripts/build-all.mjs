import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const registry = JSON.parse(fs.readFileSync(path.join(root, "registry/index.json"), "utf8"));

for (const template of registry.templates) {
  const adapter = path.join(root, "registry/templates", template.id, "adapters/react-r3f");
  const mediaAdapter = path.join(root, "registry/templates", template.id, "adapters/react-media");
  const cwd = fs.existsSync(adapter) ? adapter : fs.existsSync(mediaAdapter) ? mediaAdapter : null;
  if (!cwd) {
    console.log(`SKIP ${template.id}: no runnable adapter`);
    continue;
  }
  console.log(`BUILD ${template.id}`);
  const result = spawnSync("npm", ["run", "build"], { cwd, stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status || 1);
}

const catalog = spawnSync("npm", ["run", "build"], { cwd: path.join(root, "catalog"), stdio: "inherit" });
process.exit(catalog.status || 0);

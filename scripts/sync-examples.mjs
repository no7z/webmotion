import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { exampleRoute, readRegistry, resolveExampleProject } from "./example-projects.mjs";

const root = path.resolve(import.meta.dirname, "..");
const registry = readRegistry(root);
const outputRoot = path.join(root, "catalog/public/examples");
const expectedParent = `${path.join(root, "catalog/public")}${path.sep}`;

if (!outputRoot.startsWith(expectedParent)) throw new Error(`Unsafe example output path: ${outputRoot}`);

fs.rmSync(outputRoot, { recursive: true, force: true });
fs.mkdirSync(outputRoot, { recursive: true });

for (const template of registry.templates) {
  const project = resolveExampleProject(root, template.id);
  if (!project) throw new Error(`No runnable example project for ${template.id}`);

  const route = exampleRoute(template.id);
  console.log(`BUILD ${template.id} -> ${route}`);
  const result = spawnSync("npm", ["run", "build", "--", "--base", route], { cwd: project, stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status || 1);

  const source = path.join(project, "dist");
  const destination = path.join(outputRoot, template.id);
  if (!fs.existsSync(path.join(source, "index.html"))) throw new Error(`Missing build output for ${template.id}`);
  fs.cpSync(source, destination, { recursive: true });
}

console.log(`Synced ${registry.templates.length} examples to ${outputRoot}`);

import { spawn } from "node:child_process";
import path from "node:path";
import { readRegistry, resolveExampleProject } from "./example-projects.mjs";

const root = path.resolve(import.meta.dirname, "..");
const registry = readRegistry(root);
const id = process.argv[2];

if (!id || !registry.templates.some((template) => template.id === id)) {
  console.error(`Usage: npm run dev:template -- <template-id>\nAvailable: ${registry.templates.map((template) => template.id).join(", ")}`);
  process.exit(1);
}

const project = resolveExampleProject(root, id);
if (!project) throw new Error(`No runnable example project for ${id}`);

const child = spawn("npm", ["run", "dev", "--", "--host", "127.0.0.1"], { cwd: project, stdio: "inherit" });
child.on("exit", (code) => process.exit(code || 0));

const stop = () => child.kill("SIGTERM");
process.on("SIGINT", stop);
process.on("SIGTERM", stop);

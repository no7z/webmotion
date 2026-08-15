import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const registry = JSON.parse(fs.readFileSync(path.join(root, "registry/index.json"), "utf8"));
const processes = [];

function start(name, cwd, port) {
  const child = spawn("npm", ["run", "dev", "--", "--port", String(port)], { cwd, stdio: ["ignore", "pipe", "pipe"] });
  child.stdout.on("data", (data) => process.stdout.write(`[${name}] ${data}`));
  child.stderr.on("data", (data) => process.stderr.write(`[${name}] ${data}`));
  child.on("exit", (code) => console.log(`[${name}] exited ${code}`));
  processes.push(child);
}

start("catalog", path.join(root, "catalog"), 4188);
start("foreground-product", path.join(root, "tests/foreground-product-e2e"), 4191);

for (const entry of registry.templates) {
  if (entry.id === "foreground-product") continue;
  const port = Number(new URL(entry.demo.url).port);
  const base = path.join(root, "registry/templates", entry.id, "adapters");
  const r3f = path.join(base, "react-r3f");
  const media = path.join(base, "react-media");
  const cwd = fs.existsSync(r3f) ? r3f : media;
  start(entry.id, cwd, port);
}

const stop = () => {
  for (const child of processes) child.kill("SIGTERM");
  process.exit(0);
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);

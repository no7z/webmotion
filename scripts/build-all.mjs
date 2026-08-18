import { spawnSync } from "node:child_process";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const examples = spawnSync(process.execPath, [path.join(import.meta.dirname, "sync-examples.mjs")], { cwd: root, stdio: "inherit" });
if (examples.status !== 0) process.exit(examples.status || 1);

const catalog = spawnSync("npm", ["run", "build"], { cwd: path.join(root, "catalog"), stdio: "inherit" });
process.exit(catalog.status || 0);

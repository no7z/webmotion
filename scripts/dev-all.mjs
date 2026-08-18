import { spawn, spawnSync } from "node:child_process";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const sync = spawnSync(process.execPath, [path.join(import.meta.dirname, "sync-examples.mjs")], { cwd: root, stdio: "inherit" });
if (sync.status !== 0) process.exit(sync.status || 1);

const child = spawn("npm", ["run", "dev", "--", "--host", "127.0.0.1", "--port", "4188"], {
  cwd: path.join(root, "catalog"),
  stdio: "inherit",
});
child.on("exit", (code) => process.exit(code || 0));

const stop = () => {
  child.kill("SIGTERM");
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);

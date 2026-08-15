#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const start = path.resolve(process.argv[2] || process.cwd());

function findUp(filename, from) {
  let cursor = from;
  while (true) {
    const candidate = path.join(cursor, filename);
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(cursor);
    if (parent === cursor) return null;
    cursor = parent;
  }
}

const packageFile = findUp("package.json", start);
const workspace = packageFile ? path.dirname(packageFile) : start;
let pkg = {};
if (packageFile) {
  try {
    pkg = JSON.parse(fs.readFileSync(packageFile, "utf8"));
  } catch (error) {
    console.error(`Invalid package.json: ${error.message}`);
    process.exit(2);
  }
}

const dependencies = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
const frameworks = [
  ["next", "next"],
  ["react", "react"],
  ["vue", "vue"],
  ["@tresjs/core", "tresjs"],
  ["@react-three/fiber", "react-three-fiber"],
  ["three", "threejs"],
  ["svelte", "svelte"],
].filter(([dependency]) => dependency in dependencies).map(([, label]) => label);

const packageManagers = [
  ["pnpm-lock.yaml", "pnpm"],
  ["yarn.lock", "yarn"],
  ["bun.lockb", "bun"],
  ["bun.lock", "bun"],
  ["package-lock.json", "npm"],
].filter(([file]) => fs.existsSync(path.join(workspace, file))).map(([, manager]) => manager);

const instructions = [];
let cursor = workspace;
while (true) {
  const candidate = path.join(cursor, "AGENTS.md");
  if (fs.existsSync(candidate)) instructions.unshift(candidate);
  const parent = path.dirname(cursor);
  if (parent === cursor) break;
  cursor = parent;
}

const activeFile = path.join(workspace, ".webmotion", "active.json");
console.log(JSON.stringify({
  start,
  workspace,
  packageFile,
  packageManager: packageManagers[0] || null,
  frameworks,
  instructions,
  activeTemplate: fs.existsSync(activeFile) ? activeFile : null,
}, null, 2));


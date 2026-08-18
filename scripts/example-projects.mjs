import fs from "node:fs";
import path from "node:path";

export const exampleRoute = (id) => `/examples/${id}/`;

export function resolveExampleProject(root, id) {
  if (id === "foreground-product") {
    const project = path.join(root, "tests/foreground-product-e2e");
    return fs.existsSync(path.join(project, "package.json")) ? project : null;
  }

  const adapters = path.join(root, "registry/templates", id, "adapters");
  for (const adapter of ["react-r3f", "react-media"]) {
    const project = path.join(adapters, adapter);
    if (fs.existsSync(path.join(project, "package.json"))) return project;
  }

  return null;
}

export function readRegistry(root) {
  return JSON.parse(fs.readFileSync(path.join(root, "registry/index.json"), "utf8"));
}

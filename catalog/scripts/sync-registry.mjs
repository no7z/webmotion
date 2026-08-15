import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const catalogRoot = path.resolve(scriptDir, "..");
const projectRoot = path.resolve(catalogRoot, "..");
const registryRoot = path.join(projectRoot, "registry");
const index = JSON.parse(fs.readFileSync(path.join(registryRoot, "index.json"), "utf8"));

const templates = index.templates.map((entry, indexPosition) => {
  const templateRoot = path.join(registryRoot, "templates", entry.id);
  const manifest = JSON.parse(fs.readFileSync(path.join(templateRoot, "manifest.json"), "utf8"));
  const contract = JSON.parse(fs.readFileSync(path.join(templateRoot, manifest.entrypoints?.contract || "contract.json"), "utf8"));
  const qaPath = manifest.entrypoints?.qa || "qa/checkpoints.json";
  const qa = JSON.parse(fs.readFileSync(path.join(templateRoot, qaPath), "utf8"));
  const previewRelative = `/previews/${entry.id}.webp`;
  const previewAbsolute = path.join(catalogRoot, "public", previewRelative);
  const availableAdapters = (manifest.adapters || []).filter((adapter) => adapter.available);

  return {
    order: indexPosition + 1,
    id: entry.id,
    experienceSpec: entry.experienceSpec || null,
    name: entry.name,
    version: entry.version,
    availability: entry.availability,
    category: entry.category,
    summary: entry.summary,
    demo: entry.demo || null,
    license: entry.license,
    preview: fs.existsSync(previewAbsolute) ? previewRelative : null,
    identity: contract.identity || {},
    invariants: contract.invariants || [],
    capabilities: manifest.experience?.capabilities || [],
    adapters: manifest.adapters || [],
    availableAdapters: availableAdapters.map((adapter) => adapter.id),
    assetSlots: manifest.assetSlots || [],
    compatibility: manifest.compatibility || {},
    provenance: manifest.provenance || "",
    fileCount: (manifest.files || []).length,
    packageBytes: (manifest.files || []).reduce((sum, file) => sum + (file.bytes || 0), 0),
    qaGateCount: (qa.requiredGates || []).length,
    prompt: `使用 WebMotion 的 ${entry.id} 模板创建网页。请交互式询问内容、素材、语言和轨迹要求。`,
  };
});

const output = {
  schemaVersion: 1,
  registryVersion: index.registryVersion,
  generatedAt: new Date().toISOString(),
  templates,
};

const outputFile = path.join(catalogRoot, "src", "generated", "templates.json");
fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Synced ${templates.length} WebMotion templates to ${outputFile}`);

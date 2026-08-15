import fs from "node:fs/promises";
import path from "node:path";

const VIRTUAL_ID = "virtual:webmotion-assets";
const RESOLVED_VIRTUAL_ID = `\0${VIRTUAL_ID}`;
const SLOT_KINDS = new Set(["image", "video", "logo", "model", "font", "text", "metric"]);
const DEFAULT_ACCEPT = {
  image: [".webp", ".avif", ".png", ".jpg", ".jpeg"],
  logo: [".svg", ".webp", ".avif", ".png"],
  video: [".mp4", ".webm"],
  model: [".glb"],
  font: [".woff2", ".woff"],
};
const SIZE_LIMIT = {
  image: 20 * 1024 * 1024,
  logo: 5 * 1024 * 1024,
  video: 150 * 1024 * 1024,
  model: 80 * 1024 * 1024,
  font: 12 * 1024 * 1024,
};

function localAddress(value = "") {
  return value === "127.0.0.1" || value === "::1" || value === "::ffff:127.0.0.1";
}

function safePublicPath(value) {
  return typeof value === "string" && value.startsWith("/") && !value.includes("..") && !value.includes("\\");
}

function extensionOf(filename) {
  return path.extname(filename || "").toLowerCase();
}

function validTextValue(value, maxLength) {
  if (typeof value === "string") return value.length <= maxLength;
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const entries = Object.entries(value);
  return entries.length > 0 && entries.every(([locale, text]) => /^[a-z]{2}(?:-[A-Z]{2})?$/.test(locale) && typeof text === "string" && text.length <= maxLength);
}

function validMetricValue(value, amountMaxLength, unitMaxLength) {
  return value && typeof value === "object" && !Array.isArray(value)
    && typeof value.amount === "string" && value.amount.length <= amountMaxLength
    && typeof value.unit === "string" && value.unit.length <= unitMaxLength;
}

function validateManifest(raw) {
  if (!raw || !Array.isArray(raw.slots)) throw new Error("webmotion.assets.json must contain a slots array");
  const ids = new Set();
  for (const slot of raw.slots) {
    if (!slot || !/^[a-z0-9][a-z0-9-]*$/.test(slot.id || "")) throw new Error(`Invalid asset slot id: ${slot?.id || "missing"}`);
    if (ids.has(slot.id)) throw new Error(`Duplicate asset slot id: ${slot.id}`);
    ids.add(slot.id);
    if (!SLOT_KINDS.has(slot.kind)) throw new Error(`Unsupported kind for ${slot.id}: ${slot.kind}`);
    if (slot.kind === "text") {
      slot.maxLength = Math.min(Math.max(Number(slot.maxLength) || 2000, 1), 20000);
      if (!validTextValue(slot.value, slot.maxLength) || !validTextValue(slot.defaultValue, slot.maxLength)) throw new Error(`Invalid text value for ${slot.id}`);
    } else if (slot.kind === "metric") {
      slot.amountMaxLength = Math.min(Math.max(Number(slot.amountMaxLength) || 32, 1), 100);
      slot.unitMaxLength = Math.min(Math.max(Number(slot.unitMaxLength) || 24, 0), 60);
      if (!validMetricValue(slot.value, slot.amountMaxLength, slot.unitMaxLength) || !validMetricValue(slot.defaultValue, slot.amountMaxLength, slot.unitMaxLength)) throw new Error(`Invalid metric value for ${slot.id}`);
    } else {
      if (!safePublicPath(slot.value) || !safePublicPath(slot.defaultValue)) throw new Error(`Asset paths for ${slot.id} must be root-relative and traversal-free`);
      slot.accept = Array.isArray(slot.accept) && slot.accept.length ? slot.accept.map((item) => item.toLowerCase()) : DEFAULT_ACCEPT[slot.kind];
    }
  }
  raw.version ||= 1;
  raw.previewPath = safePublicPath(raw.previewPath || "/") ? (raw.previewPath || "/") : "/";
  return raw;
}

async function readBody(req, limit) {
  const declared = Number(req.headers["content-length"] || 0);
  if (declared > limit) throw Object.assign(new Error("File exceeds the slot size limit"), { status: 413 });
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) throw Object.assign(new Error("File exceeds the slot size limit"), { status: 413 });
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

function send(res, status, value) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(value));
}

function requestAllowed(req) {
  if (!localAddress(req.socket.remoteAddress)) return false;
  const host = req.headers.host || "";
  if (!/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host)) return false;
  const origin = req.headers.origin;
  return !origin || origin === `http://${host}` || origin === `https://${host}`;
}

export default function webmotionAssets(options = {}) {
  let root = process.cwd();
  let server;
  const configRelative = options.config || "src/webmotion.assets.json";
  const uploadRelative = options.uploadDir || "public/webmotion-assets";
  const configPath = () => path.resolve(root, configRelative);
  const uploadDir = () => path.resolve(root, uploadRelative);

  async function readState() {
    return validateManifest(JSON.parse(await fs.readFile(configPath(), "utf8")));
  }

  async function writeState(state) {
    await fs.writeFile(configPath(), `${JSON.stringify(state, null, 2)}\n`, "utf8");
    const module = server?.moduleGraph.getModuleById(RESOLVED_VIRTUAL_ID);
    if (module) server.moduleGraph.invalidateModule(module);
    server?.ws.send({ type: "custom", event: "webmotion:content-updated", data: { previewPath: state.previewPath || "/" } });
  }

  return {
    name: "webmotion-assets",
    configResolved(config) {
      root = config.root;
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_VIRTUAL_ID;
    },
    async load(id) {
      if (id !== RESOLVED_VIRTUAL_ID) return null;
      return `export default ${JSON.stringify(await readState())};`;
    },
    handleHotUpdate(context) {
      if (path.resolve(context.file) === configPath()) return [];
    },
    configureServer(viteServer) {
      server = viteServer;
      viteServer.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || "/", "http://localhost");
        if (!url.pathname.startsWith("/__webmotion/assets/")) return next();
        if (!requestAllowed(req)) return send(res, 403, { error: "Local same-origin access only" });

        try {
          if (req.method === "GET" && url.pathname === "/__webmotion/assets/state") {
            return send(res, 200, await readState());
          }

          if (req.method === "POST" && url.pathname === "/__webmotion/assets/upload") {
            const state = await readState();
            const id = url.searchParams.get("id") || "";
            const original = url.searchParams.get("filename") || "";
            if (!original || original.includes("/") || original.includes("\\") || original.includes("..")) return send(res, 400, { error: "Invalid filename" });
            const slot = state.slots.find((candidate) => candidate.id === id);
            if (!slot) return send(res, 404, { error: "Undeclared asset slot" });
            if (slot.kind === "text" || slot.kind === "metric") return send(res, 400, { error: "This slot does not accept file uploads" });
            const extension = extensionOf(original);
            if (!slot.accept.includes(extension)) return send(res, 415, { error: `Allowed extensions: ${slot.accept.join(", ")}` });
            const body = await readBody(req, SIZE_LIMIT[slot.kind]);
            await fs.mkdir(uploadDir(), { recursive: true });
            const targetName = `${slot.id}-${Date.now()}${extension}`;
            await fs.writeFile(path.join(uploadDir(), targetName), body);
            slot.value = `/webmotion-assets/${targetName}`;
            await writeState(state);
            return send(res, 200, state);
          }

          if (req.method === "POST" && url.pathname === "/__webmotion/assets/metric") {
            const body = JSON.parse((await readBody(req, 16 * 1024)).toString("utf8"));
            const state = await readState();
            const slot = state.slots.find((candidate) => candidate.id === body.id);
            if (!slot || slot.kind !== "metric") return send(res, 404, { error: "Undeclared metric slot" });
            if (typeof body.amount !== "string" || typeof body.unit !== "string"
              || body.amount.length > slot.amountMaxLength || body.unit.length > slot.unitMaxLength) {
              return send(res, 400, { error: "Metric value or unit exceeds its declared limit" });
            }
            slot.value = { amount: body.amount, unit: body.unit };
            await writeState(state);
            return send(res, 200, state);
          }

          if (req.method === "POST" && url.pathname === "/__webmotion/assets/text") {
            const body = JSON.parse((await readBody(req, 64 * 1024)).toString("utf8"));
            const state = await readState();
            const slot = state.slots.find((candidate) => candidate.id === body.id);
            if (!slot || slot.kind !== "text") return send(res, 404, { error: "Undeclared text slot" });
            if (typeof body.value !== "string" || body.value.length > slot.maxLength) return send(res, 400, { error: `Text must be at most ${slot.maxLength} characters` });
            if (typeof slot.value === "string") {
              slot.value = body.value;
            } else {
              if (typeof body.locale !== "string" || !(body.locale in slot.value)) return send(res, 400, { error: "Undeclared text locale" });
              slot.value[body.locale] = body.value;
            }
            await writeState(state);
            return send(res, 200, state);
          }

          if (req.method === "POST" && url.pathname === "/__webmotion/assets/reset") {
            const body = JSON.parse((await readBody(req, 16 * 1024)).toString("utf8"));
            const state = await readState();
            const slot = state.slots.find((candidate) => candidate.id === body.id);
            if (!slot) return send(res, 404, { error: "Undeclared asset slot" });
            if (slot.kind === "text" && typeof slot.value !== "string" && body.locale) {
              if (!(body.locale in slot.value) || !(body.locale in slot.defaultValue)) return send(res, 400, { error: "Undeclared text locale" });
              slot.value[body.locale] = slot.defaultValue[body.locale];
            } else {
              slot.value = structuredClone(slot.defaultValue);
            }
            await writeState(state);
            return send(res, 200, state);
          }

          return send(res, 404, { error: "Unknown WebMotion asset endpoint" });
        } catch (error) {
          return send(res, error.status || 500, { error: error.message || "Asset replacement failed" });
        }
      });
    },
  };
}

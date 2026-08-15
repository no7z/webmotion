import assetManifest from "virtual:webmotion-assets";

if (import.meta.hot) {
  import.meta.hot.on("webmotion:content-updated", () => window.location.reload());
}

const assetUrl = (id) => assetManifest.slots.find((slot) => slot.id === id)?.value;

export function contentValue(id, locale, fallback = "") {
  const value = assetUrl(id);
  if (typeof value === "string") return value;
  return value?.[locale] ?? fallback;
}

export function metricValue(id, fallback = { amount: "", unit: "" }) {
  const value = assetUrl(id);
  return value && typeof value === "object" && typeof value.amount === "string" && typeof value.unit === "string" ? value : fallback;
}

export const media = {
  glacialSource: assetUrl("glacial-source"),
  cloudForest: assetUrl("cloud-forest"),
  estuary: assetUrl("estuary"),
};

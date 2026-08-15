# Standalone content replacement page

Use this workbench when a generated WebMotion site should let a non-developer replace file assets, localized plain text, and visible display metrics. It is not a design editor: it must not expose HTML, color, material, range, motion, trajectory, camera, timing, or arbitrary numeric controls. A display metric is content such as `4,860 m`, not a parameter that changes layout or interaction.

## React and Vite installation

1. Copy `assets/react-asset-replacement/AssetReplacementPage.jsx` and `asset-replacement.css` into `src/webmotion-assets/`.
2. Copy `assets/react-asset-replacement/main.jsx` into the same directory.
3. Copy `assets/react-asset-replacement/webmotion-assets.html` to the project root.
4. Copy `assets/react-asset-replacement/vite-plugin-webmotion-assets.mjs` beside `vite.config.*`.
5. Copy `assets/react-asset-replacement/webmotion.assets.example.json` to `src/webmotion.assets.json`, then replace its sample slots with the project's real file assets.
6. Add `webmotionAssets()` to the Vite plugin list. Keep the existing framework plugin.
7. Import `virtual:webmotion-assets` in the generated site and read asset URLs, copy, and display metrics by stable slot ID. Do not duplicate those values in render components. In development, register `import.meta.hot.on("webmotion:content-updated", () => window.location.reload())` in the generated site's content adapter so separately opened output pages refresh without reloading the replacement workbench.
8. Run the dev server and open `/webmotion-assets.html`. The normal site remains at `/` with no replacement controls.

The replacement HTML is a separate development entry. A normal Vite production build rooted at `index.html` does not include it. Do not add it to Rollup production inputs.

## Manifest

Keep the manifest at `src/webmotion.assets.json`:

```json
{
  "version": 1,
  "previewPath": "/",
  "slots": [
    {
      "id": "hero-image",
      "label": { "zh": "首屏图片", "en": "Hero image" },
      "group": "images",
      "kind": "image",
      "value": "/images/hero.webp",
      "defaultValue": "/images/hero.webp",
      "accept": [".webp", ".avif", ".png", ".jpg", ".jpeg"],
      "required": true,
      "source": "Commissioned artwork",
      "license": "Project-owned",
      "fallback": "/images/hero-fallback.webp"
    }
  ]
}
```

Allowed kinds are `image`, `video`, `logo`, `model`, `font`, `text`, and `metric`. A text slot may contain a string or a locale object such as `{ "zh": "标题", "en": "Title" }`; declare `maxLength` and render it as plain text. A metric slot contains `{ "amount": "4,860", "unit": "m" }`, plus `amountMaxLength` and `unitMaxLength`; render both as text and never parse them into layout or motion configuration. Use GLB for model replacement; loose GLTF packages are not supported by the default uploader.

Treat `label` and `group` as editor navigation metadata, not example content. Name them by structural role and position (`Hero · Title`, `Chapter 02 · Panel 3 · Body`, `Chapter 05 · Display metric`). Do not use topic nouns copied from the example, because a replacement may change the site's subject completely. The label itself does not render in the generated site and normally should not be another editable content field.

Treat `label` and `group` as editor navigation metadata, not example content. Name them by structural role and position (`Hero · Title`, `Chapter 02 · Panel 3 · Body`, `Chapter 05 · Display metric`). Do not use topic nouns copied from the example, because a replacement may change the site's subject completely. The label itself does not render in the generated site and normally should not be another editable content field.

## Safety boundary

- Serve write endpoints only from the Vite development server on loopback.
- Accept same-origin requests only.
- Resolve slots by declared ID; never accept a browser-supplied destination path.
- Write uploads only to `public/webmotion-assets/`.
- Write configuration only to `src/webmotion.assets.json`.
- Reject path-like filenames, undeclared slots, unapproved extensions, and oversized bodies.
- Reject undeclared locales, text longer than its slot limit, and metric amount or unit longer than its declared limit. Never interpret replacement copy or metric content as HTML.
- Keep provenance fields visible after replacement; replacing a file does not invent a new license.

## Verification

Open `/webmotion-assets.html`, replace one image, one localized text value, and one display metric, and confirm the cards and neighboring iframe update. Refresh the workbench and confirm persistence. Restore each default. Confirm metric edits do not alter scroll or motion behavior. Then build the normal site and verify the output contains neither `webmotion-assets.html` nor any `/__webmotion/assets/*` endpoint code.

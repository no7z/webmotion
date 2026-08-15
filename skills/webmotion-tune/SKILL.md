---
name: webmotion-tune
description: Adapt an active WebMotion experience through code and provide a standalone visual content replacement page for images, video, logos, GLB models, fonts, localized plain text, and display metrics. Use when the page structure exists but its content, assets, type system, art direction, trajectory, or responsive choreography must change without losing the template interaction identity, or when the user wants to replace generated-site files, copy, and visible metrics without editing source files.
---

# WebMotion Tune

Change the content and art direction while preserving the approved experience contract.

## Start

1. Locate `.webmotion/active.json` from the current workspace.
2. Read the active template contract and config schema.
3. Inspect current assets and configuration before asking questions.
4. Ask only for missing assets or creative choices. Offer a neutral placeholder when it is safe.

## Replacement Order

Work in this order to prevent repeated motion tuning:

1. Copy and chapter structure.
2. Typography and licensed brand fonts.
3. Images, video, and logo.
4. 3D model scale, origin, materials, and lighting.
5. Desktop trajectory and chapter keyframes.
6. Mobile trajectory and mobile composition.
7. Scroll smoothing, chapter snap, timing, easing, cursor response, and micro-interactions.

Keep content, art direction, and motion data configurable rather than embedding them inside render components.

## Visual Content Replacement Page

- Include a standalone content replacement page in newly generated projects unless the user explicitly opts out.
- Give it a dedicated development URL such as `/webmotion-assets.html`. Never place its controls, drawer, overlay, or launcher inside the generated site.
- Declare file-backed slots for image, video, logo, GLB model, and font, plain-text slots for user-owned copy, and display-metric slots with separate plain-text amount and unit fields. Do not expose arbitrary numeric controls, HTML, colors, materials, ranges, selects, motion, trajectories, camera values, or timings here.
- Name editor groups and slot labels by stable structural position, such as `Chapter 02 · Panel 3 · Title`. Never bake the example subject, default copy, product name, or narrative theme into an editor label; replacement content may belong to a completely different topic.
- Name editor groups and slot labels by stable structural position, such as `Chapter 02 · Panel 3 · Title`. Never bake the example subject, default copy, product name, or narrative theme into an editor label; replacement content may belong to a completely different topic.
- Show the current asset and provenance on file cards. Show localized copy in text areas with length limits and display metrics in bounded amount/unit fields. Let the user save the current value or restore its declared default without editing source files.
- Preview the actual generated site in a neighboring iframe and refresh that preview after a successful replacement.
- Persist current paths to project-owned configuration and write uploaded files only under the declared local asset directory. Never accept an arbitrary destination path from the browser.
- Keep source, license, dimensions, and fallback metadata beside each slot.
- Keep the replacement page and all write endpoints development-only. They must not exist in the normal production output.
- Keep the generated site usable when replacement fails or local persistence is unavailable.

For React and Vite, copy and adapt `assets/react-asset-replacement/` instead of rebuilding the workbench. Read `references/asset-replacement-page.md` completely before installation or modification. For another stack, preserve the same allowlisted file, text, and display-metric manifest, plain-text boundary, separate-page live preview, and production exclusion.

## Typography

- Preserve a supplied licensed brand font when it has complete Latin and CJK coverage.
- Otherwise offer the built-in presets instead of asking the user for CSS font-family syntax.
- Keep Latin and CJK display and body stacks independent.
- Keep the selected preset when switching languages and after refresh.
- Place the selector in a safe first-screen utility zone and let it scroll away; never cover reading content with a permanent font control.
- Recheck title wrapping and information hierarchy after every font change on desktop and mobile.

Read `references/typography-presets.md` before adding, changing, or presenting font choices.

## Trajectory Rules

- Define desktop and mobile keyframes independently.
- Preserve continuity in position, rotation, scale, camera, and visibility between chapters.
- Keep the semantic 3D subject visible when the contract marks it as foreground-persistent.
- Use explicit occlusion zones for text and controls.
- Avoid abrupt interpolation changes and scroll-jacking.
- Respect reduced-motion preferences with a readable static or low-motion composition.

## Scroll Choreography

- Add smooth scrolling or chapter snap only when requested or required by the active contract.
- Prefer proximity snap over mandatory snap. Never lock the user into one chapter per gesture.
- Center only registered information chapters; exclude the footer and free-reading regions.
- Keep native touch inertia and add a scroll-end proximity fallback instead of forcing desktop wheel behavior onto mobile.
- Disable smooth scrolling and snap when reduced motion is active.

Read `references/scroll-choreography.md` before adding or changing smooth scroll or chapter snap. For a React adapter using Lenis, start from `assets/react-lenis/` and adapt selectors and configuration rather than rewriting the controller.

## Acceptance

Before handoff, verify that the template's required invariants still hold, all required asset slots are filled, replacements persist after refresh, both language modes remain readable under every offered font preset, the generated site contains no replacement controls, the standalone replacement page is absent from production, and no original third-party identity remains. Then use `$webmotion-audit`.

Read `references/tuning-checklist.md` for the replacement checklist and trajectory data model.

---
name: webmotion
description: Interactive entry point for choosing, applying, adapting, auditing, or packaging advanced motion-rich web templates. Use when the user invokes WebMotion without knowing a sub-skill, wants guided questions instead of paths and long prompts, asks to build a premium scroll-driven 3D information website from the WebMotion catalog, or wants a standalone visual page for replacing generated-site assets, copy, and display metrics.
---

# WebMotion

Route the request to one focused WebMotion workflow. Never ask the user to type a project path.

## Start

1. Run `node scripts/detect-workspace.mjs` from the current working directory.
2. Read applicable `AGENTS.md` files before changing a project.
3. Infer the current workspace, framework, package manager, and whether `.webmotion/active.json` exists.
4. Ask only for missing creative decisions, one short question at a time. Prefer visible choices over free-form answers.

Use this question order when starting a new page:

1. Goal: choose a catalog template, match a reference experience, or continue an active WebMotion page.
2. Content: product, portfolio, editorial story, campaign, or another information goal.
3. Assets: images, video, 3D model, logo, copy, and licensed brand fonts already available.
4. Typography: keep supplied brand typography or choose a visible WebMotion preset.
5. Motion: preserve the template path, adjust it, or design a new desktop/mobile path.
6. Languages and required breakpoints.

When no licensed brand font is supplied, offer the built-in typography presets as short visible choices. Do not require the user to name font files or CSS stacks.

Create a separate development-only WebMotion content replacement page after generation unless the user explicitly opts out. It must expose declared file slots for images, video, logos, GLB models, and fonts, plain-text slots for user-owned copy, and explicitly declared display-metric slots with separate amount and unit fields. Show current values, accept replacements, and preview the actual generated site beside the slots. Do not embed replacement controls into the generated site and do not expose colors, materials, motion, trajectories, timings, HTML, or arbitrary structured values. The replacement page and its write endpoints must disappear from production builds.

Do not ask questions whose answers can be discovered from the workspace.

## Route

- Choose, install, or implement a template: read `../webmotion-use/SKILL.md` completely and follow it.
- Replace copy, typography, images, model, materials, timing, trajectories, smooth scrolling, or chapter snap; or install the standalone asset replacement page: read `../webmotion-tune/SKILL.md` completely and follow it.
- Verify visual behavior, scrolling, responsiveness, accessibility, or performance: read `../webmotion-audit/SKILL.md` completely and follow it.
- Turn an approved experience into a reusable catalog package: read `../webmotion-pack/SKILL.md` completely and follow it.

For a request spanning several stages, execute in this order: use, tune, audit, pack. Pause only when a missing creative choice would materially change the result or when manual visual judgment is required.

## Boundaries

- Treat interaction and composition as the template identity; treat React, Vue, and vanilla Three.js as adapters.
- Keep information browsing primary. Do not turn a page into a game or isolated model viewer unless requested.
- Never copy third-party brand assets, text, code, or models without permission and a compatible license.
- Never claim a remote catalog, adapter, checksum, browser result, or device result succeeded without evidence.
- Keep the content replacement page local, separate from the output page, and development-only. Treat copy as plain text, never HTML. Never expose project-writing endpoints in a production build or accept undeclared filesystem paths.
- Show target files before broad writes. Preserve unrelated user changes.

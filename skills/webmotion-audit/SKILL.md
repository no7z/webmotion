---
name: webmotion-audit
description: Audit an implemented WebMotion page and its optional standalone content replacement page for composition identity, interaction identity, information readability, semantic 3D use, mobile recomposition, accessibility, runtime smoothness, safe asset, copy, and display-metric persistence, production separation, and template-contract compliance. Use before approval, catalog packaging, or after motion and content changes.
---

# WebMotion Audit

Verify the actual running page, not screenshots alone.

## Prepare

1. Read `.webmotion/active.json`, the active contract, and QA checkpoints.
2. Start the project using its documented command.
3. Use an available browser-control skill for live interaction. Follow workspace browsing constraints.
4. Test desktop and mobile viewports. Use a real connected device when device-specific behavior matters.

## Required Gates

All must pass:

- Composition identity: layout topology matches the contract rather than a generic split-screen substitute.
- Interaction identity: wheel, pointer, chapter, pinning, and transition behavior match the contract.
- Information first: the experience remains a readable website, not a game or model viewer.
- Unobstructed content: important text and controls remain legible throughout transitions.
- Semantic 3D: the 3D state communicates product or narrative meaning.
- Mobile recomposition: mobile is deliberately rearranged, not merely scaled down.
- Reduced motion: essential content remains accessible without full animation.

## Runtime Checks

- Scroll through slowly, quickly, in reverse, and with repeated direction changes.
- When smoothing or snap is present, test both sides of the proximity threshold and measure the final chapter-center delta.
- Verify touch and keyboard retain native browsing behavior and reduced motion disables the scroll controller.
- Check chapter boundaries for jumps, flashes, stale frames, and object disappearance.
- Check object/text depth ordering at multiple viewport sizes.
- Check resize, refresh at mid-page, browser back/forward, and asset-loading failure.
- Record console errors, sustained jank, missing assets, and layout shifts.

When a standalone asset replacement page is present:

- Replace one image slot, one localized text slot, one display-metric slot, and one model slot when available; confirm the cards update, the neighboring generated-site preview refreshes, and values persist after a full page refresh.
- Confirm text is rendered as text rather than HTML, respects its length limit, and restores only the requested language when localized.
- Confirm a display metric saves and restores amount and unit independently, and that editing it cannot change chapter order, scroll progress, motion, trajectories, camera values, or timings.
- Reject an undeclared slot, disallowed extension, oversized upload, and path-like filename.
- Confirm the normal generated-site URL has no replacement launcher, panel, overlay, or editing controls.
- Build the normal production bundle and verify that neither the replacement page nor project-writing endpoints are shipped.

Do not convert a subjective visual concern into a numeric pass automatically. Capture the exact chapter and viewport, fix objective failures, and reserve final art-direction judgment for the user.

Read `references/audit-matrix.md` for the complete checkpoint matrix and report format.

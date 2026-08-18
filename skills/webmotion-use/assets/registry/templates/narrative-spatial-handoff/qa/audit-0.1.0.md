# Narrative Spatial Handoff 0.1.0 audit

- Result: required gates passed
- Experience specification: `E06`
- Runtime URL: `http://localhost:4196/`
- Browser: headed Chromium through gstack browse
- Viewports: 1440×900 and 390×844

| Gate | Result | Evidence |
|---|---|---|
| Composition identity | Pass | Editorial narrative hands control to a bounded spatial archive and then returns to ordinary reading. |
| Interaction identity | Pass | After the handoff, four hotspots became selectable; choosing YARD updated the archive title and the value to 480. |
| Semantic spatial role | Pass | Selections reveal place-specific records rather than merely changing a decorative camera angle. |
| Mobile recomposition | Pass | The archive controls move into a touch-readable stack while native vertical reading remains primary. |
| Information first | Pass | Headings, facts, captions, controls, and conclusions remain readable DOM content. |
| Unobstructed content | Pass | Desktop and mobile checks at 1440×900 and 390×844 found no horizontal document overflow or blocked primary controls. |
| Reduced motion | Pass | The explicit `?reduced=1` audit route set `data-reduced-motion=true`, disabled Lenis, preserved the complete DOM result, and produced no horizontal overflow. |
| Packaging | Pass | `npm run build:all` completed the adapter production build and the registry manifest was regenerated with SHA-256 checksums. |

Known non-blocking notices:

- React Three Fiber adapters currently surface Three.js's `THREE.Clock` deprecation notice from the dependency stack.
- Live 3D adapters produce a minified JavaScript chunk above Vite's default 500kB warning threshold; the pre-rendered E10 adapter does not.
- Visual gold approval remains a human review decision; this audit records contract, interaction, responsive, accessibility, and packaging evidence.

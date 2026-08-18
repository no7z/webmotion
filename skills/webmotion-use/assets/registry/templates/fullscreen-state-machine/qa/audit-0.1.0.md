# Fullscreen State Machine 0.1.0 audit

- Result: required gates passed
- Experience specification: `E03`
- Runtime URL: `http://localhost:4194/`
- Browser: headed Chromium through gstack browse
- Viewports: 1440×900 and 390×844

| Gate | Result | Evidence |
|---|---|---|
| Composition identity | Pass | The experience stays inside one instrument-like viewport rather than becoming a sequence of page sections. |
| Interaction identity | Pass | The internal scroller advanced from 01 to 02 and 03 while `window.scrollY` stayed at 0; an explicit exit returns control to the document. |
| Semantic spatial role | Pass | Each locked state exposes a different tuning result instead of ornamental camera motion. |
| Mobile recomposition | Pass | Controls and state copy serialize around the instrument without desktop-coordinate scaling. |
| Information first | Pass | Headings, facts, captions, controls, and conclusions remain readable DOM content. |
| Unobstructed content | Pass | Desktop and mobile checks at 1440×900 and 390×844 found no horizontal document overflow or blocked primary controls. |
| Reduced motion | Pass | The explicit `?reduced=1` audit route set `data-reduced-motion=true`, disabled Lenis, preserved the complete DOM result, and produced no horizontal overflow. |
| Packaging | Pass | `npm run build:all` completed the adapter production build and the registry manifest was regenerated with SHA-256 checksums. |

Known non-blocking notices:

- React Three Fiber adapters currently surface Three.js's `THREE.Clock` deprecation notice from the dependency stack.
- Live 3D adapters produce a minified JavaScript chunk above Vite's default 500kB warning threshold; the pre-rendered E10 adapter does not.
- Visual gold approval remains a human review decision; this audit records contract, interaction, responsive, accessibility, and packaging evidence.

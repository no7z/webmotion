# Spatial Product Document 0.1.0 audit

- Result: required gates passed
- Experience specification: `E08`
- Runtime URL: `http://localhost:4198/`
- Browser: headed Chromium through gstack browse
- Viewports: 1440×900 and 390×844

| Gate | Result | Evidence |
|---|---|---|
| Composition identity | Pass | A spatial product hero resolves into specifications, evidence, and ordinary document sections. |
| Interaction identity | Pass | The hero responds continuously to entry progress, then yields to native document browsing without trapping input. |
| Semantic spatial role | Pass | The spatial assembly exposes product layers and relationships referenced by the specification copy. |
| Mobile recomposition | Pass | The product is reframed above the specification stack and remains clear at 390×844. |
| Information first | Pass | Headings, facts, captions, controls, and conclusions remain readable DOM content. |
| Unobstructed content | Pass | Desktop and mobile checks at 1440×900 and 390×844 found no horizontal document overflow or blocked primary controls. |
| Reduced motion | Pass | The explicit `?reduced=1` audit route set `data-reduced-motion=true`, disabled Lenis, preserved the complete DOM result, and produced no horizontal overflow. |
| Packaging | Pass | `npm run build:all` completed the adapter production build and the registry manifest was regenerated with SHA-256 checksums. |

Known non-blocking notices:

- React Three Fiber adapters currently surface Three.js's `THREE.Clock` deprecation notice from the dependency stack.
- Live 3D adapters produce a minified JavaScript chunk above Vite's default 500kB warning threshold; the pre-rendered E10 adapter does not.
- Visual gold approval remains a human review decision; this audit records contract, interaction, responsive, accessibility, and packaging evidence.

# WebMotion foreground-product E2E audit

Status: `DONE_WITH_CONCERNS`

## Build identity

- Test project: `webmotion-foreground-product-e2e@0.0.0`
- Template: `foreground-product@0.1.0`
- Registry availability: `contract-only`
- Installed adapter: none
- Test implementation: React 19.2.8, React Three Fiber 9.7.0, Three.js 0.185.1
- Viewports: 1440x900 and 390x844
- Final review URL: `http://localhost:4188/`

This implementation was authored from the framework-neutral contract during the test. It was not downloaded or reported as a catalog adapter.

## Required gates

| Gate | Result | Evidence |
|---|---|---|
| Composition identity | Pass | Persistent foreground bottle crosses four editorial chapters instead of using a generic split-screen layout |
| Interaction identity | Pass | Native vertical scroll maps continuously to product position, rotation, scale, color, navigation, and chapter state |
| Information first | Pass | All chapter copy remains native document content with keyboard navigation and a skip link |
| Unobstructed content | Pass after fixes | Desktop and mobile protected zones checked at all four chapters plus 94%, 95.5%, 97%, and 100% footer states |
| Semantic 3D | Pass | Rotation exposes different bottle faces while liquid color, distance, and pose follow the active fragrance layer |
| Mobile recomposition | Pass after fixes | Mobile uses separate trajectory values, a top subject zone, bottom copy cards, and a distinct footer transition |
| Reduced motion | Pass | `?motion=reduce` activates stable chapter poses; all four content blocks remain present |

## Runtime evidence

- Mobile continuous forward/reverse scroll: 145 frames over 2.4 seconds, p95 18.7 ms, worst 18.8 ms, 0 frames above 32 ms.
- Desktop continuous forward/reverse scroll: 145 frames over 2.4 seconds, p95 18.6 ms, worst 18.8 ms, 0 frames above 32 ms.
- Revised 90-100% footer pass: desktop 107 frames, p95 18.5 ms, worst 33.3 ms, 1 frame above 32 ms; mobile 108 frames, p95 18.7 ms, worst 18.7 ms, 0 frames above 32 ms.
- Lenis warm scroll pass: 150 frames, p95 17.6 ms, worst 17.7 ms, 0 frames above 32 ms. A cold-load pass recorded 2 frames above 32 ms while dependencies and fonts initialized.
- Mid-page reload restored scroll position exactly: 2293 px before and after reload.
- Final headed-browser passes contained no console errors and no failed asset requests.
- Chinese/English switch updates copy, active button state, `aria-pressed`, and document language.
- Heading structure contains one H1; later chapters and footer use H2.

## Defects found and fixed

1. Desktop bottle cap was clipped and chapter four overlapped the heading. Desktop scale and lateral trajectories were reduced.
2. Mobile initially reused desktop visual scale and covered copy cards. An independent mobile trajectory was authored.
3. Language switching did not update the document language, and every chapter was an H1. Both semantic issues were fixed.
4. The bottle covered footer text at 92-98% progress. New 94% parking states were added for desktop and mobile.
5. Port 4178 was already occupied by an unrelated Python preview. The final test server uses 4188.
6. User review found the product too large and its footer exit too abrupt. All chapter scales were reduced by about 12%; mobile footer scale was reduced further. The old downward exit was replaced by a stationary material-opacity fade beginning at 94%, with a faster tail before the headline reaches the model. Reverse scrolling restores full opacity.

## 2026-08-04 revision evidence

- Desktop hero size: `revision-desktop-p00.png`
- Desktop fade tail: `revision-desktop-final-p97.png`, `revision-desktop-final-p100.png`
- Desktop reverse restoration: `revision-desktop-final-reverse-p94.png`
- Mobile fade tail: `revision-mobile-final2-p97.png`, `revision-mobile-final2-p100.png`
- Mobile reverse restoration: `revision-mobile-final2-reverse-p94.png`
- The model no longer translates downward during the footer exit. Its position stays parked while material opacity, glow intensity, and depth writing taper together.

## 2026-08-04 Lenis and chapter snap evidence

- Lenis 1.3.25 now smooths desktop wheel input with a conservative `0.085` lerp and `0.9` wheel multiplier.
- Four chapter sections register center-aligned proximity snap points. The snap activates only within 22% of the viewport height, waits 180 ms after wheel input, and settles over 0.72 seconds.
- Desktop threshold test: stopping 360 px from chapter two did not snap; entering the 198 px threshold settled to a measured 0 px center delta.
- Desktop forward, reverse, and direct navigation tests all settled with a 0 px center delta.
- Mobile keeps native touch inertia. A `scrollend` proximity fallback moved a test position 120 px from chapter two to a 0 px center delta at 390x844.
- `?motion=reduce` removes the Lenis runtime class and disables smooth scrolling and snap behavior.

## Concerns

- The production bundle is 1,113.80 kB minified and 307.14 kB gzip; Vite reports the expected large-chunk warning for the Three.js stack.
- React Three Fiber emits the upstream `THREE.Clock` deprecation warning.
- gstack headless Chromium could not create a WebGL context on this machine. All visual and runtime WebGL checks were rerun successfully in gstack headed mode.
- Final art direction and perceived premium quality remain subjective and require user review.

## Manual visual decision

- [ ] The product feels intentionally foregrounded rather than merely placed over content.
- [ ] The four chapter poses feel meaningfully different.
- [ ] Desktop composition feels premium at normal scrolling speed.
- [ ] Mobile spacing and product scale feel deliberate.
- [ ] Footer parking and exit feel natural.

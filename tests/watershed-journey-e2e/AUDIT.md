# WebMotion audit

- URL: `http://localhost:4192/`
- Build: Vite production build, `index-Bfg1dvLL.js`
- Viewports: 1440×900, 390×844
- Pattern: environmental spatial journey
- Adapter: React Three Fiber + Lenis
- Result: required gates passed

| Area | Result | Evidence |
|---|---|---|
| Composition | Pass | Seven chapters use materially different editorial compositions. |
| Interaction | Pass | Cloud track moved -95.992vw→-165.833vw→-95.992vw under PageDown/PageUp; map jumps to exact section. |
| Smooth scrolling | Pass | One Lenis controller; no CSS smooth-scroll conflict or forced snap. |
| Occlusion | Pass | Copy remains readable over 3D; cloud-forest veil increased after visual review. |
| 3D meaning | Pass | Source photo becomes displaced terrain; horizontal camera traversal then exposes ridge, cloud and field observations in sequence. |
| Continuity | Pass | Source end and cloud start now share an explicit camera-position/look-at keyframe. Cloud entry eases through its first 16% on desktop and 20% on mobile; both camera position and gaze are delta-damped and reversible. |
| Mobile | Pass | Single-column copy, lower image fields, 2×2 archive and stacked map; no horizontal overflow. |
| Accessibility | Pass | Labeled controls, focus-visible, map dialog focus, Escape close, decorative image alts, reduced-motion branch. |
| Runtime | Pass | Source→cloud boundary, headed Chrome with WebGL: desktop forward/reverse 16.62/16.64ms average, 18.6ms p95, 18.7ms max, zero frames above 32ms. Mobile forward/reverse 16.73/16.65ms average, 18.6ms p95; one 33.3ms frame forward and none reverse. |
| Recovery | Pass | Mid-page refresh preserved scroll; reverse scroll and 390→1440 resize remained usable. |

Known non-blocking notices:

- React Three Fiber currently emits the upstream `THREE.Clock` deprecation warning.
- The Three.js application chunk exceeds Vite's default 500kB warning threshold; production gzip size is about 306kB.

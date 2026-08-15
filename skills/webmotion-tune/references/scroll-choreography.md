# Scroll choreography

Use this pattern for editorial chapter journeys that need smooth wheel motion and a light center snap. Do not add it to free-scrolling articles, workbenches, or any template whose contract forbids snapping.

## Framework-neutral contract

- Map native vertical progress continuously to the experience state.
- Smooth desktop wheel input without capturing horizontal gestures or blocking keyboard navigation.
- Register information chapters as center-aligned proximity targets. Exclude the footer.
- Snap only after scrolling settles and only when the nearest chapter center is within the configured threshold.
- Preserve native touch inertia. Apply the same proximity rule on `scrollend` so touch and keyboard can settle consistently.
- Disable smoothing and snapping for reduced motion.

## Tested starting values

| Setting | Starting value | Purpose |
|---|---:|---|
| Wheel lerp | `0.085` | Visible smoothing without a long trailing tail |
| Wheel multiplier | `0.9` | Slightly reduces high-resolution wheel spikes |
| Snap type | `proximity` | Avoids scroll-jacking |
| Center threshold | `22%` viewport height | Keeps the attraction local to the chapter center |
| Wheel debounce | `180ms` | Waits for the user gesture to settle |
| Snap duration | `0.72s` | Short quart-out alignment |
| Navigation duration | `0.9s` | Smooth direct chapter navigation |

Treat these as starting values, not universal constants. Reduce the threshold first if the page feels magnetic. Increase lerp slightly if smoothing feels delayed.

## React + Lenis adapter

Copy and adapt both files from `assets/react-lenis/`:

- `scroll.config.js` keeps all tuning values configurable.
- `useChapterScroll.js` initializes Lenis, registers center targets with `lenis/snap`, adds the touch and keyboard `scrollend` fallback, centers direct navigation, and destroys all listeners on unmount.

Install `lenis`, import `lenis/dist/lenis.css` once at the application entry, and set native `html { scroll-behavior: auto; }` so CSS and Lenis do not compete.

Mark only eligible chapters with `data-chapter-snap`. Pass the reduced-motion state to the hook and use its returned handler on chapter navigation links.

## Acceptance checks

1. Stop beyond the threshold and confirm scroll position does not move.
2. Stop just inside the threshold and confirm the chapter center reaches the viewport center within 2px.
3. Repeat forward, reverse, by chapter navigation, by keyboard, and at the mobile breakpoint.
4. Confirm the footer never pulls the user back into the last chapter.
5. Confirm reduced motion creates no Lenis runtime class and performs no automatic snap.
6. Measure warm scrolling after dependencies load; record p95, worst frame, and frames above 32ms.

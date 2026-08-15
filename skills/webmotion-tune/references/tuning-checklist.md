# Tuning checklist

## Content

- Every chapter has a reading purpose and stable heading.
- Text length remains within the template's density range.
- Alternate language copy has been checked for expansion.

## Assets

- Source, license, dimensions, color space, compression, and fallback are known.
- Model origin, units, scale, mesh names, material ownership, and animation clips are known.
- Placeholder assets do not ship as final assets.
- Every visually replaceable file asset has a stable allowlisted slot ID.
- Editor group names and slot labels describe structural position only; they do not inherit topic nouns, product names, or narrative labels from the example content.
- Editor group names and slot labels describe structural position only; they do not inherit topic nouns, product names, or narrative labels from the example content.
- File replacement updates the live page, persists after refresh, and retains provenance metadata.
- Localized text replacement updates the requested language only, persists after refresh, remains plain text, and respects declared length limits.
- Display-metric replacement updates amount and unit independently, persists after refresh, and cannot mutate motion, trajectory, camera, timing, or chapter-order configuration.
- Invalid types, oversized files, undeclared slots, and path-like filenames are rejected.
- The generated site contains no replacement controls.
- The standalone asset replacement page and its write endpoints are absent from the production build.

## Trajectory data

Represent each chapter with named state rather than component-local magic numbers:

```json
{
  "chapter": "detail",
  "desktop": { "position": [0.2, -0.1, 1.8], "rotation": [0, 0.35, 0], "scale": 1 },
  "mobile": { "position": [0, 0.35, 1.4], "rotation": [0, 0.2, 0], "scale": 0.78 },
  "transition": { "ease": "power2.inOut", "duration": 1.2 }
}
```

Validate the complete scroll path in both directions. A foreground-persistent subject must never be hidden behind the page background before its contract-defined exit.

## Scroll choreography

- Store smoothing strength, wheel multiplier, snap threshold, debounce, and settle duration in configuration.
- Use proximity snap. Verify that a stop outside the threshold remains untouched and a stop inside the threshold reaches the intended alignment.
- Keep chapter navigation, keyboard scrolling, touch inertia, refresh restoration, and reverse scrolling functional.
- Disable the smooth-scroll controller and snap behavior under reduced motion.
- Remove native CSS `scroll-behavior: smooth` when a JavaScript smooth-scroll controller owns wheel interpolation.

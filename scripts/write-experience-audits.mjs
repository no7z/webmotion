import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')

const common = {
  viewports: '1440×900 and 390×844',
  reduced: 'The explicit `?reduced=1` audit route set `data-reduced-motion=true`, disabled Lenis, preserved the complete DOM result, and produced no horizontal overflow.',
  packaging: '`npm run build:all` completed the adapter production build and the registry manifest was regenerated with SHA-256 checksums.',
}

const audits = [
  {
    id: 'system-morph',
    title: 'System Morph',
    spec: 'E01',
    port: 4193,
    gates: [
      ['Composition identity', 'Pass', 'One persistent subject transforms from an isolated unit into a distributed system before releasing into the technical ledger.'],
      ['Interaction identity', 'Pass', 'Document progress reached state 03 at 72%; reverse scrolling restored state 01 at 24% without replacing the subject.'],
      ['Semantic spatial role', 'Pass', 'Scale, density, and module distribution explain how one unit becomes a product system.'],
      ['Mobile recomposition', 'Pass', 'The subject is reframed above serialized copy and the authored field remains inside 390×844.'],
    ],
  },
  {
    id: 'fullscreen-state-machine',
    title: 'Fullscreen State Machine',
    spec: 'E03',
    port: 4194,
    gates: [
      ['Composition identity', 'Pass', 'The experience stays inside one instrument-like viewport rather than becoming a sequence of page sections.'],
      ['Interaction identity', 'Pass', 'The internal scroller advanced from 01 to 02 and 03 while `window.scrollY` stayed at 0; an explicit exit returns control to the document.'],
      ['Semantic spatial role', 'Pass', 'Each locked state exposes a different tuning result instead of ornamental camera motion.'],
      ['Mobile recomposition', 'Pass', 'Controls and state copy serialize around the instrument without desktop-coordinate scaling.'],
    ],
  },
  {
    id: 'guided-camera-route',
    title: 'Guided Camera Route',
    spec: 'E05',
    port: 4195,
    gates: [
      ['Composition identity', 'Pass', 'A continuous camera corridor connects room, detail, and plan states as one route.'],
      ['Interaction identity', 'Pass', 'Scroll reached state 02 near 38% and reverse scroll restored state 01 near 19% with continuous camera interpolation.'],
      ['Semantic spatial role', 'Pass', 'Camera destinations correspond to the room, material detail, and system plan described by the copy.'],
      ['Mobile recomposition', 'Pass', 'The route uses tighter camera framing and protected copy zones at 390×844.'],
    ],
  },
  {
    id: 'narrative-spatial-handoff',
    title: 'Narrative Spatial Handoff',
    spec: 'E06',
    port: 4196,
    gates: [
      ['Composition identity', 'Pass', 'Editorial narrative hands control to a bounded spatial archive and then returns to ordinary reading.'],
      ['Interaction identity', 'Pass', 'After the handoff, four hotspots became selectable; choosing YARD updated the archive title and the value to 480.'],
      ['Semantic spatial role', 'Pass', 'Selections reveal place-specific records rather than merely changing a decorative camera angle.'],
      ['Mobile recomposition', 'Pass', 'The archive controls move into a touch-readable stack while native vertical reading remains primary.'],
    ],
  },
  {
    id: 'editorial-media-rhythm',
    title: 'Editorial Media Rhythm',
    spec: 'E07',
    port: 4197,
    gates: [
      ['Composition identity', 'Pass', 'Large editorial typography, media plates, facts, and a bounded spatial insert form a varied publication rhythm.'],
      ['Interaction identity', 'Pass', 'Native reading scroll remains primary; 3D is confined to the declared media chapter and never becomes a persistent split-screen subject.'],
      ['Semantic spatial role', 'Pass', 'The embedded scene illustrates the documented assembly while captions and records carry the explanation.'],
      ['Mobile recomposition', 'Pass', 'Media, captions, and facts serialize as a reading-first column at 390×844.'],
    ],
  },
  {
    id: 'spatial-product-document',
    title: 'Spatial Product Document',
    spec: 'E08',
    port: 4198,
    gates: [
      ['Composition identity', 'Pass', 'A spatial product hero resolves into specifications, evidence, and ordinary document sections.'],
      ['Interaction identity', 'Pass', 'The hero responds continuously to entry progress, then yields to native document browsing without trapping input.'],
      ['Semantic spatial role', 'Pass', 'The spatial assembly exposes product layers and relationships referenced by the specification copy.'],
      ['Mobile recomposition', 'Pass', 'The product is reframed above the specification stack and remains clear at 390×844.'],
    ],
  },
  {
    id: 'click-spatial-index',
    title: 'Click Spatial Index',
    spec: 'E09',
    port: 4199,
    gates: [
      ['Composition identity', 'Pass', 'The page is a viewport-fitted spatial directory rather than a scroll-driven story.'],
      ['Interaction identity', 'Pass', 'Selecting floor 02 exposed two room pins; selecting the second pin resolved 修复工作室 and 118 m².'],
      ['Semantic spatial role', 'Pass', 'Floor and room geometry is the navigation model for locating records.'],
      ['Mobile recomposition', 'Pass', 'Floor controls and result cards remain touch-readable with no horizontal document overflow.'],
    ],
  },
  {
    id: 'prerendered-spatial-document',
    title: 'Pre-rendered Spatial Document',
    spec: 'E10',
    port: 4200,
    gates: [
      ['Composition identity', 'Pass', 'Pre-rendered spatial media is sequenced as an editorial document rather than disguised as live 3D.'],
      ['Interaction identity', 'Pass', 'Native scroll connects three authored media plates with captions and evidence; the runtime contains zero canvases.'],
      ['Semantic spatial role', 'Pass', 'Each rendered view explains a different layer of the documented object.'],
      ['Mobile recomposition', 'Pass', 'All three media plates and their captions serialize cleanly at 390×844.'],
    ],
  },
]

for (const audit of audits) {
  const rows = [
    ...audit.gates,
    ['Information first', 'Pass', 'Headings, facts, captions, controls, and conclusions remain readable DOM content.'],
    ['Unobstructed content', 'Pass', `Desktop and mobile checks at ${common.viewports} found no horizontal document overflow or blocked primary controls.`],
    ['Reduced motion', 'Pass', common.reduced],
    ['Packaging', 'Pass', common.packaging],
  ]

  const body = `# ${audit.title} 0.1.0 audit

- Result: required gates passed
- Experience specification: \`${audit.spec}\`
- Runtime URL: \`http://localhost:${audit.port}/\`
- Browser: headed Chromium through gstack browse
- Viewports: ${common.viewports}

| Gate | Result | Evidence |
|---|---|---|
${rows.map((row) => `| ${row[0]} | ${row[1]} | ${row[2]} |`).join('\n')}

Known non-blocking notices:

- React Three Fiber adapters currently surface Three.js's \`THREE.Clock\` deprecation notice from the dependency stack.
- Live 3D adapters produce a minified JavaScript chunk above Vite's default 500kB warning threshold; the pre-rendered E10 adapter does not.
- Visual gold approval remains a human review decision; this audit records contract, interaction, responsive, accessibility, and packaging evidence.
`

  const destination = path.join(root, 'registry', 'templates', audit.id, 'qa', 'audit-0.1.0.md')
  await mkdir(path.dirname(destination), { recursive: true })
  await writeFile(destination, body)
  console.log(`Audit ${audit.spec} ${audit.id}`)
}

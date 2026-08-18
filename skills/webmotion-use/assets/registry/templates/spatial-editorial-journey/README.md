# Spatial Editorial Journey

A WebMotion catalog template for long-form information websites that combine a 2D-to-3D source transformation, a continuous horizontal spatial traverse, and distinct editorial chapter compositions.

## Identity

- Framework-neutral behavior: `contract.json`
- Replaceable configuration shape: `schema/config.schema.json`
- Required acceptance gates: `qa/checkpoints.json`
- Drop-in adapter: `adapters/react-r3f`

The interaction identity is the continuous relationship between document progress, semantic 3D states, chapter compositions, and reversible camera transitions. React is only the first adapter.

## Adapter customization

Inside `adapters/react-r3f/src`:

- `content.js`: replace bilingual project, chapter, traverse, fact, and route copy.
- `assets.config.js`: replace the three image paths.
- `motion.config.js`: replace desktop/mobile camera positions, look targets, entry windows, and damping.
- `styles.css`: adapt palette, typography, masks, chapter layout, and responsive composition.
- `WorldScene.jsx`: adapt procedural geometry, materials, particles, and the semantic 2D-to-3D transformation.

The source trajectory end and traverse trajectory start must stay identical for both `position` and `lookAt`. Change them as one shared boundary keyframe; otherwise the first-to-second chapter transition will jump.

## Run the React adapter

```bash
cd adapters/react-r3f
npm install
npm run dev
```

The included fictional river content and generated images are a replaceable demonstration, not part of the template identity.

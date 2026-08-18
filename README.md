# WebMotion

[English](README.md) | [简体中文](README.zh-CN.md)

WebMotion is an advanced web motion template library for agents and creators. Templates are identified by the composition, scrolling, and spatial interactions experienced by users, while React, Vue, and other frameworks are treated as interchangeable implementation adapters.

The repository currently covers ten experience types, E01–E10. Installable templates include an experience contract, structured configuration, replaceable asset slots, QA gates, audit records, licenses, and file checksums. Every example is designed primarily for browsing information, not as a game or a standalone 3D viewer.

## Design principles

- **Classify by experience:** distinguish continuous morphs, fullscreen state machines, guided cameras, spatial indexes, and other real interaction patterns instead of classifying by React or Vue.
- **Content first:** 3D, scrolling, and transitions must explain the content without obscuring essential information.
- **Agent-ready:** contracts define which experience traits must survive; configuration and asset slots define what may be replaced.
- **Verifiable:** every template includes QA checkpoints, audit evidence, and a reproducible example.
- **Responsive recomposition:** desktop and mobile share the same narrative goal but may use different layouts, cameras, and interaction density.
- **Bilingual typography:** examples support language and font selection, with separate spacing and rhythm controls for Chinese and English.

## Quick start

Requires Node.js 20+ and npm.

```bash
git clone https://github.com/no7z/webmotion.git
cd webmotion

# Install dependencies for the catalog, the E02 demo, and every runnable adapter
for project in catalog tests/foreground-product-e2e registry/templates/*/adapters/*; do
  [ -f "$project/package.json" ] && npm install --prefix "$project"
done

npm run dev
```

Open [http://localhost:4188/](http://localhost:4188/). The catalog and all examples share one port. Each example is available at `/examples/<template-id>/`.

`npm run dev` builds and synchronizes every example before starting the catalog server. `npm run dev:all` is an alias. Generated files under `catalog/public/examples/` are not committed.

## Install Agent Skills

Install with the standard Agent Skills CLI:

```bash
npx skills add no7z/webmotion
```

The CLI discovers `webmotion`, `webmotion-use`, `webmotion-tune`, `webmotion-audit`, and `webmotion-pack`, then lets you choose the installation scope and target agent. Installing the complete set is recommended because the entry Skill routes tasks to the other four workflows.

Install the complete set globally for Codex without interactive confirmation:

```bash
npx skills add no7z/webmotion --skill '*' --agent codex --global --yes
```

The CLI also supports listing, updating, and removing Skills:

```bash
npx skills list --global --agent codex
npx skills update --global
npx skills remove --global webmotion webmotion-use webmotion-tune webmotion-audit webmotion-pack
```

`webmotion-use` contains a verified template Registry and does not depend on the original checkout after installation. Once installed, tell your agent “Use WebMotion to build a website.” Start a new Codex task if the current task does not immediately discover the Skills.

## Template catalog

| ID | Template | Experience identity | Local route | Availability |
| --- | --- | --- | --- | --- |
| E01 | System Morph | Continuous composition morph | `/examples/system-morph/` | Installable adapter |
| E02 | Foreground Product Journey | Foreground product journey | `/examples/foreground-product/` | Contract and demo |
| E03 | Fullscreen State Machine | Fullscreen internal state machine | `/examples/fullscreen-state-machine/` | Installable adapter |
| E04 | Spatial Editorial Journey | Spatial editorial narrative | `/examples/spatial-editorial-journey/` | Installable adapter |
| E05 | Guided Camera Route | Guided camera route | `/examples/guided-camera-route/` | Installable adapter |
| E06 | Narrative Spatial Handoff | Narrative-to-spatial-index handoff | `/examples/narrative-spatial-handoff/` | Installable adapter |
| E07 | Editorial Media Rhythm | Editorial media rhythm | `/examples/editorial-media-rhythm/` | Installable adapter |
| E08 | Spatial Product Document | Spatial product document | `/examples/spatial-product-document/` | Installable adapter |
| E09 | Click Spatial Index | Click-driven spatial index | `/examples/click-spatial-index/` | Installable adapter |
| E10 | Pre-rendered Spatial Document | Pre-rendered spatial media document | `/examples/prerendered-spatial-document/` | Installable adapter |

E02 currently validates the experience contract and does not include a copyable framework adapter. All other templates can be installed from the Registry.

## Inspect and install templates

```bash
# List all templates
node scripts/registry.mjs list

# Inspect the contract, compatibility, asset slots, and file manifest
node scripts/registry.mjs show guided-camera-route

# Preview the files that would be installed
node scripts/registry.mjs install guided-camera-route \
  --dest /path/to/your-project \
  --dry-run

# Install into a target project
node scripts/registry.mjs install guided-camera-route \
  --dest /path/to/your-project
```

Templates are written to `.webmotion/templates/<template-id>/` in the target project. Before writing, the installer verifies every SHA-256 checksum in the manifest and refuses to overwrite an existing target.

Recommended workflow after installation:

1. Read `contract.json` to understand the required experience traits and forbidden regressions.
2. Copy `config.example.json`, then supply content and motion parameters according to `schema/config.schema.json`.
3. Replace images, models, copy, fonts, and motion trajectories in the adapter configuration.
4. Use `qa/checkpoints.json` to verify desktop, mobile, fallback, and reduced-motion behavior.
5. Package the implementation as a reusable template only after it passes the audit.

Some templates expose a development-only asset and copy replacement page. It changes configuration references; it is not an image editor and must not ship in the production page.

## Agent Skills

The repository divides the template workflow into focused Skills:

| Skill | Purpose |
| --- | --- |
| `webmotion` | Interactive entry point for completing the goal, content, assets, and experience choice |
| `webmotion-use` | Select, inspect, and install a template |
| `webmotion-tune` | Replace assets, copy, fonts, and trajectories while preserving the experience contract |
| `webmotion-audit` | Check visual, interaction, mobile, performance, and accessibility gates |
| `webmotion-pack` | Package an approved implementation as a reusable template |

Users do not need to remember repository paths. Start with `webmotion`; the agent should gather missing information through short questions and route the task to the appropriate Skill.

## Develop one template

To work on one example with an isolated Vite hot-reload server:

```bash
npm run dev:template -- guided-camera-route
```

Available template IDs match the output of `node scripts/registry.mjs list`. Use `npm run dev` for final catalog QA so routes and asset base paths are tested under their real subpaths.

## Maintenance and builds

```bash
# Regenerate E01, E03, and E05–E10, including audits, manifests, and catalog data
npm run templates:refresh

# Build all ten examples into catalog /examples/ routes
npm run examples:sync

# Update and verify the Registry bundled with the npx-installed Skill
npm run skills:registry
npm run skills:registry:check

# Build every example and the final catalog
npm run build:all

# Build only the catalog
npm run catalog:build
```

E02 and E04 retain their separately reviewed implementations and are not overwritten by the shared generator. The final static output of `npm run build:all` is written to `catalog/dist/` and can be deployed to a static host that supports directory indexes.

## Project structure

```text
webmotion/
├── catalog/                         # Template catalog website
├── registry/
│   ├── index.json                   # Template index
│   └── templates/<id>/              # Contracts, config, QA, audits, and adapters
├── scripts/
│   ├── template-sources/            # Shared generated-template sources
│   ├── registry.mjs                 # Template inspection and installation CLI
│   ├── sync-examples.mjs            # Build and synchronize example subroutes
│   ├── sync-skill-registry.mjs      # Create the self-contained Skill Registry
│   └── dev-all.mjs                  # Single-port development entry point
├── skills/                           # WebMotion Agent Skills
└── tests/                            # Independent E2E and experience validation projects
```

## Quality boundaries

- Use a modern browser with WebGL2 when possible. If 3D is unavailable, readable CSS/HTML fallback content must remain.
- The large R3F bundles in examples are template validation baselines, not proof that production route splitting, model compression, and texture optimization are complete.
- Before release, verify that essential information is unobstructed, 3D is semantic, mobile remains browsable, interactions are reversible, and reduced motion works.
- Templates currently use fictional bilingual content and original or procedural assets. They do not contain third-party branded implementation code.

## License

Registry templates are currently marked `CC0-1.0`. Refer to each template's `manifest.json`, `LICENSE`, and `ASSET_LICENSES.json` for its exact license, provenance, and asset records.

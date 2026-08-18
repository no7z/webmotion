---
name: webmotion-pack
description: Package an approved motion-rich page as a versioned WebMotion catalog template with a framework-neutral experience contract, adapter metadata, asset slots, schema, QA checkpoints, license data, and SHA-256 checksums. Use after audit approval when publishing or preparing a reusable template.
---

# WebMotion Pack

Turn an approved experience into a portable catalog package without bundling project-specific identity.

## Preconditions

- Require a passed `$webmotion-audit` result.
- Confirm ownership or compatible licenses for every distributed file.
- Remove brand names, private URLs, secrets, analytics IDs, and copyrighted assets that are not redistributable.

## Separate Contract From Adapter

Describe framework-neutral behavior in `contract.json`: composition, input mapping, state progression, occlusion, transitions, semantic 3D behavior, and mobile recomposition.

Put implementation details in adapters such as `react-r3f`, `vue-tresjs`, or `vanilla-three`. A template may ship one adapter initially, but its identity must not depend on React component names.

## Package

1. Prepare a staging directory containing `contract.json`, `schema/config.schema.json`, `qa/checkpoints.json`, optional preview media, and explicit adapter files.
2. Create a manifest draft with this Skill's bundled `scripts/pack-template.mjs`:

   `node <bundled-script> --source <staging-dir> --id <template-id> --name <display-name> --version <semver> --output <manifest-path>`

3. Review every listed file and license. The script rejects path traversal, symlinks, secrets-like files, and package lifecycle scripts.
4. Validate the manifest against `references/manifest-requirements.md`.
5. Test installation into a clean temporary app and rerun `$webmotion-audit`.
6. Publish only after checksums and clean-install results match.

Never package source-site assets merely because they are publicly downloadable.


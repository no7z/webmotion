---
name: webmotion-use
description: Select, inspect, install, and implement a WebMotion catalog template in the current workspace, including its standalone development-only content replacement page. Use for starting a motion-rich 3D information page, matching a reference interaction, choosing a framework adapter, applying a downloaded WebMotion template, or preparing a generated page for visual asset, copy, and display-metric replacement without requiring the user to provide a filesystem path.
---

# WebMotion Use

Apply a catalog experience to the current workspace while preserving its interaction identity.

## Workflow

1. Discover the current project and applicable instructions. Never ask the user to type a path.
2. Run this Skill's bundled `scripts/registry.mjs list` and present suitable templates, including availability and license.
3. If the request is reference-led, compare its composition, scroll mapping, camera/object motion, transitions, and mobile recomposition with template contracts. Do not match only colors or navigation.
4. Confirm one template and adapter only when the choice is not inferable.
5. Run the bundled registry script with `show <template-id>` before installation.
6. Preview target files with the bundled registry script's `install <template-id> --dest <workspace> --dry-run` command.
7. Run the same command without `--dry-run` only after resolving conflicts.
8. Read the installed contract, schema, and QA checkpoints under `.webmotion/templates/<template-id>/`.
9. If the package is `contract-only`, implement the experience in the existing stack from the contract; state plainly that no framework adapter was copied.
10. If an adapter is available, verify its checksum and compatibility before integrating it. Do not run package lifecycle scripts supplied by a template.
11. Record the selected template and adapter in `.webmotion/active.json`.
12. Unless the user opts out, hand off to `$webmotion-tune` to install and wire the standalone development-only content replacement page. Keep it separate from the generated site and expose only declared file assets, plain-text user copy, and display metrics whose amount and unit are content rather than interaction parameters.

## Selection Standard

Choose by experience behavior before visual skin:

- composition topology;
- scroll and pointer mapping;
- foreground/background occlusion rules;
- chapter transition grammar;
- semantic role of 3D;
- desktop and mobile trajectory independence;
- information density and reading order.

Reject a match when only the visual theme is similar.

## Failure Rules

- Stop if the template license is missing or incompatible.
- Stop if checksums do not match.
- Stop if the required adapter is unavailable and the user requires drop-in code.
- Do not overwrite existing files silently.
- Report unavailable remote registry access as an evidence gap, not success.

Read `references/catalog-protocol.md` when connecting a remote catalog or adding an adapter.

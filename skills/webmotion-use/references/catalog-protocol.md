# Catalog protocol

The local registry is the v0 reference implementation. A future remote catalog must expose an index and immutable versioned template packages.

## Required flow

1. Fetch the index from the configured official HTTPS origin.
2. Fetch a versioned manifest before any payload.
3. Check WebMotion version, target framework, runtime, license, and required asset slots.
4. Display the exact files and conflicts.
5. Download to a temporary directory.
6. Verify every SHA-256 checksum.
7. Reject path traversal, symlinks, secrets, and lifecycle scripts.
8. Move verified files into the workspace and record `.webmotion/active.json`.

Do not execute code from the registry during installation. Do not fall back to an untrusted mirror silently.

## Availability

- `contract-only`: behavior specification and QA files are available; no drop-in framework code exists.
- `adapter`: at least one verified framework adapter is downloadable.
- `draft`: not installable from the public catalog.
- `retired`: retained for provenance but not offered for new work.


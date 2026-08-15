# Manifest requirements

A publishable manifest must contain:

- schema version, stable id, display name, semantic version, and availability;
- license and provenance for every distributed asset;
- experience category and framework-neutral capabilities;
- supported adapters and their compatibility constraints;
- required and optional asset slots;
- minimum WebMotion version;
- every payload path, byte size, and SHA-256 checksum;
- contract, configuration schema, and QA checkpoint paths;
- preview metadata when a preview is published.

The catalog must reject mutable version URLs, missing licenses, absolute paths, traversal segments, symlinks, checksums that do not match, and package lifecycle scripts.


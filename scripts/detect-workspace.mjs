#!/usr/bin/env node

// Keep the command advertised by the WebMotion entry skill available at the
// repository root while the implementation remains packaged with the skill.
await import('../skills/webmotion/scripts/detect-workspace.mjs')

---
name: build-before-push
description: Enforce running a project build check before any git push or deployment command.
---

# Build Before Push Verification

Whenever the user asks to "push" or "deploy" code changes, you MUST run a build check (`npm run build` or equivalent build command for the project) locally to verify that there are no compilation, TypeScript, linting, or packaging errors.

## Instructions
1. Run the project's build command (e.g., `npm run build`) in the terminal.
2. Confirm the build finishes with a successful exit code (status 0).
3. If the build fails:
   - Fix the compilation or TypeScript errors.
   - Do NOT run `git push` until the build passes.
4. If the build succeeds, proceed with staging, committing, and pushing the code.

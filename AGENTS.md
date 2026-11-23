# AGENTS.md - Northwind Payments API (demo repo)

This is a fictional sandbox repo ("Northwind Payments") used to demo Factory/Droid
turning scanner findings into reviewed, CI-green pull requests. It is not a real
payments system and holds no real customer data or secrets.

## Build / test / lint commands
```bash
npm ci            # install from package-lock.json
npm run build     # tsc -> dist/
npm test          # jest --runInBand
npm run lint      # eslint src --ext .ts
```
All four must pass before any PR is considered mergeable; CI (`.github/workflows/ci.yml`)
runs all four on every push and pull request to `main`.

## Conventions
- TypeScript, strict mode on. Express for routing. Jest + Supertest for tests.
- Each route file in `src/routes/` gets its own test file in `src/__tests__/`.
- Keep endpoints small and dependency-light; this repo is intentionally minimal.
- Prefer the smallest version bump that resolves an advisory; only touch calling
  code when the new major/minor actually requires it (document why in the PR).

## Guardrails (hard rules for any agent working in this repo)
- **Never push directly to `main`.** Always open a PR; `main` is protected and
  requires passing status checks + human review.
- **Never weaken or delete a test to make CI pass.** If a test seems wrong, say so
  in the PR description and let a human decide; do not silently remove coverage.
- **Never print, log, or commit secrets, tokens, or API keys** - including the
  demo JWT secret in `src/auth.ts`, which is a placeholder, not a real credential.
  Secrets come from environment variables or CI secrets only.
- **Never log or persist raw payment card numbers (PANs) or full customer PII.**
  See `.factory/skills/security-review-guidelines/SKILL.md`.
- When fixing a dependency advisory, record the CVE/GHSA ID, affected version
  range, and fixed version in `demo-data.md`.
- Keep the fictional "Northwind Payments" framing; do not invent real customer
  or company data.

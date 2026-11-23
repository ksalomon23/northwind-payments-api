# Northwind Payments API (demo)

Fictional B2B payments API used as a **Factory/Droid demo sandbox**: a scanner
finds real, outdated dependencies with published advisories, and the demo
shows Factory turning each finding into a reviewed, CI-green, merge-ready PR,
plus flagging a vulnerability in a separately-prepared "bad" PR.

This is not a real product. No real customers, payments, or secrets live here.

## Run it
```bash
npm install
npm run build
npm start        # listens on :3000
```

## Develop
```bash
npm run dev       # ts-node, no build step
npm test          # jest --runInBand
npm run lint       # eslint
```

## Endpoints
- `GET /health`
- `GET /customers`, `GET /customers/:id`
- `GET /payments`, `POST /payments` (both require `Authorization: Bearer <jwt>`)

## Demo-specific docs
- [`demo-data.md`](demo-data.md) - the seeded dependency findings (real CVE/GHSA IDs, exact versions).
- [`AGENTS.md`](AGENTS.md) - build/test commands and guardrails for any agent working in this repo.
- [`.factory/threat-model.md`](.factory/threat-model.md) - short threat model.
- [`.factory/skills/security-review-guidelines/SKILL.md`](.factory/skills/security-review-guidelines/SKILL.md) - payments-specific review checks.
- [`demo-runbook.md`](demo-runbook.md) - click path, timing, and rollback plan for the live demo.
- [`build-log.md`](build-log.md) - how this repo was built with Factory/Droid.
- [`reset.sh`](reset.sh) - restores pre-demo state so the demo can be re-run.

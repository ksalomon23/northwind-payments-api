# Threat model (short) - Northwind Payments API demo

**Scope:** a small fictional payments API (`/health`, `/customers`, `/payments`).
No real money, cards, or customer data ever touch this repo.

## Assets
- Customer records (name, email) - low sensitivity demo data only.
- Payment records (amount, currency, status) - no card numbers are ever stored.
- The JWT signing secret used by `src/auth.ts` (demo value, not a real secret).

## Trust boundaries
- Public internet -> Express app (no WAF/API gateway in this sandbox).
- App -> in-memory store (no real database; nothing persists restarts).

## Primary threats (STRIDE-lite)
| Threat | Example in this repo | Mitigation |
|---|---|---|
| Spoofing | Forged/replayed bearer token on `/payments` | JWT signature verification with an explicit algorithm allowlist (post dependency fix) |
| Tampering | SQL/NoSQL injection via unsanitized input (see seeded bad PR) | Parameterized queries / input validation; security review on every PR |
| Repudiation | No audit trail of who approved a payment fix | Branch protection + required review leaves a GitHub PR trail |
| Information disclosure | Logging full customer objects or PANs | Guardrail in AGENTS.md + payments-specific skill check below |
| Denial of service | ReDoS in outdated transitive deps (e.g. old `path-to-regexp`, `qs`) | Dependency scanning + remediation (this demo's core flow) |
| Elevation of privilege | Hardcoded/leaked API key granting broad access | Secret scanning, no hardcoded credentials, security review on new PRs |

## Out of scope for this demo
Real PCI scope, real customer PII, production infra, network-level attacks.
This repo exists to demonstrate the *process* (scanner finding -> plan -> PR ->
CI -> review -> merge), not a production-grade payments system.

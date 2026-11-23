---
name: security-review-guidelines
description: Payments-specific security checks to apply on every PR in this repo, in addition to standard security review.
---

# Security review guidelines - Northwind Payments API

Apply standard security review (injection, auth, secrets, dependency risk) plus
these payments-specific checks on every PR:

1. **Never log or return a full PAN (card number).** If a PR adds logging,
   error messages, or response payloads touching payment data, confirm no
   16-digit card-number-shaped values can appear in logs or responses. Prefer
   logging only `paymentId` and `status`.
2. **Never store or transmit a card number, CVV, or full track data in this
   repo.** This API handles payment *metadata* (amount, currency, status)
   only; flag any change that adds raw card fields to `Payment`/`Customer`.
3. **Treat `customerId`/`paymentId` as untrusted input.** Any PR that builds a
   database query, shell command, or file path from a request parameter must
   use parameterization/escaping, not string concatenation or interpolation.
4. **No hardcoded credentials.** Flag any string literal that looks like an
   API key, JWT secret, or connection string with real-looking entropy;
   demo/placeholder values must be obviously fake (e.g. clearly labeled
   `-not-real` or `fake-` prefixed) and loaded from env vars in real code paths.
5. **Auth on mutating routes.** Any new `POST`/`PUT`/`DELETE` route under
   `/payments` or `/customers` must sit behind `requireAuth` (or an equivalent
   check) unless the PR explicitly justifies why it's public.
6. **Dependency bumps:** when a PR touches `package.json`/`package-lock.json`,
   confirm the advisory ID (CVE/GHSA) and fixed version are recorded, and that
   tests still pass against the new version (not just that it installs).

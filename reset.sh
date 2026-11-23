#!/usr/bin/env bash
# Restores this repo to its pre-demo state so the demo can be re-run.
# Usage: ./reset.sh
set -euo pipefail

cd "$(dirname "$0")"

echo "==> Checking out main and discarding local changes"
git checkout main
git reset --hard origin/main 2>/dev/null || git reset --hard HEAD
git clean -fd

echo "==> Re-fetching the seeded bad-PR branch (feature/export-customers)"
git fetch origin feature/export-customers 2>/dev/null || true

echo "==> Reinstalling dependencies"
npm ci

echo "==> Verifying main is green"
npm run build
npm test

cat <<'EOF'

Reset complete.
Remaining manual steps before a live run:
  1. Re-open any PRs that were merged/closed during rehearsal (or re-create
     the fix PR via the CVE-remediation workstream / `droid` CLI).
  2. Re-open a PR from feature/export-customers if the last run closed it.
  3. Confirm Dependabot alerts are still showing the findings in demo-data.md
     (GitHub re-detects them automatically; nothing to reset there).
EOF

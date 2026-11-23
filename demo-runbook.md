# Demo runbook

Target: ~12 min live inside a 25-min walkthrough (see
`../factory_demo_context/04_presentation/talk-track.md` for the full session plan).

The CVE-remediation workstream (`/cve-remediation`, Private Preview) was not
available, so Act 1 uses the documented fallback: a manually triggered
`droid exec` GitHub Actions workflow plus Droid Action review. Do not mention
`FIX-xxxx` tasks or a listener on stage.

## Pre-call checklist (do this before the call, not live)
- [ ] `main` green; ruleset `protect-main` active (required status check
      `build-test-lint`, no bypass).
- [ ] Repo secrets `FACTORY_API_KEY` and `PR_TOKEN` set (PR_TOKEN: fine-grained,
      this repo only, Contents + Pull requests write, short expiry; check it
      has not expired).
- [ ] Factory Droid GitHub App installed on the repo.
- [ ] Re-armed for a live run (see below): jsonwebtoken back at 8.5.1 and its
      three Dependabot alerts open again.
- [ ] `feature/export-customers` pushed; its PR is closed or not yet opened.
- [ ] Screen recording of one full successful run saved as backup.
- [ ] Laptop awake, browser tabs open: Dependabot alerts, Actions, Pull requests.

## Re-arm for a live run
The jsonwebtoken fix was merged during rehearsal (PR #3), so it cannot be run
again until it is reverted. `reset.sh` does not do this: it only resets to
`origin/main`, which includes the merged fix.
1. Open a PR that reverts the merge commit of the jsonwebtoken fix
   (GitHub: open the merged PR -> Revert). Merge it once `build-test-lint` is green.
2. Wait a few minutes; confirm the three jsonwebtoken alerts are open again
   (GHSA-qwph-4952-7xr6, GHSA-8cf7-32gw-wr33, GHSA-hjrf-2m68-5959).
3. Close any open Droid fix PR and the `feature/export-customers` PR.
4. `./reset.sh` locally.

## Act 1 - Alert to PR (~5 min)
1. Show the jsonwebtoken Dependabot alerts (GHSA-qwph-4952-7xr6 and two others).
   Say "high/medium severity per the GitHub Advisory Database", not "KEV".
2. Actions -> **Droid fix vulnerable dependency** -> Run workflow, package
   `jsonwebtoken`. (A few minutes; talk through what it is doing.)
3. Open the PR it creates. The body is Droid's report: advisories fixed, plan,
   breaking-change risk, validation, rollback.
4. Show the diff: bump to 9.x, `algorithms: ["HS256"]` in `src/auth.ts`, one
   new test, no tests weakened. Be honest: 9.x did not break this repo; the
   allowlist is hardening.
5. CI and **Droid Auto Review** run on the PR.
6. **Human clicks Merge** once `build-test-lint` is green (the ruleset enforces it).
7. Dependabot alerts close within a few minutes.

## Act 2 - Stop new debt (~3 min)
1. Open a PR from `feature/export-customers` (seeded SQL injection + a fake
   hardcoded API key). Do not merge it.
2. **Droid Auto Review** posts inline findings; show severity and suggested fix.
3. Line: *"AI-written code is a vulnerability source too - this is the same
   review on every PR, not just dependency bumps."*

## Act 3 - Trust (~2 min, mostly slide)
Autonomy levels (`--auto medium` here), branch protection (say explicitly:
Factory doesn't enforce merges, the ruleset does), permission rules, audit
log, model choice.

## Failure / rollback plan
- If the fix workflow is slow or fails: switch to the screen recording, or show
  the already-merged PR #3 as "the run from earlier today".
- If CI flakes for an unrelated reason: re-run the job once, live; if it fails
  twice, cut to the recording.
- If the review does not post: show the recording, or re-run from the Actions tab.
- If a merge conflict appears from rehearsal leftovers: re-arm (above).

## After the call
Re-arm before the next rehearsal or real demo.

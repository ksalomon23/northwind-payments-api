# Demo runbook

Target: ~12 min live inside a 25-min walkthrough (see
`../factory_demo_context/04_presentation/talk-track.md` for the full session plan).

## Pre-call checklist (do this before the call, not live)
- [ ] Repo pushed to GitHub, `main` green, branch protection on (required review
      + required status checks, no admin bypass).
- [ ] Dependabot alerts enabled; confirm the 4 findings in `demo-data.md` show up.
- [ ] CVE-remediation workstream (or the headless `droid exec` fallback) has run
      at least one poll cycle so a `FIX-xxxx` task already exists - polling is
      hourly by default and only while the machine is awake.
- [ ] `feature/export-customers` branch pushed (seeded bad PR ready to open).
- [ ] Screen recording of one full successful run saved as backup.
- [ ] `./reset.sh` run once right before the call.

## Act 1 - Alert to PR (~5 min)
1. Show the Dependabot alert(s) on GitHub for one of the findings in
   `demo-data.md` (lead with jsonwebtoken GHSA-qwph-4952-7xr6 - it has a real
   code change, which makes the "plan" step visible).
2. Show the Factory task (`FIX-xxxx`) the listener created from that alert.
3. Show the **plan**: bump to `jsonwebtoken@^9.0.2`, add `algorithms: ["HS256"]`
   to `jwt.verify()` in `src/auth.ts`, note the breaking-change risk.
4. **Human approves** the plan (autonomy = Review every plan).
5. Droid opens the PR, CI runs. If CI fails on the first push (seeded), show
   Droid repairing it on the next push.
6. **Human clicks Merge** (branch protection enforces the review + checks).
7. Next poll: alert shows fixed.

## Act 2 - Stop new debt (~3 min)
1. Open a PR from `feature/export-customers` (seeded SQL injection + a fake
   hardcoded API key).
2. Trigger the automatic/`@droid security` review; show the inline findings
   with severity and the suggested fix.
3. Line: *"AI-written code is a vulnerability source too - this is the same
   review on every PR, not just dependency bumps."*

## Act 3 - Trust (~2 min, mostly slide)
Autonomy levels, branch protection (say explicitly: Factory doesn't enforce
merges, branch protection does), permission rules, audit log, model choice.

## Failure / rollback plan
- If the live poll doesn't pick up the alert in time: switch to the screen
  recording and narrate over it.
- If CI flakes for an unrelated reason: re-run the job once, live; if it fails
  twice, cut to the recording.
- If a merge conflict appears from rehearsal leftovers: run `./reset.sh` and
  use the recording for that run.

## After the call
Run `./reset.sh` before the next rehearsal or real demo.

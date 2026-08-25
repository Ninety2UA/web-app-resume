# Zauber Application Site - Build Launch Prompt

Companion to `2026-08-24-1345-feat-zauber-application-site-plan.md`. Saved 2026-08-25 so the build session can be launched any time.

**How to launch:**

```bash
mkdir -p ~/projects/zauber-application && cd ~/projects/zauber-application && claude
```

Then paste the entire block below as the first message (everything inside the fence, nothing else):

```text
/ce-work /Users/dbenger/projects/web-app-resume/docs/plans/2026-08-24-1345-feat-zauber-application-site-plan.md

Execution posture for this run — you (Fable) are orchestrator, coordinator, reviewer, and final approver:

- Target repo: this directory (~/projects/zauber-application), scaffolded by U1. The plan's paths are relative to it. Pattern source ~/projects/langdock-application and ~/ninety2 are READ-ONLY.
- You own: all commits, full gate runs (lint, test, build) before every commit, the U6 pilot workspace and its hard-stop check-in with Dominik (pilot depth/voice + the paper six-stage mapping for the two Meta workspaces), the post-family integration step that closes the four completeness pins, U18's multi-agent code review, and final approval of every unit. Nothing merges until you have reviewed it against the plan and the U6 bar. Fix or re-dispatch anything below bar — self-verify until perfect.
- Workers via the /orchestration skill (Orca-managed terminals), with exclusive file ownership per the plan's parallel-execution guidance (U3/U4 stub pre-wiring makes the five families conflict-free): Grok 4.6 via cursor-agent, and GPT-5.6-sol via the codex CLI at xhigh reasoning, assigned where each fits best (your call per family — e.g. scenario/data authoring vs component/visual work). At spawn time verify which model each CLI actually serves and pin it; codex takes an xhigh effort flag, cursor-agent exposes no effort override. Workers run focused tests only; you run the full suite.
- The adversarial freight fact-check gate (Verification Contract) must be run by a NON-AUTHOR against primary freight sources before each family merges — use the other worker or yourself, never the family's author.
- Verification tooling: chrome-devtools CLI for desktop inspection and console/network checks (its window clamps to ~500px minimum — it cannot test true mobile); playwright-cli --browser=webkit for the mandatory true-390px WebKit passes (R4, AE2). Run verification sweeps against `npm run build && npm start`, never the dev server.
- Design execution: the approved mockup artifact is the visual benchmark — https://claude.ai/code/artifact/eee53fda-ff6e-4ac6-8257-5001f3cb7abf (current version includes the amended two-column hero with the film placeholder). Use Mobbin MCP for reference patterns before major surfaces, /impeccable for design-quality passes, /shadcn where it fits the ported chassis, /excalidraw for any new hand-drawn figure.
- Copy quality: run /no-ai-slop over all reader-facing prose before its unit merges (KTD12/R28). If the skill is absent, install it at PROJECT level only: clone https://github.com/petergyang/no-ai-slop and copy its skills/no-ai-slop/ directory into this repo's .claude/skills/ — never a global install.
- Hard stops needing Dominik: the U6 check-in, any Kimi K3 unavailability (model replacement is his decision), any Zauber fact that cannot be traced to the plan's dossier or gozauber.com. U5 needs a DEDICATED OpenRouter API key with its own credit cap (never the Langdock site's key) — ask him when you reach it.
- The plan is the authority: scan its headings, read the Goal Capsule, then work the units in dependency order, reading each unit plus its cited R/KTD entries; satisfy each unit's test scenarios and the Verification Contract gates; surface genuine blockers instead of guessing; deviations from the plan need Dominik's sign-off.
```

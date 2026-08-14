# AI PM Field Manual — an open-source playbook built from real, shipped AI products

> Most "AI PM" content is generic advice with no product behind it. This one is chapter-by-chapter
> from what actually broke, and what I built to stop it breaking the same way twice.

## What it does

- 17-chapter field manual for AI product management, each chapter anchored to a real, shipped
  product decision — not a generic best-practices list.
- A companion Decision Eval Tool: paste a real product decision, get back one sharp,
  specific devil's-advocate question per fixed category (assumption risk, evidence gap, incentive
  misalignment, reversibility, second-order effects) — the categories are set in code, not chosen
  by the model.
- Ships honestly incomplete: 6 of 17 chapters are live today; the rest are marked "Coming" in the
  table of contents rather than hidden or faked.

## Try it

🔗 Live link: pending deploy (see Status below) — no signup required, 6 chapters free to read, eval
tool free to use.

## The numbers

_No usage numbers yet — this table stays empty until real traffic exists. See `GITHUB_PORTFOLIO_BUILD_BRIEF`'s
rule: an empty numbers table is honest, a fabricated one isn't._

## How it's built

**Content layer** — 17-chapter table of contents defined once (`lib/toc.ts`) as the single source
of truth for what's live vs. "Coming." Live chapters are markdown files in `content/chapters/`;
the chapter route (`app/chapters/[slug]/page.tsx`) statically generates only the chapters marked
live, so there's no dead link for an unwritten chapter — it renders as "Coming" on the index
instead.

**Decision Eval Tool** — same "don't let the model grade its own homework" discipline used across
this whole build, applied to the eval tool itself:

```
User pastes a decision
        │
        ▼
Server (app/api/eval/route.ts)
        │
        ▼
Claude, forced via tool_choice into a fixed
JSON schema — one finding per rubric category
        │
        ▼
Server validates: are all 5 rubric categories
present and well-formed? ──── No ──→ discard, return a generic
        │                             "try again" error (raw model
       Yes                            output never reaches the client)
        │
        ▼
Render 5 findings to the user
```

The rubric itself (`lib/rubric.ts`) is plain code — five fixed categories the model has to answer,
not five categories the model gets to invent. A response that's missing one is treated as a failed
response, not a partial success, the same way a call-transcript claim without a verifiable quote
gets discarded in `call-signal-chain` rather than shown.

Production error handling distinguishes an invalid API key (401) from an exhausted billing balance
(400/402/429) and shows a different message for each — directly applying the lesson from Chapter 8
of the manual, which documents the real incident that taught it.

## Stack

`Next.js 16 (App Router)` `TypeScript` `Tailwind CSS` `react-markdown` `Claude API` (Decision Eval
Tool only — chapter content is static, no API call needed to read it) `Vercel`

## What I learned building this

_Not filled in yet — see `LEARNINGS.md`. Written after real usage, in my own words, once there's
something real to reflect on._

## Roadmap

- [ ] Write chapters 6, 7, 9–17 (currently marked "Coming")
- [ ] Deploy to a live URL (`fieldmanual.amruth.space` per the build brief)
- [ ] Add Plausible/Vercel Analytics once live, so "N readers" claims are real before they're made
- [ ] Consider splitting the Decision Eval Tool into its own linkable page in the portfolio nav
      once it has real usage to point to

## Status

🟡 In progress · Solo build · August 2026 · 6/17 chapters live, eval tool functional, not yet deployed

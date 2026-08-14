# Chapter 14: The Devil's-Advocate Layer — Structuring AI-Assisted Decision-Making

Ask a model to critique a product decision with no other instruction and you'll usually get something polite, generic, and safe to ignore — a few soft caveats that read as due diligence but wouldn't change anyone's mind. That's not because the model can't generate sharp criticism. It's because "critique this" is an underspecified prompt, and an underspecified prompt gets an underspecified answer. Getting a genuinely useful devil's advocate out of a model requires the same discipline the rest of this manual argues for everywhere else: don't let the model decide the shape of its own output, force the shape first and let the model fill it in.

## The tool this manual ships with, and why its rubric is fixed in code

The companion tool to this manual — paste a product decision, get back structured pushback — doesn't ask the model "what's wrong with this." It hands the model five fixed categories, defined in `lib/rubric.ts`, not chosen by the model at request time: assumption risk, evidence gap, incentive misalignment, reversibility, and second-order effects. The model's job is to fill in one sharp, specific question per category, grounded in the actual decision text — never a template question that could apply to any decision. If a response comes back missing one of the five, the server rejects it outright and shows a generic retry message rather than a partial result. A devil's advocate that only checks the categories it feels like checking today isn't a devil's advocate, it's a mood.

Why fixed categories beat "just ask it to be thorough": a model asked to freely generate critique will gravitate toward whatever's most salient in the text it just read, which means it'll reliably catch the obvious problem and just as reliably miss the boring, structural ones — reversibility, who benefits if this is wrong — because those don't jump out from a first read the way an obvious risk does. A fixed rubric forces the boring, structural questions to get asked every single time, specifically because they're the ones easiest to skip.

## Why this needs to be architecture, not a prompting trick

It would be simpler to just write a longer, more detailed prompt asking nicely for five kinds of critique and hope the model covers all five. That's fragile in a way a fixed schema isn't: a prompt-only approach has no way to know, after the fact, whether the model actually delivered all five or quietly skipped one it found less interesting for this particular input. Enforcing the five categories as a JSON schema with `tool_choice` forcing structured output, then validating server-side that every category is present before rendering anything, turns "please be thorough" from a hope into a checked fact. That's the difference between a devil's advocate you can rely on and one that's thorough by accident, on the inputs where it happens to feel like it.

## Where this pattern applies beyond a standalone tool

The same structure works inside a PRD review, a pre-launch checklist, or a board update, not just as a separate tool: pick the fixed set of questions a decision in your domain should always face — for a pricing change, maybe it's cannibalization risk, support-cost impact, and competitive response; for a compliance-adjacent feature, maybe it's audit-trail completeness and consent handling — and force every review through that same fixed lens, every time, regardless of how confident the room feels about the decision that day. Confidence in the room is exactly the condition a fixed devil's-advocate rubric exists to counteract; a decision nobody's worried about is precisely the one most likely to skip a real review if the review is optional.

## The honest limit of this pattern

A devil's advocate, model-generated or human, only ever surfaces the questions — it doesn't answer them, and it shouldn't be trusted to. The five findings this tool returns are prompts for a human to actually think through, not verdicts to defer to. Treating a structured critique tool as a decision-maker rather than a decision-improver is its own failure mode, and arguably the most dangerous one this chapter could leave unaddressed.

---

*Next: [Chapter 15 — Vendor and Model Selection: A PM's Framework →](./15-vendor-and-model-selection.md)*

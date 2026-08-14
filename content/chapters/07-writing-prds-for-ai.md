# Chapter 7: Writing PRDs for AI Features — What Changes and What Doesn't

A PRD for an AI feature still needs everything a normal PRD needs: the problem, the user, the success metric, the scope boundary, what's explicitly out of scope. None of that goes away. What changes is that an AI feature has an extra, non-negotiable section a traditional feature spec never needed: a definition of what "wrong" looks like for this specific output, and what happens the instant wrong output gets produced. Skip that section and the rest of the PRD is describing a demo, not a shippable feature — a point worth returning to because it's the same one Chapter 1 opened this manual with, and it's the one PMs new to AI products underestimate most.

## What I actually built to test this, on myself

The first product in this build exists specifically to force this discipline: a command-line tool that takes a rough brief and turns it into a structured PRD — user stories, acceptance criteria, edge cases — with a built-in quality score, rather than a document a human has to separately judge as good or not.

The architecture is a three-stage chain, and the stages map almost exactly to the sections a rigorous AI-feature PRD needs. Stage one, Extract, pulls out what's actually stated in the source brief — the goal here is completeness, not judgment. Stage two, Expand, turns those extracted points into full user stories and acceptance criteria — this is where ambiguity in the original brief either gets surfaced as an explicit open question or silently papered over, and papering over it is exactly the failure mode a good PRD process should catch. Stage three, Score, runs a separate blind pass that grades the output against the original source material without seeing how confident the generation stage was — the same "don't let the model grade its own homework" pattern from Chapter 2, applied here to the PRD-writing process itself rather than to a downstream product.

## The section most PRDs skip, and shouldn't

For an AI feature, that means a PRD needs an explicit answer to: what does the model do when it doesn't know the answer? A traditional feature usually has a clean failure state — a disabled button, an empty list, a validation error. An AI feature's failure state is often a plausible-sounding wrong answer, which is a much worse default than a visible error, because a wrong-but-confident answer doesn't look like a failure to the user experiencing it. A PRD that doesn't specify what the low-confidence path looks like is implicitly specifying "the model will guess and we'll find out later," which is a decision, just an unowned one.

## Where PM judgment still does the heavy lifting

None of this replaces PM judgment — it directs it. The model can help draft user stories once the shape of the problem is clear, but deciding what the shape of the problem actually is, deciding which edge case matters enough to spec explicitly versus which one is acceptable to punt on for v1, deciding what "acceptable error rate" means for this specific feature in this specific context — that's still entirely a human call, and arguably the PRD's whole point is forcing that call to happen deliberately instead of by default. The PRD generation tool has a scoring step precisely because a generated draft is a draft, not a decision. Something still has to decide whether the draft is actually good, and that something is a person who understands the problem, reading the output critically rather than accepting it because it's well-formatted.

## The practical shift

Write the PRD's failure-mode section before the feature-description section, not after. It's a small ordering change with a real effect: deciding what "wrong" looks like before you've fallen in love with what "right" looks like in a demo keeps the bar honest, instead of retrofitted to whatever the model happened to produce on the first try.

---

*Next: [Chapter 9 — Prompt Chains vs. Single Prompts: When to Decompose →](./09-prompt-chains-vs-single-prompts.md)*

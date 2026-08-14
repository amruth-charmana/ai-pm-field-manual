# Chapter 6: Evals Before Features — What "Good Enough to Ship" Means

"We'll know it's good when we see it" is not an evaluation strategy. It's a way of finding out a feature was bad after a user already saw it. Most teams building AI features skip writing down what "good" means before they build, because it feels like process overhead standing between them and shipping. I'd argue it's the opposite: not knowing your bar for "good enough" is what actually slows you down, because every disagreement about whether a feature is ready turns into a subjective argument instead of a checked fact.

## What an eval actually is, stripped of jargon

An eval is just a checklist you run before you trust an output, written down before you're emotionally attached to whatever the model happened to produce. For a PM, that means answering a few concrete questions before a single line of the feature gets built: What does a correct output look like, specifically enough that two different people would agree on whether a given output passed? What's the failure mode you're most worried about, and how would you detect it automatically rather than by a human eyeballing outputs forever? What's the acceptable error rate, and who's accountable when it's exceeded?

## Where I've actually done this, concretely

Every product in this build has shipped with some version of an eval, even when I didn't call it that at the time. The clearest example is the tool at the end of this manual — the Decision Eval Tool itself. Its "good enough to ship" bar isn't a vibe. It's a fixed rubric of five categories, defined in code before the model ever runs, and a response is only accepted if all five categories come back well-formed. A response that's missing one is rejected server-side and never reaches a user, full stop. That's an eval enforced by the architecture, not a hope enforced by a code review comment.

The same discipline shows up as a build-time gate, not just a runtime one. Every product in this portfolio ships only after `npm run build`, lint, and a type-check all pass clean — that's the boring, unglamorous version of "we know what good looks like before we call it done," and it's caught real bugs. During one review pass on this very manual's companion tool, that discipline surfaced a case where a malformed duplicate entry in a model's response could have silently rendered the word "undefined" to a user — a defect that a demo running the happy path once would never have shown, and that only got caught because there was a defined bar to check the output against, not just a glance at whether it looked fine.

## The mistake this chapter is arguing against

The mistake isn't skipping formal ML evaluation infrastructure — most teams genuinely don't need a full eval harness for a first version. The mistake is treating "ship it and see" as a substitute for deciding, in writing, what would make you pull the feature back if it went wrong. Those are different things. "Ship it and see" with a defined rollback trigger is a reasonable MVP strategy. "Ship it and see" with no defined trigger is just hoping nothing goes wrong loudly enough for someone to notice.

## The practical version for a PM writing a spec

Before a build starts, write three lines into the spec, not eventually — before: what does a passing output look like, specifically enough to be checkable; what's the one failure mode you'd be most embarrassed by if a user hit it; and what automatically stops that failure mode from reaching them, versus what still relies on a human noticing. If the third line is empty, that's not a red flag to panic about — it's information. It tells you exactly where the product is still relying on luck, and now you can decide on purpose whether that's acceptable for this version or not.

---

*Next: [Chapter 7 — Writing PRDs for AI Features: What Changes and What Doesn't →](./07-writing-prds-for-ai.md)*

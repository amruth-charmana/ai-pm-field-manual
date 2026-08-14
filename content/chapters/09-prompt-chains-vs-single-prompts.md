# Chapter 9: Prompt Chains vs. Single Prompts — When to Decompose

The fastest way to build an AI feature is one prompt: stuff the whole task into a single instruction, let the model do everything in one pass, ship it. It's also, past a certain complexity, the fastest way to build a feature you can't debug. When a single mega-prompt produces a bad output, you get one opaque blob of reasoning to dig through, and no clean seam to insert a check at. The question this chapter is actually about isn't "are prompt chains better" — sometimes a single prompt is genuinely the right call — it's how to tell which situation you're in before you've built the wrong one.

## The test I actually use

Ask one question: are there multiple, genuinely different kinds of correctness this output needs to satisfy at once? "Extract the right facts" and "phrase them well" and "don't invent anything not in the source" are three different kinds of correctness, and a single prompt asks one pass of the model to nail all three simultaneously, with no way to check one without the others contaminating the read. Decompose whenever you can name more than one kind of correctness the output needs — one stage per kind, so each stage has one job and one way to fail, and you can point at exactly which stage produced a bad result.

## Where I decomposed, and why each split earned its complexity cost

The PRD tool splits into three stages — Extract, Expand, Score — because those really are three different jobs: pulling out what's stated, building it into full detail, and independently checking the detail against the source. Collapsing those into one prompt would mean a single pass has to simultaneously stay faithful to the source, be creative enough to flesh out real acceptance criteria, and be skeptical enough to catch its own overreach — three postures that pull against each other inside the same generation.

The call-transcript tool splits into Extract, Verify, Narrate for a sharper reason: the middle stage isn't a model call at all. It's plain code checking that a quoted claim is a real, findable substring of the transcript. That's not decomposition for the sake of cleanliness — a single prompt genuinely cannot do that step, because the check has to be outside the model to mean anything. If the same model that made the claim is also the one vouching for the claim, the vouching is worthless.

The usage-analytics tool splits into scoring and narration for the same underlying reason as the transcript tool: the math has to live outside the model entirely, or a hallucinated number becomes indistinguishable from a real one.

## The cost side of the ledger, honestly

Decomposition isn't free, and a chapter that only sells the upside isn't giving you the real trade-off. Every extra stage adds latency — three sequential model calls take three times as long as one, unless you can parallelize independent stages, and one call also means one point of failure instead of three, each with its own chance to error out or need its own error-handling in production. For a genuinely simple task — draft a one-line email subject from a topic — a single prompt is not just faster to build, it's the correct architecture, and reaching for a three-stage chain there is over-engineering that adds fragility without adding any real correctness.

## The rule, stated plainly

Default to one prompt. Add a stage only when you can name the specific kind of correctness that stage exists to guarantee, and you can't get that guarantee any other way. If you can't name it, you're adding latency and failure surface for a feeling of rigor rather than actual rigor — and a feeling of rigor is exactly the kind of thing that doesn't survive a skeptical reviewer asking "what does this stage actually check?"

---

*Next: [Chapter 10 — Synthetic Data: Building Credible Demos Without Real Client Data →](./10-synthetic-data.md)*

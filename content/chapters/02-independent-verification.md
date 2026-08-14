# Chapter 2: The Discipline Most AI PMs Skip — Independent Verification

Most AI product failures I've seen — in my own work and in other people's demos — trace back to one design choice made early and never revisited: letting the same model that generated an answer also be the only thing standing between that answer and the user. It's an easy choice to make by accident, because it's the path of least resistance. One prompt in, one answer out, ship it. It's also the choice that turns a promising demo into something a technical reviewer can break in under a minute, because all they have to do is ask the model something it's confidently wrong about.

The fix isn't "use a better model." I've now built this discipline into three separate products, in three different shapes, because the shape has to match what the product is actually doing. Here's what that looked like each time.

## Shape 1: Blind hallucination-checking

The first product turns a rough brief into a structured PRD — user stories, acceptance criteria, edge cases, a quality score. The obvious failure mode is a generation step that invents a requirement the source material never mentioned, states it with total confidence, and buries it three bullets deep where nobody double-checks it.

The fix was a second pass that never sees the first pass's confidence — it's handed only the generated document and the original source material, and asked to verify each claim independently, the same way you'd want a second engineer reviewing a PR without reading the first engineer's commit message first. If the check can't find support for a claim in the source, the claim gets flagged before a user ever sees the "final" document. The model isn't asked to be more careful. It's asked to check a different model's work, blind.

## Shape 2: Keep the model out of the math entirely

The second product ingests a CSV of product usage data and produces a PLG health report — PQL scoring, expansion signals, early churn-risk flags. Here the temptation is stronger, because it would be genuinely faster to just hand the raw CSV to the model and ask it to compute the scores and narrate them in one pass.

I didn't do that, on purpose. The scoring — every number in the churn-risk and expansion calculations — runs through a deterministic rules engine that never touches the model. Zero LLM involvement in the math. The model's only job is narration: take numbers it did not produce and cannot change, and explain them in plain English. It is explicitly instructed that it isn't allowed to invent a number that isn't already sitting in the computed output it was handed. If the model hallucinates here, it hallucinates prose, not data — a much smaller, much more visible failure than a hallucinated metric that looks exactly like a real one.

## Shape 3: Extract, verify, then narrate

The third product works on unstructured input — a pasted sales call transcript — where you can't fall back on "just don't let the model touch the math," because there's no math. Everything here is language.

So the pipeline splits into three stages. Stage one, the model reads the transcript and returns claims — churn signals, expansion signals, action items — and every claim is required to carry a verbatim quote as evidence. Stage two is plain code, zero model calls: it independently checks that each quoted string is a real, findable substring of the transcript, normalized for case, whitespace, and smart quotes so a formatting difference doesn't cause a false rejection. Any claim whose quote doesn't check out gets discarded before it's ever shown to anyone. Stage three, the model drafts the summary and follow-up email — but only from the list of claims that survived stage two, never from the raw transcript directly, so it structurally cannot reference something that failed verification. It isn't that the model is instructed not to. It's that the information isn't in front of it anymore.

## The pattern underneath the three shapes

Three different products, three different verification mechanisms, but the same underlying rule each time: **the component that generates an answer and the component that checks it must not be the same component, and ideally not even the same kind of component.** A second LLM call checking a first LLM call is better than nothing, but it's the weakest version of this — both calls share the same blind spots, the same training-data gaps, the same tendency toward confident phrasing regardless of accuracy. The strongest version, where you can get it, replaces the checker with deterministic code that has no opinion and cannot be talked into agreeing with something false.

This is also, not coincidentally, the exact discipline banking compliance already demands, which is where I first built the instinct rather than in a side project — Chapter 4 goes into that specifically. The lesson generalizes past finance, though: any AI product that's asking a user to trust an output needs an answer, in the architecture, to the question "what checked this before it reached them?" If the honest answer is "nothing, we trusted the model," that's not a product yet. It's a demo waiting for the wrong prompt.

---

*Next: [Chapter 3 — Confidence, Not Certainty: Designing for Human-in-the-Loop →](./03-confidence-not-certainty.md)*

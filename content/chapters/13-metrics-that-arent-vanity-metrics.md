# Chapter 13: AI Product Metrics That Aren't Vanity Metrics

"Number of AI-generated responses" is not a metric. It's an activity count wearing a metric's clothing. It goes up whether the product is helping anyone or not, it goes up when the model is confidently wrong just as fast as when it's right, and it's the single easiest number for an AI product to report because it requires no judgment about quality at all — just count the outputs. A huge share of "AI product metrics" I see in the wild are exactly this, dressed up as traction.

## The test for whether a metric is real

A metric earns its place on a dashboard, or in a portfolio README, only if it would change what someone did next. If a number going up or down wouldn't alter a single decision — what to build next, who to call, what to fix — it's decoration, not a metric. "Reports generated" fails this test on its own; "reports generated that led to a paid conversion" starts to pass it, because now the number is actually telling you something about whether the product created value someone was willing to pay for, not just whether it ran.

## The rule this whole portfolio is built under, stated as plainly as it can be

Every README in this build follows one non-negotiable line: the numbers table stays empty until a number is real, verified by an actual system — payment gateway records, analytics, something outside my own claim — not filled in with a plausible-sounding placeholder to make the page look more finished. An empty numbers table reads as "this is honestly early." A fabricated one reads as impressive for exactly as long as it takes a technical reviewer to ask a single follow-up question, and then it reads as the reason not to trust anything else on the page either. That trade is never worth making, and it's worth stating why in the open rather than just following the rule silently: one caught fabrication doesn't just cost you that number, it puts every other number you've ever cited under suspicion, including the real ones.

## What "real" actually requires, mechanically

A metric only counts as real once there's a system of record for it that isn't me typing a number into a document. That's a Razorpay dashboard for revenue, an analytics tool for usage, a database query for engagement — something a skeptical reviewer could, in principle, ask to see evidence of. Until that system exists and has real data flowing through it, the honest state of that metric is "not yet measured," not "estimated at roughly X."

## Where deterministic scoring and honest metrics are the same discipline wearing different clothes

Chapter 2 and Chapter 12 both make the case for keeping the model out of the actual math in a product's core logic — deterministic scoring computed by code, narrated but not invented by the model. This chapter is the same argument aimed outward, at how a product's own success gets measured and reported. A team that lets an LLM narrate its own usage numbers, unchecked, is one hallucinated sentence away from citing a fabricated metric with total confidence — the exact same failure mode as a product hallucinating a churn score, just aimed at the builder's own credibility instead of at a user.

## The practical habit

Before adding any number to a report, a pitch, a README, or a resume line, ask where it comes from, specifically — not "I'm confident this is roughly right," but "here is the system of record that produced this exact figure." If that system doesn't exist yet, the honest move isn't to estimate. It's to say, plainly, "not yet measured" — which, to the audience this manual is written for, reads as more credible than a suspiciously round number ever will.

---

*Next: [Chapter 14 — The Devil's-Advocate Layer: Structuring AI-Assisted Decision-Making →](./14-devils-advocate-layer.md)*

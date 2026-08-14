# Chapter 12: The PLG Loop for AI Products — PQLs, Expansion, Churn Signals

Product-led growth has always run on a simple premise: usage data tells you who's ready to buy more, and who's about to leave, before they tell you themselves. AI doesn't change that premise. What it changes is the temptation to let a model generate the signal directly instead of computing it — and that temptation is worth resisting harder here than almost anywhere else in an AI product, because a PLG loop that's wrong doesn't just produce a bad narrative, it drives real decisions about who your sales team calls and who gets a churn-prevention outreach.

## The architecture, and the one rule that shaped it

The usage-analytics product in this build ingests a CSV of product usage data and produces a PLG health report: product-qualified-lead scoring, expansion signals, early churn-risk flags. The one rule that shaped its entire architecture: the scoring math never touches the model. A deterministic rules engine computes every PQL, expansion, and churn-risk number directly from the raw data — zero LLM involvement in the numbers themselves. The model's only job is narration: explaining, in plain English, numbers it did not produce and is explicitly forbidden from inventing. If the narration step hallucinates, it hallucinates prose — an awkward sentence, not a fabricated metric that looks exactly as trustworthy as a real one sitting right next to it in the same report.

This is the same instinct from Chapter 2 (independent verification) applied to a specific, high-stakes category of number: the kind of number that ends up driving who a revenue team spends their time on. A hallucinated churn-risk score isn't a cosmetic bug. It's a false signal that costs someone real hours chasing a customer who was never actually at risk, or worse, missing one who was.

## Why "explained in plain English" is the actual product, not a feature of it

The output of a rules engine alone is a spreadsheet — accurate, but not something a non-technical stakeholder reads and acts on quickly. The narration layer's entire value is translation: turning "expansion_score: 0.83, driver: seat_utilization_delta" into a sentence a revenue leader can act on in the time it takes to read it. That's a real product decision, not a nice-to-have wrapper: the deterministic engine earns trust, and the narration earns speed. Building only the first gets you a tool analysts use. Building only the second gets you a tool nobody should trust. Both together is the actual product.

## Removing the friction that kills PLG tools before they're used once

A PLG analytics tool has a specific adoption problem most B2B software doesn't: a visitor has to have their own usage data on hand to try it, and most visitors, on a first visit, don't. A tool that requires bringing your own CSV before you can see whether it's worth the effort loses most of its potential audience at the very first step, before the product has had any chance to prove itself. The fix is a sample dataset a visitor can try instantly, with zero setup — not a nice-to-have polish item, but the difference between a product someone actually experiences and one they bounce off before seeing a single chart.

## The transferable rule

Whenever you're building a PLG signal — a health score, a churn flag, an expansion trigger — separate the question "what does the data actually say" from the question "how do we explain what it says" into two distinct steps, computed by two distinct things. The moment those two questions get answered by the same model call, you've lost the ability to know whether a number is real or just sounds real, and in a PLG loop, that's the one thing you can't afford to lose.

---

*Next: [Chapter 13 — AI Product Metrics That Aren't Vanity Metrics →](./13-metrics-that-arent-vanity-metrics.md)*

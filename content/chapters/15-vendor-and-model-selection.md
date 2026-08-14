# Chapter 15: Vendor and Model Selection — A PM's Framework

Vendor selection for an AI product usually gets framed as a single decision — "which model provider" — when it's actually a recurring one, made at every layer of the stack, under constraints that don't show up until you're already building. The model provider is the visible choice. The payment gateway, the deployment platform, the tooling you build with, all carry the same kind of decision, and all of them, in this build, ended up teaching the same lesson: the textbook-best-known option isn't automatically the right one once your actual constraints are on the table.

## The clearest example, and what it actually taught

The plan going in was Stripe for every revenue-capable product in this build — it's the more globally legible choice, the one a technical reviewer expects to see. It didn't survive contact with an actual constraint: Stripe is invite-only for India-based individuals without a registered business entity. That's not a workaround-able inconvenience, it's a hard no. The decision wasn't "settle for Razorpay as a lesser option" — it was recognizing that "more globally legible" and "actually usable for this builder, in this country, at this stage" are two different criteria, and the second one has to be satisfied before the first one matters at all. Chapter 11 covers the mechanics of that pivot; the point here is the decision pattern underneath it: rank your options by the constraint that would eliminate them outright, first, before ranking by the constraint that would merely make one option nicer than another.

## Consistency as its own selection criterion

Every product in this build calls the same model family for the same reason: not because it's definitionally the best choice for every task, but because the verification patterns, the error-handling for auth versus billing failures, the prompt-engineering instincts built up across four products all compound when the underlying provider stays constant. Switching providers between products would have meant re-learning failure modes each time instead of accumulating expertise in one set of them. That's a real argument for consistency, and it's also a real argument to revisit deliberately, not by default — the moment a specific task in a specific product would be genuinely better served by a different tool, that's a decision to make consciously, not an inertia to coast on.

## The tooling constraint nobody plans for

Not every vendor decision is about a product feature — some are about the environment you're actually building in. This build runs in a sandboxed cloud environment with an allowlisted network, and that constraint surfaced directly during this very product's build: an attempt to pull web fonts from Google Fonts at build time failed outright, because the sandbox's network policy doesn't reach that domain. The fix wasn't fighting the constraint — it was dropping the dependency on an external font fetch entirely and using a system font stack that builds identically everywhere, with no runtime cost either. That's the same underlying pattern as the Stripe-to-Razorpay pivot, just smaller and less visible: notice the actual constraint fast, and don't spend effort trying to route around something that's simply not negotiable, when the honest fix is often simpler than the workaround would have been.

## The framework, stated as a sequence

First, list the constraints that would eliminate an option outright — legal, regulatory, geographic, environmental — and screen against those before comparing anything else. Second, among what survives that screen, weigh the compounding value of consistency with what you've already built against the specific value a different option would add for this one case. Third, treat any vendor or tooling choice as provisional, not permanent — the Stripe decision looked settled until it wasn't, and a framework that can't revisit its own prior calls when new constraints surface isn't a framework, it's just the first answer you happened to reach for.

## Why this belongs in a PM's toolkit, not an engineer's

None of this requires deep technical expertise in any specific vendor's API. It requires the discipline to ask "what constraint would eliminate this option entirely" before falling in love with which option looks best on paper — which is a product-judgment question, not a technical one, and exactly the kind of question a PM is positioned to ask before the team is three sprints deep into a choice that was never actually viable.

---

*Next: [Chapter 16 — Shipping Solo: What AI Leverage Actually Replaces (and Doesn't) →](./16-shipping-solo.md)*

# Chapter 11: Freemium and Monetization Design for AI Products

AI features are more expensive to run than the static features most freemium models were originally designed around — every free use costs real, metered inference money, not just server capacity you'd have paid for anyway. That changes the monetization design problem in a way a lot of "give away a generous free tier" playbooks don't account for. The design question isn't just "how do we convert free users to paid," it's "how do we make sure a free tier can't quietly become an unbounded bill," and both of those have to be solved before the product ships, not discovered afterward from an invoice.

## The pattern I've actually shipped, twice

Two products in this build monetize the same way, deliberately: one free, full-quality report per session, then a paywall to unlock unlimited use. Not a degraded free tier and a better paid one — the free result is the real result, computed the same way a paid one would be. The scarcity is in quantity, not quality, which matters for trust: a free tier that's secretly worse trains a visitor to distrust the product before they've even considered paying for it.

The gating itself runs through an httpOnly cookie tracking whether the session's free use has been spent, checked server-side before a report is generated. And — this is the part that actually took a real decision, not just an implementation detail — payment success is never trusted from the client. When a checkout completes, the server independently re-verifies the payment gateway's cryptographic signature (HMAC-SHA256) before unlocking anything, rather than trusting a client-side "payment succeeded" callback. That distinction matters more than it sounds like it should: a client-side trust model means anyone who can read your frontend JavaScript can potentially forge a "paid" state without ever paying. Verifying server-side against the gateway's own signature closes that off entirely, and it's the same "don't trust an output you didn't independently check" instinct from Chapter 2, applied to money instead of model claims.

## The vendor decision that actually mattered

The original plan was Stripe — more globally legible, the default choice a technical reviewer expects to see. It didn't survive contact with reality: Stripe is invite-only for India-based individuals without a registered business entity, which is exactly the position a solo builder shipping a portfolio product is in. The pivot to Razorpay wasn't a downgrade, it was the correct call once the actual constraint was in front of me — test-mode Razorpay Checkout, same server-side signature-verification discipline, shipped instead of blocked on a Stripe approval that might never come. Chapter 15 goes further into vendor selection as its own discipline; the point here is narrower: the "better-known" option isn't automatically the right one once your actual constraints are on the table, and knowing when to pivot away from the textbook answer is itself the product decision, not a consolation prize.

## What doesn't get a paywall, and why that's also a decision

Not every product in this build monetizes. The Decision Eval Tool in this manual has no payment gateway — it's not one of the portfolio's revenue-capable products, so instead of a paywall it gets a simple session-based usage cap for cost control. That's worth stating plainly as its own category: "no monetization" isn't the same as "no cost discipline." A product that will never charge a user still needs a plan for what stops usage from becoming an open bill; the plan is just a hard cap instead of a paywall, because there's no revenue on the other side of the gate to justify the extra complexity of a full checkout flow.

## The design principle underneath all of it

Decide, before you write a line of gating code, what "free" actually means for this specific product — same-quality-limited-quantity, or degraded-quality-unlimited-quantity — and be honest with yourself about which one erodes trust faster. Then decide, separately, whether "paid" is even the right lever for this product, or whether a usage cap without a payment behind it is the more honest design for something that was never meant to generate revenue in the first place.

---

*Next: [Chapter 12 — The PLG Loop for AI Products: PQLs, Expansion, Churn Signals →](./12-plg-loop-for-ai-products.md)*

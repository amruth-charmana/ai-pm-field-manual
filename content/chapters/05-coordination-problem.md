# Chapter 5: The Coordination Problem Behind Most "AI Problems"

A team asks for an AI feature. Nine times out of ten in my experience, when you actually dig into what's slowing them down, the bottleneck has nothing to do with a capability AI would add — it's coordination. Different teams working off different dashboards, each holding a different partial version of the truth, spending more time reconciling what's going on than acting on it. Drop a model on top of that and you haven't fixed it. You've just given four teams a fifth source of disagreement.

I learned to spot this building a client migration and upgrade orchestration suite — software that helps SME banking clients move through platform upgrades, a process that previously involved separate engineering task tracking, separate client-facing status updates, separate sign-off workflows, and separate views for the onboarding staff helping the client through it. Four teams. Four dashboards. Four different versions of where the migration actually stood at any given moment.

## What the AI part of this actually was

There is a genuine AI component: a diagnostic agent that scans a client's legacy configuration and auto-generates the pre-migration checklist, instead of an engineer manually auditing the setup and writing the checklist by hand. That's real, useful automation, and it's worth building well.

But it was never the thing that moved the metric. The thing that moved the metric was recognizing that the actual problem wasn't "we need better migration diagnostics." It was "four teams have four different truths about the same migration, and nobody can tell you the real status without pinging three other people first." The diagnostic agent solved a real but comparatively small problem. The architecture around it solved the expensive one.

## What we actually built

One shared state, four views into it: an internal view for engineering (tasks, blockers, automated regression triggers), a client-facing view (self-service status, checklist, document upload), a bridge view for shared milestone sign-off between the client and the team, and an access-tiered view for the contracted onboarding staff supporting the client through the process. Same underlying data, four lenses shaped for four different jobs — instead of four separate systems that each had to be manually kept in sync with the others, and inevitably drifted.

The result was a 36% reduction in upgrade timelines, and roughly 40% more client onboardings handled per unit of engineering bandwidth. I want to be precise about where that gain actually came from, because it's the whole point of this chapter: it came from killing the coordination overhead, not from the AI diagnostic step being clever. If you asked me to point at the single line item responsible for the 36%, it's "one system, four views of the same data" — not the model call.

## Why this is a trap specifically for AI product managers

It's an easy trap to fall into precisely because you were hired to bring AI capability into the org, so every problem starts to look like it needs an AI answer — that's the tool in your hand, so everything looks like the nail it fits. The discipline this chapter is really arguing for is: diagnose the actual bottleneck before you reach for the model. Sometimes the bottleneck genuinely is "we need a capability that doesn't exist without AI" — extraction, classification, generation at a speed or scale a human can't match. And sometimes the bottleneck is "four teams can't agree on what's true right now," which is a data-architecture and information-design problem that AI doesn't fix and can quietly make worse, by adding a fifth confident-sounding source of truth on top of the four that already disagree.

The practical habit I'd recommend: before scoping any AI feature, write down what the process looks like today without any AI involved at all, and mark every step where the delay is actually "person waiting on information that exists somewhere else in the org, in a form they can't see." If most of your delay lives in those steps, you have a coordination problem first and an AI opportunity second — and the coordination problem is usually where the bigger number is hiding.

---

*Next: [Chapter 8 — Debugging AI Products in Production: Reading the Right Signal →](./08-debugging-in-production.md)*

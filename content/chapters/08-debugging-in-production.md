# Chapter 8: Debugging AI Products in Production — Reading the Right Signal

This chapter is a single incident, told in enough detail to be useful, because the lesson doesn't survive being summarized into a bullet point. It's about the difference between two failure modes that look almost identical from the outside — an invalid API key and an exhausted billing balance — and why conflating them costs you a debugging cycle you didn't need to spend.

## The setup

I'd shipped a live product — a call-transcript analysis tool that extracts churn and expansion signals from a pasted sales call, then drafts a summary and follow-up email. Both the extraction step and the narrative step call the Claude API in production. After deployment, the live extraction step started failing.

## The wrong first assumption

The easy assumption — the one I'd have made without stopping to check — was that this was the same billing-credit issue already affecting a companion product built on the same account. That product's narrative feature was known to be degraded because the underlying Claude Console account had $0 in credits, on an evaluation-access plan. Same account, same API family, new product hitting the same wall — the pattern-match writes itself, and it would have been reasonable to just move straight to "add credits" as the fix.

It would also have been wrong. The actual error returned was a `401 invalid API key` — a distinct failure mode from a billing rejection, and one that requires a completely different fix. A 401 means the credential itself is bad: expired, mistyped, revoked, or never valid to begin with. A billing error means the credential is fine and the request is being correctly rejected because there's no balance to pay for it. Treating one as the other sends you toward the wrong remedy — you could add credits to an account whose key is simply wrong and see no change at all, then waste a cycle wondering why the fix "didn't work."

## What actually separated the two

The fix was mechanical once diagnosed correctly, but the diagnosis mattered: verify the specific error code before assuming which known issue you're looking at, even when a superficially similar issue is already sitting in your recent memory as the explanation. In this case, the API key value that had been pasted into the deployment platform's environment variables was genuinely invalid — not a billing problem wearing a billing-shaped error, but a credentials problem wearing one. The fix was regenerating the correct key from the console, re-pasting it into the deployment platform's environment variable settings for that specific project, and redeploying.

One detail worth flagging on its own, because it's the kind of thing that silently costs people a redeploy cycle: on at least one common deployment platform, "redeploy" always applies the latest project settings and environment variables regardless of whether a "use existing build cache" option is checked — that checkbox only affects build speed, not whether new environment variables actually get picked up. It's an easy thing to get backwards, and getting it backwards looks exactly like "I fixed the key and it still doesn't work," which sends you straight back to doubting the diagnosis you already got right.

After the key was corrected and redeployed, the 401 was gone — confirmed by re-testing the live extraction endpoint, not just by assuming the fix worked. The product then hit the pre-existing, already-known billing wall on the same call, which is a separate, already-diagnosed issue with a separate, already-understood fix (add funds to the account) that simply hadn't been actioned yet.

## The transferable habit

Two failures that produce visually similar symptoms — a broken feature, an unhelpful error banner — are not the same failure just because they showed up in the same product family this week. Read the actual error code or message before pattern-matching to whatever explanation is freshest in memory. It costs thirty extra seconds to check. It costs a full debugging cycle, and a fix that mysteriously "doesn't work," if you skip it.

The broader point for an AI PM specifically: production AI systems fail in more distinct ways than most software, because you've got model errors, infrastructure errors, and business-logic errors (like a billing wall) all capable of surfacing through the same user-facing error message. Part of the job is building enough operational literacy to tell them apart quickly, instead of reaching for the most recently-seen explanation and hoping it generalizes.

---

*This closes the first six live chapters of the Field Manual. Remaining chapters (6, 7, 9–17) are in progress — see the table of contents for what's coming.*

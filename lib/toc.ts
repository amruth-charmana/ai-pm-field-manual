// Single source of truth for the manual's structure. A chapter is "live"
// only if a matching .md file exists in content/chapters — everything else
// renders as "Coming" rather than a dead link. Ship incomplete-but-honest,
// per the build brief: mark what's not written yet instead of hiding it.

export type ChapterEntry = {
  number: number;
  slug: string;
  title: string;
  section: string;
  live: boolean;
};

export const SECTIONS = [
  "Foundations",
  "Building & Shipping",
  "Go-to-Market",
  "Judgment Layer",
] as const;

export const TOC: ChapterEntry[] = [
  { number: 1, slug: "what-ai-pm-means", title: "What \"AI Product Manager\" Actually Means in 2026", section: "Foundations", live: true },
  { number: 2, slug: "independent-verification", title: "The Discipline Most AI PMs Skip: Independent Verification", section: "Foundations", live: true },
  { number: 3, slug: "confidence-not-certainty", title: "Confidence, Not Certainty: Designing for Human-in-the-Loop", section: "Foundations", live: true },
  { number: 4, slug: "compliance-first-ai", title: "Compliance-First AI: Building in Regulated Environments", section: "Foundations", live: true },
  { number: 5, slug: "coordination-problem", title: "The Coordination Problem Behind Most \"AI Problems\"", section: "Foundations", live: true },
  { number: 6, slug: "evals-before-features", title: "Evals Before Features: What \"Good Enough to Ship\" Means", section: "Building & Shipping", live: true },
  { number: 7, slug: "writing-prds-for-ai", title: "Writing PRDs for AI Features: What Changes and What Doesn't", section: "Building & Shipping", live: true },
  { number: 8, slug: "debugging-in-production", title: "Debugging AI Products in Production: Reading the Right Signal", section: "Building & Shipping", live: true },
  { number: 9, slug: "prompt-chains-vs-single-prompts", title: "Prompt Chains vs. Single Prompts: When to Decompose", section: "Building & Shipping", live: true },
  { number: 10, slug: "synthetic-data", title: "Synthetic Data: Building Credible Demos Without Real Client Data", section: "Building & Shipping", live: true },
  { number: 11, slug: "freemium-and-monetization", title: "Freemium and Monetization Design for AI Products", section: "Go-to-Market", live: true },
  { number: 12, slug: "plg-loop-for-ai-products", title: "The PLG Loop for AI Products: PQLs, Expansion, Churn Signals", section: "Go-to-Market", live: true },
  { number: 13, slug: "metrics-that-arent-vanity-metrics", title: "AI Product Metrics That Aren't Vanity Metrics", section: "Go-to-Market", live: true },
  { number: 14, slug: "devils-advocate-layer", title: "The Devil's-Advocate Layer: Structuring AI-Assisted Decision-Making", section: "Judgment Layer", live: true },
  { number: 15, slug: "vendor-and-model-selection", title: "Vendor and Model Selection: A PM's Framework", section: "Judgment Layer", live: true },
  { number: 16, slug: "shipping-solo", title: "Shipping Solo: What AI Leverage Actually Replaces (and Doesn't)", section: "Judgment Layer", live: true },
  { number: 17, slug: "the-honest-roadmap", title: "The Honest Roadmap: Communicating What's Not Built Yet", section: "Judgment Layer", live: true },
];

export function liveCount(): number {
  return TOC.filter((c) => c.live).length;
}

// The eval tool's fixed rubric. This list is plain code, not something the
// model chooses — the same discipline as every other product in this build:
// the model fills in content, it does not get to decide the structure it's
// filling in. If a response comes back missing one of these categories, the
// API route treats that as a failed response, not a partial success.
export type RubricCategory = {
  key: string;
  label: string;
  prompt: string;
};

export const RUBRIC: RubricCategory[] = [
  {
    key: "assumption_risk",
    label: "Assumption Risk",
    prompt: "What is this decision assuming is true without direct evidence?",
  },
  {
    key: "evidence_gap",
    label: "Evidence Gap",
    prompt: "What data, if it existed today, would most change this decision?",
  },
  {
    key: "incentive_misalignment",
    label: "Incentive Misalignment",
    prompt: "Who benefits if this decision turns out to be wrong, and does that change how it was framed?",
  },
  {
    key: "reversibility",
    label: "Reversibility",
    prompt: "If this is wrong, how expensive and how fast is it to undo?",
  },
  {
    key: "second_order_effects",
    label: "Second-Order Effects",
    prompt: "If this works exactly as intended, what does it break or strain downstream?",
  },
];

export const RUBRIC_KEYS = RUBRIC.map((r) => r.key);

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { RUBRIC, RUBRIC_KEYS } from "@/lib/rubric";

export const runtime = "nodejs";

const MAX_DECISION_LENGTH = 4000;

// Cost control: this endpoint calls a paid API with no auth in front of it.
// Every other product in this portfolio gates usage after a free allotment
// (usage-signal-chain, call-signal-chain: 1 free report/session via
// httpOnly cookie). This tool has no payment gateway — it's not one of the
// brief's revenue-capable three — so instead of a paywall, a free session
// simply gets a hard cap. It's a portfolio demo, not a production SaaS
// product; the cap exists to stop it from becoming an open bill, not to
// monetize it.
const FREE_EVALS_PER_SESSION = 8;
const SESSION_COOKIE = "fm_eval_count";

type ValidFinding = {
  category: string;
  question: string;
  why_it_matters: string;
};

type EvalResult = {
  category: string;
  label: string;
  question: string;
  why_it_matters: string;
};

// Single source of truth for "is this a usable finding" — used both to
// decide whether the response passes validation AND to build the map the
// response is actually rendered from. Previously these were two separate
// code paths (a filtered check, then an unfiltered lookup), which meant a
// malformed duplicate entry for an already-valid category could slip past
// validation and still reach the user as `undefined` text. Now there is
// exactly one filtered list, used everywhere downstream.
function extractValidFindings(input: unknown): ValidFinding[] | null {
  if (typeof input !== "object" || input === null) return null;
  const candidate = input as Record<string, unknown>;
  if (!Array.isArray(candidate.findings)) return null;

  const valid = candidate.findings.filter(
    (f): f is ValidFinding =>
      typeof f === "object" &&
      f !== null &&
      typeof (f as Record<string, unknown>).category === "string" &&
      RUBRIC_KEYS.includes((f as Record<string, unknown>).category as string) &&
      typeof (f as Record<string, unknown>).question === "string" &&
      (f as Record<string, unknown>).question !== "" &&
      typeof (f as Record<string, unknown>).why_it_matters === "string" &&
      (f as Record<string, unknown>).why_it_matters !== ""
  );

  // De-dupe by category, keeping the FIRST valid occurrence — deterministic,
  // rather than "whichever happened to be last in the array."
  const byCategory = new Map<string, ValidFinding>();
  for (const f of valid) {
    if (!byCategory.has(f.category)) byCategory.set(f.category, f);
  }

  // Every rubric category must be present. A response covering only 3 of 5
  // is treated as malformed, not "partially useful" — the whole point of a
  // fixed rubric is that skipping a category silently isn't allowed.
  const complete = RUBRIC_KEYS.every((key) => byCategory.has(key));
  return complete ? Array.from(byCategory.values()) : null;
}

export async function POST(req: NextRequest) {
  const cookieCount = Number(req.cookies.get(SESSION_COOKIE)?.value ?? "0");
  if (Number.isFinite(cookieCount) && cookieCount >= FREE_EVALS_PER_SESSION) {
    return NextResponse.json(
      {
        error: `You've used all ${FREE_EVALS_PER_SESSION} free reviews for this session. Refresh in a new session to continue, or this is where a real product would put a paywall.`,
      },
      { status: 429 }
    );
  }

  let body: { decision?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Request body must be JSON." }, { status: 400 });
  }

  const decision = (body.decision ?? "").trim();
  if (!decision) {
    return NextResponse.json({ error: "Paste a product decision first." }, { status: 400 });
  }
  if (decision.length > MAX_DECISION_LENGTH) {
    return NextResponse.json(
      { error: `Keep the decision under ${MAX_DECISION_LENGTH} characters.` },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "This tool isn't configured on the server yet — no API key set." },
      { status: 503 }
    );
  }

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1200,
      system:
        "You are a skeptical product reviewer. You are given a product decision and a fixed set of categories. " +
        "For EVERY category, write one sharp, specific question grounded in the actual decision text given — never a " +
        "generic template question — plus one sentence on why it matters for this specific decision. " +
        "You must return exactly one entry per category listed, no more, no fewer. Do not soften the questions to be polite.",
      tools: [
        {
          name: "submit_review",
          description: "Submit the devil's-advocate review, one finding per rubric category.",
          input_schema: {
            type: "object",
            properties: {
              findings: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    category: {
                      type: "string",
                      enum: RUBRIC_KEYS,
                    },
                    question: { type: "string" },
                    why_it_matters: { type: "string" },
                  },
                  required: ["category", "question", "why_it_matters"],
                },
              },
            },
            required: ["findings"],
          },
        },
      ],
      tool_choice: { type: "tool", name: "submit_review" },
      messages: [
        {
          role: "user",
          content:
            `Product decision:\n"""${decision}"""\n\n` +
            `Categories (use these exact keys):\n` +
            RUBRIC.map((r) => `- ${r.key}: ${r.prompt}`).join("\n"),
        },
      ],
    });

    const toolUse = response.content.find((block) => block.type === "tool_use");
    const validFindings = toolUse && toolUse.type === "tool_use" ? extractValidFindings(toolUse.input) : null;

    if (!validFindings) {
      // Same discipline as the rest of the build: a response that doesn't
      // check out structurally is discarded rather than shown half-broken.
      // Logged server-side only — no raw model output reaches the client.
      console.error("Eval tool: model response failed rubric validation", toolUse?.type === "tool_use" ? toolUse.input : toolUse);
      return NextResponse.json(
        { error: "The review came back incomplete. Try again — this is logged and rare." },
        { status: 502 }
      );
    }

    const findingsByCategory = new Map(validFindings.map((f) => [f.category, f]));
    const results: EvalResult[] = RUBRIC.map((r) => {
      const found = findingsByCategory.get(r.key);
      if (!found) {
        // Unreachable given extractValidFindings already checked completeness,
        // but a thrown error here is safer than a silent `undefined` render
        // if that invariant is ever weakened later.
        throw new Error(`Missing validated finding for rubric category "${r.key}"`);
      }
      return {
        category: r.key,
        label: r.label,
        question: found.question,
        why_it_matters: found.why_it_matters,
      };
    });

    const res = NextResponse.json({ results });
    res.cookies.set(SESSION_COOKIE, String(cookieCount + 1), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 6, // 6 hours — long enough for one recruiter/reviewer sitting, short enough to reset the demo daily
      path: "/",
    });
    return res;
  } catch (err: unknown) {
    // Distinguish failure modes rather than showing one generic error —
    // this is Chapter 8's lesson applied directly: a bad API key and an
    // exhausted billing balance are different problems with different fixes,
    // and the user-facing message should say which one this is.
    const status = (err as { status?: number } | undefined)?.status;
    console.error("Eval tool: Anthropic API call failed", err);

    if (status === 401) {
      return NextResponse.json(
        { error: "Server-side API credential issue (invalid key). Not a problem with your input." },
        { status: 502 }
      );
    }
    if (status === 400 || status === 402 || status === 429) {
      return NextResponse.json(
        { error: "The eval tool is temporarily unavailable (API billing/rate limit on our end). Not a problem with your input." },
        { status: 502 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong generating the review. Try again in a moment." },
      { status: 502 }
    );
  }
}

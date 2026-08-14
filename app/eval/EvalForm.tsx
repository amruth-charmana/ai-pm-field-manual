"use client";

import { useState } from "react";

type EvalResult = {
  category: string;
  label: string;
  question: string;
  why_it_matters: string;
};

const SAMPLE_DECISION =
  "We're going to gate the new AI narrative feature behind a paywall from day one, " +
  "skipping a free trial, because our last product's free tier had low conversion.";

export default function EvalForm() {
  const [decision, setDecision] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<EvalResult[] | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!decision.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch("/api/eval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setResults(data.results);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={decision}
          onChange={(e) => setDecision(e.target.value)}
          placeholder="Paste a product decision — e.g. a spec excerpt, a roadmap call, a launch plan…"
          rows={6}
          maxLength={4000}
          className="w-full resize-none rounded-xl border border-[#e4e4e9] bg-white px-4 py-3 text-[15px] leading-relaxed text-[#14151a] placeholder:text-[#8b8d99] focus:border-[#4145e6] focus:outline-none focus:ring-1 focus:ring-[#4145e6]"
        />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={loading || !decision.trim()}
            className="inline-flex items-center rounded-full bg-[#14151a] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2b2d38] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Reviewing…" : "Run the review"}
          </button>
          <button
            type="button"
            onClick={() => setDecision(SAMPLE_DECISION)}
            className="text-sm font-medium text-[#4145e6] hover:underline"
          >
            Try a sample decision
          </button>
          <span className="text-xs text-[#8b8d99]">{decision.length}/4000</span>
        </div>
      </form>

      {error && (
        <div className="mt-6 rounded-xl border border-[#f0c9c9] bg-[#fdf3f3] px-4 py-3 text-sm text-[#8a2c2c]">
          {error}
        </div>
      )}

      {results && (
        <div className="mt-8 space-y-4">
          {results.map((r) => (
            <div key={r.category} className="rounded-xl border border-[#e4e4e9] p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#4145e6]">
                {r.label}
              </p>
              <p className="mt-2 text-[15px] font-medium leading-relaxed text-[#14151a]">
                {r.question}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#52545e]">{r.why_it_matters}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

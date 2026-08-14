import Link from "next/link";
import EvalForm from "./EvalForm";
import { RUBRIC } from "@/lib/rubric";

export const metadata = {
  title: "Decision Eval Tool — AI PM Field Manual",
};

export default function EvalPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-[#4145e6]">
        Companion Tool
      </p>
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#14151a] sm:text-4xl">
        Decision Eval Tool
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-[#52545e]">
        Paste a real product decision — a spec, a roadmap call, a launch plan. You get back one
        sharp question per fixed category, not a freeform critique. The categories are set in
        code, not chosen by the model —{" "}
        <Link href="/chapters/devils-advocate-layer" className="text-[#4145e6] underline underline-offset-2">
          Chapter 14
        </Link>{" "}
        covers why that distinction matters.
      </p>

      <div className="mt-8 rounded-xl border border-[#e4e4e9] bg-[#fafafa] p-5 text-sm text-[#52545e]">
        <p className="font-medium text-[#14151a]">The five fixed categories</p>
        <ul className="mt-2 space-y-1">
          {RUBRIC.map((r) => (
            <li key={r.key}>
              <span className="font-medium text-[#14151a]">{r.label}</span> — {r.prompt}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <EvalForm />
      </div>
    </div>
  );
}

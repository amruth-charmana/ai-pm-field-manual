import Link from "next/link";
import { SECTIONS, TOC, liveCount } from "@/lib/toc";

export default function Home() {
  const total = TOC.length;
  const live = liveCount();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-[#4145e6]">
        AI PM Field Manual
      </p>
      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#14151a] sm:text-4xl">
        An open-source field manual for AI product management
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-[#52545e]">
        {live} of {total} chapters are live. Every chapter is built from a real, shipped AI
        product — not generic best practices — and every metric cited is verified before
        publishing, never rounded up.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href="/eval"
          className="inline-flex items-center rounded-full bg-[#14151a] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2b2d38]"
        >
          Try the Decision Eval Tool →
        </Link>
        <span className="text-sm text-[#8b8d99]">
          Paste a product decision, get structured devil&apos;s-advocate questions back.
        </span>
      </div>

      <div className="mt-14 space-y-10">
        {SECTIONS.map((section) => {
          const chapters = TOC.filter((c) => c.section === section);
          return (
            <div key={section}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[#8b8d99]">
                {section}
              </h2>
              <ul className="mt-3 divide-y divide-[#e4e4e9] rounded-xl border border-[#e4e4e9]">
                {chapters.map((chapter) => (
                  <li key={chapter.number}>
                    {chapter.live ? (
                      <Link
                        href={`/chapters/${chapter.slug}`}
                        className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-[#f7f7fa]"
                      >
                        <span className="text-[15px] text-[#14151a]">
                          <span className="text-[#8b8d99]">
                            {chapter.number.toString().padStart(2, "0")}
                          </span>{" "}
                          — {chapter.title}
                        </span>
                        <span className="shrink-0 text-sm font-medium text-[#4145e6]">
                          Read →
                        </span>
                      </Link>
                    ) : (
                      <div className="flex items-center justify-between gap-4 px-5 py-4">
                        <span className="text-[15px] text-[#8b8d99]">
                          <span>{chapter.number.toString().padStart(2, "0")}</span> —{" "}
                          {chapter.title}
                        </span>
                        <span className="shrink-0 rounded-full bg-[#f0f0f4] px-3 py-1 text-xs font-medium text-[#8b8d99]">
                          Coming
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TOC } from "@/lib/toc";
import { getChapterEntry, getChapterMarkdown, getAdjacentChapters } from "@/lib/chapters";
import { stripTrailingNav, stripLeadingH1 } from "@/lib/markdown";

export function generateStaticParams() {
  return TOC.filter((c) => c.live).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getChapterEntry(slug);
  if (!entry) return {};
  return {
    title: `${entry.title} — AI PM Field Manual`,
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getChapterEntry(slug);

  if (!entry || !entry.live) {
    notFound();
  }

  const raw = getChapterMarkdown(entry);
  const body = stripLeadingH1(stripTrailingNav(raw));
  const { prev, next } = getAdjacentChapters(entry);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="text-sm font-medium text-[#4145e6] hover:underline">
        ← All chapters
      </Link>

      <p className="mt-6 text-sm font-medium uppercase tracking-wide text-[#8b8d99]">
        Chapter {entry.number.toString().padStart(2, "0")} · {entry.section}
      </p>
      <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-[#14151a] sm:text-4xl">
        {entry.title}
      </h1>

      <div className="prose-manual mt-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </div>

      <div className="mt-16 flex items-center justify-between border-t border-[#e4e4e9] pt-8 text-sm">
        {prev ? (
          <Link href={`/chapters/${prev.slug}`} className="font-medium text-[#4145e6] hover:underline">
            ← Ch. {prev.number.toString().padStart(2, "0")}: {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/chapters/${next.slug}`} className="font-medium text-[#4145e6] hover:underline">
            Ch. {next.number.toString().padStart(2, "0")}: {next.title} →
          </Link>
        ) : (
          <Link href="/" className="font-medium text-[#4145e6] hover:underline">
            Back to all chapters →
          </Link>
        )}
      </div>
    </div>
  );
}

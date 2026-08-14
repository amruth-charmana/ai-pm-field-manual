import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-[#e4e4e9] bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-sm font-semibold tracking-tight text-[#14151a]">
          AI PM Field Manual
        </Link>
        <nav className="flex items-center gap-6 text-sm text-[#52545e]">
          <Link href="/" className="hover:text-[#14151a]">
            Chapters
          </Link>
          <Link href="/eval" className="hover:text-[#14151a]">
            Decision Eval Tool
          </Link>
          <a
            href="https://github.com/amruth-charmana/ai-pm-field-manual"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#14151a]"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

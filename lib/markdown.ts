// Chapter source files end with a hand-written "Next: ..." nav line under a
// horizontal rule. The site renders its own Prev/Next nav from the TOC
// (lib/toc.ts) instead, so that line is stripped rather than rendered raw —
// otherwise a relative ./02-....md link would 404 on a live route that's
// actually /chapters/independent-verification.
export function stripTrailingNav(markdown: string): string {
  return markdown.replace(/\n---\n\n\*[^\n]*\*\s*$/, "").trimEnd();
}

// Every chapter source file opens with "# Chapter N: Title" as an H1, but
// the chapter page component (app/chapters/[slug]/page.tsx) already renders
// its own <h1> from the TOC title above the body. Left in, every chapter
// would render a doubled heading — this strips the source H1 from all of
// them, not just chapter 1.
export function stripLeadingH1(markdown: string): string {
  return markdown.replace(/^#\s+.*\n/, "").trimStart();
}

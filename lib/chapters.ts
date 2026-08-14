import fs from "fs";
import path from "path";
import { TOC, ChapterEntry } from "./toc";

const CHAPTERS_DIR = path.join(process.cwd(), "content", "chapters");

function paddedNumber(n: number): string {
  return n.toString().padStart(2, "0");
}

function filePathForChapter(entry: ChapterEntry): string {
  return path.join(CHAPTERS_DIR, `${paddedNumber(entry.number)}-${entry.slug}.md`);
}

export function getChapterEntry(slug: string): ChapterEntry | undefined {
  return TOC.find((c) => c.slug === slug);
}

export function getChapterMarkdown(entry: ChapterEntry): string {
  const filePath = filePathForChapter(entry);
  if (!entry.live || !fs.existsSync(filePath)) {
    throw new Error(`Chapter ${entry.number} ("${entry.title}") is marked live but no file exists at ${filePath}`);
  }
  return fs.readFileSync(filePath, "utf-8");
}

export function getAdjacentChapters(entry: ChapterEntry): {
  prev: ChapterEntry | undefined;
  next: ChapterEntry | undefined;
} {
  const liveChapters = TOC.filter((c) => c.live);
  const idx = liveChapters.findIndex((c) => c.number === entry.number);
  return {
    prev: idx > 0 ? liveChapters[idx - 1] : undefined,
    next: idx >= 0 && idx < liveChapters.length - 1 ? liveChapters[idx + 1] : undefined,
  };
}

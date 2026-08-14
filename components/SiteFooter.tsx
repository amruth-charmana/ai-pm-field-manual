export default function SiteFooter() {
  return (
    <footer className="border-t border-[#e4e4e9] bg-white">
      <div className="mx-auto max-w-3xl px-6 py-8 text-sm text-[#8b8d99]">
        <p>
          Written by Amruth Charmana M — part of an{" "}
          <a
            href="https://amruth.space"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[#52545e]"
          >
            in-public AI product build
          </a>
          . Open source, MIT licensed.
        </p>
      </div>
    </footer>
  );
}

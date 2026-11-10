import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { TasteGraph } from "./TasteGraph";

const ARTICLE_URL =
  "https://medium.com/@theproductlogfeatures/i-let-an-ai-guess-my-tv-history-heres-what-the-data-showed-fc99dd8cbf4b";

export const metadata: Metadata = {
  title: "My TV taste graph | Sama El Tahawy",
  description:
    "About 100 shows I've watched, connected by theme, creator and network.",
};

export default function TasteGraphPage() {
  return (
    <>
      <Navigation />
      <main className="relative pt-28 md:pt-32 pb-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="font-(family-name:--font-display) text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
              My TV taste graph
            </h1>
            <p className="text-(--color-text-secondary) text-base md:text-lg leading-relaxed max-w-xl">
              About 100 shows I&apos;ve watched, connected by theme, creator and
              network. The ratings and connections are real, and the show names
              are placeholders.
            </p>
          </div>

          <TasteGraph />

          <div className="mt-10 text-center">
            <a
              href={ARTICLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-(--color-accent) hover:text-(--color-accent-hover) transition-colors duration-200"
            >
              Read the full analysis on Medium
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

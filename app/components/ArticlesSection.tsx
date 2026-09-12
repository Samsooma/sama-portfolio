"use client";

import { ArrowUpRight, BookOpen } from "lucide-react";
import { articles } from "./data/articles";

export function ArticlesSection() {
  return (
    <section id="articles" className="relative py-20 px-6">
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-medium text-(--color-accent) tracking-widest uppercase mb-4">
            Writing
          </p>
          <h2 className="font-(family-name:--font-display) text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
            Product insights and feature deep dives
          </h2>
          <p className="text-(--color-text-secondary) text-base md:text-lg leading-relaxed max-w-xl">
            Analyzing the strategy, design decisions, and user psychology behind
            features from leading tech companies.
          </p>
        </div>

        {/* Articles — stacked full-width list */}
        <div className="divide-y divide-(--color-border)/50">
          {articles.map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-4 py-6 hover:bg-(--color-surface-secondary)/40 -mx-4 px-4 rounded-xl transition-colors duration-200"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-(--color-accent-subtle) text-(--color-accent) font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-xs text-(--color-text-tertiary)">
                    {article.publishDate} · {article.readTime}
                  </span>
                </div>

                <h3 className="font-(family-name:--font-display) text-lg md:text-xl font-bold group-hover:text-(--color-accent) transition-colors duration-200 mb-1">
                  {article.title}
                </h3>

                <p className="text-sm text-(--color-text-secondary) leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
              </div>

              <ArrowUpRight
                size={18}
                className="text-(--color-text-tertiary) group-hover:text-(--color-accent) transition-colors duration-200 shrink-0 mt-2"
              />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://medium.com/@theproductlogfeatures"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-(--color-accent) hover:text-(--color-accent-hover) transition-colors duration-200"
          >
            <BookOpen size={16} />
            Read all articles on Medium
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

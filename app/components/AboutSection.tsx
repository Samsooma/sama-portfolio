"use client";

import { Code, Palette, Zap } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <p className="text-xs font-medium text-(--color-text-tertiary) tracking-widest uppercase mb-4">
            About
          </p>
          <h2 className="font-(family-name:--font-display) text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Building at the intersection of code and cognition
          </h2>
          <p className="text-(--color-text-secondary) text-base leading-relaxed">
            A Product Manager with a CS and Cognitive Psychology background who
            uses engineering as a superpower to bridge the gap between technical
            systems and the humans who use them.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-7 rounded-2xl border border-(--color-border) bg-(--color-surface-elevated)">
            <Palette
              className="text-(--color-text-tertiary) mb-4"
              size={24}
            />
            <h3 className="font-(family-name:--font-display) font-bold text-xl mb-2">
              Product & Design
            </h3>
            <p className="text-sm text-(--color-text-secondary) leading-relaxed">
              From user research to Figma prototypes. Cognitive psychology
              insights meet design thinking to build products that feel
              intuitive from the first interaction.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-(--color-border) bg-(--color-surface-elevated)">
            <Code
              className="text-(--color-text-tertiary) mb-4"
              size={24}
            />
            <h3 className="font-(family-name:--font-display) font-bold text-xl mb-2">
              Full-Stack Engineering
            </h3>
            <p className="text-sm text-(--color-text-secondary) leading-relaxed mb-5">
              Frontend, backend, and everything in between. Scalable
              applications with clean, maintainable code using modern
              technologies.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["React", "Next.js", "Node", "Python", "TypeScript"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs rounded-full bg-(--color-surface-secondary) text-(--color-text-secondary)"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="p-7 rounded-2xl border border-(--color-border) bg-(--color-surface-elevated)">
            <Zap
              className="text-(--color-text-tertiary) mb-4"
              size={24}
            />
            <h3 className="font-(family-name:--font-display) font-bold text-xl mb-2">
              Human-Tech Intersection
            </h3>
            <p className="text-sm text-(--color-text-secondary) leading-relaxed">
              Leveraging cognitive psychology to understand how people
              interact with technology. Making complex systems accessible
              and serving real human needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

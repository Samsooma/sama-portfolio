"use client";

import { Github, Linkedin, Code, Palette, Zap } from "lucide-react";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-6 py-24"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Hero content */}
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-10 mb-20">
          {/* Mobile photo */}
          <div className="md:hidden flex justify-center -order-1">
            <div className="w-32 h-32 rounded-2xl overflow-hidden">
              <img
                src="/profile.jpg"
                alt="Sama El Tahawy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop";
                }}
              />
            </div>
          </div>

          {/* Text side */}
          <div className="flex-[2]">
            <p className="text-sm font-medium text-(--color-text-tertiary) tracking-widest uppercase mb-2">
              Hey, I&apos;m Sama
            </p>

            <h1 className="font-(family-name:--font-display) text-5xl sm:text-6xl md:text-7xl lg:text-8xl italic tracking-tight leading-[0.95] mb-3">
              Sama
              <br />
              El Tahawy
            </h1>

            <p className="text-base md:text-lg text-(--color-text-secondary) leading-relaxed mb-5 max-w-md">
              Product manager with a CS & Cognitive Psychology background.
              I use engineering as a superpower to build products that are
              not just functional, but truly feel right.
            </p>

            <div className="flex flex-wrap gap-3 mb-4">
              <button
                onClick={() => scrollToSection("articles")}
                className="px-6 py-2.5 bg-(--color-accent) hover:bg-(--color-accent-hover) text-(--color-surface) rounded-full text-sm font-medium transition-colors duration-200"
              >
                Read My Writing
              </button>
              <a
                href="https://github.com/Samsooma/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 border border-(--color-border) rounded-full text-sm font-medium hover:bg-(--color-surface-secondary) transition-colors duration-200 flex items-center gap-2"
              >
                <Github size={15} />
                GitHub
              </a>
            </div>

            <div className="flex items-center gap-5">
              <a
                href="https://github.com/Samsooma"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--color-text-tertiary) hover:text-(--color-text-primary) transition-colors duration-200"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/samaeltahawy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--color-text-tertiary) hover:text-(--color-text-primary) transition-colors duration-200"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Desktop photo */}
          <div className="relative hidden md:block">
            <div className="w-64 lg:w-80 aspect-[3/4] rounded-3xl overflow-hidden">
              <img
                src="/profile.jpg"
                alt="Sama El Tahawy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop";
                }}
              />
            </div>
          </div>
        </div>

        {/* About cards */}
        <div id="about" className="grid md:grid-cols-3 gap-6">
          <div className="p-7 rounded-2xl border border-(--color-border) bg-(--color-surface-elevated)">
            <Palette className="text-(--color-text-tertiary) mb-4" size={24} />
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
            <Code className="text-(--color-text-tertiary) mb-4" size={24} />
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
            <Zap className="text-(--color-text-tertiary) mb-4" size={24} />
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

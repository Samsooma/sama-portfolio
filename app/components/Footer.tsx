"use client";

import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <p className="text-xs text-(--color-text-tertiary)">
          &copy; {new Date().getFullYear()} Sama El Tahawy
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Samsooma"
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--color-text-tertiary) hover:text-(--color-text-primary) transition-colors duration-200"
          >
            <Github size={15} />
          </a>
          <a
            href="https://linkedin.com/in/samaeltahawy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--color-text-tertiary) hover:text-(--color-text-primary) transition-colors duration-200"
          >
            <Linkedin size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}

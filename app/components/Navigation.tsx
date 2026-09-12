"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const NAV_ITEMS = ["home", "about", "articles"] as const;

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = useCallback(() => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }, [isDark]);

  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <button
      onClick={toggle}
      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-(--color-surface-secondary) transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["home", "about", "articles"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop floating pill nav */}
      <nav
        className={`fixed z-50 transition-all duration-500 hidden md:flex items-center gap-1 ${
          scrolled
            ? "top-5 left-1/2 -translate-x-1/2 px-2 py-1.5 rounded-full bg-(--color-surface-elevated)/70 dark:bg-(--color-surface-elevated)/50 backdrop-blur-2xl border border-(--color-border)/50 shadow-lg shadow-black/[0.03] dark:shadow-black/20"
            : "top-6 left-1/2 -translate-x-1/2 px-2 py-1.5 rounded-full"
        }`}
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item)}
            className={`px-4 py-1.5 text-sm capitalize rounded-full transition-all duration-200 ${
              activeSection === item
                ? "bg-(--color-accent) text-white font-medium"
                : "text-(--color-text-secondary) hover:text-(--color-text-primary)"
            }`}
          >
            {item}
          </button>
        ))}
        <div className="w-px h-4 bg-(--color-border) mx-1" />
        <ThemeToggle />
      </nav>

      {/* Mobile nav */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div
          className={`flex items-center justify-between px-5 py-4 transition-all duration-300 ${
            scrolled
              ? "bg-(--color-surface)/80 backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          <button
            onClick={() => scrollToSection("home")}
            className="text-sm font-semibold font-(family-name:--font-display)"
          >
            sama.
          </button>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-(--color-surface-secondary) transition-colors"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="bg-(--color-surface)/90 backdrop-blur-xl border-b border-(--color-border)/50">
            <div className="px-5 pb-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`px-3 py-2.5 text-sm text-left capitalize rounded-xl transition-colors ${
                    activeSection === item
                      ? "bg-(--color-accent-subtle) text-(--color-accent) font-medium"
                      : "text-(--color-text-secondary)"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

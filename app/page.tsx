"use client";

import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { ArticlesSection } from "./components/ArticlesSection";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ArticlesSection />
      </main>
      <Footer />
    </>
  );
}

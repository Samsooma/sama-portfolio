export type Article = {
  title: string;
  excerpt: string;
  publishDate: string;
  readTime: string;
  url: string;
  tags: string[];
  secondaryLink?: { label: string; href: string };
};

export const articles: Article[] = [
  {
    title: "I Let an AI Guess My TV History. Here's What the Data Showed.",
    excerpt:
      "I asked an AI to guess every TV show I've watched, then turned about 150 ratings into a taste graph. Here's what the data revealed about how recommendation engines see us.",
    publishDate: "Nov 9, 2026",
    readTime: "9 min read",
    url: "https://medium.com/@theproductlogfeatures/i-let-an-ai-guess-my-tv-history-heres-what-the-data-showed-4e5ce0ac0ac7",
    tags: ["Recommendation Systems", "Data Analysis", "AI"],
    secondaryLink: {
      label: "Explore the interactive graph",
      href: "/taste-graph",
    },
  },
  {
    title: "Inside TikTok Shop's Three-Layer Marketplace",
    excerpt:
      "Breaking down 20+ product pages to reveal how TikTok Shop stacks official brand stores, curated resellers, and an open marketplace into one UI, and why creator video is its real differentiator.",
    publishDate: "Nov 2, 2026",
    readTime: "11 min read",
    url: "https://medium.com/@theproductlogfeatures/inside-tiktok-shops-three-layer-marketplace-6424ede0f202",
    tags: ["TikTok", "Marketplace", "Product Strategy"],
  },
  {
    title: "Why Doesn't Netflix Have Comments?",
    excerpt:
      "Analyzing Netflix's strategic decision to avoid user comments and the product reasoning behind this choice.",
    publishDate: "Jan 13, 2025",
    readTime: "6 min read",
    url: "https://medium.com/@theproductlogfeatures/why-doesnt-netflix-have-comments-81490f4ed4cf",
    tags: ["Netflix", "Product Strategy", "User Experience"],
  },
];

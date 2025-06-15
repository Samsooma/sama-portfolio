import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  ExternalLink,
  Menu,
  X,
  Code,
  Palette,
  Zap,
  BookOpen,
  Calendar,
  Clock,
} from "lucide-react";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const articles = [
    {
      title: "Why Doesn't Netflix Have Comments?",
      excerpt:
        "Analyzing Netflix's strategic decision to avoid user comments and the product reasoning behind this choice.",
      publishDate: "Jan 13, 2025",
      readTime: "4 min read",
      url: "https://medium.com/@theproductlogfeatures/why-doesnt-netflix-have-comments-81490f4ed4cf",
      tags: ["Netflix", "Product Strategy", "User Experience"],
    },
    {
      title: "Feature of the Month: TikTok's 2x Playback Speed",
      excerpt:
        "How TikTok's speed control feature enhances user engagement and addresses different consumption patterns.",
      publishDate: "Oct 21, 2024",
      readTime: "5 min read",
      url: "https://medium.com/@theproductlogfeatures/feature-of-the-month-tiktoks-2x-playback-speed-5c28989114ff",
      tags: ["TikTok", "Feature Analysis", "User Behavior"],
    },
    {
      title: "Feature of the Month: Google's Search a Song",
      excerpt:
        "Breaking down Google's innovative song search feature and its impact on music discovery.",
      publishDate: "Aug 2, 2024",
      readTime: "4 min read",
      url: "https://medium.com/@theproductlogfeatures/feature-of-the-month-googles-search-a-song-d1044af062d1",
      tags: ["Google", "Search", "Music Discovery"],
    },
    {
      title: "Feature of the Month: Apple AirDrop",
      excerpt:
        "Examining Apple's AirDrop feature design and its role in creating seamless device ecosystem experiences.",
      publishDate: "Jul 7, 2024",
      readTime: "6 min read",
      url: "https://medium.com/@theproductlogfeatures/feature-of-the-month-apple-airdrop-3c6759f24309",
      tags: ["Apple", "Ecosystem", "File Sharing"],
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            ></motion.div>

            <div className="hidden md:flex space-x-8">
              {["home", "about", "articles"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors duration-200 hover:text-blue-600 ${
                    activeSection === item ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden pb-4"
            >
              {["home", "about", "articles"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-2 capitalize hover:text-blue-600 transition-colors"
                >
                  {item}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </nav>

      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-56 h-56 mx-auto mb-8 rounded-full overflow-hidden border-4 border-blue-500/30 shadow-lg relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover relative z-10"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop";
                }}
              />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse leading-relaxed py-2">
              Hey, I'm Sama!
            </h1>
            {/* <p className="text-xl md:text-2xl text-gray-700 mb-8 font-medium">
              And I love building things ✨
            </p> */}
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              I'm a <strong>Computer Science and Cognitive Psychology</strong>{" "}
              graduate who bridges the gap between code and cognition. As both a{" "}
              <strong>product manager and software engineer</strong>, I'm
              passionate about creating products that are not just functional,
              but truly accessible and delightful for everyone. My work lives at
              the <strong>intersection of humans and technology</strong> where
              technical expertise meets deep understanding of how people think,
              feel, and interact with digital experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <button
              onClick={() => scrollToSection("articles")}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Read My Articles
            </button>
            <a
              href="https://github.com/Samsooma/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border
              border-gray-400 text-gray-700 rounded-full font-semibold
              hover:bg-gray-50 transition-all duration-300 flex items-center
              gap-2"
            >
              <Github size={18} />
              View My Work
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center space-x-6"
          >
            <a
              href="https://github.com/Samsooma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/samaeltahawy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Linkedin size={24} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              I'm a Product Manager with a unique blend of technical expertise
              and human-centered design thinking. My diverse background allows
              me to bridge the gap between complex technology and meaningful
              user experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 hover:-translate-y-2"
            >
              <Palette
                className="text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300"
                size={40}
              />
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Product Management & Design
              </h3>
              <p className="text-gray-600">
                From user research to Figma prototypes, I create user-centered
                experiences. I combine cognitive psychology insights with design
                thinking to build intuitive products.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 hover:-translate-y-2"
            >
              <Code
                className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300"
                size={40}
              />
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Full-Stack Development
              </h3>
              <p className="text-gray-600">
                Frontend, backend, and everything in between. I build scalable
                applications with clean, maintainable code using modern
                technologies and best practices.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 hover:-translate-y-2"
            >
              <Zap
                className="text-pink-600 mb-4 group-hover:scale-110 transition-transform duration-300"
                size={40}
              />
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Human-Technology Intersection
              </h3>
              <p className="text-gray-600">
                Leveraging my Cognitive Psychology background to understand how
                people interact with technology. I make complex systems
                accessible and ensure technology serves human needs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Product Insights
            </h2>
            <p className="text-lg text-gray-600">
              Deep dives into product features from the world's leading tech
              companies. I analyze the strategy, design decisions, and user
              psychology behind features that shape how billions of people
              interact with technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105 hover:-translate-y-2"
                onClick={() => window.open(article.url, "_blank")}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {article.publishDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {article.readTime}
                    </div>
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-gray-500 group-hover:text-blue-600 transition-colors"
                  />
                </div>

                <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="https://medium.com/@theproductlogfeatures"
              target="_blank"
              rel="noopener
              noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3
              bg-gradient-to-r from-purple-600 to-blue-600 text-white
              rounded-full font-semibold hover:shadow-lg
              hover:shadow-purple-500/25 transition-all duration-300 transform
              hover:scale-105"
            >
              <BookOpen size={18} />
              Read More Articles
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Sama El Tahawy
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import axios from "axios";
import { Sparkles, RefreshCw } from "lucide-react";
import NewsCard from "../../components/NewsCard";
import React from "react";

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("technology");
  const [error, setError] = useState("");

  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  async function fetchNews(cat) {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        `http://localhost:5003/api/news?category=${cat}`
      );
      setArticles(res.data.articles || []);
    } catch {
      setError("Unable to fetch news right now.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNews(category);
  }, [category]);

  return (
    <div className="min-h-screen px-4 py-32 bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Personalized Feed
          </h1>

          <div className="mt-6 md:mt-0 flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 
                  ${
                    category === cat
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                      : "bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300"
                  }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Loader or Error */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="w-10 h-10 animate-spin text-indigo-400 mb-3" />
            <p className="text-gray-400">Getting the latest headlines...</p>
          </div>
        )}
        {error && !loading && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Articles Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.length ? (
              articles.map((article) => (
                <NewsCard key={article.url} article={article} />
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-center">
                No articles found for “{category}”. Try a different category.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

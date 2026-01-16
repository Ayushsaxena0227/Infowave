import { useEffect, useState } from "react";
import axios from "axios";
import { RefreshCw } from "lucide-react";
import NewsCard from "../../../components/NewsCard";
import { useAuth } from "../../../context/AuthContext";
import React from "react";

export default function MyFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    axios
      .get(`http://localhost:5003/api/myfeed?uid=${user.uid}`)
      .then((res) => setArticles(res.data.articles || []))
      .catch((err) => {
        console.error("MyFeed error:", err);
        setError("Unable to load personalized feed.");
      })
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="min-h-screen px-4 py-32 bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-10 text-center">
          My Personalized Feed
        </h1>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="w-10 h-10 animate-spin text-indigo-400 mb-3" />
            <p className="text-gray-400">
              Building your personalized headlines...
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-center">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.length ? (
              articles.map((article) => (
                <NewsCard
                  key={article.url}
                  article={article}
                  category="personal"
                />
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-center">
                No recent articles found for your interests yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

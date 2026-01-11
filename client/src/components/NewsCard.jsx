import { useState } from "react";
import { Heart } from "lucide-react";
import axios from "axios";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function NewsCard({ article, category }) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);

  async function handleLike(e) {
    e.preventDefault();
    if (!user) return toast.error("Please log in first.");

    try {
      setLiked(true);
      await axios.post("http://localhost:5003/api/like", {
        uid: user.uid,
        category,
        source: article.source,
        url: article.url,
      });
      toast.success(`You liked a ${category} article `);
    } catch (err) {
      console.error("Error saving like:", err);
      setLiked(false);
      toast.error("Something went wrong ");
    }
  }

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block glass-effect p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] overflow-hidden relative"
    >
      <button
        onClick={handleLike}
        className={`absolute top-4 right-4 p-1 rounded-full cursor-pointer ${
          liked
            ? "bg-pink-600/80"
            : "bg-white/10 hover:bg-pink-500/40 cursor-pointer"
        }`}
        title="Like this article"
      >
        <Heart
          className={`w-5 h-5 ${
            liked ? "fill-current text-white" : "text-white"
          }`}
        />
      </button>

      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-72 h-40 object-cover rounded-xl mb-4 opacity-90 hover:opacity-100 transition-opacity"
        />
      )}

      <h3 className="text-xl font-bold text-gray-200 mb-2 line-clamp-2">
        {article.title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-3">
        {article.description || "No description provided."}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{article.source}</span>
        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
      </div>
    </a>
  );
}

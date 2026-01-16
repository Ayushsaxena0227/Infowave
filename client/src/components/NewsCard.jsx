import { useState } from "react";
import { Heart } from "lucide-react";
import axios from "axios";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import firebaseApp from "../firebase/firebase";

export default function NewsCard({ article, category }) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [summary, setSummary] = useState("");
  const [summarizing, setSummarizing] = useState(false);

  // ❤️  Like handler
  async function handleLike(e) {
    e.preventDefault();
    if (!user) return toast.error("Please log in first.");

    try {
      setLiked(true);
      await axios.post("http://localhost:5003/api/like", {
        uid: user.uid,
        category,
        source: article.source,
        url: article.url,
      });
      toast.success(`You liked a ${category} article`);
    } catch (err) {
      console.error("Error saving like:", err);
      setLiked(false);
      toast.error("Something went wrong");
    }
  }

  // 📑  Click handler (implicit learning)
  async function handleArticleClick() {
    if (!user) return;
    try {
      await axios.post("http://localhost:5003/api/click", {
        uid: user.uid,
        category,
      });
    } catch (err) {
      console.error("Error saving click:", err);
    }
  }

  // 🤖  Gemini client‑side summarizer
  async function fetchSummary() {
    if (summary || summarizing) return;
    setSummarizing(true);
    try {
      const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });
      const model = getGenerativeModel(ai, { model: "gemini-2.0-flash" });

      const prompt = `Summarize this news story in one neutral sentence:\nTitle: ${
        article.title
      }\nDescription: ${article.description || "No description"}\n`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      setSummary(text);
    } catch (err) {
      console.error("Gemini summary error:", err);
    } finally {
      setSummarizing(false);
    }
  }

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleArticleClick}
      onMouseEnter={fetchSummary}
      className="block glass-effect p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] overflow-hidden relative"
    >
      {/* Like button */}
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

      {/* Image */}
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-72 h-40 object-cover rounded-xl mb-4 opacity-90 hover:opacity-100 transition-opacity"
        />
      )}

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-200 mb-2 line-clamp-2">
        {article.title}
      </h3>

      {/* Gemini Summary */}
      {summary && (
        <p className="text-indigo-300 text-sm italic mb-2">{summary}</p>
      )}
      {!summary && summarizing && (
        <p className="text-gray-400 text-sm mb-2 italic">Generating summary…</p>
      )}

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-3">
        {article.description || "No description provided."}
      </p>

      {/* Meta */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{article.source}</span>
        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
      </div>
    </a>
  );
}

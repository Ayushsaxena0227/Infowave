import React from "react";
export default function NewsCard({ article }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block glass-effect p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] overflow-hidden"
    >
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover rounded-xl mb-4 opacity-90 hover:opacity-100 transition-opacity"
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

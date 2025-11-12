import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, TrendingUp } from "lucide-react";
import React from "react";

export default function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 relative overflow-hidden">
      <div
        className={`text-center max-w-5xl transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Badge */}
        <div className="inline-block mb-6 px-6 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full animate-in">
          <span className="text-indigo-300 font-bold text-sm tracking-wide uppercase flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>AI-Powered News Curation</span>
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient block">
            Welcome to
          </span>
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent block mt-2">
            InfoWave 🌊
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
          Discover news that{" "}
          <span className="font-bold text-indigo-400">
            flows with your interests
          </span>
          . Our personalized feed learns what matters to you and stays
          <span className="font-bold text-purple-400">
            {" "}
            fresh, vibrant, and relevant
          </span>
          .
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/signup"
            className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
          >
            <span>Start Your Journey</span>
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </Link>

          <button
            onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
            className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white rounded-2xl font-bold text-lg border-2 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            Explore Features
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-40 left-10 animate-bounce delay-100 hidden lg:block">
        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-xl"></div>
      </div>
      <div className="absolute bottom-20 right-10 animate-bounce delay-300 hidden lg:block">
        <div className="w-32 h-32 bg-gradient-to-br from-pink-500/20 to-indigo-500/20 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}

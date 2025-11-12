import React from "react";
export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-32">
      <div className="max-w-4xl animate-in">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-gray-500 from-indigo-400 to-purple-400 bg-clip-text ">
            About InfoWave
          </h2>
          <div className="h-2 w-32 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
        </div>

        {/* Content Cards */}
        <div className="space-y-6">
          {/* Mission Card */}
          <div className="glass-effect p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02]">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">🚀</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-600 mb-3">
                  Our Mission
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  InfoWave was created to make the daily news stream{" "}
                  <span className="font-bold text-indigo-400">
                    smarter and more personal
                  </span>
                  . Instead of wading through generic headlines, you get
                  real‑time stories curated by your interests and reading
                  habits.
                </p>
              </div>
            </div>
          </div>

          {/* Technology Card */}
          <div className="glass-effect p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02]">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">💡</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-600 mb-3">
                  The Technology
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Built with{" "}
                  <span className="font-bold text-purple-400">
                    React, Tailwind, Express, and Firebase
                  </span>
                  , InfoWave merges modern tech with a personal
                  touch—transforming your reading into
                  <span className="font-bold text-pink-400">
                    {" "}
                    a living conversation with the world
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Features Card */}
          <div className="glass-effect p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02]">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">✨</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-600 mb-3">
                  What Makes Us Different
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Our{" "}
                  <span className="font-bold text-indigo-400">
                    machine learning algorithms
                  </span>{" "}
                  <span className="text-gray-400">
                    analyze your reading patterns to deliver news that truly
                    matters to you. No more information overload—just
                  </span>
                  <span className="font-bold text-purple-400">
                    {" "}
                    relevant, timely, and engaging content
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

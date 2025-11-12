import { useState } from "react";
import { Send } from "lucide-react";
import React from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // future: send to Firebase Function or Email API
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-32">
      <div className="w-full max-w-2xl">
        {sent ? (
          <div className="text-center animate-in zoom-in bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm p-12 rounded-3xl border border-green-500/30">
            <div className="text-6xl mb-4 animate-bounce">✅</div>
            <h3 className="text-3xl md:text-4xl font-black text-green-400 mb-3">
              Message Sent!
            </h3>
            <p className="text-gray-300 text-lg">We'll get back to you soon.</p>
          </div>
        ) : (
          <div className="glass-effect p-8 md:p-12 rounded-3xl shadow-2xl animate-in">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Get In Touch
              </h2>
              <p className="text-gray-400 text-lg">
                We'd love to hear from you!
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 text-black p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-gray-500"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 text-black p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-gray-500"
                  required
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                  Your Message
                </label>
                <textarea
                  name="message"
                  placeholder="Tell us what's on your mind..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 text-black p-4 rounded-xl h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none placeholder-gray-500"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

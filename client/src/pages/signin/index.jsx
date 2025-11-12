import { useState } from "react";
import React from "react";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/feed"); // redirect to home after successful login
    } catch (err) {
      // Friendly error message for users
      switch (err.code) {
        case "auth/user-not-found":
          setError("No user found with that email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        default:
          setError("Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-32">
      <div className="w-full max-w-md animate-in">
        <div className="glass-effect p-8 md:p-10 rounded-3xl shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black mb-2 text-gray-500">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-lg">
              Login to continue your journey
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 slide-in-from-top">
              <p className="font-semibold">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                Email
              </label>
              <input
                className="w-full bg-white/5 border border-white/10 text-gray-500 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-gray-500"
                type="email"
                placeholder="Enter your mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                Password
              </label>
              <input
                className="w-full bg-white/5 border border-white/10 text-black p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-gray-500"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-gray-400 mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

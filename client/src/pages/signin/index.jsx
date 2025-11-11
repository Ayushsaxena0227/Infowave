import { useState } from "react";
import React from "react";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // redirect to home after successful login
    } catch (err) {
      // Friendly error message for users
      switch (err.code) {
        case "auth/user-not-found":
          setError("No user found with that email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        default:
          setError("Failed to sign in. Please try again.");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 to-purple-600">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-lg shadow-lg p-8 w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</p>
        )}

        <input
          className="w-full border p-2 rounded mb-4"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full border p-2 rounded mb-6"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

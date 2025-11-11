import { Link } from "react-router-dom";
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        InfoWave
      </Link>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-200">
          Home
        </Link>
        <Link to="/about" className="hover:text-gray-200">
          About
        </Link>
        <Link to="/contact" className="hover:text-gray-200">
          Contact
        </Link>
        {user ? (
          <>
            <Link to="/profile" className="hover:text-gray-200">
              Profile
            </Link>
            <button
              onClick={logout}
              className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
            <Link to="/signup" className="hover:text-gray-200">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

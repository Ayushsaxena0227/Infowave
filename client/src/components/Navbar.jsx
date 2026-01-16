import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  X,
  Menu,
  LogOut,
  User,
  Home,
  Info,
  MessageCircle,
  Waves,
  Sparkles,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "About", icon: Info, path: "/about" },
    { name: "Contact", icon: MessageCircle, path: "/contact" },
  ];
  const myFeed = () => {
    navigate("/myfeed");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-indigo-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Waves className="w-10 h-10 text-indigo-400 group-hover:text-indigo-300 transition-all duration-300 group-hover:scale-110" />
                <Sparkles className="w-4 h-4 text-purple-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-3xl font-black bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                InfoWave
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    isActive(item.path)
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
                      : "text-gray-500 hover:bg-white/5 hover:text-gray-600"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    to="/profile"
                    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                      isActive("/profile")
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
                        : "text-gray-500 hover:bg-white/5 hover:text-gray-600"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="px-5 py-2  text-gray-500 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="cursor-pointer">Logout</span>
                  </button>
                  <button
                    onClick={myFeed}
                    className="px-5 py-2 text-gray-500 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center space-x-2"
                  >
                    {/* <LogOut className="w-4 h-4" /> */}
                    <span className="cursor-pointer">MyFeed</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2 text-gray-500 hover:text-gray-600 font-semibold transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2  from-indigo-600 to-purple-600 text-gray-500 rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all"
            >
              {mobileMenu ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10 slide-in-from-top">
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenu(false)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center space-x-3 ${
                    isActive(item.path)
                      ? "bg-indigo-600 text-white"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-semibold">{item.name}</span>
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenu(false)}
                    className="w-full text-left px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all flex items-center space-x-3"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-semibold">Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl bg-linear-to-r from-pink-600 to-purple-600 text-white font-semibold flex items-center space-x-3"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenu(false)}
                    className="w-full text-left px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all font-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenu(false)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

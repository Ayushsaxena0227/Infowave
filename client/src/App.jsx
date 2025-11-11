import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import React from "react";
// import Home from "./pages/Home.jsx";
// import About from "./pages/About.jsx";
// import Contact from "./pages/Contact.jsx";
// import Login from "./pages/Login.jsx";
// import Signup from "./pages/Signup.jsx";
// import Profile from "./pages/Profile.jsx";
import PrivateRoute from "./context/PrivateRoute.jsx";
import Login from "./pages/signin/index.jsx";
import Signup from "./pages/signup/index.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="grow">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"
            element={<PrivateRoute>{/* <Profile /> */}</PrivateRoute>}
          />
        </Routes>
      </div>
    </div>
  );
}

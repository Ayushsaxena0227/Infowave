import { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName: name });
    await setDoc(doc(db, "users", userCredential.user.uid), {
      name,
      email,
      interests: [],
    });
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center  from-indigo-500 to-purple-600">
      <form
        onSubmit={handleSignup}
        className="bg-white rounded-lg shadow-lg p-8 w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Sign Up
        </h2>
        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded mb-4"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
          Register
        </button>
      </form>
    </div>
  );
}

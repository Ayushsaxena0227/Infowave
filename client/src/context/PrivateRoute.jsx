import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import React from "react";
export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

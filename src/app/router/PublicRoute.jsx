import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider.jsx";

// Wraps routes that only make sense when logged out (login, register).
export function PublicRoute({ children }) {
  const { user, initializing } = useAuth();
  if (initializing) return null;
  if (user) return <Navigate to="/" replace />;
  return children;
}

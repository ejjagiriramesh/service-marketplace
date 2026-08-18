import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider.jsx";

// Wraps routes that require a logged-in user (account, my requests, provider
// dashboard). Unauthenticated visitors are bounced to /login and returned
// to where they were headed once they sign in.
export function ProtectedRoute({ children, requireRole }) {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) return null;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (requireRole && user.role !== requireRole) {
    return <Navigate to="/" replace />;
  }
  return children;
}

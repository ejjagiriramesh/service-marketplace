import React from "react";
import { Link } from "react-router-dom";
import { AppButton } from "./AppButton.jsx";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center px-6" style={{ minHeight: "80vh", textAlign: "center" }}>
      <div className="f-mono" style={{ fontSize: 11, color: "var(--slate)", marginBottom: 8 }}>ERROR 404</div>
      <h1 className="f-display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Page not found</h1>
      <p style={{ fontSize: 13, color: "var(--slate)", marginBottom: 20, maxWidth: 280 }}>
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link to="/">
        <AppButton>Back to home</AppButton>
      </Link>
    </div>
  );
}

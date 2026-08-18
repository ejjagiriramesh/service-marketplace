import React from "react";
import { Star } from "lucide-react";

export function RatingRow({ rating, count, size = 14 }) {
  return (
    <span className="inline-flex items-center gap-1" style={{ color: "var(--ink)" }}>
      <Star size={size} fill="var(--amber)" color="var(--amber)" />
      <span className="f-mono" style={{ fontSize: 12.5, fontWeight: 600 }}>{rating}</span>
      {count != null && <span style={{ fontSize: 12, color: "var(--slate)" }}>({count})</span>}
    </span>
  );
}

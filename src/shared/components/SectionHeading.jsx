import React from "react";

export function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="flex items-end justify-between mb-3">
      <div>
        {eyebrow && (
          <div className="f-mono" style={{ fontSize: 10.5, color: "var(--amber-deep)", letterSpacing: "0.12em", marginBottom: 4 }}>
            {eyebrow}
          </div>
        )}
        <h2 className="f-display" style={{ fontSize: 19, fontWeight: 700, margin: 0 }}>{title}</h2>
      </div>
      {action}
    </div>
  );
}

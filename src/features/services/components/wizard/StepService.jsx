import React from "react";

export function StepService({ provider, value, onSelect }) {
  return (
    <div className="flex flex-col gap-2.5">
      {provider.services.map((s) => (
        <div
          key={s.id}
          className="sma-surface tap"
          style={{ borderRadius: 12, padding: 14, border: `1.5px solid ${value?.id === s.id ? "var(--ink)" : "var(--line)"}` }}
          onClick={() => onSelect(s)}
        >
          <div className="flex justify-between items-center">
            <div>
              <div style={{ fontWeight: 600, fontSize: 13.5 }}>{s.name}</div>
              <div className="f-mono" style={{ fontSize: 11, color: "var(--slate)", marginTop: 2 }}>{s.duration}</div>
            </div>
            <span className="f-mono" style={{ fontWeight: 700 }}>₹{s.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

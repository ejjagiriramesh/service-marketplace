import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function TopBar({ title, showBack, onBack, right }) {
  const navigate = useNavigate();
  return (
    <div className="sma-surface" style={{ position: "sticky", top: 0, zIndex: 20, borderBottom: "1px solid var(--line)" }}>
      <div className="flex items-center justify-between px-4" style={{ height: 58 }}>
        <div className="flex items-center gap-2 min-w-0">
          {showBack && (
            <button onClick={() => (onBack ? onBack() : navigate(-1))} style={{ background: "none", border: "none", cursor: "pointer" }} aria-label="Back">
              <ArrowLeft size={20} color="var(--ink)" />
            </button>
          )}
          <h1 className="f-display truncate" style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>{title}</h1>
        </div>
        <div className="flex items-center gap-3">{right}</div>
      </div>
    </div>
  );
}

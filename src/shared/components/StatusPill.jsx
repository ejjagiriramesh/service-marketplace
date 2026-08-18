import React from "react";
import { tokens } from "../../app/theme/tokens.js";

export function StatusPill({ status }) {
  const s = tokens.statusStyle[status] || tokens.statusStyle.Requested;
  return (
    <span className="status-pill f-mono" style={{ background: s.bg, color: s.fg }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: s.fg, display: "inline-block" }} />
      {status.toUpperCase()}
    </span>
  );
}

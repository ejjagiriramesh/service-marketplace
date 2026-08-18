import React from "react";

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="sma-surface sma-border" style={{ borderRadius: 14, padding: 28, textAlign: "center" }}>
      {Icon && <Icon size={26} color="var(--slate-light)" style={{ margin: "0 auto 10px" }} />}
      <div className="f-display" style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
      {description && <div style={{ fontSize: 12.5, color: "var(--slate)" }}>{description}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

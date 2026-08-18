import React from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../../../core/api/db.js";
import { TopBar } from "../../../shared/navigation/TopBar.jsx";
import { getCategoryIcon } from "../utils/serviceUtils.js";

export default function ServiceCategoriesPage() {
  const navigate = useNavigate();
  return (
    <div>
      <TopBar title="Service categories" showBack />
      <div className="p-4 grid grid-cols-2 gap-3">
        {CATEGORIES.map((c) => {
          const Icon = getCategoryIcon(c.id);
          return (
            <div key={c.id} className="sma-surface sma-border tap" style={{ borderRadius: 14, padding: 16 }}
              onClick={() => navigate(`/search?category=${c.id}`)}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                <Icon size={19} color="var(--ink)" />
              </div>
              <div className="f-display" style={{ fontWeight: 700, fontSize: 14.5 }}>{c.name}</div>
              <div className="f-mono" style={{ fontSize: 11, color: "var(--slate)", marginTop: 3 }}>{c.count} providers</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

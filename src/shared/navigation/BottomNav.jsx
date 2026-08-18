import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home as HomeIcon, Search, ClipboardList, Heart, User } from "lucide-react";
import { useAuth } from "../../app/providers/AuthProvider.jsx";

const TABS = [
  { path: "/", label: "Home", icon: HomeIcon },
  { path: "/search", label: "Search", icon: Search },
  { path: "/account/requests", label: "Requests", icon: ClipboardList },
  { path: "/account/saved", label: "Saved", icon: Heart },
  { path: "/account", label: "Me", icon: User },
];

export function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="sma-surface" style={{ position: "sticky", bottom: 0, borderTop: "1px solid var(--line)", zIndex: 20 }}>
      <div className="flex" style={{ height: 62 }}>
        {TABS.map((t) => {
          const Icon = t.icon;
          const isActive = pathname === t.path;
          return (
            <button
              key={t.path}
              onClick={() => navigate(t.path.startsWith("/account") && !user ? "/login" : t.path)}
              style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, color: isActive ? "var(--ink)" : "var(--slate-light)" }}
            >
              <Icon size={19} fill={isActive && t.path === "/account/saved" ? "var(--ink)" : "none"} />
              <span style={{ fontSize: 10.5, fontWeight: isActive ? 700 : 500, fontFamily: "'IBM Plex Mono', monospace" }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

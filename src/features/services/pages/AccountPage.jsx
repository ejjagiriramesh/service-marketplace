import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, IndianRupee, Bell, Star, ChevronRight, Briefcase, LogOut } from "lucide-react";
import { useAuth } from "../../../app/providers/AuthProvider.jsx";
import { useMyRequests } from "../hooks/useMyRequests.js";
import { TopBar } from "../../../shared/navigation/TopBar.jsx";

export default function AccountPage() {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const { data: myRequests } = useMyRequests();
  const active = (myRequests || []).filter((r) => ["Requested", "Accepted", "Scheduled", "In Progress"].includes(r.status)).length;

  const initials = (user?.name || "?").split(" ").slice(0, 2).map((w) => w[0]).join("");

  const goProvider = () => {
    switchRole("provider");
    navigate("/provider/dashboard");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <TopBar title="Account" />
      <div className="px-4 pt-4">
        <div className="flex items-center gap-3">
          <div style={{ width: 56, height: 56, borderRadius: 999, background: "var(--ink)", color: "#F3EEE2", display: "flex", alignItems: "center", justifyContent: "center" }} className="f-display">
            <span style={{ fontWeight: 700 }}>{initials}</span>
          </div>
          <div>
            <div className="f-display" style={{ fontWeight: 700, fontSize: 16 }}>{user?.name}</div>
            <div style={{ fontSize: 12, color: "var(--slate)" }}>{user?.location} · {user?.email}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mt-5">
          <div className="sma-surface sma-border" style={{ borderRadius: 12, padding: 14 }}>
            <div className="f-display" style={{ fontWeight: 700, fontSize: 18 }}>{active}</div>
            <div className="f-mono" style={{ fontSize: 10.5, color: "var(--slate)" }}>ACTIVE REQUESTS</div>
          </div>
          <div className="sma-surface sma-border" style={{ borderRadius: 12, padding: 14 }}>
            <div className="f-display" style={{ fontWeight: 700, fontSize: 18 }}>{user?.rating ?? "—"}</div>
            <div className="f-mono" style={{ fontSize: 10.5, color: "var(--slate)" }}>YOUR RATING</div>
          </div>
        </div>

        <div className="mt-6 flex flex-col">
          {[
            ["Addresses", MapPin],
            ["Payment methods", IndianRupee],
            ["Notifications", Bell],
            ["Reviews you've written", Star],
          ].map(([label, Icon]) => (
            <div key={label} className="flex items-center justify-between tap dot-sep" style={{ padding: "13px 2px" }}>
              <span className="flex items-center gap-3" style={{ fontSize: 13.5, fontWeight: 500 }}><Icon size={17} color="var(--ink-soft)" />{label}</span>
              <ChevronRight size={16} color="var(--slate-light)" />
            </div>
          ))}
        </div>

        <div className="sma-surface sma-border mt-6" style={{ borderRadius: 14, padding: 16 }}>
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={17} color="var(--ink)" />
            <span className="f-display" style={{ fontWeight: 700, fontSize: 14 }}>Are you a service provider?</span>
          </div>
          <p style={{ fontSize: 12.5, color: "var(--slate)", marginBottom: 12 }}>
            Switch to provider mode to manage jobs, availability and earnings — this demo simulates Ravi Electrical Services.
          </p>
          <button className="btn-amber" style={{ width: "100%" }} onClick={goProvider}>Continue as provider</button>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 mt-6 mb-6"
          style={{ width: "100%", background: "none", border: "none", color: "var(--rust)", fontSize: 13, fontWeight: 600, cursor: "pointer", padding: "10px 0" }}
        >
          <LogOut size={15} /> Log out
        </button>
      </div>
    </div>
  );
}

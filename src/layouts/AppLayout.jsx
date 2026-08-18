import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { BottomNav } from "../shared/navigation/BottomNav.jsx";

// Full-bleed detail screens (provider profile, the request wizard) hide the
// bottom tab bar so the sticky "Continue" / "Request this service" action
// bar isn't competing with it for thumb space.
const HIDE_BOTTOM_NAV_PREFIXES = ["/providers/", "/request/"];

export default function AppLayout() {
  const { pathname } = useLocation();
  const hideNav = HIDE_BOTTOM_NAV_PREFIXES.some((p) => pathname.startsWith(p));

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      {!hideNav && <BottomNav />}
    </div>
  );
}

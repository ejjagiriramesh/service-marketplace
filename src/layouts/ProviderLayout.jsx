import React from "react";
import { Outlet } from "react-router-dom";

// Provider-facing screens get their own layout shell (no customer bottom
// nav) so it's obvious this is a distinct "mode", the way the doc separates
// the provider journey from the customer journey.
export default function ProviderLayout() {
  return (
    <div style={{ maxWidth: 420, margin: "0 auto", minHeight: "100vh" }}>
      <Outlet />
    </div>
  );
}

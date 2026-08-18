import React from "react";
import { Outlet } from "react-router-dom";

// Used for /login and /register — no bottom nav, no app chrome, just a
// centered card, matching the "Public" header/main/footer shape from the
// architecture doc (footer omitted for this single-column mobile layout).
export default function PublicLayout() {
  return (
    <div style={{ maxWidth: 420, margin: "0 auto", minHeight: "100vh" }}>
      <Outlet />
    </div>
  );
}

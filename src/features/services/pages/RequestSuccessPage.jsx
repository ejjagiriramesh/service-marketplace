import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { AppButton } from "../../../shared/components/AppButton.jsx";

export default function RequestSuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const ticketNo = state?.ticketNo || "REQ-0000";

  return (
    <div className="flex flex-col items-center justify-center px-6" style={{ minHeight: "80vh", textAlign: "center" }}>
      <div style={{ width: 74, height: 74, borderRadius: 999, background: "var(--paper-dim)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
        <CheckCircle2 size={36} color="var(--green)" />
      </div>
      <h2 className="f-display" style={{ fontSize: 20, fontWeight: 700 }}>Request sent</h2>
      <p style={{ fontSize: 13, color: "var(--slate)", marginTop: 8, maxWidth: 280 }}>
        Your provider has been notified. You'll get updates as soon as they respond.
      </p>
      <div className="chip f-mono mt-4" style={{ padding: "8px 16px", fontSize: 12 }}>{ticketNo}</div>
      <AppButton fullWidth style={{ marginTop: 28, maxWidth: 280 }} onClick={() => navigate("/account/requests")}>Track this request</AppButton>
      <AppButton variant="outline" fullWidth style={{ marginTop: 12, maxWidth: 280 }} onClick={() => navigate("/")}>Back to home</AppButton>
    </div>
  );
}

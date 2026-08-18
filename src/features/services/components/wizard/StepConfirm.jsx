import React from "react";
import { ClipboardList } from "lucide-react";
import { TicketCard } from "../../../../shared/cards/TicketCard.jsx";

export function StepConfirm({ provider, service, address, date, time }) {
  const rows = [
    ["Service", service?.name],
    ["Price", service ? `₹${service.price}` : ""],
    ["Address", address],
    ["Date", date],
    ["Time", time],
  ];
  return (
    <TicketCard stub={<ClipboardList size={20} />} ticketNo="NEW REQ">
      <div className="f-display" style={{ fontWeight: 700, fontSize: 14.5 }}>{provider.name}</div>
      <div style={{ fontSize: 12, color: "var(--slate)", marginBottom: 10 }}>{provider.category}</div>
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between dot-sep" style={{ padding: "8px 0", fontSize: 12.5 }}>
          <span style={{ color: "var(--slate)" }}>{k}</span>
          <span style={{ fontWeight: 600, textAlign: "right", maxWidth: "62%" }}>{v}</span>
        </div>
      ))}
    </TicketCard>
  );
}

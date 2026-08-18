import React from "react";
import { Calendar, Clock, Phone, MessageCircle } from "lucide-react";
import { TicketCard } from "../../../shared/cards/TicketCard.jsx";
import { StatusPill } from "../../../shared/components/StatusPill.jsx";
import { getCategoryIcon } from "../utils/serviceUtils.js";
import { AppButton } from "../../../shared/components/AppButton.jsx";

export function RequestCard({ request, provider }) {
  const Icon = provider ? getCategoryIcon(provider.categoryId) : null;
  const showActions = ["Accepted", "Scheduled", "In Progress"].includes(request.status);

  const handleCall = () => {
    if (provider?.phone) {
      window.location.href = `tel:${provider.phone.replace(/\D/g, '')}`;
    }
  };

  const handleMessage = () => {
    if (provider?.phone) {
      window.location.href = `sms:${provider.phone.replace(/\D/g, '')}`;
    }
  };

  return (
    <TicketCard stub={Icon ? <Icon size={20} /> : null} ticketNo={request.ticketNo}>
      <div className="flex items-start justify-between">
        <div>
          <div className="f-display" style={{ fontWeight: 700, fontSize: 13.5 }}>{provider?.name || "Provider"}</div>
          <div style={{ fontSize: 12, color: "var(--slate)", marginTop: 2 }}>{request.service}</div>
        </div>
        <StatusPill status={request.status} />
      </div>
      <div className="flex items-center gap-3 mt-2.5" style={{ fontSize: 12, color: "var(--slate)" }}>
        <span className="flex items-center gap-1"><Calendar size={12} />{request.date}</span>
        <span className="flex items-center gap-1"><Clock size={12} />{request.time}</span>
      </div>
      <div style={{ fontSize: 11.5, color: "var(--slate-light)", marginTop: 4 }}>{request.address}</div>
      {showActions && (
        <div className="flex gap-2 mt-3">
          <AppButton variant="outline" onClick={handleCall} style={{ flex: 1, padding: "8px 0", fontSize: 12 }}>
            <Phone size={13} style={{ display: "inline", marginRight: 5, verticalAlign: -2 }} />Call
          </AppButton>
          <AppButton variant="outline" onClick={handleMessage} style={{ flex: 1, padding: "8px 0", fontSize: 12 }}>
            <MessageCircle size={13} style={{ display: "inline", marginRight: 5, verticalAlign: -2 }} />Message
          </AppButton>
        </div>
      )}
    </TicketCard>
  );
}

import React from "react";
import { CalendarDays, Clock, ListChecks } from "lucide-react";
import { TicketCard } from "../../../shared/cards/TicketCard.jsx";
import { StatusPill } from "../../../shared/components/StatusPill.jsx";
import { AppButton } from "../../../shared/components/AppButton.jsx";

// Provider-side counterpart to RequestCard: same docket visual language,
// but with accept/decline/complete actions instead of call/message.
export function JobCard({ job, onAccept, onDecline, onComplete }) {
  return (
    <TicketCard stub={<ListChecks size={19} />} ticketNo={job.ticketNo}>
      <div className="flex items-start justify-between">
        <div>
          <div className="f-display" style={{ fontWeight: 700, fontSize: 13.5 }}>{job.customer}</div>
          <div style={{ fontSize: 12, color: "var(--slate)", marginTop: 2 }}>{job.service}</div>
        </div>
        <StatusPill status={job.status} />
      </div>
      <div className="flex items-center gap-3 mt-2.5" style={{ fontSize: 12, color: "var(--slate)" }}>
        <span className="flex items-center gap-1"><CalendarDays size={12} />{job.date}</span>
        <span className="flex items-center gap-1"><Clock size={12} />{job.time}</span>
      </div>
      <div style={{ fontSize: 11.5, color: "var(--slate-light)", marginTop: 4 }}>{job.address}</div>
      {job.status === "Requested" && (
        <div className="flex gap-2 mt-3">
          <AppButton style={{ flex: 1, padding: "9px 0", fontSize: 12 }} onClick={() => onAccept(job.id)}>Accept</AppButton>
          <AppButton variant="outline" style={{ flex: 1, padding: "9px 0", fontSize: 12 }} onClick={() => onDecline(job.id)}>Decline</AppButton>
        </div>
      )}
      {job.status === "Accepted" && (
        <AppButton fullWidth style={{ marginTop: 12, padding: "9px 0", fontSize: 12 }} onClick={() => onComplete(job.id)}>
          Mark completed
        </AppButton>
      )}
    </TicketCard>
  );
}

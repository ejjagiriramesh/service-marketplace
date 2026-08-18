import React from "react";

// Generic "docket" card primitive — the app's signature visual element.
// Feature-level cards (ProviderCard, RequestCard, JobCard) compose this
// instead of re-implementing the stub/notch/perforation chrome.
export function TicketCard({ stub, ticketNo, onClick, children, className = "" }) {
  return (
    <div className={`ticket ${onClick ? "tap" : ""} ${className}`} onClick={onClick}>
      <div className="ticket-stub">
        {stub}
        {ticketNo && <span className="ticket-no">{ticketNo}</span>}
      </div>
      <div className="ticket-notch top" />
      <div className="ticket-notch bottom" />
      <div className="ticket-body">{children}</div>
    </div>
  );
}

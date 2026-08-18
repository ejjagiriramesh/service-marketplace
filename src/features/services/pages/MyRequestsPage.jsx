import React, { useState } from "react";
import { useMyRequests } from "../hooks/useMyRequests.js";
import { TopBar } from "../../../shared/navigation/TopBar.jsx";
import { Chip } from "../../../shared/components/Chip.jsx";
import { AsyncState } from "../../../shared/components/AsyncState.jsx";
import { RequestCard } from "../components/RequestCard.jsx";
import { REQUEST_TABS, matchRequestTab } from "../constants/serviceConstants.js";
import { requestApi } from "../api/requestApi.js";

export default function MyRequestsPage() {
  const [tab, setTab] = useState("All");
  const { data: myRequests, isLoading, isError, error } = useMyRequests();

  const filtered = (myRequests || []).filter((r) => matchRequestTab(r.status, tab));
  const activeCount = (myRequests || []).filter((r) => ["Requested", "Accepted", "Scheduled", "In Progress"].includes(r.status)).length;
  const completedCount = (myRequests || []).filter((r) => r.status === "Completed").length;

  return (
    <div>
      <TopBar title="My requests" />
      <div className="px-4 pt-3">
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          {[["Active", activeCount], ["Completed", completedCount], ["Total", (myRequests || []).length]].map(([label, val]) => (
            <div key={label} className="sma-surface sma-border" style={{ borderRadius: 12, padding: "10px 6px", textAlign: "center" }}>
              <div className="f-display" style={{ fontWeight: 700, fontSize: 18 }}>{val}</div>
              <div className="f-mono" style={{ fontSize: 10, color: "var(--slate)" }}>{label}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 mb-4">
          {REQUEST_TABS.map((t) => (
            <Chip key={t} active={tab === t} onClick={() => setTab(t)}>{t}</Chip>
          ))}
        </div>
      </div>

      <div className="px-4 flex flex-col gap-3 pb-8">
        <AsyncState
          isLoading={isLoading}
          isError={isError}
          error={error}
          isEmpty={!isLoading && filtered.length === 0}
          emptyProps={{ description: "Requests in this status will show up here." }}
        >
          {filtered.map((r) => (
            <RequestCard key={r.id} request={r} provider={requestApi.resolveProvider(r.providerId)} />
          ))}
        </AsyncState>
      </div>
    </div>
  );
}

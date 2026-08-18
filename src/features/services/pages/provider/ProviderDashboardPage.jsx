import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { PROVIDERS } from "../../../../core/api/db.js";
import { useProviderInbox, useUpdateProviderRequestStatus } from "../../hooks/useProviderDashboard.js";
import { useAuth } from "../../../../app/providers/AuthProvider.jsx";
import { TopBar } from "../../../../shared/navigation/TopBar.jsx";
import { SectionHeading } from "../../../../shared/components/SectionHeading.jsx";
import { RatingRow } from "../../../../shared/components/RatingRow.jsx";
import { Chip } from "../../../../shared/components/Chip.jsx";
import { AsyncState } from "../../../../shared/components/AsyncState.jsx";
import { JobCard } from "../../components/JobCard.jsx";

export default function ProviderDashboardPage() {
  const navigate = useNavigate();
  const { switchRole } = useAuth();
  const [tab, setTab] = useState("Requested");
  const { data: inbox, isLoading, isError, error } = useProviderInbox();
  const updateStatus = useUpdateProviderRequestStatus();

  const provider = PROVIDERS[0]; // this demo simulates Ravi Electrical Services as the logged-in provider
  const list = inbox || [];
  const pending = list.filter((r) => r.status === "Requested").length;
  const today = list.filter((r) => r.date === "19 Aug").length;
  const earnings = 24500;

  const backToCustomer = () => {
    switchRole("customer");
    navigate("/account");
  };

  const act = (id, status) => updateStatus.mutate({ id, status });

  return (
    <div>
      <TopBar title="Provider dashboard" showBack onBack={backToCustomer} right={<span className="chip f-mono">{provider.name.split(" ")[0]}</span>} />
      <div className="px-4 pt-4">
        <div className="grid grid-cols-3 gap-2.5">
          <div className="sma-surface sma-border" style={{ borderRadius: 12, padding: "12px 6px", textAlign: "center" }}>
            <div className="f-display" style={{ fontWeight: 700, fontSize: 17 }}>{today}</div>
            <div className="f-mono" style={{ fontSize: 9.5, color: "var(--slate)" }}>TODAY</div>
          </div>
          <div className="sma-surface sma-border" style={{ borderRadius: 12, padding: "12px 6px", textAlign: "center" }}>
            <div className="f-display" style={{ fontWeight: 700, fontSize: 17, color: "var(--amber-deep)" }}>{pending}</div>
            <div className="f-mono" style={{ fontSize: 9.5, color: "var(--slate)" }}>PENDING</div>
          </div>
          <div className="sma-surface sma-border" style={{ borderRadius: 12, padding: "12px 6px", textAlign: "center" }}>
            <div className="f-display" style={{ fontWeight: 700, fontSize: 15 }}>₹{earnings.toLocaleString("en-IN")}</div>
            <div className="f-mono" style={{ fontSize: 9.5, color: "var(--slate)" }}>THIS MONTH</div>
          </div>
        </div>

        <div className="sma-surface sma-border flex items-center justify-between mt-4" style={{ borderRadius: 12, padding: "12px 14px" }}>
          <span className="flex items-center gap-2" style={{ fontSize: 13, fontWeight: 600 }}><TrendingUp size={16} color="var(--green)" />Performance</span>
          <RatingRow rating={provider.rating} count={provider.reviewCount} />
        </div>
      </div>

      <div className="px-4 mt-6">
        <SectionHeading title="Job requests" />
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 mb-3">
          {["Requested", "Accepted", "Completed"].map((t) => (
            <Chip key={t} active={tab === t} onClick={() => setTab(t)}>{t}</Chip>
          ))}
        </div>
        <div className="flex flex-col gap-3 pb-8">
          <AsyncState
            isLoading={isLoading}
            isError={isError}
            error={error}
            isEmpty={!isLoading && list.filter((r) => r.status === tab).length === 0}
            emptyProps={{ description: `No ${tab.toLowerCase()} jobs right now.` }}
          >
            {list.filter((r) => r.status === tab).map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onAccept={(id) => act(id, "Accepted")}
                onDecline={(id) => act(id, "Cancelled")}
                onComplete={(id) => act(id, "Completed")}
              />
            ))}
          </AsyncState>
        </div>
      </div>
    </div>
  );
}

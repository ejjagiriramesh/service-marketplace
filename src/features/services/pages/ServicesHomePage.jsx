import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Bell, ClipboardList, User } from "lucide-react";
import { CATEGORIES } from "../../../core/api/db.js";
import { useFeaturedProviders } from "../hooks/useProviders.js";
import { ProviderCard } from "../components/ProviderCard.jsx";
import { SectionHeading } from "../../../shared/components/SectionHeading.jsx";
import { AsyncState } from "../../../shared/components/AsyncState.jsx";
import { AppButton } from "../../../shared/components/AppButton.jsx";
import { getCategoryIcon } from "../utils/serviceUtils.js";

export default function ServicesHomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { data: featured, isLoading, isError, error } = useFeaturedProviders();

  const runSearch = () => navigate(`/search${query ? `?q=${encodeURIComponent(query)}` : ""}`);

  return (
    <div>
      <div style={{ background: "var(--ink)", color: "#F3EEE2", paddingBottom: 26 }}>
        <div className="flex items-center justify-between px-4 pt-5">
          <div>
            <div className="f-mono" style={{ fontSize: 10.5, color: "#C9BFA3", letterSpacing: "0.1em" }}>DISPATCH · KUKATPALLY</div>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin size={15} color="var(--amber)" />
              <span className="f-display" style={{ fontWeight: 600, fontSize: 15 }}>Kukatpally, Telangana</span>
            </div>
          </div>
          <button style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Bell size={17} color="#F3EEE2" />
          </button>
        </div>
        <div className="px-4 mt-5">
          <div className="f-display" style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.25 }}>
            What service<br />do you need today?
          </div>
        </div>
      </div>

      <div className="px-4" style={{ marginTop: -18 }}>
        <div className="sma-surface sma-border flex items-center gap-2" style={{ borderRadius: 14, padding: "12px 14px" }}>
          <Search size={17} color="var(--slate)" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
            placeholder="AC repair, plumber, electrician…"
            style={{ border: "none", outline: "none", flex: 1, fontSize: 14, background: "transparent" }}
          />
          <AppButton style={{ padding: "8px 14px", fontSize: 12.5 }} onClick={runSearch}>Search</AppButton>
        </div>
      </div>

      <div className="px-4 mt-6">
        <SectionHeading
          eyebrow="01 · CATEGORIES"
          title="Popular services"
          action={<button onClick={() => navigate("/categories")} style={{ background: "none", border: "none", color: "var(--ink-soft)", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>See all</button>}
        />
        <div className="grid grid-cols-3 gap-2.5">
          {CATEGORIES.slice(0, 6).map((c) => (
            <div key={c.id} className="sma-surface sma-border tap" style={{ borderRadius: 14, padding: "14px 8px", textAlign: "center" }}
              onClick={() => navigate(`/search?category=${c.id}`)}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                {React.createElement(getCategoryIcon(c.id), { size: 18, color: "var(--ink)" })}
              </div>
              <div style={{ fontSize: 11.5, fontWeight: 600 }}>{c.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-7">
        <SectionHeading eyebrow="02 · NEARBY" title="Top-rated near you" />
        <AsyncState isLoading={isLoading} isError={isError} error={error} isEmpty={!isLoading && !featured?.length}>
          <div className="flex flex-col gap-3">
            {featured?.map((p) => <ProviderCard key={p.id} provider={p} />)}
          </div>
        </AsyncState>
      </div>

      <div className="px-4 mt-7 mb-6">
        <div className="sma-surface sma-border" style={{ borderRadius: 16, padding: 18 }}>
          <div className="f-mono" style={{ fontSize: 10.5, color: "var(--amber-deep)", letterSpacing: "0.1em" }}>03 · HOW IT WORKS</div>
          <div className="flex justify-between mt-3" style={{ gap: 10 }}>
            {[["Search", Search], ["Choose provider", User], ["Track job", ClipboardList]].map(([label, Icon]) => (
              <div key={label} style={{ textAlign: "center", flex: 1 }}>
                <div style={{ width: 40, height: 40, borderRadius: 999, background: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px" }}>
                  <Icon size={17} color="var(--ink)" />
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 600 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

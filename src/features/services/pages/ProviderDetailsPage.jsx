import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, ShieldCheck } from "lucide-react";
import { useProvider } from "../hooks/useProviders.js";
import { TopBar } from "../../../shared/navigation/TopBar.jsx";
import { RatingRow } from "../../../shared/components/RatingRow.jsx";
import { SectionHeading } from "../../../shared/components/SectionHeading.jsx";
import { AppButton } from "../../../shared/components/AppButton.jsx";
import { AsyncState } from "../../../shared/components/AsyncState.jsx";
import { useFavorites } from "../../../app/providers/FavoritesProvider.jsx";
import { getCategoryIcon } from "../utils/serviceUtils.js";

export default function ProviderDetailsPage() {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const { data: provider, isLoading, isError, error } = useProvider(providerId);
  const { isFavorite, toggleFavorite } = useFavorites();

  const startRequest = (service) => navigate("/request/new", { state: { providerId, service } });

  return (
    <div>
      <TopBar
        title="Provider profile"
        showBack
        right={
          provider && (
            <button onClick={() => toggleFavorite(provider.id)} style={{ background: "none", border: "none", cursor: "pointer" }}>
              <Heart size={19} color={isFavorite(provider.id) ? "var(--rust)" : "var(--slate)"} fill={isFavorite(provider.id) ? "var(--rust)" : "none"} />
            </button>
          )
        }
      />
      <div className="px-4 pt-4">
        <AsyncState isLoading={isLoading} isError={isError} error={error} isEmpty={!isLoading && !provider}>
          {provider && <ProviderDetailsBody provider={provider} onRequest={startRequest} />}
        </AsyncState>
      </div>
    </div>
  );
}

function ProviderDetailsBody({ provider, onRequest }) {
  const Icon = getCategoryIcon(provider.categoryId);
  return (
    <div style={{ margin: "-16px" }}>
      <div style={{ background: "var(--ink)", color: "#F3EEE2", padding: "22px 16px 26px", position: "relative" }}>
        {provider.verified && (
          <div className="stamp f-mono" style={{ background: "rgba(226,154,60,0.12)", borderColor: "var(--amber)", color: "var(--amber)" }}>
            <div style={{ textAlign: "center", lineHeight: 1.1 }}>VERI<br />FIED</div>
          </div>
        )}
        <div className="flex items-center gap-3">
          <div style={{ width: 58, height: 58, borderRadius: 14, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={26} />
          </div>
          <div>
            <div className="f-display" style={{ fontSize: 18, fontWeight: 700 }}>{provider.name}</div>
            <div style={{ fontSize: 12.5, color: "#C9BFA3", marginTop: 2 }}>{provider.category} · {provider.distance} km away</div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <RatingRow rating={provider.rating} count={provider.reviewCount} />
          <span className="f-mono" style={{ fontSize: 12 }}>{provider.jobs}+ jobs done</span>
        </div>
      </div>

      <div className="px-4 -mt-4 relative z-10">
        <div className="sma-surface sma-border" style={{ borderRadius: 14, padding: 14 }}>
          <div className="grid grid-cols-3 text-center">
            <div>
              <div className="f-display" style={{ fontWeight: 700, fontSize: 16 }}>{provider.experience}+</div>
              <div style={{ fontSize: 10.5, color: "var(--slate)" }}>yrs experience</div>
            </div>
            <div style={{ borderLeft: "1px dashed var(--line)", borderRight: "1px dashed var(--line)" }}>
              <div className="f-display" style={{ fontWeight: 700, fontSize: 16 }}>{provider.jobs}</div>
              <div style={{ fontSize: 10.5, color: "var(--slate)" }}>completed</div>
            </div>
            <div>
              <div className="f-display" style={{ fontWeight: 700, fontSize: 16 }}>₹{provider.priceFrom}</div>
              <div style={{ fontSize: 10.5, color: "var(--slate)" }}>starting</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-5">
        <div className="flex gap-2 mb-4">
          {provider.tags.map((t) => (
            <span key={t} className="chip"><ShieldCheck size={11} style={{ marginRight: 4, display: "inline" }} />{t}</span>
          ))}
        </div>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>{provider.bio}</p>
      </div>

      <div className="px-4 mt-6">
        <SectionHeading eyebrow="SERVICES OFFERED" title="Choose a service" />
        <div className="flex flex-col gap-2.5">
          {provider.services.map((s) => (
            <div key={s.id} className="sma-surface sma-border flex items-center justify-between" style={{ borderRadius: 12, padding: "12px 14px" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{s.name}</div>
                <div className="f-mono" style={{ fontSize: 11, color: "var(--slate)", marginTop: 2 }}>{s.duration}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="f-mono" style={{ fontWeight: 700, fontSize: 13.5 }}>₹{s.price}</span>
                <AppButton style={{ padding: "8px 12px", fontSize: 11.5 }} onClick={() => onRequest(s)}>Request</AppButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-6">
        <SectionHeading eyebrow="WEEKLY SCHEDULE" title="Availability" />
        <div className="sma-surface sma-border" style={{ borderRadius: 12, padding: "4px 14px" }}>
          {provider.availability.map(([day, hrs], i) => (
            <div key={day} className={`flex justify-between ${i !== 0 ? "dot-sep" : ""}`} style={{ padding: "9px 0", fontSize: 12.5 }}>
              <span style={{ color: "var(--slate)" }}>{day}</span>
              <span className="f-mono" style={{ fontWeight: hrs === "Closed" ? 400 : 600, color: hrs === "Closed" ? "var(--slate-light)" : "var(--ink)" }}>{hrs}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-6 mb-8">
        <SectionHeading eyebrow={`${provider.reviewCount} REVIEWS`} title="Customer reviews" />
        <div className="flex flex-col gap-2.5">
          {provider.reviews.map((r, i) => (
            <div key={i} className="sma-surface sma-border" style={{ borderRadius: 12, padding: 14 }}>
              <div className="flex items-center justify-between">
                <span style={{ fontWeight: 600, fontSize: 13 }}>{r.user}</span>
                <RatingRow rating={r.rating} size={12} />
              </div>
              <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 6, lineHeight: 1.45 }}>{r.comment}</p>
              <div className="f-mono" style={{ fontSize: 10.5, color: "var(--slate-light)", marginTop: 6 }}>{r.days} days ago</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sma-surface" style={{ position: "sticky", bottom: 0, borderTop: "1px solid var(--line)", padding: 12 }}>
        <AppButton fullWidth onClick={() => onRequest(provider.services[0])}>Request this service</AppButton>
      </div>
    </div>
  );
}

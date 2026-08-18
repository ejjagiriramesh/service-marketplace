import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MapPin, BadgeCheck, ChevronRight } from "lucide-react";
import { TicketCard } from "../../../shared/cards/TicketCard.jsx";
import { RatingRow } from "../../../shared/components/RatingRow.jsx";
import { useFavorites } from "../../../app/providers/FavoritesProvider.jsx";
import { getCategoryIcon } from "../utils/serviceUtils.js";

export function ProviderCard({ provider }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const Icon = getCategoryIcon(provider.categoryId);
  const favorite = isFavorite(provider.id);

  return (
    <TicketCard
      stub={<Icon size={22} />}
      ticketNo={provider.ticketNo}
      onClick={() => navigate(`/providers/${provider.id}`)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="f-display truncate" style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>{provider.name}</h3>
            {provider.verified && <BadgeCheck size={15} color="var(--green)" />}
          </div>
          <div style={{ fontSize: 12.5, color: "var(--slate)", marginTop: 2 }}>{provider.category}</div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(provider.id); }}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}
          aria-label="Save provider"
        >
          <Heart size={18} color={favorite ? "var(--rust)" : "var(--slate-light)"} fill={favorite ? "var(--rust)" : "none"} />
        </button>
      </div>
      <div className="flex items-center gap-3 mt-2" style={{ fontSize: 12.5, color: "var(--slate)" }}>
        <RatingRow rating={provider.rating} count={provider.reviewCount} />
        <span className="flex items-center gap-1"><MapPin size={13} />{provider.distance} km</span>
      </div>
      <div className="flex items-center justify-between mt-2.5">
        <span className="f-mono" style={{ fontSize: 12.5, color: "var(--ink)" }}>
          Starting <b>₹{provider.priceFrom}</b>
        </span>
        <span className="flex items-center gap-0.5" style={{ fontSize: 12, color: "var(--ink-soft)", fontWeight: 600 }}>
          View <ChevronRight size={14} />
        </span>
      </div>
    </TicketCard>
  );
}

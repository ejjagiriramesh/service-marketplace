import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { PROVIDERS } from "../../../core/api/db.js";
import { useFavorites } from "../../../app/providers/FavoritesProvider.jsx";
import { TopBar } from "../../../shared/navigation/TopBar.jsx";
import { ProviderCard } from "../components/ProviderCard.jsx";
import { EmptyState } from "../../../shared/components/EmptyState.jsx";
import { AppButton } from "../../../shared/components/AppButton.jsx";

export default function SavedProvidersPage() {
  const { favoriteIds } = useFavorites();
  const navigate = useNavigate();
  const list = PROVIDERS.filter((p) => favoriteIds.includes(p.id));

  return (
    <div>
      <TopBar title="Saved providers" />
      <div className="px-4 pt-3 pb-8 flex flex-col gap-3">
        {list.length === 0 ? (
          <div style={{ marginTop: 20 }}>
            <EmptyState
              icon={Heart}
              title="No saved providers yet"
              description="Tap the heart on any provider to save them here."
              action={<AppButton onClick={() => navigate("/search")}>Browse providers</AppButton>}
            />
          </div>
        ) : (
          list.map((p) => <ProviderCard key={p.id} provider={p} />)
        )}
      </div>
    </div>
  );
}

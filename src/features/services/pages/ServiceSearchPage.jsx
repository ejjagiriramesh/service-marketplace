import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Search } from "lucide-react";
import { CATEGORIES } from "../../../core/api/db.js";
import { useProviders } from "../hooks/useProviders.js";
import { ProviderCard } from "../components/ProviderCard.jsx";
import { TopBar } from "../../../shared/navigation/TopBar.jsx";
import { Chip } from "../../../shared/components/Chip.jsx";
import { AsyncState } from "../../../shared/components/AsyncState.jsx";
import { useDebounce } from "../../../core/hooks/useDebounce.js";

export default function ServiceSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [sort, setSort] = useState("rating");
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const debouncedQuery = useDebounce(query, 250);

  const setCategoryId = (id) => {
    const next = new URLSearchParams(searchParams);
    if (id) next.set("category", id); else next.delete("category");
    setSearchParams(next, { replace: true });
  };

  const { data: results, isLoading, isError, error } = useProviders({
    categoryId, query: debouncedQuery, sort, minRating,
  });

  return (
    <div>
      <TopBar title="Find a provider" showBack />
      <div className="px-4 pt-3">
        <div className="sma-surface sma-border flex items-center gap-2" style={{ borderRadius: 12, padding: "10px 12px" }}>
          <Search size={16} color="var(--slate)" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search services or providers"
            style={{ border: "none", outline: "none", flex: 1, fontSize: 13.5, background: "transparent" }} />
          <button onClick={() => setShowFilters((s) => !s)} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <SlidersHorizontal size={17} color="var(--ink)" />
          </button>
        </div>

        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-none pb-1">
          <Chip active={!categoryId} onClick={() => setCategoryId(null)}>All</Chip>
          {CATEGORIES.map((c) => (
            <Chip key={c.id} active={categoryId === c.id} onClick={() => setCategoryId(c.id)}>{c.name}</Chip>
          ))}
        </div>

        {showFilters && (
          <div className="sma-surface sma-border mt-3" style={{ borderRadius: 12, padding: 14 }}>
            <div className="f-mono" style={{ fontSize: 10.5, color: "var(--slate)", marginBottom: 8 }}>SORT BY</div>
            <div className="flex gap-2 mb-3">
              {[["rating", "Rating"], ["distance", "Distance"], ["price", "Price"]].map(([id, label]) => (
                <Chip key={id} active={sort === id} onClick={() => setSort(id)}>{label}</Chip>
              ))}
            </div>
            <div className="f-mono" style={{ fontSize: 10.5, color: "var(--slate)", marginBottom: 8 }}>MINIMUM RATING</div>
            <div className="flex gap-2">
              {[0, 4, 4.5].map((r) => (
                <Chip key={r} active={minRating === r} onClick={() => setMinRating(r)}>{r === 0 ? "Any" : `${r}+`}</Chip>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-4 mt-4 mb-6">
        <div className="f-mono" style={{ fontSize: 12, color: "var(--slate)", marginBottom: 10 }}>
          {isLoading ? "SEARCHING…" : `${results?.length || 0} PROVIDERS FOUND`}
        </div>
        <AsyncState
          isLoading={isLoading}
          isError={isError}
          error={error}
          isEmpty={!isLoading && results?.length === 0}
          emptyProps={{ description: "Try clearing a filter or searching a different service." }}
        >
          <div className="flex flex-col gap-3">
            {results?.map((p) => <ProviderCard key={p.id} provider={p} />)}
          </div>
        </AsyncState>
      </div>
    </div>
  );
}

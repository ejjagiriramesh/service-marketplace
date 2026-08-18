import React from "react";
import { EmptyState } from "./EmptyState.jsx";
import { AlertTriangle, Inbox, Loader2 } from "lucide-react";

// Wraps the loading / error / empty / success branches every API-driven
// screen needs, so pages don't repeat `if (loading) ... if (error) ...`.
export function AsyncState({ isLoading, isError, error, isEmpty, emptyProps, children, loadingRows = 3 }) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: loadingRows }).map((_, i) => (
          <div key={i} className="sma-surface sma-border" style={{ borderRadius: 14, height: 92, opacity: 0.5 }}>
            <div className="flex items-center justify-center h-full">
              <Loader2 size={18} className="animate-spin" color="var(--slate-light)" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (isError) {
    return (
      <EmptyState
        icon={AlertTriangle}
        title="Couldn't load this"
        description={error?.message || "Something went wrong. Please try again."}
      />
    );
  }
  if (isEmpty) {
    return <EmptyState icon={Inbox} title="Nothing here yet" {...emptyProps} />;
  }
  return children;
}

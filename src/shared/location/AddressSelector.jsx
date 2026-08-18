import React from "react";
import { MapPin } from "lucide-react";
import { SAVED_ADDRESSES } from "../../core/api/db.js";

// Platform-level address picker — the doc calls this out as something the
// future Property/Jobs modules should also reuse rather than each building
// their own.
export function AddressSelector({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2.5">
      {SAVED_ADDRESSES.map((a) => (
        <div
          key={a.label}
          className="sma-surface tap flex items-center gap-3"
          style={{ borderRadius: 12, padding: 14, border: `1.5px solid ${value === a.address ? "var(--ink)" : "var(--line)"}` }}
          onClick={() => onChange(a.address)}
        >
          <MapPin size={18} color="var(--ink-soft)" />
          <div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{a.label}</div>
            <div style={{ fontSize: 12, color: "var(--slate)" }}>{a.address}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

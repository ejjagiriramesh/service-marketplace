import React from "react";
import { TIME_SLOTS } from "../../../../core/api/db.js";
import { Chip } from "../../../../shared/components/Chip.jsx";

const DATES = ["Today", "Tomorrow", "Wed 19", "Thu 20", "Fri 21", "Sat 22"];

export function StepDateTime({ date, time, onDate, onTime }) {
  return (
    <div>
      <div className="f-mono" style={{ fontSize: 11, color: "var(--slate)", marginBottom: 8 }}>PICK A DATE</div>
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 mb-5">
        {DATES.map((d) => (
          <Chip key={d} active={date === d} onClick={() => onDate(d)} style={{ padding: "9px 14px" }}>{d}</Chip>
        ))}
      </div>
      <div className="f-mono" style={{ fontSize: 11, color: "var(--slate)", marginBottom: 8 }}>PICK A TIME SLOT</div>
      <div className="grid grid-cols-3 gap-2">
        {TIME_SLOTS.map((t) => {
          const active = time === t;
          return (
            <div
              key={t}
              className="tap"
              style={{
                textAlign: "center", padding: "10px 6px", borderRadius: 10, fontSize: 12.5,
                fontFamily: "'IBM Plex Mono', monospace",
                border: `1.5px solid ${active ? "var(--ink)" : "var(--line)"}`,
                background: active ? "var(--ink)" : "var(--surface)",
                color: active ? "#F3EEE2" : "var(--ink)",
              }}
              onClick={() => onTime(t)}
            >
              {t}
            </div>
          );
        })}
      </div>
    </div>
  );
}

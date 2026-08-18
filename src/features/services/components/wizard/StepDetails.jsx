import React from "react";
import { ImageUploader } from "../../../../shared/media/ImageUploader.jsx";

export function StepDetails({ notes, onNotes, error }) {
  return (
    <div>
      <div className="f-mono" style={{ fontSize: 11, color: "var(--slate)", marginBottom: 8 }}>DESCRIBE THE ISSUE (OPTIONAL)</div>
      <textarea
        value={notes}
        onChange={(e) => onNotes(e.target.value)}
        placeholder="e.g. Ceiling fan making noise in the hall, needs inspection"
        className="input-field"
        style={{ minHeight: 100 }}
      />
      {error && <div style={{ fontSize: 11.5, color: "var(--rust)", marginTop: 5 }}>{error}</div>}
      <div className="mt-3">
        <ImageUploader onChange={() => {}} />
      </div>
    </div>
  );
}

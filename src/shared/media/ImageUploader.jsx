import React, { useRef, useState } from "react";
import { Image as ImageIcon, X } from "lucide-react";

// Dummy uploader: keeps local object URLs only (nothing is actually sent
// anywhere). A real implementation would call a platform mediaApi.upload()
// and store the returned media id/url — components above it never need to
// know the difference.
export function ImageUploader({ onChange }) {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleFiles = (e) => {
    const list = Array.from(e.target.files || []).map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
    }));
    const next = [...files, ...list];
    setFiles(next);
    onChange?.(next);
  };

  const remove = (idx) => {
    const next = files.filter((_, i) => i !== idx);
    setFiles(next);
    onChange?.(next);
  };

  return (
    <div>
      <div
        className="sma-surface sma-border tap flex items-center justify-center gap-2"
        style={{ borderRadius: 12, padding: 16, borderStyle: "dashed", color: "var(--slate)" }}
        onClick={() => inputRef.current?.click()}
      >
        <ImageIcon size={16} />
        <span style={{ fontSize: 12.5 }}>Add photos (optional)</span>
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={handleFiles} />
      {files.length > 0 && (
        <div className="flex gap-2 mt-2 flex-wrap">
          {files.map((f, i) => (
            <div key={i} style={{ position: "relative", width: 56, height: 56, borderRadius: 8, overflow: "hidden" }} className="sma-border">
              <img src={f.url} alt={f.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <button
                onClick={() => remove(i)}
                style={{ position: "absolute", top: 2, right: 2, background: "rgba(27,42,74,0.75)", border: "none", borderRadius: 999, width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                <X size={10} color="#fff" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

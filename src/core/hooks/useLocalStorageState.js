import { useEffect, useState } from "react";

// Generic persisted-state hook used by favorites, drafts, etc. Real feature
// data (requests, provider inbox) goes through core/api/db.js instead so it
// can flow through React Query like it would with a real backend.
export function useLocalStorageState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }, [key, value]);

  return [value, setValue];
}

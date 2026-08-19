import React, { useState } from "react";
import { LocateFixed, MapPin, Search } from "lucide-react";
import { AppButton } from "../components/AppButton.jsx";

const DEFAULT_LOCATION = { lat: 17.4849, lon: 78.4138 };

async function geocode(query) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(query)}`, {
    headers: { "Accept-Language": "en" },
  });
  if (!response.ok) throw new Error("Could not search that location.");
  const results = await response.json();
  if (!results[0]) throw new Error("No location found. Try adding the city or area.");
  return {
    address: results[0].display_name,
    coordinates: { lat: Number(results[0].lat), lon: Number(results[0].lon) },
  };
}

async function reverseGeocode(lat, lon) {
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`, {
    headers: { "Accept-Language": "en" },
  });
  if (!response.ok) throw new Error("Could not identify this location.");
  const result = await response.json();
  return { address: result.display_name || `${lat.toFixed(5)}, ${lon.toFixed(5)}`, coordinates: { lat, lon } };
}

function mapUrl(coordinates) {
  const { lat, lon } = coordinates || DEFAULT_LOCATION;
  const padding = 0.012;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${lon - padding}%2C${lat - padding}%2C${lon + padding}%2C${lat + padding}&layer=mapnik&marker=${lat}%2C${lon}`;
}

export function OfficeLocationPicker({ value, onChange }) {
  const [query, setQuery] = useState(value?.address || "");
  const [status, setStatus] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const coordinates = value?.coordinates || DEFAULT_LOCATION;

  const selectLocation = async (action) => {
    setIsBusy(true);
    setStatus("");
    try {
      const location = await action();
      setQuery(location.address);
      onChange(location);
    } catch (error) {
      setStatus(error.message || "Could not find that location.");
    } finally {
      setIsBusy(false);
    }
  };

  const searchLocation = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    selectLocation(() => geocode(query.trim()));
  };

  const useLiveLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Live location is not supported by this browser.");
      return;
    }
    setIsBusy(true);
    setStatus("Requesting your location permission...");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => selectLocation(() => reverseGeocode(coords.latitude, coords.longitude)),
      () => {
        setIsBusy(false);
        setStatus("Location permission was not granted.");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <div style={{ marginBottom: 14 }}>
      <div className="f-mono" style={{ fontSize: 10.5, color: "var(--slate)", marginBottom: 6, letterSpacing: "0.06em" }}>OFFICE LOCATION</div>
      <form onSubmit={searchLocation} className="flex gap-2">
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={16} color="var(--slate)" style={{ position: "absolute", left: 12, top: 12 }} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search office address" aria-label="Search office address" className="input-field" style={{ paddingLeft: 36 }} />
        </div>
        <AppButton type="submit" variant="outline" disabled={isBusy} style={{ padding: "10px 12px" }}>Search</AppButton>
      </form>
      <AppButton type="button" variant="outline" onClick={useLiveLocation} disabled={isBusy} style={{ width: "100%", marginTop: 8, padding: "9px 12px", fontSize: 12 }}><LocateFixed size={14} style={{ display: "inline", marginRight: 6, verticalAlign: -2 }} />Use my live location</AppButton>
      <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--line)", marginTop: 10, height: 170, background: "var(--paper-dim)" }}>
        <iframe title="OpenStreetMap office location" src={mapUrl(coordinates)} style={{ width: "100%", height: "100%", border: 0 }} loading="lazy" />
      </div>
      <div className="flex items-start gap-2" style={{ marginTop: 8 }}><MapPin size={15} color="var(--ink-soft)" style={{ flexShrink: 0, marginTop: 1 }} /><div style={{ fontSize: 11.5, color: value?.address ? "var(--ink)" : "var(--slate)" }}>{value?.address || "Search for your office or use your live location."}</div></div>
      {status && <div role="status" style={{ fontSize: 11.5, color: "var(--rust)", marginTop: 6 }}>{status}</div>}
      <div style={{ fontSize: 10.5, color: "var(--slate-light)", marginTop: 5 }}>Maps © OpenStreetMap contributors</div>
    </div>
  );
}

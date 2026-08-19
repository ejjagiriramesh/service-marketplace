import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, IndianRupee, Bell, Star, ChevronRight, Briefcase, LogOut } from "lucide-react";
import { useAuth } from "../../../app/providers/AuthProvider.jsx";
import { useMyRequests } from "../hooks/useMyRequests.js";
import { TopBar } from "../../../shared/navigation/TopBar.jsx";
import { PROVIDERS, db } from "../../../core/api/db.js";
import { AppButton } from "../../../shared/components/AppButton.jsx";

export default function AccountPage() {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const { data: myRequests } = useMyRequests();
  const [openSection, setOpenSection] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [reviews, setReviews] = useState(() => db.getReviews());
  const [ratings, setRatings] = useState({});
  const [addresses, setAddresses] = useState(() => db.getAddresses());
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({ label: "", address: "" });
  const active = (myRequests || []).filter((r) => ["Requested", "Accepted", "Scheduled", "In Progress"].includes(r.status)).length;

  const initials = (user?.name || "?").split(" ").slice(0, 2).map((w) => w[0]).join("");

  const goProvider = () => {
    switchRole("provider");
    navigate("/provider/dashboard");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const completedRequests = (myRequests || []).filter((request) => request.status === "Completed");

  const saveRating = (request, provider, rating) => {
    const review = { requestId: request.id, providerId: provider.id, providerName: provider.name, rating, service: request.service };
    const nextReviews = [...reviews.filter((item) => item.requestId !== request.id), review];
    setReviews(nextReviews);
    db.saveReviews(nextReviews);
  };

  const startAddressEdit = (address, index) => {
    setEditingAddress(index);
    setAddressForm({ label: address.label, address: address.address });
  };

  const saveAddress = (event) => {
    event.preventDefault();
    if (!addressForm.label.trim() || !addressForm.address.trim()) return;
    const nextAddresses = [...addresses];
    const savedAddress = { label: addressForm.label.trim(), address: addressForm.address.trim() };
    if (editingAddress === "new") nextAddresses.push(savedAddress);
    else nextAddresses[editingAddress] = savedAddress;
    setAddresses(nextAddresses);
    db.saveAddresses(nextAddresses);
    setEditingAddress(null);
    setAddressForm({ label: "", address: "" });
  };

  return (
    <div>
      <TopBar title="Account" />
      <div className="px-4 pt-4">
        <div className="flex items-center gap-3">
          <div style={{ width: 56, height: 56, borderRadius: 999, background: "var(--ink)", color: "#F3EEE2", display: "flex", alignItems: "center", justifyContent: "center" }} className="f-display">
            <span style={{ fontWeight: 700 }}>{initials}</span>
          </div>
          <div>
            <div className="f-display" style={{ fontWeight: 700, fontSize: 16 }}>{user?.name}</div>
            <div style={{ fontSize: 12, color: "var(--slate)" }}>{user?.location} · {user?.email}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mt-5">
          <div className="sma-surface sma-border" style={{ borderRadius: 12, padding: 14 }}>
            <div className="f-display" style={{ fontWeight: 700, fontSize: 18 }}>{active}</div>
            <div className="f-mono" style={{ fontSize: 10.5, color: "var(--slate)" }}>ACTIVE REQUESTS</div>
          </div>
          <div className="sma-surface sma-border" style={{ borderRadius: 12, padding: 14 }}>
            <div className="f-display" style={{ fontWeight: 700, fontSize: 18 }}>{user?.rating ?? "—"}</div>
            <div className="f-mono" style={{ fontSize: 10.5, color: "var(--slate)" }}>YOUR RATING</div>
          </div>
        </div>

        <div className="mt-6 flex flex-col">
          {[
            ["Addresses", MapPin],
            ["Payment methods", IndianRupee],
            ["Notifications", Bell],
            ["Reviews you've written", Star],
          ].map(([label, Icon]) => (
            <button key={label} type="button" onClick={() => setOpenSection(openSection === label ? null : label)} className="flex items-center justify-between tap dot-sep" style={{ padding: "13px 2px", width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
              <span className="flex items-center gap-3" style={{ fontSize: 13.5, fontWeight: 500 }}><Icon size={17} color="var(--ink-soft)" />{label}</span>
              <ChevronRight size={16} color="var(--slate-light)" style={{ transform: openSection === label ? "rotate(90deg)" : undefined }} />
            </button>
          ))}
        </div>

        {openSection === "Addresses" && (
          <div className="sma-surface sma-border mt-3" style={{ borderRadius: 12, padding: 14 }}>
            {addresses.map((item, index) => <div key={`${item.label}-${index}`} className="flex items-center justify-between" style={{ padding: "8px 0", borderBottom: "1px solid var(--line)" }}><div><strong style={{ fontSize: 13 }}>{item.label}</strong><div style={{ color: "var(--slate)", fontSize: 12, marginTop: 3 }}>{item.address}</div></div><AppButton variant="outline" onClick={() => startAddressEdit(item, index)} style={{ padding: "5px 9px", fontSize: 11 }}>Edit</AppButton></div>)}
            {editingAddress !== null ? <form onSubmit={saveAddress} style={{ marginTop: 12 }}><div className="flex gap-2"><input value={addressForm.label} onChange={(event) => setAddressForm((current) => ({ ...current, label: event.target.value }))} placeholder="Label (e.g. Home)" aria-label="Address label" style={{ width: "34%", border: "1px solid var(--line)", borderRadius: 8, padding: "8px 9px", fontSize: 12 }} /><input value={addressForm.address} onChange={(event) => setAddressForm((current) => ({ ...current, address: event.target.value }))} placeholder="Full address" aria-label="Full address" style={{ flex: 1, minWidth: 0, border: "1px solid var(--line)", borderRadius: 8, padding: "8px 9px", fontSize: 12 }} /></div><div className="flex gap-2" style={{ marginTop: 8 }}><AppButton variant="amber" type="submit" style={{ flex: 1, padding: "8px 0", fontSize: 12 }}>{editingAddress === "new" ? "Add address" : "Save changes"}</AppButton><AppButton variant="outline" type="button" onClick={() => setEditingAddress(null)} style={{ flex: 1, padding: "8px 0", fontSize: 12 }}>Cancel</AppButton></div></form> : <AppButton variant="outline" onClick={() => { setEditingAddress("new"); setAddressForm({ label: "", address: "" }); }} style={{ width: "100%", marginTop: 12, padding: "8px 0", fontSize: 12 }}>Add another address</AppButton>}
          </div>
        )}

        {openSection === "Payment methods" && (
          <div className="sma-surface sma-border mt-3" style={{ borderRadius: 12, padding: 14 }}>
            <div className="flex items-center justify-between"><div><strong style={{ fontSize: 13 }}>Cash on service</strong><div style={{ color: "var(--slate)", fontSize: 12, marginTop: 3 }}>Available for every booking</div></div><span className="f-mono" style={{ fontSize: 10, color: "var(--green)" }}>DEFAULT</span></div>
            <AppButton variant="outline" style={{ marginTop: 12, width: "100%", padding: "8px 0", fontSize: 12 }} onClick={() => window.alert("Online payment methods will be available when payments are enabled.")}>Add payment method</AppButton>
          </div>
        )}

        {openSection === "Notifications" && (
          <div className="sma-surface sma-border mt-3" style={{ borderRadius: 12, padding: 14 }}>
            <label className="flex items-center justify-between" style={{ fontSize: 13, cursor: "pointer" }}><span><strong>Booking updates</strong><div style={{ color: "var(--slate)", fontSize: 12, marginTop: 3 }}>Status and schedule alerts</div></span><input type="checkbox" checked={notificationsEnabled} onChange={(event) => setNotificationsEnabled(event.target.checked)} /></label>
          </div>
        )}

        {openSection === "Reviews you've written" && (
          <div className="sma-surface sma-border mt-3" style={{ borderRadius: 12, padding: 14 }}>
            {completedRequests.length === 0 && <div style={{ color: "var(--slate)", fontSize: 12 }}>Complete a request to rate a provider.</div>}
            {completedRequests.map((request) => {
              const provider = PROVIDERS.find((item) => item.id === request.providerId);
              const savedReview = reviews.find((item) => item.requestId === request.id);
              const selectedRating = ratings[request.id] || savedReview?.rating || 0;
              return <div key={request.id} style={{ padding: "8px 0", borderBottom: "1px solid var(--line)" }}><strong style={{ fontSize: 13 }}>{provider?.name || "Provider"}</strong><div style={{ color: "var(--slate)", fontSize: 12, margin: "3px 0 8px" }}>{request.service}</div><div className="flex items-center gap-1">{[1, 2, 3, 4, 5].map((value) => <button key={value} type="button" aria-label={`Rate ${value} stars`} onClick={() => setRatings((current) => ({ ...current, [request.id]: value }))} style={{ border: "none", background: "none", padding: 2, cursor: "pointer" }}><Star size={18} color="var(--amber-deep)" fill={value <= selectedRating ? "var(--amber)" : "none"} /></button>)}<AppButton variant="outline" disabled={!selectedRating || !provider} onClick={() => saveRating(request, provider, selectedRating)} style={{ marginLeft: 8, padding: "5px 9px", fontSize: 11 }}>{savedReview ? "Update" : "Save"}</AppButton></div></div>;
            })}
          </div>
        )}

        <div className="sma-surface sma-border mt-6" style={{ borderRadius: 14, padding: 16 }}>
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={17} color="var(--ink)" />
            <span className="f-display" style={{ fontWeight: 700, fontSize: 14 }}>Are you a service provider?</span>
          </div>
          <p style={{ fontSize: 12.5, color: "var(--slate)", marginBottom: 12 }}>
            Switch to provider mode to manage jobs, availability and earnings — this demo simulates Ravi Electrical Services.
          </p>
          <button className="btn-amber" style={{ width: "100%" }} onClick={goProvider}>Continue as provider</button>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 mt-6 mb-6"
          style={{ width: "100%", background: "none", border: "none", color: "var(--rust)", fontSize: 13, fontWeight: 600, cursor: "pointer", padding: "10px 0" }}
        >
          <LogOut size={15} /> Log out
        </button>
      </div>
    </div>
  );
}

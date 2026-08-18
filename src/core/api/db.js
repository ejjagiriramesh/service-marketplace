// In-memory "database" of dummy data + localStorage persistence, standing in
// for the Spring Boot backend. This is the only file that needs to change
// shape when real endpoints exist — everything above it (hooks, pages)
// talks to features/*/api/*.js, which talk to core/api/mockClient.js.

const LS_KEYS = {
  requests: "sh_my_requests",
  providerInbox: "sh_provider_inbox",
  favorites: "sh_favorites",
  user: "sh_user",
};

export const CATEGORIES = [
  { id: "electrician", name: "Electrician", icon: "Zap", count: 214 },
  { id: "plumber", name: "Plumber", icon: "Wrench", count: 176 },
  { id: "ac", name: "AC Repair", icon: "Wind", count: 132 },
  { id: "carpenter", name: "Carpenter", icon: "Hammer", count: 98 },
  { id: "painter", name: "Painter", icon: "PaintRoller", count: 87 },
  { id: "cleaning", name: "Cleaning", icon: "Sparkles", count: 251 },
  { id: "ro", name: "RO Service", icon: "Droplets", count: 64 },
  { id: "cctv", name: "CCTV", icon: "Camera", count: 41 },
  { id: "appliance", name: "Appliance Repair", icon: "Fan", count: 73 },
];

const NAMES = [
  "Ravi Electrical Services", "AquaFix Plumbing Co.", "CoolBreeze AC Care",
  "Sri Sai Carpentry Works", "ColorCraft Painters", "SparkleHome Cleaning",
  "PureDrop RO Service", "SecureView CCTV", "FixIt Appliance Repair",
  "Venkat Home Solutions", "QuickHands Handyman", "Trust Electricals",
];

function makeProvider(i) {
  const cat = CATEGORIES[i % CATEGORIES.length];
  const verified = i % 3 !== 0;
  const rating = (4.2 + ((i * 7) % 8) / 10).toFixed(1);
  const reviewCount = 40 + ((i * 37) % 260);
  const distance = (0.8 + ((i * 3) % 40) / 10).toFixed(1);
  const priceFrom = [199, 249, 299, 349, 399, 499][i % 6];
  const experience = 2 + (i % 12);
  const jobs = 60 + ((i * 53) % 900);
  const initials = NAMES[i % NAMES.length].split(" ").slice(0, 2).map((w) => w[0]).join("");
  return {
    id: `P${100 + i}`,
    ticketNo: `SP-${2200 + i}`,
    name: NAMES[i % NAMES.length],
    categoryId: cat.id,
    category: cat.name,
    verified,
    rating,
    reviewCount,
    distance,
    priceFrom,
    experience,
    jobs,
    initials,
    bio: `${NAMES[i % NAMES.length]} has been serving the KPHB & Miyapur area for ${experience}+ years, specializing in ${cat.name.toLowerCase()} work for homes and small offices.`,
    tags: i % 2 === 0 ? ["Same-day", "Warranty"] : ["Verified ID", "Background check"],
    services: [
      { id: `${100 + i}-s1`, name: `${cat.name} — Basic visit`, price: priceFrom, duration: "30–45 min" },
      { id: `${100 + i}-s2`, name: `${cat.name} — Standard job`, price: priceFrom + 200, duration: "1–2 hrs" },
      { id: `${100 + i}-s3`, name: `${cat.name} — Full inspection`, price: priceFrom + 450, duration: "2–3 hrs" },
    ],
    availability: [
      ["Monday", "09:00 – 18:00"], ["Tuesday", "09:00 – 18:00"], ["Wednesday", "09:00 – 18:00"],
      ["Thursday", "09:00 – 18:00"], ["Friday", "09:00 – 18:00"], ["Saturday", "10:00 – 15:00"],
      ["Sunday", "Closed"],
    ],
    reviews: [
      { user: "Anitha K.", rating: 5, comment: "Came on time and fixed the issue quickly. Fair pricing.", days: 3 },
      { user: "Mohammed R.", rating: 4, comment: "Good work, explained everything clearly before starting.", days: 9 },
      { user: "Divya S.", rating: 5, comment: "Very professional, would book again.", days: 21 },
    ],
    phone: `+91 ${String(9000 + i).slice(0, 2)}-${String(9000 + i).slice(2)}-${String(1000 + i * 7).slice(-4)}`,
  };
}

export const PROVIDERS = Array.from({ length: 12 }, (_, i) => makeProvider(i));

export const TIME_SLOTS = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"];

export const SAVED_ADDRESSES = [
  { label: "Home", address: "Flat 302, Sindhura Residency, KPHB Phase 3" },
  { label: "Work", address: "3rd Floor, Cyber Towers, Hitech City" },
];

const DEFAULT_MY_REQUESTS = [
  { id: "R1", ticketNo: "REQ-4471", providerId: "P100", service: "Electrician — Standard job", status: "In Progress", date: "18 Aug", time: "11:00 AM", address: "Flat 302, Sindhura Residency, KPHB" },
  { id: "R2", ticketNo: "REQ-4459", providerId: "P103", service: "Carpenter — Basic visit", status: "Scheduled", date: "20 Aug", time: "4:00 PM", address: "Flat 302, Sindhura Residency, KPHB" },
  { id: "R3", ticketNo: "REQ-4432", providerId: "P105", service: "Cleaning — Full inspection", status: "Completed", date: "9 Aug", time: "10:00 AM", address: "Flat 302, Sindhura Residency, KPHB" },
  { id: "R4", ticketNo: "REQ-4408", providerId: "P101", service: "Plumber — Standard job", status: "Cancelled", date: "2 Aug", time: "2:00 PM", address: "Office, Hitech City" },
];

const DEFAULT_PROVIDER_INBOX = [
  { id: "IR1", ticketNo: "REQ-4483", customer: "Kavya Reddy", service: "Electrician — Standard job", status: "Requested", date: "19 Aug", time: "9:30 AM", address: "House 12, Allwyn Colony" },
  { id: "IR2", ticketNo: "REQ-4479", customer: "Suresh Babu", service: "Electrician — Full inspection", status: "Requested", date: "19 Aug", time: "1:00 PM", address: "Flat 5B, JNTU Rd" },
  { id: "IR3", ticketNo: "REQ-4460", customer: "Farha Sheikh", service: "Electrician — Basic visit", status: "Accepted", date: "18 Aug", time: "5:00 PM", address: "Plot 44, Bachupally" },
  { id: "IR4", ticketNo: "REQ-4390", customer: "Imran Q.", service: "Electrician — Standard job", status: "Completed", date: "10 Aug", time: "11:00 AM", address: "Flat 9, KPHB 6th Phase" },
];

function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function writeLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota / private-mode errors in demo */
  }
}

export const db = {
  getMyRequests: () => readLS(LS_KEYS.requests, DEFAULT_MY_REQUESTS),
  saveMyRequests: (list) => writeLS(LS_KEYS.requests, list),
  getProviderInbox: () => readLS(LS_KEYS.providerInbox, DEFAULT_PROVIDER_INBOX),
  saveProviderInbox: (list) => writeLS(LS_KEYS.providerInbox, list),
  getFavorites: () => readLS(LS_KEYS.favorites, []),
  saveFavorites: (list) => writeLS(LS_KEYS.favorites, list),
  getUser: () => readLS(LS_KEYS.user, null),
  saveUser: (user) => writeLS(LS_KEYS.user, user),
  clearUser: () => localStorage.removeItem(LS_KEYS.user),
};

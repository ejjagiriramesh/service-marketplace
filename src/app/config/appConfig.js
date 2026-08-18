// Central place for environment/config flags.
// Swap useMockApi to false once a real backend is wired up in core/api/axiosClient.js
export const appConfig = {
  appName: "ServiceHub",
  apiBaseUrl: import.meta.env.VITE_API_URL || "https://api.servicehub.example.com",
  useMockApi: true,
  defaultLocation: {
    label: "Kukatpally, Telangana",
    lat: 17.4849,
    lng: 78.4138,
  },
  mockNetworkDelayMs: 450,
};

import { db, PROVIDERS } from "../../../core/api/db.js";
import { mockRequest } from "../../../core/api/mockClient.js";

export const requestApi = {
  getMyRequests: () => mockRequest(() => db.getMyRequests()),

  createRequest: (payload) =>
    mockRequest(() => {
      const list = db.getMyRequests();
      const ticketNo = `REQ-${4500 + list.length}`;
      const newRequest = {
        id: `R${Date.now()}`,
        ticketNo,
        providerId: payload.providerId,
        service: payload.service,
        status: "Requested",
        date: payload.date,
        time: payload.time,
        address: payload.address,
        notes: payload.notes || "",
      };
      db.saveMyRequests([newRequest, ...list]);
      return newRequest;
    }),

  getProviderInbox: () => mockRequest(() => db.getProviderInbox()),

  updateProviderRequestStatus: ({ id, status }) =>
    mockRequest(() => {
      const list = db.getProviderInbox();
      const next = list.map((r) => (r.id === id ? { ...r, status } : r));
      db.saveProviderInbox(next);
      return next.find((r) => r.id === id);
    }),

  resolveProvider: (providerId) => PROVIDERS.find((p) => p.id === providerId) || null,
};

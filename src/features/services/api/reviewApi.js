import { PROVIDERS } from "../../../core/api/db.js";
import { mockRequest } from "../../../core/api/mockClient.js";

export const reviewApi = {
  getProviderReviews: (providerId) =>
    mockRequest(() => PROVIDERS.find((p) => p.id === providerId)?.reviews || []),
};

import { PROVIDERS } from "../../../core/api/db.js";
import { mockRequest } from "../../../core/api/mockClient.js";

export const providerApi = {
  searchProviders: ({ categoryId, query, sort = "rating", minRating = 0 } = {}) =>
    mockRequest(() => {
      let list = PROVIDERS.filter((p) => (categoryId ? p.categoryId === categoryId : true));
      if (query) {
        const q = query.toLowerCase();
        list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
      }
      list = list.filter((p) => Number(p.rating) >= minRating);
      if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
      if (sort === "distance") list = [...list].sort((a, b) => a.distance - b.distance);
      if (sort === "price") list = [...list].sort((a, b) => a.priceFrom - b.priceFrom);
      return list;
    }),

  getProvider: (id) =>
    mockRequest(() => {
      const provider = PROVIDERS.find((p) => p.id === id);
      if (!provider) throw { status: 404, message: "Provider not found." };
      return provider;
    }),

  getFeatured: () => mockRequest(() => PROVIDERS.filter((p) => p.verified).slice(0, 4)),
};

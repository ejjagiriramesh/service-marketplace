import { useQuery } from "@tanstack/react-query";
import { providerApi } from "../api/providerApi.js";

export function useProviders(params) {
  return useQuery({
    queryKey: ["providers", params],
    queryFn: () => providerApi.searchProviders(params),
    keepPreviousData: true,
  });
}

export function useFeaturedProviders() {
  return useQuery({ queryKey: ["providers", "featured"], queryFn: providerApi.getFeatured });
}

export function useProvider(id) {
  return useQuery({
    queryKey: ["provider", id],
    queryFn: () => providerApi.getProvider(id),
    enabled: !!id,
  });
}

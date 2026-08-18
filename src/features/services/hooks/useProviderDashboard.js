import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requestApi } from "../api/requestApi.js";

export function useProviderInbox() {
  return useQuery({ queryKey: ["providerInbox"], queryFn: requestApi.getProviderInbox });
}

export function useUpdateProviderRequestStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestApi.updateProviderRequestStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["providerInbox"] }),
  });
}

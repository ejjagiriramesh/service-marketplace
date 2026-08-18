import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requestApi } from "../api/requestApi.js";

export function useMyRequests() {
  return useQuery({ queryKey: ["myRequests"], queryFn: requestApi.getMyRequests });
}

export function useCreateRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestApi.createRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["myRequests"] }),
  });
}

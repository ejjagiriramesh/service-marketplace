import { useQuery } from "@tanstack/react-query";
import { serviceApi } from "../api/serviceApi.js";

export function useCategories() {
  return useQuery({ queryKey: ["categories"], queryFn: serviceApi.getCategories });
}

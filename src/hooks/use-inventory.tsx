import { useQuery } from "@tanstack/react-query"
import { inventoryService } from "../services/inventory.service"

export function useQueryKardexProduct(category: string | null, search: string) {
  return useQuery({
    queryKey: ["kardex", "category", category, "search", search],
    queryFn: () => inventoryService.getProductsByCategory(category, search),
    enabled: !!category,
  })
}

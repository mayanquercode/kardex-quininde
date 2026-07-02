import { useQuery } from "@tanstack/react-query"
import { inventoryService } from "../services/inventory.service"

export function useQueryCategories() {
  return useQuery({
    queryKey: ["kardex", "categories"],
    queryFn: () => inventoryService.getCategoriesWithProductCount(),
    staleTime: 1000 * 60 * 5,
  })
}

export function useQueryProductDetail(code: string | undefined) {
  return useQuery({
    queryKey: ["kardex", "product", code],
    queryFn: () => inventoryService.getProductDetail(code!),
    enabled: !!code,
  })
}

export function useQueryKardexProduct(category: string | null, search: string) {
  return useQuery({
    queryKey: ["kardex", "category", category, "search", search],
    queryFn: () => inventoryService.getProductsByCategory(category, search),
    enabled: !!category,
  })
}

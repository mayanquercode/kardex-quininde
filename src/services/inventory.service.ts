import { productRepository } from "../repositories/product.repository"
import { stockRepository } from "../repositories/stock.repository"
import type { ProductWithStock } from "../types/inventory"

export const inventoryService = {
  async getProductsByCategory(
    category: string | null,
    search?: string,
  ): Promise<ProductWithStock[]> {
    const products = await productRepository.findAll(category, search)

    if (products.length === 0) return []

    const codes = products.map((p) => p.code)
    const stockRecords = await stockRepository.findByCodes(codes)

    const stockByCode = new Map(stockRecords.map((s) => [s.code, s]))

    return products.map((product) => ({
      ...product,
      stock: stockByCode.get(product.code) ?? null,
    }))
  },
}

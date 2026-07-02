import { productRepository } from "../repositories/product.repository"
import { stockRepository } from "../repositories/stock.repository"
import type { ProductWithStock } from "../types/inventory"

export const inventoryService = {
  async getCategoriesWithProductCount(): Promise<{ category: string; count: number }[]> {
    return productRepository.findCategoriesWithCount()
  },

  async getProductDetail(code: string): Promise<ProductWithStock | null> {
    const product = await productRepository.findByCode(code)
    if (!product) return null

    const stockRecords = await stockRepository.findByCodes([code])
    const stock = stockRecords.length > 0 ? stockRecords[0] : null

    return { ...product, stock }
  },

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

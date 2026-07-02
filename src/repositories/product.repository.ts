import { supabase } from "../libs/supabase"
import type { Product } from "../types/inventory"

export const productRepository = {
  async findCategoriesWithCount(): Promise<{ category: string; count: number }[]> {
    const { data, error } = await supabase.from("products").select("category")

    if (error) throw error

    const countMap = new Map<string, number>()
    for (const row of data) {
      countMap.set(row.category, (countMap.get(row.category) || 0) + 1)
    }

    return Array.from(countMap.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => a.category.localeCompare(b.category))
  },

  async findByCode(code: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("code", code)
      .maybeSingle()

    if (error) throw error
    return data as Product | null
  },

  async findAll(category?: string | null, search?: string): Promise<Product[]> {
    let query = supabase.from("products").select("*").order("name")

    if (category) {
      query = query.eq("category", category)
    }

    if (search) {
      query = query.ilike("name", `%${search}%`)
    }

    const { data, error } = await query
    if (error) throw error
    return data as Product[]
  },
}

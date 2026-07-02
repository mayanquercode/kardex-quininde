import { supabase } from "../libs/supabase"
import type { Product } from "../types/inventory"

export const productRepository = {
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

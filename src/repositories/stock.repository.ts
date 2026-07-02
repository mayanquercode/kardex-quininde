import { supabase } from "../libs/supabase"
import type { Stock } from "../types/inventory"

export const stockRepository = {
  async findByCodes(codes: string[]): Promise<Stock[]> {
    if (codes.length === 0) return []

    const { data, error } = await supabase
      .from("stock")
      .select("*")
      .in("code", codes)

    if (error) throw error
    return data as Stock[]
  },
}

import { useQuery } from "@tanstack/react-query";
import { supabase } from "../libs/supabase";

export function useQueryKardexProduct(category: string | null, search: string) {
  return useQuery({
    queryKey: ["kardex", "category", category, "search", search],
    queryFn: async () => {
      let query = supabase.from("products").select("*, stock(*)").order("name");

      if (category) query = query.eq("category", category);
      if (search) query = query.ilike("name", `%${search}%`);

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!category,
  });
}


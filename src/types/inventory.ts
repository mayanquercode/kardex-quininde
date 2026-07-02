export interface Product {
  code: string
  name: string
  category: string
  product_type: 'UNIT' | 'AREA'
  created_at: string | null
  updated_at: string | null
}

export interface Stock {
  code: string
  system_quantity: number
  broken_quantity: number
  missing_quantity: number
  leftover_quantity: number
  physical_quantity: number
  created_at: string | null
  updated_at: string | null
}

export interface ProductWithStock extends Product {
  stock: Stock | null
}

import { useState, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import debounce from "debounce"
import Header from "../components/Header"
import TableListProducts from "../components/TableListProducts"
import { useQueryKardexProduct } from "../hooks/use-inventory"

function ProductContent({ decoded }: { decoded: string }) {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const debounceSearch = useMemo(
    () => debounce((v: string) => setDebouncedSearch(v), 300),
    [],
  )

  useEffect(() => {
    debounceSearch(search)
  }, [search, debounceSearch])

  const { data, isLoading } = useQueryKardexProduct(decoded, debouncedSearch)

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar producto..."
        className="mb-4 px-3 py-2 rounded-lg text-sm
          bg-white dark:bg-slate-800
          border border-gray-300 dark:border-slate-600
          text-gray-900 dark:text-slate-100
          placeholder-gray-400 dark:placeholder-slate-500
          focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500
          transition-shadow"
      />

      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="size-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {data !== undefined && data.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400 dark:text-slate-500 text-sm">
            {debouncedSearch
              ? "Sin resultados para esa búsqueda"
              : "No hay productos en esta categoría"}
          </p>
        </div>
      )}

      {data && data.length > 0 && (
        <TableListProducts products={data} />
      )}
    </>
  )
}

export default function CategoryProducts() {
  const { category } = useParams<{ category: string }>()
  const decoded = category ? decodeURIComponent(category) : null

  return (
    <div className="min-h-dvh flex flex-col">
      <Header title={decoded ?? "Categoría"} showBack />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-4 flex flex-col min-h-0">
        {!decoded && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400 dark:text-slate-500 text-sm">
              Selecciona una categoría
            </p>
          </div>
        )}

        {decoded && <ProductContent key={decoded} decoded={decoded} />}
      </main>
    </div>
  )
}

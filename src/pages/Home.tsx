import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { useQueryCategories } from "../hooks/use-inventory"

export default function Home() {
  const navigate = useNavigate()
  const { data, isLoading, error } = useQueryCategories()

  return (
    <div className="min-h-dvh flex flex-col">
      <Header title="Kardex Quinindé" />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-xl bg-gray-200 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-64">
            <p className="text-red-500 dark:text-red-400 text-sm">
              Error al cargar categorías. Intenta de nuevo.
            </p>
          </div>
        )}

        {data && data.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400 dark:text-slate-500 text-sm">
              No hay productos registrados.
            </p>
          </div>
        )}

        {data && data.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {data.map(({ category, count }) => (
              <button
                key={category}
                onClick={() => navigate(`/category/${encodeURIComponent(category)}`)}
                className="group relative p-5 rounded-xl text-left
                  bg-white dark:bg-slate-800
                  border border-gray-200 dark:border-slate-700
                  hover:border-blue-400 dark:hover:border-blue-500
                  hover:shadow-md dark:hover:shadow-blue-500/10
                  transition-all cursor-pointer"
              >
                <p className="text-sm font-medium text-gray-800 dark:text-slate-100 leading-tight mb-3">
                  {category}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-gray-400 dark:text-slate-500">
                  <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  {count} {count === 1 ? "producto" : "productos"}
                </span>
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 dark:ring-white/5 pointer-events-none" />
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

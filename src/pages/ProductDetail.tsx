import { useParams } from "react-router-dom"
import Header from "../components/Header"
import { useQueryProductDetail } from "../hooks/use-inventory"

export default function ProductDetail() {
  const { code, type } = useParams<{ code: string; type: string }>()

  const { data: product, isLoading, error } = useQueryProductDetail(code)

  return (
    <div className="min-h-dvh flex flex-col">
      <Header title={product?.name ?? "Producto"} showBack />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        {isLoading && (
          <div className="space-y-4">
            <div className="h-8 w-48 rounded bg-gray-200 dark:bg-slate-800 animate-pulse" />
            <div className="h-6 w-32 rounded bg-gray-200 dark:bg-slate-800 animate-pulse" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-20 rounded-xl bg-gray-200 dark:bg-slate-800 animate-pulse" />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-64">
            <p className="text-red-500 dark:text-red-400 text-sm">
              Error al cargar el producto.
            </p>
          </div>
        )}

        {!isLoading && !product && !error && (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400 dark:text-slate-500 text-sm">
              Producto no encontrado.
            </p>
          </div>
        )}

        {product && (
          <div className="space-y-6">
            {/* Header info */}
            <div>
              <p className="text-xs font-mono text-blue-500 dark:text-blue-400 mb-1">
                {product.code}
              </p>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100">
                {product.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="inline-block px-2 py-0.5 rounded text-xs font-medium
                  bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                  {product.product_type}
                </span>
                <span className="text-xs text-gray-400 dark:text-slate-500">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Stock grid */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-3 uppercase tracking-wider">
                Inventario
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <StockCard label="Sistema" value={product.stock?.system_quantity} />
                <StockCard label="Físico" value={product.stock?.physical_quantity} />
                <StockCard
                  label="Roto"
                  value={product.stock?.broken_quantity}
                  highlight
                />
                <StockCard
                  label="Sobrante"
                  value={product.stock?.leftover_quantity}
                  highlight
                />
                <StockCard
                  label="Faltante"
                  value={product.stock?.missing_quantity}
                  highlight
                />
              </div>

              {/* Difference indicator */}
              {product.stock && (
                <div className="mt-4 p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                  <p className="text-xs text-gray-400 dark:text-slate-500 mb-1 uppercase tracking-wider">
                    Diferencia
                  </p>
                  <p className="text-lg font-semibold font-mono text-gray-800 dark:text-slate-100">
                    {(() => {
                      const diff =
                        (product.stock?.physical_quantity ?? 0) -
                        (product.stock?.system_quantity ?? 0)
                      return `${diff >= 0 ? "+" : ""}${diff}`
                    })()}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                    Físico - Sistema
                  </p>
                </div>
              )}
            </div>

            {/* Type info */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-3 uppercase tracking-wider">
                Información del tipo
              </h3>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                <p className="text-sm text-gray-800 dark:text-slate-100">
                  Tipo: <span className="font-mono">{type ?? product.product_type}</span>
                </p>
                {product.product_type === "AREA" && (
                  <p className="text-xs text-gray-400 dark:text-slate-500 mt-2">
                    Los datos específicos de área se mostrarán aquí próximamente.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function StockCard({
  label,
  value,
  highlight,
}: {
  label: string
  value?: number | null
  highlight?: boolean
}) {
  return (
    <div
      className={`p-4 rounded-xl border transition-colors
        ${highlight
          ? "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/40"
          : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700"
        }`}
    >
      <p className="text-xs text-gray-400 dark:text-slate-500 mb-1">{label}</p>
      <p
        className={`text-xl font-semibold font-mono
          ${highlight
            ? "text-amber-700 dark:text-amber-400"
            : "text-gray-800 dark:text-slate-100"
          }`}
      >
        {value ?? "-"}
      </p>
    </div>
  )
}

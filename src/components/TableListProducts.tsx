import { useNavigate } from "react-router-dom"
import type { ProductWithStock } from "../types/inventory"

interface TableListProductsProps {
  products: ProductWithStock[]
}

export default function TableListProducts({ products }: TableListProductsProps) {
  const navigate = useNavigate()

  return (
    <>
      <div className="hidden md:block flex-1 min-h-0 overflow-auto rounded-xl border border-gray-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400">
              <th className="text-left px-4 py-3 font-medium">Código</th>
              <th className="text-left px-4 py-3 font-medium">Nombre</th>
              <th className="text-right px-4 py-3 font-medium">Físico</th>
              <th className="text-right px-4 py-3 font-medium">Sistema</th>
              <th className="text-right px-4 py-3 font-medium">Faltante</th>
              <th className="text-right px-4 py-3 font-medium">Roto</th>
              <th className="text-right px-4 py-3 font-medium">Sobrante</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {products.map((product: ProductWithStock) => (
              <tr
                key={product.code}
                onClick={() => navigate(`/product/${product.code}/${product.product_type}`)}
                className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
              >
                <td className="px-4 py-2.5 font-mono text-xs text-gray-500 dark:text-slate-400">
                  {product.code}
                </td>
                <td className="px-4 py-2.5 text-gray-800 dark:text-slate-100">
                  {product.name}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-gray-800 dark:text-slate-100">
                  {product.stock?.physical_quantity ?? "-"}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-gray-800 dark:text-slate-100">
                  {product.stock?.system_quantity ?? "-"}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-rose-600 dark:text-rose-400">
                  {product.stock?.missing_quantity ?? "-"}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-amber-600 dark:text-amber-400">
                  {product.stock?.broken_quantity ?? "-"}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-emerald-600 dark:text-emerald-400">
                  {product.stock?.leftover_quantity ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex md:hidden flex-col gap-3 flex-1 min-h-0 overflow-auto">
        {products.map((product: ProductWithStock) => (
          <div
            key={product.code}
            onClick={() => navigate(`/product/${product.code}/${product.product_type}`)}
            className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
          >
            <p className="text-xs font-mono text-blue-500 dark:text-blue-400 mb-1">
              {product.code}
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-slate-100 mb-2">
              {product.name}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 dark:text-slate-500">
              <span>Físico: <span className="font-mono text-gray-800 dark:text-slate-100">{product.stock?.physical_quantity ?? "-"}</span></span>
              <span>Sistema: <span className="font-mono text-gray-800 dark:text-slate-100">{product.stock?.system_quantity ?? "-"}</span></span>
              <span className="text-rose-600 dark:text-rose-400">Faltante: <span className="font-mono">{product.stock?.missing_quantity ?? "-"}</span></span>
              <span className="text-amber-600 dark:text-amber-400">Roto: <span className="font-mono">{product.stock?.broken_quantity ?? "-"}</span></span>
              <span className="text-emerald-600 dark:text-emerald-400">Sobrante: <span className="font-mono">{product.stock?.leftover_quantity ?? "-"}</span></span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

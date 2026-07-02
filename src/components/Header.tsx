import { useNavigate } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"

interface HeaderProps {
  title: string
  showBack?: boolean
}

export default function Header({ title, showBack }: HeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-gray-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-sm text-gray-500 dark:text-slate-400
                hover:text-gray-700 dark:hover:text-slate-200 transition-colors cursor-pointer shrink-0"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Volver
            </button>
          )}
          <h1 className="text-lg font-semibold truncate text-gray-800 dark:text-slate-100">
            {title}
          </h1>
        </div>

        <ThemeToggle />
      </div>
    </header>
  )
}

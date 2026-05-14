import Link from 'next/link'

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-violet-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">D</span>
          </div>
          <span className="text-xl font-bold text-violet-900">Distribuidora</span>
        </Link>

        <Link
          href="/login"
          className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Acceso a Comercios
        </Link>
      </div>
    </header>
  )
}

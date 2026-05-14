'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Product = {
  id: string
  name: string
  description: string | null
  category: string
  unit: string
  price: number
  featured: boolean
  imageUrl: string | null
}

const CATEGORIES = [
  { name: 'Todos', icon: '🏪' },
  { name: 'Lácteos', icon: '🥛' },
  { name: 'Enlatados', icon: '🥫' },
  { name: 'Bebidas', icon: '🥤' },
  { name: 'Limpieza', icon: '🧴' },
  { name: 'Freezer', icon: '❄️' },
  { name: 'Almacén', icon: '🌾' },
]

const FALLBACK_IMAGES: Record<string, string> = {
  'Lácteos': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
  'Enlatados': 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80',
  'Bebidas': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80',
  'Limpieza': 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80',
  'Freezer': 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80',
  'Almacén': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
}

export default function PublicCatalog({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const router = useRouter()

  const filtered = activeCategory === 'Todos'
    ? products
    : products.filter(p => p.category === activeCategory)

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price)

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-700 to-violet-900 text-white py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Catálogo de Productos</h1>
          <p className="text-violet-200 text-lg max-w-xl mx-auto">
            Precios mayoristas para comercios y revendedores. Pedí fácil y rápido.
          </p>
        </div>
      </section>

      {/* Category filters */}
      <section className="bg-violet-50 border-b border-violet-100 py-4 px-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                  activeCategory === cat.name
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-white text-violet-700 border border-violet-200 hover:bg-violet-100'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No hay productos en esta categoría.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-square bg-gray-50">
                  <img
                    src={product.imageUrl || FALLBACK_IMAGES[product.category] || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {product.featured && (
                    <span className="absolute top-2 left-2 bg-violet-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      Oferta
                    </span>
                  )}
                </div>

                <div className="p-3 flex flex-col flex-1">
                  <span className="text-xs text-violet-500 font-medium mb-1">{product.category}</span>
                  <h3 className="text-sm font-semibold text-gray-800 leading-tight mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-gray-400 mb-2">{product.unit}</p>
                  <div className="mt-auto">
                    <p className="text-base font-bold text-violet-700 mb-2">{formatPrice(product.price)}</p>
                    <button
                      onClick={() => router.push('/login')}
                      className="w-full bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold py-1.5 rounded-lg transition-colors"
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA footer */}
      <section className="bg-violet-900 text-white py-12 px-4 mt-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">¿Sos comercio o revendedor?</h2>
          <p className="text-violet-200 mb-6">Accedé a precios mayoristas y hacé tus pedidos online.</p>
          <button
            onClick={() => router.push('/login')}
            className="bg-white text-violet-900 font-bold px-8 py-3 rounded-lg hover:bg-violet-50 transition-colors"
          >
            Acceso a Comercios
          </button>
        </div>
      </section>
    </main>
  )
}

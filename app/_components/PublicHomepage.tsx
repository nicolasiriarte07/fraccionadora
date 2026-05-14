'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FCLogo from './FCLogo'

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

// TODO: replace with real WhatsApp number
const WA = 'https://wa.me/5492291400000?text=Hola!%20Me%20interesa%20conocer%20sus%20productos.'

const FALLBACK_IMGS: Record<string, string> = {
  Lácteos:   'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
  Enlatados: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80',
  Bebidas:   'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80',
  Limpieza:  'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80',
  Freezer:   'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80',
  Almacén:   'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
}

const CATEGORIES = [
  { label: 'Almacén',   icon: '🌾', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',  db: 'Almacén'  },
  { label: 'Bebidas',   icon: '🥤', img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80',  db: 'Bebidas'  },
  { label: 'Limpieza',  icon: '🧴', img: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80', db: 'Limpieza'  },
  { label: 'Congelados',icon: '❄️', img: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&q=80',  db: 'Freezer'  },
  { label: 'Lácteos',   icon: '🥛', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',  db: 'Lácteos'  },
  { label: 'Enlatados', icon: '🥫', img: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80', db: 'Enlatados' },
]

const BRANDS = [
  'Molinos Ala', 'S&P', 'Amanda', 'Terrabusi', "Hellmann's",
  'Arcor', 'La Serenísima', 'Danone', 'Unilever', 'Marolio', 'Quilmes', 'Villavicencio',
]

export default function PublicHomepage({ products }: { products: Product[] }) {
  const router = useRouter()
  const [activeCat, setActiveCat] = useState<string | null>(null)

  const featured  = products.filter(p => p.featured)
  const displayed = activeCat
    ? products.filter(p => p.category === activeCat)
    : featured.length > 0 ? featured : products.slice(0, 10)

  const fmt = (n: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)

  return (
    <>
      {/* ── HERO ── left text + right gondola image ─────────────────── */}
      <section
        id="inicio"
        className="relative overflow-hidden flex items-center"
        style={{ background: 'linear-gradient(105deg, #1a0f2e 0%, #452C6E 100%)' }}
      >
        {/* Right-side gondola image (visible on lg+) */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[52%]">
          <img
            src="https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=1200&q=80"
            alt="Góndola de supermercado"
            className="w-full h-full object-cover object-center"
          />
          {/* Fade from left so text side blends in */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, #452C6E 0%, rgba(69,44,110,0.6) 35%, transparent 65%)' }}
          />
        </div>

        {/* Left content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/80 text-xs font-semibold">Distribución mayorista · Desde 1990</span>
            </div>

            <h1
              className="font-poppins font-black text-white leading-none mb-4"
              style={{ fontFamily: 'var(--font-poppins, sans-serif)', fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}
            >
              DISTRIBUIMOS<br />
              <span style={{ color: '#C4A8F0' }}>CALIDAD,</span><br />
              ENTREGAMOS<br />
              <span style={{ color: '#A78BD6' }}>CONFIANZA.</span>
            </h1>

            <p className="text-white/65 text-base max-w-md mb-7 leading-relaxed">
              Distribuidores mayoristas de alimentos y artículos de limpieza para comercios y negocios de la región.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-poppins font-bold bg-white text-[#452C6E] px-7 py-3 rounded-full text-sm hover:bg-[#F5F3FA] transition-all hover:scale-105 shadow-lg"
                style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
              >
                Ver catálogo
              </button>
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-7 py-3 rounded-full text-sm transition-all hover:scale-105 shadow-lg"
              >
                <WaIcon className="w-4 h-4" />
                Pedir por WhatsApp
              </a>
            </div>

            {/* Compact stats */}
            <div className="flex flex-wrap gap-3">
              {[
                { value: '+500', label: 'productos' },
                { value: '5',    label: 'localidades' },
                { value: '+30',  label: 'años' },
              ].map(s => (
                <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-5 py-3 text-center">
                  <span
                    className="block font-poppins font-black text-white text-xl"
                    style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
                  >
                    {s.value}
                  </span>
                  <span className="text-white/50 text-[11px]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
            <path d="M0 48V24C360 0 720 48 1080 24C1260 12 1360 40 1440 48H0Z" fill="#F5F3FA" />
          </svg>
        </div>
      </section>

      {/* ── BENEFITS ──────────────────────────────────────────────── */}
      <section className="py-14 px-4" style={{ background: '#452C6E' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {BENEFITS.map(b => (
            <div key={b.title} className="bg-white/10 hover:bg-white/20 transition-colors rounded-2xl p-6 text-center border border-white/15">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/15 mb-3 text-white">
                {b.icon}
              </div>
              <h3
                className="font-poppins font-bold text-white text-sm mb-1"
                style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
              >
                {b.title}
              </h3>
              <p className="text-white/55 text-xs">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────── */}
      <section id="productos" className="py-20 px-4 bg-[#F5F3FA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#6E4BA5] text-xs font-bold uppercase tracking-[0.2em]">Nuestro catálogo</span>
            <h2
              className="font-poppins font-black text-[#232323] mt-2"
              style={{ fontFamily: 'var(--font-poppins, sans-serif)', fontSize: 'clamp(2rem, 5vw, 2.75rem)' }}
            >
              CATEGORÍAS
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map(cat => (
              <button
                key={cat.label}
                onClick={() => setActiveCat(activeCat === cat.db ? null : cat.db)}
                className="group relative overflow-hidden rounded-2xl aspect-square shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0 flex flex-col items-center justify-end pb-4 transition-all duration-300"
                  style={{
                    background: activeCat === cat.db
                      ? 'linear-gradient(to top, #452C6E 0%, rgba(69,44,110,0.85) 100%)'
                      : 'linear-gradient(to top, rgba(35,35,35,0.92) 0%, rgba(35,35,35,0.15) 60%)',
                  }}
                >
                  <span className="text-xl mb-1">{cat.icon}</span>
                  <span
                    className="text-white font-black text-xs uppercase tracking-wider"
                    style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
                  >
                    {cat.label}
                  </span>
                  {activeCat === cat.db && (
                    <span className="text-[#C4A8F0] text-[10px] mt-0.5 font-semibold">✓ filtrando</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {activeCat && (
            <div className="text-center mt-6">
              <button
                onClick={() => setActiveCat(null)}
                className="text-[#6E4BA5] text-sm font-semibold border border-[#6E4BA5] px-6 py-2 rounded-full hover:bg-[#6E4BA5] hover:text-white transition-colors"
              >
                Ver todas las categorías
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── FEATURED OFFERS ───────────────────────────────────────── */}
      <section id="ofertas" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <span className="text-[#6E4BA5] text-xs font-bold uppercase tracking-[0.2em]">
                {activeCat ? 'Categoría seleccionada' : 'Lo mejor de la semana'}
              </span>
              <h2
                className="font-poppins font-black text-[#232323] mt-1"
                style={{ fontFamily: 'var(--font-poppins, sans-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
              >
                {activeCat
                  ? (CATEGORIES.find(c => c.db === activeCat)?.label ?? activeCat).toUpperCase()
                  : 'OFERTAS DESTACADAS'}
              </h2>
            </div>
            <button
              onClick={() => router.push('/login')}
              className="text-[#6E4BA5] font-semibold text-sm border-b border-[#6E4BA5] hover:text-[#452C6E] transition-colors whitespace-nowrap"
            >
              Ver más ofertas →
            </button>
          </div>

          {displayed.length === 0 ? (
            <p className="text-center text-gray-400 py-20">No hay productos en esta categoría.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {displayed.map(p => (
                <ProductCard key={p.id} product={p} fmt={fmt} onAction={() => router.push('/login')} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── PROMO BANNER ──────────────────────────────────────────── */}
      <section
        className="relative py-24 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a0f2e 0%, #452C6E 55%, #6E4BA5 100%)' }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(167,139,214,0.2) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
            <span className="text-[#C4A8F0] text-sm font-bold tracking-wide">🏆 FRACCIONADORA CARHUÉ</span>
          </div>
          <h2
            className="font-poppins font-black text-white leading-none mb-6"
            style={{ fontFamily: 'var(--font-poppins, sans-serif)', fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}
          >
            CALIDAD QUE<br />
            <span style={{ color: '#A78BD6' }}>SE SIENTE.</span>
          </h2>
          <p className="text-white/65 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Más de 30 años distribuyendo las mejores marcas a los comercios de la región pampeana bonaerense.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg"
            >
              <WaIcon className="w-5 h-5" />
              Escribinos ahora
            </a>
            <button
              onClick={() => router.push('/login')}
              className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105"
            >
              Acceso a Comercios
            </button>
          </div>
        </div>
      </section>

      {/* ── BRANDS ────────────────────────────────────────────────── */}
      <section id="marcas" className="py-16 px-4 bg-[#F5F3FA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#6E4BA5] text-xs font-bold uppercase tracking-[0.2em]">Trabajamos con</span>
            <h2
              className="font-poppins font-black text-[#232323] mt-2 text-3xl"
              style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
            >
              MARCAS DESTACADAS
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {BRANDS.map(brand => (
              <div
                key={brand}
                className="bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100 hover:border-[#A78BD6] hover:shadow-md transition-all cursor-default"
              >
                <span
                  className="font-poppins font-black text-[#452C6E] text-base whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
                >
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer id="contacto" className="bg-[#232323] text-white pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <FCLogo size={56} />
                <div>
                  <div
                    className="font-poppins font-bold text-white text-xs tracking-widest uppercase"
                    style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
                  >
                    Fraccionadora
                  </div>
                  <div
                    className="font-poppins font-black text-[#A78BD6] text-lg uppercase"
                    style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
                  >
                    Carhué
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Distribuidora mayorista de alimentos y artículos de limpieza. Desde 1990 al servicio de los comercios de la región.
              </p>
            </div>

            {/* Cobertura */}
            <div>
              <h4
                className="font-poppins font-bold text-white mb-4 text-xs uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
              >
                Zona de cobertura
              </h4>
              <ul className="space-y-2">
                {['Carhué', 'Rivera', 'Puan', 'Espartillar', 'Pigüé'].map(city => (
                  <li key={city} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="w-1.5 h-1.5 bg-[#A78BD6] rounded-full flex-shrink-0" />
                    {city}
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div>
              <h4
                className="font-poppins font-bold text-white mb-4 text-xs uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
              >
                Empresa
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {['Nosotros', 'Productos', 'Ofertas', 'Marcas', 'Acceso Comercios'].map(item => (
                  <li key={item}>
                    <span className="hover:text-[#A78BD6] cursor-pointer transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4
                className="font-poppins font-bold text-white mb-4 text-xs uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
              >
                Contacto
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <a href={WA} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-green-400 transition-colors">
                    <WaIcon className="w-4 h-4" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-[#A78BD6] transition-colors">
                    <IgIcon className="w-4 h-4" />
                    Instagram
                  </a>
                </li>
                <li className="text-gray-500 text-xs pt-1">Carhué, Buenos Aires, Argentina</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <span>© 2025 Fraccionadora Carhué. Todos los derechos reservados.</span>
            <span>Distribución mayorista desde 1990</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl hover:scale-110 transition-all"
        title="Escribinos por WhatsApp"
      >
        <WaIcon className="w-7 h-7" />
      </a>
    </>
  )
}

/* ── Product card ────────────────────────────────────────────────────────── */
function ProductCard({ product, fmt, onAction }: {
  product: Product
  fmt: (n: number) => string
  onAction: () => void
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={product.imageUrl || FALLBACK_IMGS[product.category] || FALLBACK_IMGS['Almacén']}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.featured && (
          <div
            className="absolute top-2 left-2 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide"
            style={{ background: 'linear-gradient(135deg, #452C6E, #6E4BA5)' }}
          >
            OFERTA
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[#6E4BA5] text-[10px] font-bold px-2 py-1 rounded-full">
          {product.category}
        </div>
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-xs font-bold text-[#232323] leading-tight mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-[11px] text-gray-400 mb-2">{product.unit}</p>
        <div className="mt-auto">
          <div
            className="font-poppins font-black text-[#452C6E] text-lg leading-tight"
            style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
          >
            {fmt(product.price)}
          </div>
          <div className="text-[10px] text-gray-400 mb-2.5">por {product.unit}</div>
          <button
            onClick={onAction}
            className="w-full text-white text-xs font-bold py-2 rounded-xl transition-colors"
            style={{ background: 'linear-gradient(135deg, #452C6E, #6E4BA5)' }}
          >
            Pedir ahora
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Static benefit cards data ───────────────────────────────────────────── */
const BENEFITS = [
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>,
    title: 'Distribución eficiente',
    desc: 'Llegamos a tiempo, siempre.',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
    title: 'Productos de calidad',
    desc: 'Seleccionamos lo mejor para vos.',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    title: 'Compromiso y confianza',
    desc: 'Acompañamos tu negocio en cada paso.',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    title: 'Carhué, nuestro origen',
    desc: 'Conocemos la zona, estamos cerca.',
  },
]

/* ── SVG icons ───────────────────────────────────────────────────────────── */
function WaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
function IgIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

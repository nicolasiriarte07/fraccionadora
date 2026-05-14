'use client'

import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Productos', href: '/#productos' },
  { label: 'Ofertas', href: '/#ofertas' },
  { label: 'Marcas', href: '/#marcas' },
  { label: 'Contacto', href: '/#contacto' },
]

// TODO: replace with real WhatsApp number
const WA = 'https://wa.me/5492291400000?text=Hola!%20Me%20interesa%20conocer%20sus%20productos.'

export default function PublicHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      {/* Delivery bar */}
      <div className="bg-[#452C6E] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>
          <span className="font-semibold tracking-wide">ENTREGAS GRATIS EN:</span>
          <span className="text-[#C4A8F0]">Carhué · Rivera · Puan · Espartillar · Pigüé</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <FCLogo />
            <div className="hidden sm:block leading-tight">
              <div className="font-poppins font-bold text-[#452C6E] text-sm tracking-widest uppercase" style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}>
                Fraccionadora
              </div>
              <div className="font-poppins font-black text-[#452C6E] text-xl tracking-wider uppercase" style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}>
                Carhué
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-5">
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-semibold text-[#232323] hover:text-[#6E4BA5] transition-colors uppercase tracking-widest"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-2">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-full transition-all"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
            <Link
              href="/login"
              className="bg-[#452C6E] hover:bg-[#6E4BA5] text-white text-xs font-bold px-4 py-2 rounded-full transition-all whitespace-nowrap"
            >
              Acceso Comercios
            </Link>
            <button
              className="lg:hidden p-1.5 text-[#452C6E]"
              onClick={() => setOpen(!open)}
              aria-label="Menú"
            >
              {open ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-semibold text-[#232323] hover:text-[#6E4BA5] uppercase tracking-widest"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 text-white text-sm font-bold px-4 py-2.5 rounded-full w-fit mt-3"
            >
              <WhatsAppIcon />
              Escribinos por WhatsApp
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}

function FCLogo() {
  return (
    <div
      className="w-12 h-12 rounded-full flex flex-col items-center justify-center flex-shrink-0 border-2 border-[#A78BD6]"
      style={{ background: 'linear-gradient(135deg, #452C6E 0%, #6E4BA5 100%)' }}
    >
      <span className="text-[5.5px] text-[#C4A8F0] font-bold tracking-widest uppercase leading-none">FRACCIONADORA</span>
      <span
        className="text-[17px] text-white font-black leading-tight"
        style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
      >
        FC
      </span>
      <span className="text-[5.5px] text-[#C4A8F0] font-bold tracking-widest uppercase leading-none">CARHUÉ · 1990</span>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

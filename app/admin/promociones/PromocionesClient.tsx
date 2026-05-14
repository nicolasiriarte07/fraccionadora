'use client'

import { useState, useCallback } from 'react'
import type { PromoItem } from './PromocionPDF'

type Product = {
  id: string
  name: string
  description: string | null
  category: string
  unit: string
  price: number
  imageUrl: string | null
}

type PromoConfig = Omit<PromoItem, 'id' | 'name' | 'unit' | 'imageUrl'>

function defaultConfig(p: Product): PromoConfig {
  return {
    ofertaType: null,
    isMarca: false,
    promoPrice: new Intl.NumberFormat('es-AR').format(p.price),
    minUnitsBadge: 'DESDE 6 UNIDADES',
    pricePerUnit: '',
    pricePerUnitLabel: 'KG',
  }
}

function fmt(n: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)
}

// ── Status pill ───────────────────────────────────────────────────────────────
function StatusPill({ label, count, required, color }: { label: string; count: number; required: number; color: string }) {
  const ok = count === required
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${ok ? 'border-green-400 bg-green-500/10 text-green-300' : 'border-white/20 bg-white/5 text-white/60'}`}>
      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${ok ? 'bg-green-500 text-white' : `text-white`}`}
        style={{ backgroundColor: ok ? '' : color }}>
        {count}
      </span>
      {label}: {count}/{required}
    </div>
  )
}

export default function PromocionesClient({ products }: { products: Product[] }) {
  const [selected, setSelected] = useState<Record<string, PromoConfig>>({})
  const [filterCat, setFilterCat] = useState<string>('Todos')
  const [generating, setGenerating] = useState(false)

  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category))).sort()]
  const visible = filterCat === 'Todos' ? products : products.filter(p => p.category === filterCat)

  const selectedIds = Object.keys(selected)
  const principals   = selectedIds.filter(id => selected[id].ofertaType === 'principal')
  const secondaries  = selectedIds.filter(id => selected[id].ofertaType === 'secundaria')
  const regulars     = selectedIds.filter(id => selected[id].ofertaType === null)

  const ready = principals.length === 1 && secondaries.length === 1 && regulars.length === 16

  function toggle(p: Product) {
    setSelected(prev => {
      if (prev[p.id]) {
        const next = { ...prev }
        delete next[p.id]
        return next
      }
      return { ...prev, [p.id]: defaultConfig(p) }
    })
  }

  function updateConfig(id: string, patch: Partial<PromoConfig>) {
    setSelected(prev => ({ ...prev, [id]: { ...prev[id], ...patch } }))
  }

  function setOfertaType(p: Product, type: 'principal' | 'secundaria' | null) {
    setSelected(prev => {
      const next = { ...prev }
      // Remove the same type from any other product
      if (type !== null) {
        for (const k of Object.keys(next)) {
          if (next[k].ofertaType === type) {
            next[k] = { ...next[k], ofertaType: null }
          }
        }
      }
      if (!next[p.id]) next[p.id] = defaultConfig(p)
      next[p.id] = { ...next[p.id], ofertaType: type }
      return next
    })
  }

  const handleGeneratePDF = useCallback(async () => {
    if (!ready) return
    setGenerating(true)
    try {
      const reactPdf = await import('@react-pdf/renderer')
      const { default: PromocionPDF } = await import('./PromocionPDF')
      const React = await import('react')

      // Build ordered items: principal first, then regulars in selection order, secundaria last
      const principalItem = buildItem(principals[0])
      const secundariaItem = buildItem(secondaries[0])
      const regularItems = regulars.map(id => buildItem(id))

      const items: PromoItem[] = [principalItem, ...regularItems, secundariaItem]

      function buildItem(id: string): PromoItem {
        const p = products.find(pr => pr.id === id)!
        return { id, name: p.name, unit: p.unit, imageUrl: p.imageUrl, ...selected[id] }
      }

      const date = new Date().toISOString().split('T')[0]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = await reactPdf.pdf(React.createElement(PromocionPDF, { items }) as any).toBlob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Promociones-FraccionadoraCarhue-${date}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Error generando PDF:', err)
      alert('Error al generar el PDF. Revisá la consola.')
    } finally {
      setGenerating(false)
    }
  }, [ready, principals, secondaries, regulars, selected, products])

  return (
    <div className="min-h-screen bg-[#F5F3FA]">

      {/* ── Top bar ── */}
      <div
        className="sticky top-0 z-30 px-6 py-3 shadow-md"
        style={{ background: 'linear-gradient(135deg, #2D1B69 0%, #452C6E 100%)' }}
      >
        <div className="flex items-center justify-between gap-4 mb-2">
          <h1 className="font-poppins font-black text-white text-lg tracking-wide" style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}>
            GENERADOR DE PROMOCIONES
          </h1>
          <button
            onClick={handleGeneratePDF}
            disabled={!ready || generating}
            className="flex items-center gap-2 bg-white text-[#2D1B69] font-black text-sm px-5 py-2.5 rounded-xl disabled:opacity-40 hover:bg-[#F0EDF8] transition-all hover:scale-105 shadow-lg"
            style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
          >
            {generating ? (
              <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>Generando...</>
            ) : (
              <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>Generar PDF</>
            )}
          </button>
        </div>

        {/* Progress indicators */}
        <div className="flex items-center gap-2 flex-wrap">
          <StatusPill label="Oferta Principal" count={principals.length} required={1} color="#F59E0B" />
          <StatusPill label="Oferta Secundaria" count={secondaries.length} required={1} color="#8B5CF6" />
          <StatusPill label="Productos" count={regulars.length} required={16} color="#6B3FA0" />
          {ready && (
            <span className="text-green-400 text-xs font-bold flex items-center gap-1">
              ✓ Listo para generar
            </span>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* ── Legend ── */}
        <div className="flex gap-4 mb-4 text-xs flex-wrap">
          <div className="flex items-center gap-1.5 text-gray-500">
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" /> Oferta Principal (1) — aparece arriba izquierda, grande
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <span className="w-3 h-3 rounded-full bg-violet-500 inline-block" /> Oferta Secundaria (1) — aparece abajo derecha, grande
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <span className="w-3 h-3 rounded-full bg-[#452C6E] inline-block" /> Productos regulares (16) — grilla
          </div>
        </div>

        {/* ── Category filter ── */}
        <div className="flex gap-2 flex-wrap mb-5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                filterCat === cat
                  ? 'bg-[#452C6E] text-white shadow-md'
                  : 'bg-white text-[#452C6E] border border-[#C4A8F0] hover:bg-[#F0EDF8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Product grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {visible.map(p => {
            const cfg = selected[p.id]
            const isSelected = !!cfg
            const ofType = cfg?.ofertaType

            const borderColor = ofType === 'principal' ? 'ring-amber-400' : ofType === 'secundaria' ? 'ring-violet-500' : isSelected ? 'ring-[#6B3FA0]' : ''

            return (
              <div
                key={p.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-200 ${
                  isSelected ? `ring-2 ${borderColor} shadow-lg` : 'hover:shadow-md'
                }`}
              >
                {/* Image + click to select */}
                <div className="relative h-32 cursor-pointer" onClick={() => toggle(p)}>
                  {p.imageUrl
                    ? <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full bg-[#E9E2F8]" />}
                  {isSelected && <div className="absolute inset-0 bg-[#2D1B69]/15" />}

                  {/* Checkbox */}
                  <div className={`absolute top-2 left-2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected ? 'bg-[#6B3FA0] border-[#6B3FA0]' : 'bg-white/90 border-gray-300'
                  }`}>
                    {isSelected && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>

                  {/* Oferta type badge */}
                  {ofType === 'principal' && (
                    <div className="absolute top-2 right-2 bg-amber-400 text-black text-[9px] font-black px-1.5 py-0.5 rounded-full">PRINCIPAL</div>
                  )}
                  {ofType === 'secundaria' && (
                    <div className="absolute top-2 right-2 bg-violet-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">SECUNDARIA</div>
                  )}
                  {cfg?.isMarca && (
                    <div className="absolute bottom-2 right-2 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">MARCA</div>
                  )}
                </div>

                {/* Info */}
                <div className="p-2.5">
                  <p className="text-[9px] font-bold text-[#9B6FD4] uppercase tracking-widest mb-0.5">{p.category}</p>
                  <p className="font-bold text-[#1a1a1a] text-xs leading-tight mb-0.5" style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}>
                    {p.name}
                  </p>
                  <p className="text-[#452C6E] font-bold text-sm">{fmt(p.price)}</p>
                </div>

                {/* ── Expanded config ── */}
                {isSelected && cfg && (
                  <div className="border-t border-[#E9E2F8] px-2.5 pb-3 pt-2 space-y-2 bg-[#F8F6FF]">

                    {/* Oferta type buttons */}
                    <div className="grid grid-cols-3 gap-1">
                      <button
                        onClick={() => setOfertaType(p, ofType === 'principal' ? null : 'principal')}
                        className={`text-[9px] font-black py-1 rounded-lg transition-all ${
                          ofType === 'principal' ? 'bg-amber-400 text-black' : 'bg-white text-amber-600 border border-amber-200 hover:bg-amber-50'
                        }`}
                      >
                        ★ PRINCIPAL
                      </button>
                      <button
                        onClick={() => setOfertaType(p, ofType === 'secundaria' ? null : 'secundaria')}
                        className={`text-[9px] font-black py-1 rounded-lg transition-all ${
                          ofType === 'secundaria' ? 'bg-violet-500 text-white' : 'bg-white text-violet-600 border border-violet-200 hover:bg-violet-50'
                        }`}
                      >
                        ★ SECUNDARIA
                      </button>
                      <button
                        onClick={() => updateConfig(p.id, { isMarca: !cfg.isMarca })}
                        className={`text-[9px] font-black py-1 rounded-lg transition-all ${
                          cfg.isMarca ? 'bg-red-500 text-white' : 'bg-white text-red-500 border border-red-200 hover:bg-red-50'
                        }`}
                      >
                        MARCA
                      </button>
                    </div>

                    {/* Precio promo */}
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">Precio promo</label>
                      <div className="flex items-center border border-[#C4A8F0] rounded-lg overflow-hidden bg-white">
                        <span className="px-1.5 text-[#452C6E] font-bold text-xs">$</span>
                        <input
                          type="text"
                          value={cfg.promoPrice}
                          onChange={e => updateConfig(p.id, { promoPrice: e.target.value })}
                          className="flex-1 py-1 pr-2 text-xs focus:outline-none"
                          placeholder="38.000"
                        />
                      </div>
                    </div>

                    {/* Badge text */}
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">Badge mínimas</label>
                      <input
                        type="text"
                        value={cfg.minUnitsBadge}
                        onChange={e => updateConfig(p.id, { minUnitsBadge: e.target.value })}
                        className="w-full border border-[#C4A8F0] rounded-lg px-2 py-1 text-xs focus:outline-none bg-white"
                        placeholder="DESDE 6 UNIDADES"
                      />
                    </div>

                    {/* Precio por unidad */}
                    <div>
                      <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">Precio por unidad</label>
                      <div className="flex gap-1">
                        <input
                          type="text"
                          value={cfg.pricePerUnit}
                          onChange={e => updateConfig(p.id, { pricePerUnit: e.target.value })}
                          className="flex-1 border border-[#C4A8F0] rounded-lg px-2 py-1 text-xs focus:outline-none bg-white"
                          placeholder="1.900"
                        />
                        <select
                          value={cfg.pricePerUnitLabel}
                          onChange={e => updateConfig(p.id, { pricePerUnitLabel: e.target.value as PromoItem['pricePerUnitLabel'] })}
                          className="border border-[#C4A8F0] rounded-lg px-1.5 py-1 text-xs focus:outline-none bg-white text-[#452C6E] font-bold"
                        >
                          <option>KG</option>
                          <option>LT</option>
                          <option>UN</option>
                          <option>MT</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {visible.length === 0 && (
          <p className="text-center text-gray-400 py-20">No hay productos en esta categoría.</p>
        )}
      </div>
    </div>
  )
}

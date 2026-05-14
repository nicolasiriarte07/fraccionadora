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
  const formatted = new Intl.NumberFormat('es-AR').format(p.price)
  return {
    isOferta: false,
    isMarca: false,
    promoPrice: formatted,
    minUnits: '6',
    pricePerUnit: '',
    pricePerUnitLabel: 'KG',
  }
}

function fmt(n: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)
}

export default function PromocionesClient({ products }: { products: Product[] }) {
  const [selected, setSelected] = useState<Record<string, PromoConfig>>({})
  const [filterCat, setFilterCat] = useState<string>('Todos')
  const [generating, setGenerating] = useState(false)

  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category))).sort()]
  const visible = filterCat === 'Todos' ? products : products.filter(p => p.category === filterCat)
  const selectedCount = Object.keys(selected).length
  const ofertaCount = Object.values(selected).filter(c => c.isOferta).length

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
    setSelected(prev => ({
      ...prev,
      [id]: { ...prev[id], ...patch },
    }))
  }

  function toggleOferta(p: Product) {
    const cfg = selected[p.id]
    if (!cfg) return
    // Only one OFERTA at a time
    if (!cfg.isOferta) {
      setSelected(prev => {
        const next = { ...prev }
        for (const k of Object.keys(next)) {
          next[k] = { ...next[k], isOferta: false }
        }
        next[p.id] = { ...next[p.id], isOferta: true }
        return next
      })
    } else {
      updateConfig(p.id, { isOferta: false })
    }
  }

  const handleGeneratePDF = useCallback(async () => {
    if (selectedCount === 0) return
    setGenerating(true)
    try {
      const reactPdf = await import('@react-pdf/renderer')
      const { default: PromocionPDF } = await import('./PromocionPDF')
      const React = await import('react')

      const items: PromoItem[] = Object.entries(selected).map(([id, cfg]) => {
        const p = products.find(pr => pr.id === id)!
        return {
          id,
          name: p.name,
          unit: p.unit,
          imageUrl: p.imageUrl,
          ...cfg,
        }
      })

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
  }, [selected, selectedCount, products])

  return (
    <div className="min-h-screen bg-[#F5F3FA]">
      {/* ── Top bar ── */}
      <div
        className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between gap-4 shadow-md"
        style={{ background: 'linear-gradient(135deg, #2D1B69 0%, #452C6E 100%)' }}
      >
        <div>
          <h1
            className="font-poppins font-black text-white text-xl tracking-wide"
            style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
          >
            GENERADOR DE PROMOCIONES
          </h1>
          <p className="text-white/55 text-xs mt-0.5">
            {selectedCount === 0
              ? 'Seleccioná productos para incluir en el catálogo'
              : `${selectedCount} producto${selectedCount !== 1 ? 's' : ''} seleccionado${selectedCount !== 1 ? 's' : ''}${ofertaCount > 0 ? ` · ${ofertaCount} OFERTA` : ''}`}
          </p>
        </div>

        <button
          onClick={handleGeneratePDF}
          disabled={selectedCount === 0 || generating}
          className="flex items-center gap-2 bg-white text-[#2D1B69] font-black text-sm px-6 py-3 rounded-xl disabled:opacity-40 hover:bg-[#F0EDF8] transition-all hover:scale-105 shadow-lg"
          style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
        >
          {generating ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generando...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Generar PDF
            </>
          )}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ── Category filter ── */}
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filterCat === cat
                  ? 'bg-[#452C6E] text-white shadow-md'
                  : 'bg-white text-[#452C6E] border border-[#C4A8F0] hover:bg-[#F0EDF8]'
              }`}
              style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Product grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {visible.map(p => {
            const cfg = selected[p.id]
            const isSelected = !!cfg

            return (
              <div
                key={p.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-200 ${
                  isSelected ? 'ring-2 ring-[#6B3FA0] shadow-lg' : 'hover:shadow-md'
                }`}
              >
                {/* Image + checkbox */}
                <div
                  className="relative h-36 cursor-pointer"
                  onClick={() => toggle(p)}
                >
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#E9E2F8]" />
                  )}

                  {/* Overlay when selected */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-[#2D1B69]/20" />
                  )}

                  {/* Checkbox */}
                  <div
                    className={`absolute top-2 left-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#6B3FA0] border-[#6B3FA0]'
                        : 'bg-white/90 border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                  {/* OFERTA badge */}
                  {cfg?.isOferta && (
                    <div className="absolute top-2 right-2 bg-[#6B3FA0] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                      OFERTA
                    </div>
                  )}
                  {/* MARCA badge */}
                  {cfg?.isMarca && (
                    <div className="absolute bottom-2 right-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded">
                      MARCA
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-[10px] font-bold text-[#9B6FD4] uppercase tracking-widest mb-0.5">{p.category}</p>
                  <p
                    className="font-bold text-[#1a1a1a] text-xs leading-tight mb-1"
                    style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
                  >
                    {p.name}
                  </p>
                  <p className="text-gray-400 text-[10px]">{p.unit}</p>
                  <p className="text-[#452C6E] font-bold text-sm mt-1">{fmt(p.price)}</p>
                </div>

                {/* ── Expanded config when selected ── */}
                {isSelected && cfg && (
                  <div className="border-t border-[#E9E2F8] px-3 pb-3 pt-2 space-y-2 bg-[#F8F6FF]">

                    {/* Badge toggles */}
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => toggleOferta(p)}
                        className={`flex-1 text-[10px] font-black py-1 rounded-lg transition-all ${
                          cfg.isOferta
                            ? 'bg-[#6B3FA0] text-white'
                            : 'bg-white text-[#6B3FA0] border border-[#C4A8F0] hover:bg-[#F0EDF8]'
                        }`}
                        style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
                      >
                        {cfg.isOferta ? '★ OFERTA' : '☆ OFERTA'}
                      </button>
                      <button
                        onClick={() => updateConfig(p.id, { isMarca: !cfg.isMarca })}
                        className={`flex-1 text-[10px] font-black py-1 rounded-lg transition-all ${
                          cfg.isMarca
                            ? 'bg-red-500 text-white'
                            : 'bg-white text-red-500 border border-red-200 hover:bg-red-50'
                        }`}
                        style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
                      >
                        {cfg.isMarca ? '★ MARCA' : '☆ MARCA'}
                      </button>
                    </div>

                    {/* Precio promo */}
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-0.5">
                        Precio promo
                      </label>
                      <div className="flex items-center border border-[#C4A8F0] rounded-lg overflow-hidden bg-white">
                        <span className="px-2 text-[#452C6E] font-bold text-xs">$</span>
                        <input
                          type="text"
                          value={cfg.promoPrice}
                          onChange={e => updateConfig(p.id, { promoPrice: e.target.value })}
                          className="flex-1 py-1.5 pr-2 text-xs focus:outline-none"
                          placeholder="38.000"
                        />
                      </div>
                    </div>

                    {/* Unidades mínimas */}
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-0.5">
                        Unidades mínimas
                      </label>
                      <input
                        type="text"
                        value={cfg.minUnits}
                        onChange={e => updateConfig(p.id, { minUnits: e.target.value })}
                        className="w-full border border-[#C4A8F0] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6B3FA0] bg-white"
                        placeholder="6"
                      />
                    </div>

                    {/* Precio por unidad */}
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-0.5">
                        Precio por unidad
                      </label>
                      <div className="flex gap-1">
                        <input
                          type="text"
                          value={cfg.pricePerUnit}
                          onChange={e => updateConfig(p.id, { pricePerUnit: e.target.value })}
                          className="flex-1 border border-[#C4A8F0] rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6B3FA0] bg-white"
                          placeholder="1.900"
                        />
                        <select
                          value={cfg.pricePerUnitLabel}
                          onChange={e => updateConfig(p.id, { pricePerUnitLabel: e.target.value as 'KG' | 'LT' | 'UN' })}
                          className="border border-[#C4A8F0] rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#6B3FA0] bg-white text-[#452C6E] font-bold"
                        >
                          <option value="KG">KG</option>
                          <option value="LT">LT</option>
                          <option value="UN">UN</option>
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

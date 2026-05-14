import {
  Document, Page, View, Text, Image, StyleSheet, Svg, Polygon,
} from '@react-pdf/renderer'

// ── Brand colors ──────────────────────────────────────────────────────────────
const VD = '#2D1B69'
const VM = '#6B3FA0'
const VL = '#9B6FD4'
const VX = '#1a0f3e'   // extra dark for oferta card bg
const GY = '#666666'
const LG = '#999999'
const WH = '#FFFFFF'
const RD = '#CC3300'

export type PromoItem = {
  id: string
  name: string
  unit: string
  imageUrl: string | null
  ofertaType: 'principal' | 'secundaria' | null
  isMarca: boolean
  promoPrice: string
  minUnitsBadge: string   // e.g. "DESDE 6 UNIDADES"
  pricePerUnit: string
  pricePerUnitLabel: 'KG' | 'LT' | 'UN' | 'MT'
}

// ── Styles ────────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#EEEBF7',
    padding: 0,
    fontFamily: 'Helvetica',
  },

  // ── HEADER ──────────────────────────────────────────────────────────────────
  header: {
    backgroundColor: VD,
    flexDirection: 'row',
    alignItems: 'center',
    height: 68,
    paddingHorizontal: 14,
  },
  hLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    gap: 8,
  },
  badge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: VM,
    borderWidth: 2.5,
    borderColor: WH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeStars: { color: WH, fontSize: 7, textAlign: 'center', marginBottom: -1 },
  badgeFC: { color: WH, fontSize: 18, fontFamily: 'Helvetica-Bold', textAlign: 'center', marginTop: -2 },
  badgeCarhue: { color: 'rgba(255,255,255,0.6)', fontSize: 4, letterSpacing: 0.6, textAlign: 'center' },
  hCompany: { flex: 1 },
  hName: { color: WH, fontSize: 10, fontFamily: 'Helvetica-Bold', letterSpacing: 0.3 },
  hSub: { color: 'rgba(255,255,255,0.5)', fontSize: 6, letterSpacing: 0.4, marginTop: 1 },
  hDivider: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.2)', marginHorizontal: 10 },
  hCenter: { flex: 1, alignItems: 'center' },
  hTagline: { color: WH, fontSize: 11, textAlign: 'center' },
  hHighlight: { color: VL, fontFamily: 'Helvetica-Bold' },
  hRight: { width: '28%', alignItems: 'flex-end', gap: 4 },
  hTruck: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  hTruckIcon: { width: 26, height: 18, backgroundColor: VD },
  hEntregas: { color: WH, fontSize: 7, fontFamily: 'Helvetica-Bold' },
  hCities: { color: VL, fontSize: 6.5, textAlign: 'right' },

  // ── SUBHEADER ───────────────────────────────────────────────────────────────
  subHeader: {
    backgroundColor: WH,
    flexDirection: 'row',
    alignItems: 'center',
    height: 28,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD8F5',
  },
  sCatalogo: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  sCatalogoText: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#111', letterSpacing: 0.5 },
  sSearch: { flex: 1, marginHorizontal: 14, borderWidth: 1, borderColor: '#D0C8EE', borderRadius: 9, paddingHorizontal: 8, paddingVertical: 3, backgroundColor: '#F8F6FF' },
  sSearchText: { fontSize: 7, color: '#BBB' },
  sWaBtn: { backgroundColor: VM, borderRadius: 9, paddingHorizontal: 9, paddingVertical: 4, flexDirection: 'row', alignItems: 'center', gap: 3 },
  sWaText: { color: WH, fontSize: 6.5, fontFamily: 'Helvetica-Bold' },

  // ── CONTENT WRAPPER ─────────────────────────────────────────────────────────
  content: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 5,
    gap: 4,
  },

  // ── TOP / BOTTOM HERO ROWS ───────────────────────────────────────────────────
  heroRow: {
    flexDirection: 'row',
    height: 172,
    gap: 4,
  },
  // The merged oferta card (50% of row = 2 cols)
  ofertaMergedCard: {
    width: '50%',
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
  },
  ofertaImageHalf: {
    width: '48%',
    position: 'relative',
    backgroundColor: VX,
  },
  ofertaImg: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0, right: 0,
    objectFit: 'cover',
  },
  ofertaImgOverlay: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0, right: 0,
    background: 'linear-gradient(to right, rgba(26,15,62,0.4) 0%, transparent 100%)',
  },
  ofertaTextHalf: {
    flex: 1,
    backgroundColor: WH,
    padding: 9,
    justifyContent: 'space-between',
  },
  ofertaProductName: {
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
    color: '#111',
    textTransform: 'uppercase',
    lineHeight: 1.25,
    marginBottom: 2,
  },
  ofertaUnit: { fontSize: 7.5, color: GY, marginBottom: 5 },
  ofertaPricePerKg: { fontSize: 7, color: LG, marginBottom: 4 },

  // Small vertical cards (top-right or bottom-left pair)
  vertCard: {
    width: '25%',
    backgroundColor: WH,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  vertCardImg: {
    height: '55%',
    backgroundColor: '#F0EDF8',
    position: 'relative',
  },
  vertCardImgEl: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0, right: 0,
    objectFit: 'contain',
  },
  vertCardBody: {
    flex: 1,
    padding: 6,
    justifyContent: 'space-between',
  },
  vertProductName: {
    fontSize: 6.5,
    fontFamily: 'Helvetica-Bold',
    color: '#111',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    marginBottom: 1,
  },
  vertUnit: { fontSize: 6, color: GY, marginBottom: 3 },

  // ── MIDDLE GRID ─────────────────────────────────────────────────────────────
  gridRow: {
    flexDirection: 'row',
    height: 99,
    gap: 4,
  },
  hCard: {
    width: '25%',
    backgroundColor: WH,
    borderRadius: 6,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  hCardImgBox: {
    width: '34%',
    backgroundColor: '#F0EDF8',
    position: 'relative',
  },
  hCardImg: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0, right: 0,
    objectFit: 'contain',
  },
  hCardBody: {
    flex: 1,
    padding: 5,
    justifyContent: 'space-between',
  },
  hProductName: {
    fontSize: 6,
    fontFamily: 'Helvetica-Bold',
    color: '#111',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    marginBottom: 1,
  },
  hUnit: { fontSize: 5.5, color: GY, marginBottom: 2 },
  hPricePerKg: { fontSize: 5, color: LG, marginTop: 2 },

  // ── SHARED CARD ELEMENTS ─────────────────────────────────────────────────────
  minBadge: {
    backgroundColor: VD,
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 3,
  },
  minText: { color: WH, fontSize: 5.5, fontFamily: 'Helvetica-Bold' },
  minTextSm: { color: WH, fontSize: 5, fontFamily: 'Helvetica-Bold' },

  marcaBadge: {
    position: 'absolute',
    top: 4, right: 4,
    backgroundColor: RD,
    borderRadius: 3,
    paddingHorizontal: 3,
    paddingVertical: 1.5,
  },
  marcaText: { color: WH, fontSize: 5, fontFamily: 'Helvetica-Bold' },

  addBtnSm: {
    backgroundColor: VM,
    borderRadius: 3,
    paddingVertical: 3,
    alignItems: 'center',
    marginTop: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 2,
  },
  addBtnMd: {
    backgroundColor: VM,
    borderRadius: 5,
    paddingVertical: 5,
    alignItems: 'center',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 3,
  },
  addTextSm: { color: WH, fontSize: 5.5, fontFamily: 'Helvetica-Bold' },
  addTextMd: { color: WH, fontSize: 7, fontFamily: 'Helvetica-Bold' },

  // ── FOOTER ──────────────────────────────────────────────────────────────────
  footer: {
    backgroundColor: VD,
    flexDirection: 'row',
    height: 52,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: VM,
  },
  footerCol: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 4 },
  footerDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.15)' },
  footerIcon: { width: 26, height: 26, borderRadius: 13, backgroundColor: VM, alignItems: 'center', justifyContent: 'center' },
  footerIconText: { color: WH, fontSize: 11 },
  footerTextBlock: { flex: 1 },
  footerTitle: { color: WH, fontSize: 6, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 1.5 },
  footerDesc: { color: 'rgba(255,255,255,0.55)', fontSize: 5.5 },
})

// ── Helpers ───────────────────────────────────────────────────────────────────

function PriceArrow({ price, height = 24, fontSize = 14 }: { price: string; height?: number; fontSize?: number }) {
  const w = 105
  const tip = height / 2
  const pts = `0,0 ${w - tip},0 ${w},${tip} ${w - tip},${height} 0,${height}`
  return (
    <View style={{ height, width: w, position: 'relative', marginVertical: 3 }}>
      <Svg width={w} height={height} style={{ position: 'absolute', top: 0, left: 0 }}>
        <Polygon points={pts} fill={VM} />
      </Svg>
      <View style={{ position: 'absolute', top: 0, left: 0, right: tip, bottom: 0, justifyContent: 'center', paddingLeft: 7 }}>
        <Text style={{ color: WH, fontSize, fontFamily: 'Helvetica-Bold' }}>${price}</Text>
      </View>
    </View>
  )
}

function PriceArrowWide({ price, height = 22, fontSize = 13 }: { price: string; height?: number; fontSize?: number }) {
  const w = 95
  const tip = height / 2
  const pts = `0,0 ${w - tip},0 ${w},${tip} ${w - tip},${height} 0,${height}`
  return (
    <View style={{ height, width: w, position: 'relative', marginVertical: 2 }}>
      <Svg width={w} height={height} style={{ position: 'absolute', top: 0, left: 0 }}>
        <Polygon points={pts} fill={VM} />
      </Svg>
      <View style={{ position: 'absolute', top: 0, left: 0, right: tip, bottom: 0, justifyContent: 'center', paddingLeft: 6 }}>
        <Text style={{ color: WH, fontSize, fontFamily: 'Helvetica-Bold' }}>${price}</Text>
      </View>
    </View>
  )
}

function MinBadge({ text, sm = false }: { text: string; sm?: boolean }) {
  if (!text) return null
  return (
    <View style={s.minBadge}>
      <Text style={sm ? s.minTextSm : s.minText}>{text}</Text>
    </View>
  )
}

function OfertaMedal({ size = 62 }: { size?: number }) {
  const r = size / 2
  return (
    <View style={{
      position: 'absolute', top: 6, left: 6, zIndex: 10,
      width: size, height: size + 16,
    }}>
      {/* Circle */}
      <View style={{
        width: size, height: size, borderRadius: r,
        backgroundColor: '#4A1FA0',
        borderWidth: 2.5, borderColor: WH,
        alignItems: 'center', justifyContent: 'center',
      }}>
        <View style={{
          width: size - 10, height: size - 10, borderRadius: (size - 10) / 2,
          borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Text style={{ color: VL, fontSize: size * 0.12, fontFamily: 'Helvetica-Bold', marginBottom: 2 }}>★</Text>
          <Text style={{ color: WH, fontSize: size * 0.17, fontFamily: 'Helvetica-Bold', letterSpacing: 0.5 }}>OFERTA</Text>
          <Text style={{ color: VL, fontSize: size * 0.12, fontFamily: 'Helvetica-Bold', marginTop: 2 }}>★</Text>
        </View>
      </View>
      {/* Ribbon left */}
      <View style={{
        position: 'absolute', bottom: 0, left: r - 10,
        width: 8, height: 16, backgroundColor: '#4A1FA0',
        borderBottomLeftRadius: 2,
      }} />
      {/* Ribbon right */}
      <View style={{
        position: 'absolute', bottom: 0, left: r + 2,
        width: 8, height: 16, backgroundColor: '#6B3FA0',
        borderBottomRightRadius: 2,
      }} />
    </View>
  )
}

function MarcaBadge() {
  return (
    <View style={s.marcaBadge}>
      <Text style={s.marcaText}>NUESTRAS MARCAS</Text>
    </View>
  )
}

// ── Card components ───────────────────────────────────────────────────────────

function VertCard({ item }: { item: PromoItem }) {
  return (
    <View style={s.vertCard}>
      <View style={s.vertCardImg}>
        {item.imageUrl
          ? <Image src={item.imageUrl} style={s.vertCardImgEl} />
          : <View style={[s.vertCardImgEl, { backgroundColor: '#E9E2F8' }]} />}
        {item.isMarca && <MarcaBadge />}
      </View>
      <View style={s.vertCardBody}>
        <View>
          <Text style={s.vertProductName}>{item.name}</Text>
          <Text style={s.vertUnit}>x {item.unit}</Text>
        </View>
        <View>
          <MinBadge text={item.minUnitsBadge} sm />
          <PriceArrowWide price={item.promoPrice} height={20} fontSize={12} />
          {item.pricePerUnit
            ? <Text style={{ fontSize: 5, color: LG, marginTop: 1 }}>PRECIO X {item.pricePerUnitLabel}: ${item.pricePerUnit}</Text>
            : null}
          <View style={s.addBtnSm}>
            <Text style={s.addTextSm}>&#128722; AGREGAR</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

function HorizCard({ item }: { item: PromoItem }) {
  return (
    <View style={s.hCard}>
      <View style={s.hCardImgBox}>
        {item.imageUrl
          ? <Image src={item.imageUrl} style={s.hCardImg} />
          : <View style={[s.hCardImg, { backgroundColor: '#E9E2F8' }]} />}
        {item.isMarca && (
          <View style={[s.marcaBadge, { top: 3, right: 3, paddingHorizontal: 2 }]}>
            <Text style={[s.marcaText, { fontSize: 4 }]}>NUESTRAS{'\n'}MARCAS</Text>
          </View>
        )}
      </View>
      <View style={s.hCardBody}>
        <View>
          <Text style={s.hProductName}>{item.name}</Text>
          <Text style={s.hUnit}>x {item.unit}</Text>
        </View>
        <View>
          <MinBadge text={item.minUnitsBadge} sm />
          <PriceArrowWide price={item.promoPrice} height={19} fontSize={11} />
          {item.pricePerUnit
            ? <Text style={s.hPricePerKg}>PRECIO X {item.pricePerUnitLabel}: ${item.pricePerUnit}</Text>
            : null}
          <View style={s.addBtnSm}>
            <Text style={s.addTextSm}>&#128722; AGREGAR</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

function OfertaMergedCard({ item }: { item: PromoItem }) {
  return (
    <View style={s.ofertaMergedCard}>
      {/* Left dark image half */}
      <View style={s.ofertaImageHalf}>
        {item.imageUrl
          ? <Image src={item.imageUrl} style={s.ofertaImg} />
          : <View style={[s.ofertaImg, { backgroundColor: VX }]} />}
        <OfertaMedal size={60} />
      </View>
      {/* Right white text half */}
      <View style={s.ofertaTextHalf}>
        <View>
          <Text style={s.ofertaProductName}>{item.name}</Text>
          <Text style={s.ofertaUnit}>x {item.unit}</Text>
          {item.pricePerUnit
            ? <Text style={s.ofertaPricePerKg}>PRECIO X {item.pricePerUnitLabel}: ${item.pricePerUnit}</Text>
            : null}
        </View>
        <View>
          <MinBadge text={item.minUnitsBadge} />
          <PriceArrow price={item.promoPrice} height={26} fontSize={16} />
          <View style={s.addBtnMd}>
            <Text style={s.addTextMd}>&#128722; AGREGAR AL PEDIDO</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

// ── Header & footer ───────────────────────────────────────────────────────────

function Header() {
  return (
    <View style={s.header}>
      <View style={s.hLeft}>
        <View style={s.badge}>
          <Text style={s.badgeStars}>★ ★ ★</Text>
          <Text style={s.badgeFC}>FC</Text>
          <Text style={s.badgeCarhue}>CARHU&#201;</Text>
        </View>
        <View style={s.hCompany}>
          <Text style={s.hName}>FRACCIONADORA CARHU&#201;</Text>
          <Text style={s.hSub}>DISTRIBUCI&#211;N DE ALIMENTOS</Text>
        </View>
      </View>
      <View style={s.hDivider} />
      <View style={s.hCenter}>
        <Text style={s.hTagline}>
          {'Distribuimos '}
          <Text style={s.hHighlight}>calidad</Text>
          {',\n entregamos '}
          <Text style={s.hHighlight}>confianza.</Text>
        </Text>
      </View>
      <View style={s.hDivider} />
      <View style={s.hRight}>
        <Text style={s.hEntregas}>ENTREGAS GRATIS EN:</Text>
        <Text style={s.hCities}>Carhu&#233; &#x2022; Rivera &#x2022; Puan{'\n'}Espartillar &#x2022; Pig&#252;&#233;</Text>
      </View>
    </View>
  )
}

function SubHeader() {
  return (
    <View style={s.subHeader}>
      <View style={s.sCatalogo}>
        <Text style={{ color: VM, fontSize: 12, fontFamily: 'Helvetica-Bold' }}>&#8801;</Text>
        <Text style={s.sCatalogoText}>CAT&#193;LOGO</Text>
      </View>
      <View style={s.sSearch}>
        <Text style={s.sSearchText}>Buscar productos...</Text>
      </View>
      <View style={s.sWaBtn}>
        <Text style={{ color: WH, fontSize: 8 }}>&#9658;</Text>
        <Text style={s.sWaText}>PEDIR POR WHATSAPP</Text>
      </View>
    </View>
  )
}

function Footer() {
  const cols = [
    { icon: '&#128666;', title: 'DISTRIBUCIÓN EFICIENTE', desc: 'Llegamos a tiempo, siempre.' },
    { icon: '&#11088;',  title: 'PRODUCTOS DE CALIDAD',   desc: 'Seleccionamos lo mejor para vos.' },
    { icon: '&#129309;', title: 'COMPROMISO Y CONFIANZA', desc: 'Acompañamos tu negocio en cada día.' },
    { icon: '&#128205;', title: 'CARHUÉ, NUESTRO ORIGEN', desc: 'Conocemos la zona, estamos cerca.' },
  ]
  return (
    <View style={s.footer}>
      {cols.map((c, i) => (
        <View key={c.title} style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <View style={s.footerCol}>
            <View style={s.footerIcon}>
              <Text style={s.footerIconText}>{c.icon}</Text>
            </View>
            <View style={s.footerTextBlock}>
              <Text style={s.footerTitle}>{c.title}</Text>
              <Text style={s.footerDesc}>{c.desc}</Text>
            </View>
          </View>
          {i < 3 && <View style={s.footerDivider} />}
        </View>
      ))}
    </View>
  )
}

// ── Main document ─────────────────────────────────────────────────────────────
export default function PromocionPDF({ items }: { items: PromoItem[] }) {
  const principal   = items.find(i => i.ofertaType === 'principal')!
  const secundaria  = items.find(i => i.ofertaType === 'secundaria')!
  const regulars    = items.filter(i => i.ofertaType === null)

  // Layout: top-right 2, middle 12, bottom-left 2
  const topRight    = regulars.slice(0, 2)
  const middle      = regulars.slice(2, 14)    // 12 products → 3 rows of 4
  const bottomLeft  = regulars.slice(14, 16)   // 2 products

  const midRows = [
    middle.slice(0, 4),
    middle.slice(4, 8),
    middle.slice(8, 12),
  ]

  return (
    <Document title="Promociones Fraccionadora Carhué" author="Fraccionadora Carhué">
      <Page size="A4" orientation="portrait" style={s.page}>
        <Header />
        <SubHeader />

        <View style={s.content}>

          {/* ── TOP HERO ROW (oferta principal + 2 vert cards) ── */}
          <View style={s.heroRow}>
            <OfertaMergedCard item={principal} />
            {topRight.map(item => (
              <VertCard key={item.id} item={item} />
            ))}
            {/* Fill missing slots if < 2 top cards */}
            {topRight.length < 2 && Array.from({ length: 2 - topRight.length }).map((_, i) => (
              <View key={`empty-top-${i}`} style={[s.vertCard, { backgroundColor: 'transparent' }]} />
            ))}
          </View>

          {/* ── MIDDLE GRID: 3 rows × 4 horizontal cards ── */}
          {midRows.map((row, ri) => (
            <View key={ri} style={s.gridRow}>
              {row.map(item => (
                <HorizCard key={item.id} item={item} />
              ))}
              {row.length < 4 && Array.from({ length: 4 - row.length }).map((_, i) => (
                <View key={`empty-mid-${ri}-${i}`} style={[s.hCard, { backgroundColor: 'transparent' }]} />
              ))}
            </View>
          ))}

          {/* ── BOTTOM HERO ROW (2 horiz cards + oferta secundaria) ── */}
          <View style={s.heroRow}>
            {bottomLeft.map(item => (
              <HorizCard key={item.id} item={item} />
            ))}
            {bottomLeft.length < 2 && Array.from({ length: 2 - bottomLeft.length }).map((_, i) => (
              <View key={`empty-bot-${i}`} style={[s.hCard, { backgroundColor: 'transparent', width: '25%' }]} />
            ))}
            <OfertaMergedCard item={secundaria} />
          </View>

        </View>

        <Footer />
      </Page>
    </Document>
  )
}

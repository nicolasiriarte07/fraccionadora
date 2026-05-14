import {
  Document, Page, View, Text, Image, StyleSheet, Svg, Polygon,
} from '@react-pdf/renderer'

const VD = '#2D1B69'
const VM = '#6B3FA0'
const VL = '#9B6FD4'
const VX = '#1a0f3e'
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
  minUnitsBadge: string
  pricePerUnit: string
  pricePerUnitLabel: 'KG' | 'LT' | 'UN' | 'MT'
}

const s = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#EEEBF7',
    padding: 0,
    fontFamily: 'Helvetica',
  },

  // HEADER
  header: {
    backgroundColor: VD,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
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
  hDivider: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.2)', marginHorizontal: 12 },
  hCenter: { flex: 1, alignItems: 'center' },
  hTagline: { color: WH, fontSize: 12, textAlign: 'center', lineHeight: 1.5 },
  hHighlight: { color: VL, fontFamily: 'Helvetica-Bold' },
  hRight: { width: '28%', alignItems: 'flex-end', gap: 3 },
  hEntregas: { color: WH, fontSize: 7, fontFamily: 'Helvetica-Bold' },
  hCities: { color: VL, fontSize: 7, textAlign: 'right', lineHeight: 1.5 },

  // SUBHEADER — solo CATÁLOGO, sin buscador ni WA
  subHeader: {
    backgroundColor: WH,
    flexDirection: 'row',
    alignItems: 'center',
    height: 26,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD8F5',
  },
  sCatalogo: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  sCatalogoText: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#111', letterSpacing: 0.5 },

  // CONTENT
  content: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 5,
    gap: 4,
  },

  // HERO ROWS (top and bottom)
  heroRow: {
    flexDirection: 'row',
    height: 172,
    gap: 4,
  },

  // Merged OFERTA card — flex: 2 (= 2 columns)
  ofertaMergedCard: {
    flex: 2,
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
  },
  ofertaImageHalf: {
    width: '46%',
    position: 'relative',
    backgroundColor: VX,
  },
  ofertaImg: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0, right: 0,
    objectFit: 'cover',
  },
  ofertaTextHalf: {
    flex: 1,
    backgroundColor: WH,
    padding: 10,
    justifyContent: 'space-between',
  },
  ofertaProductName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#111',
    textTransform: 'uppercase',
    lineHeight: 1.25,
    marginBottom: 2,
  },
  ofertaUnit: { fontSize: 7.5, color: GY, marginBottom: 4 },
  ofertaPricePerKg: { fontSize: 7, color: LG, marginTop: 3 },

  // Vertical card (top-right & bottom-left slots) — flex: 1
  vertCard: {
    flex: 1,
    backgroundColor: WH,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  vertCardImg: {
    height: '52%',
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
    padding: 7,
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

  // Horizontal card (middle grid) — flex: 1
  hCard: {
    flex: 1,
    backgroundColor: WH,
    borderRadius: 6,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  hCardImgBox: {
    width: '36%',
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

  // GRID ROW (middle 3 rows × 4 cards)
  gridRow: {
    flexDirection: 'row',
    height: 99,
    gap: 4,
  },

  // SHARED ELEMENTS
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
  marcaText: { color: WH, fontSize: 4.5, fontFamily: 'Helvetica-Bold' },

  // FOOTER
  footer: {
    backgroundColor: VD,
    flexDirection: 'row',
    height: 52,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: VM,
  },
  footerCol: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 4 },
  footerDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.15)' },
  footerIcon: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: VM,
    alignItems: 'center', justifyContent: 'center',
  },
  footerIconText: { color: WH, fontSize: 10, fontFamily: 'Helvetica-Bold' },
  footerTextBlock: { flex: 1 },
  footerTitle: {
    color: WH, fontSize: 6, fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 1.5,
  },
  footerDesc: { color: 'rgba(255,255,255,0.55)', fontSize: 5.5 },
})

// ── Price arrow banner ────────────────────────────────────────────────────────
// Price is centered in the rectangular part of the arrow

function PriceArrow({ price, h = 24, fs = 14, w = 105 }: { price: string; h?: number; fs?: number; w?: number }) {
  const tip = h / 2
  const pts = `0,0 ${w - tip},0 ${w},${tip} ${w - tip},${h} 0,${h}`
  return (
    <View style={{ height: h, width: w, position: 'relative', marginVertical: 3 }}>
      <Svg width={w} height={h} style={{ position: 'absolute', top: 0, left: 0 }}>
        <Polygon points={pts} fill={VM} />
      </Svg>
      {/* text centered in the rectangular portion */}
      <View style={{ position: 'absolute', top: 0, left: 0, width: w - tip, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: WH, fontSize: fs, fontFamily: 'Helvetica-Bold' }}>${price}</Text>
      </View>
    </View>
  )
}

// ── OFERTA medal badge ────────────────────────────────────────────────────────
function OfertaMedal({ size = 60 }: { size?: number }) {
  const r = size / 2
  return (
    <View style={{ position: 'absolute', top: 6, left: 6, zIndex: 10, width: size, height: size + 14 }}>
      <View style={{
        width: size, height: size, borderRadius: r,
        backgroundColor: '#4A1FA0',
        borderWidth: 2.5, borderColor: WH,
        alignItems: 'center', justifyContent: 'center',
      }}>
        <View style={{
          width: size - 10, height: size - 10, borderRadius: (size - 10) / 2,
          borderWidth: 1, borderColor: 'rgba(255,255,255,0.35)',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Text style={{ color: VL, fontSize: size * 0.13, fontFamily: 'Helvetica-Bold', marginBottom: 1 }}>&#9733;</Text>
          <Text style={{ color: WH, fontSize: size * 0.17, fontFamily: 'Helvetica-Bold', letterSpacing: 0.3 }}>OFERTA</Text>
          <Text style={{ color: VL, fontSize: size * 0.13, fontFamily: 'Helvetica-Bold', marginTop: 1 }}>&#9733;</Text>
        </View>
      </View>
      {/* Ribbon tails */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4, marginTop: 0 }}>
        <View style={{ width: 8, height: 14, backgroundColor: '#4A1FA0', borderBottomLeftRadius: 3 }} />
        <View style={{ width: 8, height: 14, backgroundColor: '#6B3FA0', borderBottomRightRadius: 3 }} />
      </View>
    </View>
  )
}

function MinBadge({ text, sm }: { text: string; sm?: boolean }) {
  if (!text) return null
  return (
    <View style={s.minBadge}>
      <Text style={sm ? s.minTextSm : s.minText}>{text}</Text>
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

// ── Card types ────────────────────────────────────────────────────────────────

function OfertaMergedCard({ item }: { item: PromoItem }) {
  return (
    <View style={s.ofertaMergedCard}>
      {/* Dark image half with OFERTA medal */}
      <View style={s.ofertaImageHalf}>
        {item.imageUrl
          ? <Image src={item.imageUrl} style={s.ofertaImg} />
          : <View style={[s.ofertaImg, { backgroundColor: VX }]} />}
        {/* Dark gradient overlay so medal reads well */}
        <View style={[s.ofertaImg, { backgroundColor: 'rgba(26,15,62,0.35)' }]} />
        <OfertaMedal size={60} />
      </View>
      {/* White text half */}
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
          <PriceArrow price={item.promoPrice} h={26} fs={17} w={110} />
        </View>
      </View>
    </View>
  )
}

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
          <PriceArrow price={item.promoPrice} h={20} fs={12} w={95} />
          {item.pricePerUnit
            ? <Text style={{ fontSize: 5, color: LG, marginTop: 1 }}>PRECIO X {item.pricePerUnitLabel}: ${item.pricePerUnit}</Text>
            : null}
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
          <View style={[s.marcaBadge, { top: 3, right: 3 }]}>
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
          <PriceArrow price={item.promoPrice} h={19} fs={11} w={88} />
          {item.pricePerUnit
            ? <Text style={s.hPricePerKg}>PRECIO X {item.pricePerUnitLabel}: ${item.pricePerUnit}</Text>
            : null}
        </View>
      </View>
    </View>
  )
}

// ── Header / SubHeader / Footer ───────────────────────────────────────────────

function Header() {
  return (
    <View style={s.header}>
      <View style={s.hLeft}>
        <View style={s.badge}>
          <Text style={s.badgeStars}>&#9733; &#9733; &#9733;</Text>
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
        <Text style={{ color: VM, fontSize: 13, fontFamily: 'Helvetica-Bold' }}>&#8801;</Text>
        <Text style={s.sCatalogoText}>CAT&#193;LOGO</Text>
      </View>
    </View>
  )
}

function Footer() {
  const cols = [
    { icon: '&#8594;', title: 'DISTRIBUCIÓN EFICIENTE',   desc: 'Llegamos a tiempo, siempre.' },
    { icon: '★',  title: 'PRODUCTOS DE CALIDAD',           desc: 'Seleccionamos lo mejor para vos.' },
    { icon: '✓',  title: 'COMPROMISO Y CONFIANZA',         desc: 'Acompañamos tu negocio cada día.' },
    { icon: '●',  title: 'CARHUÉ, NUESTRO ORIGEN',    desc: 'Conocemos la zona, estamos cerca.' },
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
  const principal  = items.find(i => i.ofertaType === 'principal')!
  const secundaria = items.find(i => i.ofertaType === 'secundaria')!
  const regulars   = items.filter(i => i.ofertaType === null)

  // Slot assignment:
  // topRight[0..1]  → 2 vert cards, top right
  // middle[0..11]   → 12 horiz cards, 3 rows × 4
  // bottomLeft[0..1] → 2 vert cards, bottom left
  const topRight   = regulars.slice(0, 2)
  const middle     = regulars.slice(2, 14)
  const bottomLeft = regulars.slice(14, 16)

  const midRows = [middle.slice(0, 4), middle.slice(4, 8), middle.slice(8, 12)]

  return (
    <Document title="Promociones Fraccionadora Carhué" author="Fraccionadora Carhué">
      <Page size="A4" orientation="portrait" style={s.page}>
        <Header />
        <SubHeader />

        <View style={s.content}>

          {/* TOP HERO: oferta principal (flex:2) + 2 vert cards (flex:1 each) */}
          <View style={s.heroRow}>
            <OfertaMergedCard item={principal} />
            {topRight.map(item => <VertCard key={item.id} item={item} />)}
            {topRight.length < 2 && Array.from({ length: 2 - topRight.length }).map((_, i) => (
              <View key={`et${i}`} style={{ flex: 1 }} />
            ))}
          </View>

          {/* MIDDLE GRID: 3 rows × 4 horiz cards */}
          {midRows.map((row, ri) => (
            <View key={ri} style={s.gridRow}>
              {row.map(item => <HorizCard key={item.id} item={item} />)}
              {row.length < 4 && Array.from({ length: 4 - row.length }).map((_, i) => (
                <View key={`em${ri}${i}`} style={{ flex: 1 }} />
              ))}
            </View>
          ))}

          {/* BOTTOM HERO: 2 vert cards (flex:1 each) + oferta secundaria (flex:2) */}
          <View style={s.heroRow}>
            {bottomLeft.map(item => <VertCard key={item.id} item={item} />)}
            {bottomLeft.length < 2 && Array.from({ length: 2 - bottomLeft.length }).map((_, i) => (
              <View key={`eb${i}`} style={{ flex: 1 }} />
            ))}
            <OfertaMergedCard item={secundaria} />
          </View>

        </View>

        <Footer />
      </Page>
    </Document>
  )
}

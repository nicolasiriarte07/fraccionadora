import {
  Document, Page, View, Text, Image, StyleSheet,
} from '@react-pdf/renderer'

// ── Colors ────────────────────────────────────────────────────────────────────
const VD = '#2D1B69'   // violet dark
const VM = '#6B3FA0'   // violet medium
const VL = '#9B6FD4'   // violet light
const GY = '#666666'   // gray
const WH = '#FFFFFF'   // white
const RD = '#E53E3E'   // red (MARCA badge)

export type PromoItem = {
  id: string
  name: string
  unit: string
  imageUrl: string | null
  isOferta: boolean
  isMarca: boolean
  promoPrice: string
  minUnits: string
  pricePerUnit: string
  pricePerUnitLabel: 'KG' | 'LT' | 'UN'
}

// ── Styles ────────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#F0EDF8',
    fontFamily: 'Helvetica',
  },

  // HEADER
  header: {
    backgroundColor: VD,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    minHeight: 62,
  },
  headerLeft: {
    width: '28%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: WH,
    backgroundColor: VM,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoFC: {
    color: WH,
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
  },
  logoCarhue: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 4,
    letterSpacing: 0.8,
    marginTop: -2,
  },
  logoCompanyBlock: {
    flex: 1,
  },
  logoCompanyName: {
    color: WH,
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.5,
  },
  logoCompanySub: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 5.5,
    letterSpacing: 0.3,
    marginTop: 1,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  headerCenterText: {
    color: WH,
    fontSize: 10.5,
    textAlign: 'center',
  },
  headerHighlight: {
    color: VL,
    fontFamily: 'Helvetica-Bold',
  },
  headerRight: {
    width: '28%',
    alignItems: 'flex-end',
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  deliveryTitle: {
    color: WH,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
  },
  deliveryCities: {
    color: VL,
    fontSize: 6.5,
    textAlign: 'right',
  },

  // SUBHEADER
  subHeader: {
    backgroundColor: WH,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#E2DAF5',
  },
  catalogBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  catalogText: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D8D0F0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#F8F6FF',
  },
  searchText: {
    fontSize: 7.5,
    color: '#aaa',
  },
  waBtn: {
    backgroundColor: VM,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  waBtnText: {
    color: WH,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.3,
  },

  // CONTENT
  content: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
  },

  // BIG OFERTA CARD
  bigCardWrap: {
    width: '38%',
    marginRight: 6,
  },
  bigCard: {
    backgroundColor: WH,
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  bigCardImageBox: {
    position: 'relative',
    height: 165,
    backgroundColor: '#F5F3FA',
  },
  bigCardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  bigOfertaBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: VM,
    borderWidth: 2,
    borderColor: WH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigOfertaText: {
    color: WH,
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
  },
  bigMarcaBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: RD,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  bigMarcaText: {
    color: WH,
    fontSize: 6,
    fontFamily: 'Helvetica-Bold',
  },
  bigCardBody: {
    padding: 10,
  },
  bigProductName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  bigUnitText: {
    fontSize: 8,
    color: GY,
    marginBottom: 6,
  },
  bigMinBadge: {
    backgroundColor: VD,
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  bigMinText: {
    color: WH,
    fontSize: 6.5,
    fontFamily: 'Helvetica-Bold',
  },
  bigPriceBanner: {
    backgroundColor: VM,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 4,
    alignItems: 'flex-start',
  },
  bigPriceText: {
    color: WH,
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
  },
  bigPricePerKg: {
    fontSize: 7,
    color: GY,
    marginTop: 3,
  },
  bigAddBtn: {
    backgroundColor: VM,
    borderRadius: 5,
    paddingVertical: 6,
    alignItems: 'center',
    marginTop: 6,
  },
  bigAddText: {
    color: WH,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },

  // REGULAR GRID (right panel)
  regularGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
  // Full-width grid (no oferta)
  fullGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },

  // SMALL CARD
  card: {
    backgroundColor: WH,
    borderRadius: 6,
    overflow: 'hidden',
    margin: '1.2%',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  cardImageBox: {
    position: 'relative',
    height: 70,
    backgroundColor: '#F5F3FA',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  cardOfertaBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: VM,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  cardOfertaText: {
    color: WH,
    fontSize: 5.5,
    fontFamily: 'Helvetica-Bold',
  },
  cardMarcaBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: RD,
    borderRadius: 3,
    paddingHorizontal: 3,
    paddingVertical: 1.5,
  },
  cardMarcaText: {
    color: WH,
    fontSize: 5,
    fontFamily: 'Helvetica-Bold',
  },
  cardBody: {
    padding: 5,
  },
  productName: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  unitText: {
    fontSize: 6,
    color: GY,
    marginBottom: 3,
  },
  minBadge: {
    backgroundColor: VD,
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 3,
  },
  minText: {
    color: WH,
    fontSize: 5.5,
    fontFamily: 'Helvetica-Bold',
  },
  priceBanner: {
    backgroundColor: VM,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginVertical: 2,
    alignItems: 'flex-start',
  },
  priceText: {
    color: WH,
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
  },
  pricePerKg: {
    fontSize: 5.5,
    color: GY,
    marginTop: 2,
  },
  addBtn: {
    backgroundColor: VM,
    borderRadius: 4,
    paddingVertical: 4,
    alignItems: 'center',
    marginTop: 3,
  },
  addText: {
    color: WH,
    fontSize: 6,
    fontFamily: 'Helvetica-Bold',
  },

  // FOOTER
  footer: {
    backgroundColor: VD,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 8,
    borderTopWidth: 2,
    borderTopColor: VM,
  },
  footerCol: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  footerIcon: {
    fontSize: 14,
    color: VL,
    marginBottom: 3,
    fontFamily: 'Helvetica-Bold',
  },
  footerTitle: {
    color: WH,
    fontSize: 6.5,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  footerDesc: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 5.5,
    textAlign: 'center',
  },
})

// ── Sub-components ────────────────────────────────────────────────────────────

function Header() {
  return (
    <View style={s.header}>
      {/* Left: logo + company */}
      <View style={s.headerLeft}>
        <View style={s.logoBadge}>
          <Text style={s.logoFC}>FC</Text>
          <Text style={s.logoCarhue}>CARHUE</Text>
        </View>
        <View style={s.logoCompanyBlock}>
          <Text style={s.logoCompanyName}>FRACCIONADORA CARHU&#201;</Text>
          <Text style={s.logoCompanySub}>DISTRIBUCI&#211;N DE ALIMENTOS</Text>
        </View>
      </View>

      {/* Center: tagline */}
      <View style={s.headerCenter}>
        <Text style={s.headerCenterText}>
          {'Distribuimos '}
          <Text style={s.headerHighlight}>calidad</Text>
          {', entregamos '}
          <Text style={s.headerHighlight}>confianza.</Text>
        </Text>
      </View>

      {/* Right: delivery info */}
      <View style={s.headerRight}>
        <Text style={s.deliveryTitle}>&#x1F69A; ENTREGAS GRATIS EN:</Text>
        <Text style={s.deliveryCities}>Carhu&#233; &#x2022; Rivera &#x2022; Puan &#x2022; Espartillar &#x2022; Pig&#252;&#233;</Text>
      </View>
    </View>
  )
}

function SubHeader() {
  return (
    <View style={s.subHeader}>
      <View style={s.catalogBtn}>
        <Text style={{ color: VM, fontSize: 11, fontFamily: 'Helvetica-Bold' }}>&#8801;</Text>
        <Text style={s.catalogText}>CAT&#193;LOGO</Text>
      </View>
      <View style={s.searchBar}>
        <Text style={s.searchText}>Buscar productos...</Text>
      </View>
      <View style={s.waBtn}>
        <Text style={s.waBtnText}>PEDIR POR WHATSAPP</Text>
      </View>
    </View>
  )
}

function BigCardComp({ item }: { item: PromoItem }) {
  return (
    <View style={s.bigCard}>
      <View style={s.bigCardImageBox}>
        {item.imageUrl ? (
          <Image src={item.imageUrl} style={s.bigCardImage} />
        ) : (
          <View style={[s.bigCardImage, { backgroundColor: '#E9E2F8' }]} />
        )}
        <View style={s.bigOfertaBadge}>
          <Text style={s.bigOfertaText}>{'OFERTA'}</Text>
        </View>
        {item.isMarca && (
          <View style={s.bigMarcaBadge}>
            <Text style={s.bigMarcaText}>NUESTRAS MARCAS</Text>
          </View>
        )}
      </View>
      <View style={s.bigCardBody}>
        <Text style={s.bigProductName}>{item.name}</Text>
        <Text style={s.bigUnitText}>x {item.unit}</Text>
        {item.minUnits ? (
          <View style={s.bigMinBadge}>
            <Text style={s.bigMinText}>DESDE {item.minUnits} UNIDADES</Text>
          </View>
        ) : null}
        <View style={s.bigPriceBanner}>
          <Text style={s.bigPriceText}>${item.promoPrice}</Text>
        </View>
        {item.pricePerUnit ? (
          <Text style={s.bigPricePerKg}>
            PRECIO X {item.pricePerUnitLabel}: ${item.pricePerUnit}
          </Text>
        ) : null}
        <View style={s.bigAddBtn}>
          <Text style={s.bigAddText}>+ AGREGAR AL PEDIDO</Text>
        </View>
      </View>
    </View>
  )
}

function SmallCardComp({ item, width }: { item: PromoItem; width: string }) {
  return (
    <View style={[s.card, { width }]}>
      <View style={s.cardImageBox}>
        {item.imageUrl ? (
          <Image src={item.imageUrl} style={s.cardImage} />
        ) : (
          <View style={[s.cardImage, { backgroundColor: '#E9E2F8' }]} />
        )}
        {item.isOferta && (
          <View style={s.cardOfertaBadge}>
            <Text style={s.cardOfertaText}>OFERTA</Text>
          </View>
        )}
        {item.isMarca && (
          <View style={s.cardMarcaBadge}>
            <Text style={s.cardMarcaText}>NUESTRAS MARCAS</Text>
          </View>
        )}
      </View>
      <View style={s.cardBody}>
        <Text style={s.productName}>{item.name}</Text>
        <Text style={s.unitText}>x {item.unit}</Text>
        {item.minUnits ? (
          <View style={s.minBadge}>
            <Text style={s.minText}>DESDE {item.minUnits} UNIDADES</Text>
          </View>
        ) : null}
        <View style={s.priceBanner}>
          <Text style={s.priceText}>${item.promoPrice}</Text>
        </View>
        {item.pricePerUnit ? (
          <Text style={s.pricePerKg}>
            PRECIO X {item.pricePerUnitLabel}: ${item.pricePerUnit}
          </Text>
        ) : null}
        <View style={s.addBtn}>
          <Text style={s.addText}>+ AGREGAR</Text>
        </View>
      </View>
    </View>
  )
}

function Footer() {
  const cols = [
    { icon: '>>', title: 'DISTRIBUCIÓN EFICIENTE', desc: 'Llegamos a tiempo, siempre.' },
    { icon: '**', title: 'PRODUCTOS DE CALIDAD', desc: 'Seleccionamos lo mejor para vos.' },
    { icon: '<<', title: 'COMPROMISO Y CONFIANZA', desc: 'Acompañamos tu negocio en cada paso.' },
    { icon: '[]', title: 'CARHUÉ, NUESTRO ORIGEN', desc: 'Conocemos la zona, estamos cerca.' },
  ]
  return (
    <View style={s.footer}>
      {cols.map(c => (
        <View key={c.title} style={s.footerCol}>
          <Text style={s.footerTitle}>{c.title}</Text>
          <Text style={s.footerDesc}>{c.desc}</Text>
        </View>
      ))}
    </View>
  )
}

// ── Main PDF Document ─────────────────────────────────────────────────────────
export default function PromocionPDF({ items }: { items: PromoItem[] }) {
  const ofertaItem = items.find(i => i.isOferta) ?? null
  const regularItems = items.filter(i => i !== ofertaItem)
  const hasOferta = ofertaItem !== null

  return (
    <Document
      title="Promociones Fraccionadora Carhué"
      author="Fraccionadora Carhué"
    >
      <Page size="A4" orientation="landscape" style={s.page}>
        <Header />
        <SubHeader />

        <View style={s.content}>
          {hasOferta ? (
            <>
              {/* Big OFERTA card on the left */}
              <View style={s.bigCardWrap}>
                <BigCardComp item={ofertaItem} />
              </View>
              {/* Regular cards in 3-col grid on the right */}
              <View style={s.regularGrid}>
                {regularItems.map(item => (
                  <SmallCardComp key={item.id} item={item} width="30.5%" />
                ))}
              </View>
            </>
          ) : (
            /* No OFERTA: 5-col full grid */
            <View style={s.fullGrid}>
              {items.map(item => (
                <SmallCardComp key={item.id} item={item} width="17.6%" />
              ))}
            </View>
          )}
        </View>

        <Footer />
      </Page>
    </Document>
  )
}

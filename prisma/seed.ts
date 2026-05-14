import 'dotenv/config'
import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg(process.env.DATABASE_URL!)
const prisma = new PrismaClient({ adapter })

async function main() {
  // ── Users ────────────────────────────────────────────────────────────────
  const adminPass  = await bcrypt.hash('admin123', 10)
  const clientPass = await bcrypt.hash('cliente123', 10)

  await prisma.user.upsert({
    where: { email: 'admin@distribuidora.com' },
    update: {},
    create: { name: 'Administrador', email: 'admin@distribuidora.com', password: adminPass, role: 'ADMIN' },
  })

  await prisma.user.upsert({
    where: { email: 'cliente@test.com' },
    update: {},
    create: { name: 'Cliente Demo', email: 'cliente@test.com', password: clientPass, role: 'CLIENT' },
  })

  // promote owner accounts to ADMIN
  await prisma.user.upsert({
    where: { email: 'nicolasiriarte07@gmail.com' },
    update: { role: 'ADMIN' },
    create: { name: 'Nicolás Iriarte', email: 'nicolasiriarte07@gmail.com', password: adminPass, role: 'ADMIN' },
  })

  await prisma.user.upsert({
    where: { email: 'matias.iriarte5@gmail.com' },
    update: { role: 'ADMIN' },
    create: { name: 'Matías Iriarte', email: 'matias.iriarte5@gmail.com', password: adminPass, role: 'ADMIN' },
  })

  // ── Reset products then re-seed ──────────────────────────────────────────
  await prisma.orderItem.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.product.deleteMany({})

  const products = [
    // ── Yerba ──────────────────────────────────────────────────────────────
    {
      id: 'yerba-taragui-500g',
      name: 'Yerba Mate Taragüi 500g',
      description: 'Con palo, blend clásico',
      category: 'Yerba',
      unit: 'caja x20',
      price: 38000,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80',
    },
    {
      id: 'yerba-cruz-malta-1kg',
      name: 'Yerba Mate Cruz de Malta 1kg',
      description: 'Tradicional con palo',
      category: 'Yerba',
      unit: 'caja x10',
      price: 41000,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80',
    },
    {
      id: 'yerba-cbse-500g',
      name: 'Yerba CBSé Clásica 500g',
      description: 'Con palo, suave al paladar',
      category: 'Yerba',
      unit: 'caja x20',
      price: 36000,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80',
    },

    // ── Pastas Secas ────────────────────────────────────────────────────────
    {
      id: 'pasta-matarazzo-spaghetti-500g',
      name: 'Fideos Matarazzo Spaghetti 500g',
      description: 'De sémola de trigo durum',
      category: 'Pastas Secas',
      unit: 'caja x20',
      price: 32000,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400&q=80',
    },
    {
      id: 'pasta-lucchetti-moñitos-500g',
      name: 'Fideos Lucchetti Moñitos 500g',
      description: 'Pastas cortas de sémola',
      category: 'Pastas Secas',
      unit: 'caja x20',
      price: 30000,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400&q=80',
    },
    {
      id: 'pasta-don-vicente-tallarines-500g',
      name: 'Tallarines Don Vicente 500g',
      description: 'Fideos al huevo artesanales',
      category: 'Pastas Secas',
      unit: 'caja x12',
      price: 22800,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400&q=80',
    },

    // ── Bebidas ─────────────────────────────────────────────────────────────
    {
      id: 'bebida-villavicencio-500ml',
      name: 'Agua Mineral Villavicencio 500ml',
      description: 'Agua mineral sin gas',
      category: 'Bebidas',
      unit: 'pack x12',
      price: 9600,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80',
    },
    {
      id: 'bebida-coca-cola-225l',
      name: 'Coca-Cola 2,25L',
      description: 'Gaseosa sabor cola',
      category: 'Bebidas',
      unit: 'caja x6',
      price: 14400,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80',
    },
    {
      id: 'bebida-cepita-naranja-1l',
      name: 'Jugo Cepita Naranja 1L',
      description: 'Jugo de naranja sin azúcar',
      category: 'Bebidas',
      unit: 'caja x12',
      price: 21600,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&q=80',
    },

    // ── Infusiones ──────────────────────────────────────────────────────────
    {
      id: 'infusion-te-lipton-20sob',
      name: 'Té Lipton 20 sobres',
      description: 'Té negro selecto',
      category: 'Infusiones',
      unit: 'caja x24',
      price: 28800,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80',
    },
    {
      id: 'infusion-cafe-virginia-200g',
      name: 'Café La Virginia Instantáneo 200g',
      description: 'Café soluble instantáneo',
      category: 'Infusiones',
      unit: 'caja x12',
      price: 43200,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80',
    },
    {
      id: 'infusion-mate-cocido-taragui-50sob',
      name: 'Mate Cocido Taragüi 50 sobres',
      description: 'Mate listo para preparar',
      category: 'Infusiones',
      unit: 'caja x12',
      price: 26400,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80',
    },

    // ── Papel Higiénico ─────────────────────────────────────────────────────
    {
      id: 'papel-elite-suave-4rollos',
      name: 'Papel Higiénico Elite Suave 4 rollos',
      description: 'Doble hoja, máxima suavidad',
      category: 'Papel Higiénico',
      unit: 'pack x10',
      price: 48000,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
    },
    {
      id: 'papel-rollo-cocina-servihogar-2u',
      name: 'Rollo de Cocina Servihogar 2 rollos',
      description: 'Absorbente y resistente',
      category: 'Papel Higiénico',
      unit: 'pack x12',
      price: 31200,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
    },

    // ── Limpieza ────────────────────────────────────────────────────────────
    {
      id: 'limpieza-detergente-magistral-5l',
      name: 'Detergente Magistral 5L',
      description: 'Concentrado para vajilla',
      category: 'Limpieza',
      unit: 'bidón',
      price: 8500,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80',
    },
    {
      id: 'limpieza-lavandina-ayudin-1l',
      name: 'Lavandina Ayudín 1L',
      description: 'Concentrada 55g/L',
      category: 'Limpieza',
      unit: 'caja x12',
      price: 13200,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=400&q=80',
    },
    {
      id: 'limpieza-jabon-drive-1kg',
      name: 'Jabón en Polvo Drive 1kg',
      description: 'Para ropa blanca y color',
      category: 'Limpieza',
      unit: 'bolsa x6',
      price: 19200,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    },

    // ── Cuidado Personal ────────────────────────────────────────────────────
    {
      id: 'cuidado-jabon-palmolive-3x90g',
      name: 'Jabón de Tocador Palmolive 3×90g',
      description: 'Hidratante con aloe vera',
      category: 'Cuidado Personal',
      unit: 'caja x12',
      price: 22800,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80',
    },
    {
      id: 'cuidado-shampoo-hs-400ml',
      name: 'Shampoo Head & Shoulders 400ml',
      description: 'Anticaspa clásico',
      category: 'Cuidado Personal',
      unit: 'caja x12',
      price: 62400,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80',
    },
    {
      id: 'cuidado-desodorante-rexona-150ml',
      name: 'Desodorante Rexona 150ml',
      description: 'Protección 48h',
      category: 'Cuidado Personal',
      unit: 'caja x12',
      price: 55200,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80',
    },

    // ── Alcohol ─────────────────────────────────────────────────────────────
    {
      id: 'alcohol-etilico-96-1l',
      name: 'Alcohol Etílico 96° 1L',
      description: 'Para uso doméstico y profesional',
      category: 'Alcohol',
      unit: 'caja x12',
      price: 40800,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&q=80',
    },
    {
      id: 'alcohol-gel-500ml',
      name: 'Alcohol en Gel 500ml',
      description: 'Higienizante de manos 70°',
      category: 'Alcohol',
      unit: 'caja x12',
      price: 33600,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&q=80',
    },

    // ── Harina ──────────────────────────────────────────────────────────────
    {
      id: 'harina-000-favorita-1kg',
      name: 'Harina 000 Favorita 1kg',
      description: 'Para pan y masas',
      category: 'Harina',
      unit: 'bolsa x25',
      price: 60000,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80',
    },
    {
      id: 'harina-0000-cañuelas-1kg',
      name: 'Harina 0000 Cañuelas 1kg',
      description: 'Para repostería y pastelería',
      category: 'Harina',
      unit: 'bolsa x25',
      price: 62500,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80',
    },
  ]

  for (const p of products) {
    await prisma.product.create({ data: { ...p, available: true } })
  }

  console.log(`✓ Seed complete — ${products.length} productos`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())

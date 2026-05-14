import 'dotenv/config'
import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg(process.env.DATABASE_URL!)
const prisma = new PrismaClient({ adapter })

async function main() {
  const adminPass = await bcrypt.hash('admin123', 10)
  const clientPass = await bcrypt.hash('cliente123', 10)

  await prisma.user.upsert({
    where: { email: 'admin@distribuidora.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@distribuidora.com',
      password: adminPass,
      role: 'ADMIN',
    },
  })

  await prisma.user.upsert({
    where: { email: 'cliente@test.com' },
    update: {},
    create: {
      name: 'Cliente Demo',
      email: 'cliente@test.com',
      password: clientPass,
      role: 'CLIENT',
      type: 'familia',
    },
  })

  // promote owner account to ADMIN
  await prisma.user.upsert({
    where: { email: 'nicolasiriarte07@gmail.com' },
    update: { role: 'ADMIN' },
    create: {
      name: 'Nicolás Iriarte',
      email: 'nicolasiriarte07@gmail.com',
      password: adminPass,
      role: 'ADMIN',
    },
  })

  const products = [
    // Lácteos
    {
      id: 'lacticos-leche-serenisima-1l',
      name: 'Leche La Serenísima Entera 1L',
      description: 'Leche entera larga vida, caja por 12 unidades',
      category: 'Lácteos',
      unit: 'caja x12',
      price: 18500,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    },
    {
      id: 'lacticos-yogur-danone-190g',
      name: 'Yogur Danone Entero Natural 190g',
      description: 'Yogur firme natural, pack por 6 unidades',
      category: 'Lácteos',
      unit: 'pack x6',
      price: 7200,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
    },
    {
      id: 'lacticos-queso-finlandia-400g',
      name: 'Queso Cremoso Finlandia 400g',
      description: 'Queso untable cremoso, unidad',
      category: 'Lácteos',
      unit: 'unidad',
      price: 3800,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=400&q=80',
    },
    {
      id: 'lacticos-manteca-la-serenisima-200g',
      name: 'Manteca La Serenísima 200g',
      description: 'Manteca sin sal, pack por 12 unidades',
      category: 'Lácteos',
      unit: 'pack x12',
      price: 21600,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80',
    },
    // Enlatados
    {
      id: 'enlatados-tomate-arcor-400g',
      name: 'Tomate Triturado Arcor 400g',
      description: 'Tomate triturado natural sin sal, caja por 24',
      category: 'Enlatados',
      unit: 'caja x24',
      price: 28800,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80',
    },
    {
      id: 'enlatados-atun-alco-170g',
      name: 'Atún al Natural Alco 170g',
      description: 'Atún en agua con sal, caja por 12 unidades',
      category: 'Enlatados',
      unit: 'caja x12',
      price: 19200,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400&q=80',
    },
    {
      id: 'enlatados-choclo-verde-400g',
      name: 'Choclo en Granos Verde 400g',
      description: 'Choclo al natural sin sal, caja por 24',
      category: 'Enlatados',
      unit: 'caja x24',
      price: 22800,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&q=80',
    },
    {
      id: 'enlatados-arvejas-campagna-400g',
      name: 'Arvejas Campagna 400g',
      description: 'Arvejas en conserva al natural, caja por 24',
      category: 'Enlatados',
      unit: 'caja x24',
      price: 19200,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400&q=80',
    },
    // Bebidas
    {
      id: 'bebidas-agua-villavicencio-500ml',
      name: 'Agua Mineral Villavicencio 500ml',
      description: 'Agua mineral sin gas, pack por 12',
      category: 'Bebidas',
      unit: 'pack x12',
      price: 9600,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80',
    },
    {
      id: 'bebidas-coca-cola-2250ml',
      name: 'Coca-Cola 2,25L',
      description: 'Gaseosa sabor cola retornable, caja por 6',
      category: 'Bebidas',
      unit: 'caja x6',
      price: 14400,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80',
    },
    {
      id: 'bebidas-jugo-cepita-1l',
      name: 'Jugo Cepita Naranja 1L',
      description: 'Jugo de naranja sin azúcar, caja por 12',
      category: 'Bebidas',
      unit: 'caja x12',
      price: 21600,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&q=80',
    },
    // Limpieza
    {
      id: 'limpieza-detergente-magistral-5l',
      name: 'Detergente Magistral 5L',
      description: 'Detergente concentrado para vajilla, bidón',
      category: 'Limpieza',
      unit: 'bidón',
      price: 8500,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80',
    },
    {
      id: 'limpieza-lavandina-ayudin-1l',
      name: 'Lavandina Ayudín 1L',
      description: 'Lavandina concentrada 55g/L, caja por 12',
      category: 'Limpieza',
      unit: 'caja x12',
      price: 13200,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=400&q=80',
    },
    {
      id: 'limpieza-jabon-drive-1kg',
      name: 'Jabón en Polvo Drive 1kg',
      description: 'Para ropa blanca y color, bolsa por 6',
      category: 'Limpieza',
      unit: 'bolsa x6',
      price: 19200,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    },
    // Freezer
    {
      id: 'freezer-milanesas-vaca-500g',
      name: 'Milanesas de Vaca Congeladas 500g',
      description: 'Milanesas rebozadas listas para freír, pack x10',
      category: 'Freezer',
      unit: 'pack x10',
      price: 12500,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80',
    },
    {
      id: 'freezer-pollo-granja-del-sol-1kg',
      name: 'Pollo Trozado Granja del Sol 1kg',
      description: 'Pollo trozado congelado sin menudos',
      category: 'Freezer',
      unit: 'unidad',
      price: 7200,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&q=80',
    },
    {
      id: 'freezer-hamburguesas-quick-400g',
      name: 'Hamburguesas Quick 4u 400g',
      description: 'Hamburguesas de vacuno, pack por 12 cajas',
      category: 'Freezer',
      unit: 'caja x12',
      price: 74400,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    },
    // Almacén
    {
      id: 'almacen-arroz-gallo-1kg',
      name: 'Arroz Largo Fino Gallo 1kg',
      category: 'Almacén',
      description: 'Arroz largo fino tipo A, bolsa por 12',
      unit: 'bolsa x12',
      price: 26400,
      featured: true,
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
    },
    {
      id: 'almacen-fideos-matarazzo-500g',
      name: 'Fideos Matarazzo Spaghetti 500g',
      description: 'Fideos de sémola de trigo, caja por 20',
      category: 'Almacén',
      unit: 'caja x20',
      price: 32000,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400&q=80',
    },
    {
      id: 'almacen-aceite-cocinero-1500ml',
      name: 'Aceite Girasol Cocinero 1,5L',
      description: 'Aceite de girasol refinado, caja por 12',
      category: 'Almacén',
      unit: 'caja x12',
      price: 63600,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
    },
  ]

  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {
        name: p.name,
        description: p.description,
        category: p.category,
        unit: p.unit,
        price: p.price,
        featured: p.featured,
        imageUrl: p.imageUrl,
        available: true,
      },
      create: {
        ...p,
        available: true,
      },
    })
  }

  console.log('✓ Seed complete')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())

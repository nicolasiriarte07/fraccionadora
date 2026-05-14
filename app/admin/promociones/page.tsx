export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import PromocionesClient from './PromocionesClient'

export default async function PromocionesPage() {
  const products = await prisma.product.findMany({
    where: { available: true },
    orderBy: [{ category: 'asc' }, { name: 'asc' }],
  })
  return <PromocionesClient products={products} />
}

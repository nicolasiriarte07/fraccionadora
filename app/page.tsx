export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import PublicHeader from './_components/PublicHeader'
import PublicCatalog from './_components/PublicCatalog'

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { available: true },
    orderBy: [{ featured: 'desc' }, { category: 'asc' }, { name: 'asc' }],
  })

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <PublicCatalog products={products} />
    </div>
  )
}

export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import PublicHeader from './_components/PublicHeader'
import PublicHomepage from './_components/PublicHomepage'

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { available: true },
    orderBy: [{ featured: 'desc' }, { category: 'asc' }, { name: 'asc' }],
  })

  return (
    <div className="min-h-screen bg-[#F5F3FA]">
      <PublicHeader />
      <PublicHomepage products={products} />
    </div>
  )
}

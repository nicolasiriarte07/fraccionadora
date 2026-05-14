import type { Metadata } from 'next'
import { Poppins, Montserrat } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/SessionProvider'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Fraccionadora Carhué | Distribuidora Mayorista',
  description: 'Distribuidora mayorista de alimentos y artículos de limpieza. Carhué, Rivera, Puan, Espartillar y Pigüé.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${poppins.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-[#F5F3FA] antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}

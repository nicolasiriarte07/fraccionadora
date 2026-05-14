'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import FCLogo from '@/app/_components/FCLogo'

type Tab = 'login' | 'register'

// TODO: replace with real WhatsApp number
const WA = 'https://wa.me/5492291400000?text=Hola!%20Me%20interesa%20conocer%20sus%20productos.'

export default function LoginPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('login')

  const [loginEmail, setLoginEmail]       = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [regName,     setRegName]     = useState('')
  const [regEmail,    setRegEmail]    = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirm,  setRegConfirm]  = useState('')

  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email: loginEmail,
      password: loginPassword,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('Email o contraseña incorrectos')
      return
    }

    const res = await fetch('/api/auth/session')
    const session = await res.json()
    router.push(session?.user?.role === 'ADMIN' ? '/admin' : '/catalogo')
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (regPassword !== regConfirm) {
      setError('Las contraseñas no coinciden')
      return
    }

    setLoading(true)

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: regName, email: regEmail, password: regPassword }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'Error al crear la cuenta')
      setLoading(false)
      return
    }

    const result = await signIn('credentials', {
      email: regEmail,
      password: regPassword,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setTab('login')
      setError('Cuenta creada. Ingresá con tu email y contraseña.')
      return
    }

    router.push('/catalogo')
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a0f2e 0%, #452C6E 55%, #6E4BA5 100%)' }}
    >
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=1920&q=80"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-15"
      />

      {/* Decorative blob */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(167,139,214,0.2) 0%, transparent 70%)' }}
      />

      {/* Back link */}
      <Link
        href="/"
        className="relative z-10 mb-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver al catálogo
      </Link>

      {/* Card */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Card header with logo */}
        <div
          className="px-8 pt-8 pb-6 text-center"
          style={{ background: 'linear-gradient(135deg, #452C6E 0%, #6E4BA5 100%)' }}
        >
          <div className="flex justify-center mb-4">
            <FCLogo size={80} />
          </div>
          <h1
            className="font-poppins font-black text-white text-xl tracking-wide"
            style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
          >
            ACCESO A COMERCIOS
          </h1>
          <p className="text-white/60 text-sm mt-1">Distribuidora mayorista Carhué</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => { setTab('login'); setError('') }}
            className={`flex-1 py-3.5 text-sm font-bold transition-colors ${
              tab === 'login'
                ? 'text-[#452C6E] border-b-2 border-[#452C6E]'
                : 'text-gray-400 hover:text-gray-600'
            }`}
            style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
          >
            Ingresar
          </button>
          <button
            onClick={() => { setTab('register'); setError('') }}
            className={`flex-1 py-3.5 text-sm font-bold transition-colors ${
              tab === 'register'
                ? 'text-[#452C6E] border-b-2 border-[#452C6E]'
                : 'text-gray-400 hover:text-gray-600'
            }`}
            style={{ fontFamily: 'var(--font-poppins, sans-serif)' }}
          >
            Crear cuenta
          </button>
        </div>

        <div className="px-8 py-7">
          {/* ── LOGIN ── */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <Field
                label="Email"
                type="email"
                value={loginEmail}
                onChange={setLoginEmail}
                placeholder="tu@email.com"
              />
              <Field
                label="Contraseña"
                type="password"
                value={loginPassword}
                onChange={setLoginPassword}
                placeholder="••••••••"
              />

              {error && <ErrorBox message={error} />}

              <button
                type="submit"
                disabled={loading}
                className="w-full text-white font-bold py-3.5 rounded-xl transition-all hover:opacity-90 disabled:opacity-60 text-sm mt-2"
                style={{ background: 'linear-gradient(135deg, #452C6E, #6E4BA5)', fontFamily: 'var(--font-poppins, sans-serif)' }}
              >
                {loading ? 'Ingresando...' : 'Ingresar'}
              </button>

              <p className="text-center text-sm text-gray-400 pt-1">
                ¿No tenés cuenta?{' '}
                <button
                  type="button"
                  onClick={() => { setTab('register'); setError('') }}
                  className="text-[#6E4BA5] hover:underline font-semibold"
                >
                  Registrate gratis
                </button>
              </p>
            </form>
          )}

          {/* ── REGISTER ── */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <Field
                label="Nombre del comercio o razón social"
                type="text"
                value={regName}
                onChange={setRegName}
                placeholder="Almacén La Esquina"
              />
              <Field
                label="Email"
                type="email"
                value={regEmail}
                onChange={setRegEmail}
                placeholder="tu@email.com"
              />
              <Field
                label="Contraseña"
                type="password"
                value={regPassword}
                onChange={setRegPassword}
                placeholder="Mínimo 6 caracteres"
                minLength={6}
              />
              <Field
                label="Repetir contraseña"
                type="password"
                value={regConfirm}
                onChange={setRegConfirm}
                placeholder="••••••••"
              />

              {error && <ErrorBox message={error} />}

              <button
                type="submit"
                disabled={loading}
                className="w-full text-white font-bold py-3.5 rounded-xl transition-all hover:opacity-90 disabled:opacity-60 text-sm mt-2"
                style={{ background: 'linear-gradient(135deg, #452C6E, #6E4BA5)', fontFamily: 'var(--font-poppins, sans-serif)' }}
              >
                {loading ? 'Creando cuenta...' : 'Crear cuenta'}
              </button>

              <p className="text-center text-sm text-gray-400 pt-1">
                ¿Ya tenés cuenta?{' '}
                <button
                  type="button"
                  onClick={() => { setTab('login'); setError('') }}
                  className="text-[#6E4BA5] hover:underline font-semibold"
                >
                  Ingresá
                </button>
              </p>
            </form>
          )}

          {/* WhatsApp CTA */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400 mb-3">¿Preferís contactarnos directamente?</p>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all"
            >
              <WaIcon />
              Escribinos por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="relative z-10 mt-6 text-white/30 text-xs text-center">
        Entregas gratis en Carhué · Rivera · Puan · Espartillar · Pigüé
      </p>
    </div>
  )
}

/* ── Shared form field ────────────────────────────────────────────────────── */
function Field({
  label, type, value, onChange, placeholder, minLength,
}: {
  label: string
  type: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  minLength?: number
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required
        minLength={minLength}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6E4BA5] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
      />
    </div>
  )
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {message}
    </div>
  )
}

function WaIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

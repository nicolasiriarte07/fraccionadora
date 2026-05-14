'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Tab = 'login' | 'register'

export default function LoginPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('login')

  // login state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // register state
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirm, setRegConfirm] = useState('')

  const [error, setError] = useState('')
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

    // auto-login after registration
    const result = await signIn('credentials', {
      email: regEmail,
      password: regPassword,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('Cuenta creada. Podés ingresar con tu email y contraseña.')
      setTab('login')
      return
    }

    router.push('/catalogo')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 to-violet-100 px-4">
      {/* Back link */}
      <Link href="/" className="self-start sm:self-auto mb-6 text-sm text-violet-600 hover:text-violet-800 flex items-center gap-1">
        ← Volver al catálogo
      </Link>

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-violet-700 px-8 pt-8 pb-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-full mb-3">
            <span className="text-2xl">🏪</span>
          </div>
          <h1 className="text-xl font-bold text-white">Acceso a Comercios</h1>
          <p className="text-violet-200 text-sm mt-1">Distribuidora mayorista</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => { setTab('login'); setError('') }}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              tab === 'login'
                ? 'text-violet-700 border-b-2 border-violet-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Ingresar
          </button>
          <button
            onClick={() => { setTab('register'); setError('') }}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              tab === 'register'
                ? 'text-violet-700 border-b-2 border-violet-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Crear cuenta
          </button>
        </div>

        <div className="px-8 py-6">
          {/* Login form */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-lg text-sm">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60 text-sm"
              >
                {loading ? 'Ingresando...' : 'Ingresar'}
              </button>

              <p className="text-center text-sm text-gray-400">
                ¿No tenés cuenta?{' '}
                <button type="button" onClick={() => { setTab('register'); setError('') }} className="text-violet-600 hover:underline font-medium">
                  Registrate
                </button>
              </p>
            </form>
          )}

          {/* Register form */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del comercio / Nombre</label>
                <input
                  type="text"
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
                  placeholder="Almacén La Esquina"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Repetir contraseña</label>
                <input
                  type="password"
                  value={regConfirm}
                  onChange={e => setRegConfirm(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-lg text-sm">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60 text-sm"
              >
                {loading ? 'Creando cuenta...' : 'Crear cuenta'}
              </button>

              <p className="text-center text-sm text-gray-400">
                ¿Ya tenés cuenta?{' '}
                <button type="button" onClick={() => { setTab('login'); setError('') }} className="text-violet-600 hover:underline font-medium">
                  Ingresá
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

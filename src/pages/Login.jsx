import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CircleDollarSign, Lock, User, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  function handleSubmit(e) {
    e.preventDefault()
    const ok = login(usuario.trim(), password)
    if (ok) {
      navigate(location.state?.from?.pathname || '/', { replace: true })
    } else {
      setError('Usuario o contraseña incorrectos.')
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-base-950 relative overflow-hidden">
      {/* acentos de fondo */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative w-full max-w-md mx-4">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center mb-4">
            <CircleDollarSign size={28} className="text-base-950" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-ink-100">Nova POS</h1>
          <p className="text-ink-500 text-sm mt-1">Ingresa a tu punto de venta</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-base-900 border border-base-700 rounded-xl2 p-8 shadow-2xl"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink-300 mb-1.5">Usuario</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                <input
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="admin"
                  autoFocus
                  className="w-full bg-base-800 border border-base-600 rounded-lg pl-9 pr-3 py-2.5 text-sm text-ink-100 placeholder:text-ink-500 focus:border-emerald-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-300 mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-base-800 border border-base-600 rounded-lg pl-9 pr-3 py-2.5 text-sm text-ink-100 placeholder:text-ink-500 focus:border-emerald-500 outline-none transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-amber-400 text-xs bg-amber-400/10 rounded-lg px-3 py-2">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-base-950 font-semibold text-sm rounded-lg py-2.5 transition-colors"
            >
              Iniciar sesión
            </button>
          </div>
        </form>

        
      </div>
    </div>
  )
}

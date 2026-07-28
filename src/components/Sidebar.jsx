import { NavLink } from 'react-router-dom'
import { ShoppingCart, Package, Receipt, LogOut, CircleDollarSign } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Venta', icon: ShoppingCart },
  { to: '/productos', label: 'Productos', icon: Package },
  { to: '/ventas', label: 'Historial', icon: Receipt }
]

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="w-64 shrink-0 bg-base-900 border-r border-base-700 h-screen flex flex-col">
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center">
          <CircleDollarSign size={20} className="text-base-950" />
        </div>
        <span className="font-display text-lg font-semibold tracking-tight">Nova POS</span>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-500'
                  : 'text-ink-300 hover:bg-base-800 hover:text-ink-100'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-6 border-t border-base-700 pt-4 mx-3">
        <div className="px-3 mb-3">
          <p className="text-sm font-medium text-ink-100">{user?.nombre}</p>
          <p className="text-xs text-ink-500">{user?.rol}</p>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-ink-300 hover:bg-base-800 hover:text-amber-400 transition-colors"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

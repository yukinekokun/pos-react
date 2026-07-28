import { useMemo, useState } from 'react'
import { Search, Plus, Minus, Trash2, Receipt } from 'lucide-react'
import { CATEGORIAS, PRODUCTOS_INICIALES } from '../data/mockData'

export default function Pos() {
  const [productos] = useState(PRODUCTOS_INICIALES)
  const [categoria, setCategoria] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const [carrito, setCarrito] = useState([])
  const [ventaConfirmada, setVentaConfirmada] = useState(false)

  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const coincideCategoria = categoria === 'Todos' || p.categoria === categoria
      const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      return coincideCategoria && coincideBusqueda
    })
  }, [productos, categoria, busqueda])

  function agregarAlCarrito(producto) {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id)
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  function cambiarCantidad(id, delta) {
    setCarrito((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + delta } : item))
        .filter((item) => item.cantidad > 0)
    )
  }

  function eliminarDelCarrito(id) {
    setCarrito((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  const iva = subtotal * 0.16
  const total = subtotal + iva

  function cobrar() {
    if (carrito.length === 0) return
    const historial = JSON.parse(localStorage.getItem('pos_ventas') || '[]')
    historial.unshift({
      id: Date.now(),
      fecha: new Date().toISOString(),
      items: carrito,
      total
    })
    localStorage.setItem('pos_ventas', JSON.stringify(historial))
    setCarrito([])
    setVentaConfirmada(true)
    setTimeout(() => setVentaConfirmada(false), 2000)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Catálogo */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-semibold">Punto de venta</h1>
          <div className="relative w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar producto..."
              className="w-full bg-base-800 border border-base-600 rounded-lg pl-9 pr-3 py-2 text-sm placeholder:text-ink-500 focus:border-emerald-500 outline-none"
            />
          </div>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                categoria === cat
                  ? 'bg-emerald-500 text-base-950'
                  : 'bg-base-800 text-ink-300 hover:text-ink-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {productosFiltrados.map((producto) => (
            <button
              key={producto.id}
              onClick={() => agregarAlCarrito(producto)}
              className="bg-base-900 border border-base-700 rounded-xl2 p-4 text-left hover:border-emerald-500 hover:-translate-y-0.5 transition-all group"
            >
              <div className="text-3xl mb-3">{producto.emoji}</div>
              <p className="text-sm font-medium text-ink-100 leading-tight mb-1">{producto.nombre}</p>
              <p className="text-xs text-ink-500 mb-2">{producto.stock} disponibles</p>
              <p className="font-display text-emerald-500 font-semibold">${producto.precio.toFixed(2)}</p>
            </button>
          ))}
          {productosFiltrados.length === 0 && (
            <p className="text-ink-500 text-sm col-span-full py-10 text-center">
              No se encontraron productos.
            </p>
          )}
        </div>
      </div>

      {/* Carrito estilo ticket */}
      <div className="w-96 shrink-0 bg-base-900 border-l border-base-700 flex flex-col">
        <div className="px-6 py-6 border-b border-dashed border-base-600">
          <div className="flex items-center gap-2 mb-1">
            <Receipt size={18} className="text-emerald-500" />
            <h2 className="font-display font-semibold">Ticket actual</h2>
          </div>
          <p className="text-xs text-ink-500">{carrito.length} producto(s) en la venta</p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {carrito.length === 0 && (
            <p className="text-sm text-ink-500 text-center py-10">
              Toca un producto para agregarlo al ticket.
            </p>
          )}
          {carrito.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="text-xl">{item.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-ink-100 truncate">{item.nombre}</p>
                <p className="text-xs text-ink-500">${item.precio.toFixed(2)} c/u</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => cambiarCantidad(item.id, -1)}
                  className="w-6 h-6 rounded-md bg-base-800 flex items-center justify-center hover:bg-base-700"
                >
                  <Minus size={12} />
                </button>
                <span className="text-sm w-5 text-center">{item.cantidad}</span>
                <button
                  onClick={() => cambiarCantidad(item.id, 1)}
                  className="w-6 h-6 rounded-md bg-base-800 flex items-center justify-center hover:bg-base-700"
                >
                  <Plus size={12} />
                </button>
              </div>
              <button
                onClick={() => eliminarDelCarrito(item.id)}
                className="text-ink-500 hover:text-amber-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="ticket-edge px-6 py-6 space-y-2">
          <div className="flex justify-between text-sm text-ink-300">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-ink-300">
            <span>IVA (16%)</span>
            <span>${iva.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-display text-lg font-semibold pt-2 border-t border-base-700">
            <span>Total</span>
            <span className="text-emerald-500">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={cobrar}
            disabled={carrito.length === 0}
            className="w-full mt-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-base-700 disabled:text-ink-500 text-base-950 font-semibold text-sm rounded-lg py-3 transition-colors"
          >
            {ventaConfirmada ? '¡Venta registrada!' : 'Cobrar'}
          </button>
        </div>
      </div>
    </div>
  )
}

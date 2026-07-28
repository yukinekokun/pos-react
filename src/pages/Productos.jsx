import { useState } from 'react'
import { Plus, Trash2, Pencil, X } from 'lucide-react'
import { PRODUCTOS_INICIALES, CATEGORIAS } from '../data/mockData'

export default function Productos() {
  const [productos, setProductos] = useState(PRODUCTOS_INICIALES)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({ nombre: '', categoria: CATEGORIAS[1], precio: '', stock: '', emoji: '🛒' })

  function abrirNuevo() {
    setEditando(null)
    setForm({ nombre: '', categoria: CATEGORIAS[1], precio: '', stock: '', emoji: '🛒' })
    setModalAbierto(true)
  }

  function abrirEditar(producto) {
    setEditando(producto.id)
    setForm(producto)
    setModalAbierto(true)
  }

  function guardar(e) {
    e.preventDefault()
    const datos = { ...form, precio: Number(form.precio), stock: Number(form.stock) }
    if (editando) {
      setProductos((prev) => prev.map((p) => (p.id === editando ? { ...datos, id: editando } : p)))
    } else {
      setProductos((prev) => [...prev, { ...datos, id: Date.now() }])
    }
    setModalAbierto(false)
  }

  function eliminar(id) {
    setProductos((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="p-8 overflow-y-auto h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-semibold">Productos</h1>
        <button
          onClick={abrirNuevo}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-base-950 text-sm font-semibold rounded-lg px-4 py-2.5"
        >
          <Plus size={16} /> Nuevo producto
        </button>
      </div>

      <div className="bg-base-900 border border-base-700 rounded-xl2 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-base-800 text-ink-500 text-xs uppercase">
            <tr>
              <th className="text-left px-5 py-3">Producto</th>
              <th className="text-left px-5 py-3">Categoría</th>
              <th className="text-right px-5 py-3">Precio</th>
              <th className="text-right px-5 py-3">Stock</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id} className="border-t border-base-800 hover:bg-base-800/50">
                <td className="px-5 py-3 flex items-center gap-2">
                  <span className="text-lg">{p.emoji}</span> {p.nombre}
                </td>
                <td className="px-5 py-3 text-ink-300">{p.categoria}</td>
                <td className="px-5 py-3 text-right text-emerald-500 font-medium">${p.precio.toFixed(2)}</td>
                <td className="px-5 py-3 text-right text-ink-300">{p.stock}</td>
                <td className="px-5 py-3 text-right">
                  <button onClick={() => abrirEditar(p)} className="text-ink-500 hover:text-ink-100 mr-3">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => eliminar(p.id)} className="text-ink-500 hover:text-amber-400">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalAbierto && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-base-900 border border-base-700 rounded-xl2 p-6 w-full max-w-sm relative">
            <button
              onClick={() => setModalAbierto(false)}
              className="absolute top-4 right-4 text-ink-500 hover:text-ink-100"
            >
              <X size={18} />
            </button>
            <h2 className="font-display text-lg font-semibold mb-4">
              {editando ? 'Editar producto' : 'Nuevo producto'}
            </h2>
            <form onSubmit={guardar} className="space-y-3">
              <input
                required
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full bg-base-800 border border-base-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
              />
              <select
                value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                className="w-full bg-base-800 border border-base-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
              >
                {CATEGORIAS.filter((c) => c !== 'Todos').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="flex gap-3">
                <input
                  required
                  type="number"
                  step="0.01"
                  placeholder="Precio"
                  value={form.precio}
                  onChange={(e) => setForm({ ...form, precio: e.target.value })}
                  className="w-full bg-base-800 border border-base-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
                />
                <input
                  required
                  type="number"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className="w-full bg-base-800 border border-base-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
                />
              </div>
              <input
                placeholder="Emoji (ej. 🍕)"
                value={form.emoji}
                onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                className="w-full bg-base-800 border border-base-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-base-950 font-semibold text-sm rounded-lg py-2.5 mt-2"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

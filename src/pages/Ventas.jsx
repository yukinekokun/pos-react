import { useEffect, useState } from 'react'
import { Receipt, Trash2 } from 'lucide-react'

export default function Ventas() {
  const [ventas, setVentas] = useState([])

  useEffect(() => {
    const historial = JSON.parse(localStorage.getItem('pos_ventas') || '[]')
    setVentas(historial)
  }, [])

  function limpiarHistorial() {
    localStorage.removeItem('pos_ventas')
    setVentas([])
  }

  const totalDelDia = ventas.reduce((acc, v) => acc + v.total, 0)

  return (
    <div className="p-8 overflow-y-auto h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Historial de ventas</h1>
          <p className="text-sm text-ink-500 mt-1">
            {ventas.length} venta(s) · Total acumulado{' '}
            <span className="text-emerald-500 font-medium">${totalDelDia.toFixed(2)}</span>
          </p>
        </div>
        {ventas.length > 0 && (
          <button
            onClick={limpiarHistorial}
            className="flex items-center gap-2 text-sm text-ink-300 hover:text-amber-400 border border-base-700 rounded-lg px-4 py-2"
          >
            <Trash2 size={14} /> Limpiar historial
          </button>
        )}
      </div>

      {ventas.length === 0 ? (
        <div className="text-center py-20 text-ink-500">
          <Receipt size={32} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">Aún no se han registrado ventas.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {ventas.map((venta) => (
            <div key={venta.id} className="bg-base-900 border border-base-700 rounded-xl2 p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-ink-500">
                  {new Date(venta.fecha).toLocaleString('es-MX', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </p>
                <p className="font-display font-semibold text-emerald-500">${venta.total.toFixed(2)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {venta.items.map((item) => (
                  <span
                    key={item.id}
                    className="text-xs bg-base-800 text-ink-300 rounded-full px-3 py-1"
                  >
                    {item.emoji} {item.nombre} × {item.cantidad}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

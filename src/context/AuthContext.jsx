import { createContext, useContext, useState } from 'react'
import { USUARIO_DEMO } from '../data/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('pos_user')
    return saved ? JSON.parse(saved) : null
  })

  function login(usuario, password) {
    if (usuario === USUARIO_DEMO.usuario && password === USUARIO_DEMO.password) {
      const sesion = { nombre: USUARIO_DEMO.nombre, rol: USUARIO_DEMO.rol }
      sessionStorage.setItem('pos_user', JSON.stringify(sesion))
      setUser(sesion)
      return true
    }
    return false
  }

  function logout() {
    sessionStorage.removeItem('pos_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

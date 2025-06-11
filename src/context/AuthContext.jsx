import { createContext, useState, useEffect } from 'react'
import api from '../api/api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      api.get('/auth/perfil')
         .then(res => setUser(res.data))
         .catch(() => logout())
    }
  }, [token])

  const login = async (email, contraseña) => {
    const { data } = await api.post('/auth/login', { email, contraseña })
    setToken(data.token)
    return data.usuario
  }

  const register = async (nombre, email, contraseña) => {
    const { data } = await api.post('/auth/registro', { nombre, email, contraseña })
    setToken(data.token)
    return data.usuario
  }

  const logout = () => {
    setToken('')
    setUser(null)
    delete api.defaults.headers.common['Authorization']
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}


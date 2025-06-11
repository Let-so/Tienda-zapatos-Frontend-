import { createContext, useState, useEffect } from 'react'
import axios from '../api/api'
export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [token, setToken]     = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      axios.get('/auth/perfil').then(r => setUser(r.data))
    }
  }, [token])

  const login = async (email, contraseña) => {
    const { data } = await axios.post('/auth/login', { email, contraseña })
    setToken(data.token)
    return data.usuario
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common['Authorization']
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

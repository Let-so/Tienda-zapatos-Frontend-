import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Profile() {
  const { user } = useContext(AuthContext)
  if (!user) return null

  return (
    <div>
      <h1>Perfil</h1>
      <p>Nombre: {user.nombre}</p>
      <p>Email: {user.email}</p>
      <p>Admin: {user.esAdmin ? 'Sí' : 'No'}</p>
    </div>
  )
}

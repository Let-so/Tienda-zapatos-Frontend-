import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Register() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [contraseña, setContraseña] = useState('')
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    await register(nombre, email, contraseña)
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Registro</h1>
      <input
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        placeholder="Nombre"
      />
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={contraseña}
        onChange={e => setContraseña(e.target.value)}
        placeholder="Contraseña"
      />
      <button type="submit">Registrarse</button>
    </form>
  )
}

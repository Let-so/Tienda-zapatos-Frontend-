import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'

// src/pages/Register.jsx
export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async e => {
    e.preventDefault()
    try {
      await api.post('/auth/register', { email, password })
      navigate('/login')
    } catch (error) {
      console.error('Error al registrar:', error)
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Contraseña"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
      >
        Registrarse
      </Button>
    </form>
  )
}


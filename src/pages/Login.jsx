// src/pages/Login.jsx
import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Button, TextField, Card, CardContent, Typography } from '@mui/material'

export default function Login() {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [contraseña, setContraseña] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    await login({ email, contraseña })
    // redirige al home…
  }

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Iniciar sesión
        </Typography>
        <form onSubmit={handleSubmit}>
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
            value={contraseña}
            onChange={e => setContraseña(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Entrar
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

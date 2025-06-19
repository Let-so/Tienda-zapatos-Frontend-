import React, { useState } from 'react'
import { Button, TextField, Card, CardContent, Typography, Box, Alert } from '@mui/material'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async e => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/auth/register', { nombre, email, contraseña })
      navigate('/login')
    } catch (error) {
      setError(error.response?.data?.message || 'Error al registrar')
      console.error('Error al registrar:', error)
    }
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Registrarse
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleRegister}>
            <TextField
              label="Nombre"
              type="text"
              fullWidth
              margin="normal"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              margin="normal"
              value={contraseña}
              onChange={e => setContraseña(e.target.value)}
              required
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
        </CardContent>
      </Card>
    </Box>
  )
}


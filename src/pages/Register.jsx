// src/pages/Profile.jsx
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Card, CardContent, Typography } from '@mui/material'

export default function Profile() {
  const { user } = useContext(AuthContext)
  if (!user) return null

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Perfil de Usuario
        </Typography>
        <Typography variant="body1">
          <strong>Nombre:</strong> {user.nombre}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography variant="body1">
          <strong>Administrador:</strong> {user.esAdmin ? 'Sí' : 'No'}
        </Typography>
      </CardContent>
    </Card>
  )
}

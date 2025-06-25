// src/pages/Header.jsx
import React from 'react'
import { Box, Typography } from '@mui/material'

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        width: '100%',
        height: { xs: 200, md: 300 },               // altura responsiva
        backgroundImage: 'url(/banner.jpg)',       // ruta en public/
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',                      // centrar contenido
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: '#fff',
          textShadow: '0 2px 8px rgba(0,0,0,0.6)',
          fontFamily: '"Playfair Display", serif',
        }}
      >
        ELEGANCIA EN CADA PASO
      </Typography>
    </Box>
  )
}

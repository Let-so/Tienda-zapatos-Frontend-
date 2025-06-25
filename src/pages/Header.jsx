// src/pages/Header.jsx
import React from 'react'
import { Box, Typography } from '@mui/material'

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        justifyContent: 'center',  // ← aquí centras horizontalmente
        alignItems: 'center',      // ← aquí centras verticalmente
        flexDirection: 'column',
        py: 4,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f3e8 50%, #ffffff 100%)'
      }}
    >
      <Box
        component="img"
        src="/logo.png"
        alt="Logo Atenas"
        sx={{
          width: 250,
          mb: 2,
          display: 'block'
        }}
      />
      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          color: '#8B7355',
          letterSpacing: '3px',
          textTransform: 'uppercase',
        }}
      >
        ELEGANCIA EN CADA PASO
      </Typography>
    </Box>
  )
}

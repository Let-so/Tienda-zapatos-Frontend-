// src/pages/Header.jsx
import React from 'react'
import { Box, Typography } from '@mui/material'

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        color: rgb(139, 115, 85),
        width: '100%',
        height: { xs: 200, md: 300 },
        backgroundImage: 'url(/banner.jpg)',       // o '/logo.png' si prefieres
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: rgb(104, 101, 98),
          textShadow: '0 2px 8px rgba(0,0,0,0.6)',
          fontFamily: '"Playfair Display", serif',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          px: 2,               // un poco de padding horizontal
          textAlign: 'center',
        }}
      >
        Elegancia en cada paso
      </Typography>
    </Box>
  )
}




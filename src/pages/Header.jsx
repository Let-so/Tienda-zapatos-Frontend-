// src/pages/Header.jsx
import React from 'react'
import { Box, Typography } from '@mui/material'

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
       boxShadow: 3,
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
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
            boxShadow: '0 2px 8px rgba(235, 181, 181, 0.87)',
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




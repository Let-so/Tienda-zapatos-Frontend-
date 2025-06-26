// src/pages/Header.jsx
import React from 'react'
import { Box, Typography } from '@mui/material'

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        width: '100%',
        py: { xs: 3, md: 6 },
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          color: '#8B7355',
          fontSize: { xs: '2rem', md: '3rem' },
          letterSpacing: '3px',
          position: 'relative',
          textAlign: 'center',
          // decoraciones antes y después
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            width: '80px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #8B7355, transparent)',
            transform: 'translateY(-50%)',
          },
          '&::before': {
            left: '-100px',
          },
          '&::after': {
            right: '-100px',
          }
        }}
      >
        ELEGANCIA EN CADA PASO
      </Typography>
    </Box>
  )
}

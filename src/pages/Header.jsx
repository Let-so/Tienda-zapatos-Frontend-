// src/pages/Header.jsx
import React from 'react'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        py: 2,
        px: 3,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottom: '1px solid #eee',
      }}
    >
      <Link to="/">
        <Box
          component="img"
          src="/logo.png"
          alt="Logo Atenas"
          sx={{ height: 60 }}
        />
      </Link>
    </Box>
  )
}

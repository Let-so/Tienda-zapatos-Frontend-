// src/pages/Header.jsx
import { Box, Typography } from '@mui/material'

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        width: '100%',
        height: { xs: 200, md: 300 },
        backgroundImage: 'url(/banner.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Si quieres un título encima del banner */}
      <Typography
        variant="h3"
        sx={{
          color: '#fff',
          textShadow: '0 2px 8px rgba(0,0,0,0.6)'
        }}
      >
      </Typography>
    </Box>
  )
}



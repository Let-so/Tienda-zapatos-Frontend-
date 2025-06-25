// src/pages/Home.jsx
import React, { useEffect, useState } from 'react'
import Header from './Header'
import api from '../api/api'
import ProductCard from '../components/ProductCard'
import {
  Container,
  Grid,
  CircularProgress,
  Box,
  Alert,
  Typography
} from '@mui/material'

export default function Home() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const { data } = await api.get('/productos')
        if (Array.isArray(data)) {
          setProductos(data)
        } else {
          setError('Formato de datos inválido')
        }
      } catch {
        setError('Error al cargar productos')
      } finally {
        setLoading(false)
      }
    }

    fetchProductos()
  }, [])

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress sx={{ color: 'var(--gold)' }} />
      </Box>
    )
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  return (
    <>
      {/* Banner único */}
      <Header />

      {/* Grid de productos */}
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          py: 4,
          px: { xs: 2, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#ffffff'
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontFamily: '"Playfair Display", serif',
            textAlign: 'center',
            mb: 6,
            color: '#8B7355',
            fontWeight: 600
          }}
        >
          Nuestros productos destacados
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {productos.map((prod) => (
            <Grid item key={prod.idProducto} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={prod} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

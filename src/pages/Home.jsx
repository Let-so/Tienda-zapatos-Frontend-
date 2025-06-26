// src/pages/Home.jsx
import React, { useEffect, useState } from 'react'
import api from '../api/api'
import ProductCard from '../components/ProductCard'
import Header from './Header'
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
  const [loading,   setLoading  ] = useState(true)
  const [error,     setError    ] = useState(null)

  useEffect(() => {
    async function fetchListado() {
      try {
        const { data } = await api.get('/productos')
        // data debe ser un array
        if (Array.isArray(data)) {
          setProductos(data)
        } else {
          throw new Error('Formato inesperado')
        }
      } catch (err) {
        setError(err.message || 'Error cargando productos')
      } finally {
        setLoading(false)
      }
    }
    fetchListado()
  }, [])  // <-- sólo al montar

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <CircularProgress />
    </Box>
  )
  if (error) return (
    <Container sx={{ mt:4 }}>
      <Alert severity="error">{error}</Alert>
    </Container>
  )

  return (
    <>
      <Header />

      <Container maxWidth={false} disableGutters sx={{ py:4, px:{xs:2,md:4} }}>
        <Typography variant="h4" align="center" gutterBottom>
          Nuestros productos destacados
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {productos.map(p => (
            <Grid item key={p.idProducto} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}


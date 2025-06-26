// src/pages/Favorites.jsx
import React, { useState, useEffect } from 'react'
import api from '../api/api'
import ProductCard from '../components/ProductCard'
import { Container, Typography, Grid, Box, Alert } from '@mui/material'

export default function Favorites() {
  const [favoritos, setFavoritos] = useState([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    api
      .get('/favoritos')
      .then(res => setFavoritos(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h6">Cargando favoritos…</Typography>
    </Container>
  )
  if (!favoritos.length) return (
    <Container sx={{ mt: 4 }}>
      <Alert severity="info">No tienes favoritos aún.</Alert>
    </Container>
  )

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Mis Favoritos
      </Typography>
      <Grid container spacing={4}>
        {favoritos
          .filter(fav => fav.producto && fav.producto.idProducto)
          .map(fav => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={fav.idFavorito}>
              <ProductCard product={fav.producto} />
            </Grid>
          ))}
      </Grid>
      {favoritos.filter(fav => !fav.producto).length > 0 && (
        <Box mt={2}>
          <Alert severity="warning">
            Algunos favoritos no tienen producto asociado.
          </Alert>
        </Box>
      )}
    </Container>
  )
}

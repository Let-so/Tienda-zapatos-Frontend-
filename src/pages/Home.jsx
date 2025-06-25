// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ProductCard from '../components/ProductCard';
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Box,
  Alert
} from '@mui/material';

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await api.get('/productos');
        if (Array.isArray(res.data)) {
          setProductos(res.data);
        } else {
          setError('Formato de datos inválido');
        }
      } catch {
        setError('Error al cargar productos');
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress sx={{ color: 'var(--gold)' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <Box sx={{
        mt: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
        backgroundColor: '#ffffff'
      }}>
        <Box
          sx={{
            position: 'relative',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f3e8 50%, #ffffff 100%)',
            width: '100vw',
            mb: 4,
            height: { xs: '300px', md: '400px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              color: '#8B7355',
              fontSize: { xs: '2rem', md: '3.5rem' },
              letterSpacing: '3px',
              textTransform: 'uppercase',
              position: 'relative',
              textShadow: '2px 2px 4px rgba(139, 115, 85, 0.2)',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                width: '60px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #8B7355, transparent)',
                transform: 'translateY(-50%)'
              },
              '&::before': { left: '-80px' },
              '&::after':  { right: '-80px' }
            }}
          >
            ELEGANCIA EN CADA PASO
          </Typography>
        </Box>
      </Box>

      {/* Grid de productos */}
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          py: 4, px: { xs: 2, md: 4 },
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
          NUESTROS PRODUCTOS DESTACADOS
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {productos.map(prod => (
            <Grid item key={prod.idProducto} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={prod} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}


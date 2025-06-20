import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ProductCard from '../components/ProductCard';
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Box,
  Alert,
  Button
} from '@mui/material';

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get('/productos');
        if (response.data && Array.isArray(response.data)) {
          setProductos(response.data);
        } else {
          setError('Error en el formato de datos');
        }
      } catch (err) {
        setError('Error al cargar los productos');
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
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{
      mt: '80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100vw',
      maxWidth: '100%',
      overflowX: 'hidden',
      backgroundColor: '#ffffff'
    }}>
      <Box
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f3e8 50%, #ffffff 100%)',
          width: '100vw',
          maxWidth: '100%',
          mb: 4,
          height: { xs: '400px', md: '500px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          overflow: 'hidden',
          boxShadow: '0 4px 30px rgba(212, 175, 55, 0.1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--gold), transparent)'
          }
        }}
      >
        <Box
          sx={{
            position: 'relative',
            background: '#ffffff',
            width: '100vw',
            maxWidth: '100%',
            mb: 2,
            height: { xs: '300px', md: '400px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            overflow: 'hidden'
          }}
        >
          <img
            src="/src/assets/logo.png"
            alt="Atenas"
            style={{
              width: '250px',
              height: 'auto',
              marginBottom: '1.5rem'
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              color: '#8B7355',
              marginTop: '1rem',
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
              '&::before': {
                left: '-80px'
              },
              '&::after': {
                right: '-80px'
              },
              animation: 'fadeIn 1.5s ease-out'
            }}
          >
            ELEGANCIA EN CADA PASO
          </Typography>
        </Box>
      </Box>

      <Container
        maxWidth={false}
        disableGutters
        sx={{
          width: '100vw',
          maxWidth: '100%',
          py: 4,
          px: { xs: 2, sm: 3, md: 4 },
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
            mb: 8,
            color: '#8B7355',
            fontWeight: 600,
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            letterSpacing: '2px',
            position: 'relative',
            '&::after': {
              content: '""',
              display: 'block',
              width: '120px',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #8B7355, transparent)',
              margin: '25px auto 0',
              borderRadius: '2px'
            }
          }}
        >
          NUESTROS PRODUCTOS DESTACADOS
        </Typography>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{
            '& .MuiGrid-item': {
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)'
              }
            }
          }}
        >
          {productos.map((producto) => (
            <Grid item key={producto.idProducto} xs={12} sm={6} md={4} lg={3}>
              <ProductCard
                product={producto}
                sx={{
                  transition: 'all 0.3s ease',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(139, 115, 85, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 25px rgba(139, 115, 85, 0.2)'
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
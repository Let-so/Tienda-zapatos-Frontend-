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
  Alert,
  Paper,
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
    <Box sx={{ mt: '80px' }}> {/* Margen superior para el navbar fijo */}
      {/* Banner Principal */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(/banner-image.jpg)`,
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
          }
        }}
      >
        <Box
          sx={{
            position: 'relative',
            p: { xs: 3, md: 6 },
            textAlign: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            color="inherit"
            sx={{ 
              mb: 4,
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            Bienvenido a Atenas
          </Typography>
          <Typography
            variant="h5"
            color="inherit"
            paragraph
            sx={{ 
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            Descubre nuestra nueva colección
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ 
              backgroundColor: 'var(--gold)',
              '&:hover': {
                backgroundColor: 'var(--gold-light)'
              }
            }}
          >
            Ver Colección
          </Button>
        </Box>
      </Paper>

      {/* Sección de Productos */}
      <Container maxWidth="xl">
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          sx={{ 
            textAlign: 'center', 
            mb: 6,
            color: 'var(--neutral-800)',
            fontWeight: '500'
          }}
        >
          Nuestros Productos Destacados
        </Typography>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {productos && productos.length > 0 ? (
            productos.map(producto => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={producto.idProducto}>
                <ProductCard product={producto} />
              </Grid>
            ))
          ) : (
            <Typography variant="h6" sx={{ textAlign: 'center', width: '100%', mt: 4 }}>
              No hay productos disponibles
            </Typography>
          )}
        </Grid>

        {/* Sección de Categorías */}
        <Box sx={{ my: 8 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              textAlign: 'center', 
              mb: 6,
              color: 'var(--neutral-800)',
              fontWeight: '500'
            }}
          >
            Explora por Categorías
          </Typography>
          <Grid container spacing={4}>
            {['Zapatos', 'Botas', 'Sandalias', 'Deportivos'].map((categoria) => (
              <Grid item xs={12} sm={6} md={3} key={categoria}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    backgroundColor: '#f8f8f8',
                    transition: '0.3s',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <Typography variant="h6" component="h3">
                    {categoria}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
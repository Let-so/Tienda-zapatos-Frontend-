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
    <Box sx={{ 
      mt: '80px',
      backgroundColor: '#ffffff' // Fondo blanco para toda la página
    }}>
      {/* Banner Principal con gradiente dorado */}
      <Box
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(212,175,55,0.9) 0%, rgba(229,199,107,0.95) 100%)',
          color: '#fff',
          mb: 4,
          height: { xs: '400px', md: '500px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("/path-to-subtle-pattern.png")', // Opcional: patrón sutil
            opacity: 0.05,
            zIndex: 1
          }
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            p: { xs: 3, md: 6 },
            maxWidth: '800px'
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            sx={{ 
              mb: 4,
              fontWeight: 700,
              color: '#fff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Bienvenido a Atenas
          </Typography>
          <Typography
            variant="h5"
            sx={{ 
              mb: 4,
              color: '#fff',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            Descubre nuestra nueva colección
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ 
              backgroundColor: 'var(--gold)',
              color: '#fff',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'var(--gold-light)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              },
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            VER COLECCIÓN
          </Button>
        </Box>
      </Box>

      {/* Sección de Productos con fondo blanco */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          sx={{ 
            textAlign: 'center', 
            mb: 6,
            color: 'var(--neutral-800)',
            fontWeight: 600,
            position: 'relative',
            '&::after': {
              content: '""',
              display: 'block',
              width: '80px',
              height: '4px',
              backgroundColor: 'var(--gold)',
              margin: '20px auto 0',
              borderRadius: '2px'
            }
          }}
        >
          Nuestros Productos Destacados
        </Typography>
        
        {/* Grid de productos */}
        <Grid container spacing={4}>
          {productos.map((producto) => (
            <Grid item key={producto.idProducto} xs={12} sm={6} md={4} lg={3}>
              <ProductCard 
                product={producto} 
                sx={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(212,175,55,0.2)'
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
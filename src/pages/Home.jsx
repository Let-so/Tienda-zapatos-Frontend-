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
      {/* Banner Principal con fondo blanco */}
      <Box
        sx={{
          position: 'relative',
          background: '#ffffff',
          width: '100vw',
          maxWidth: '100%',
          mb: 4,
          height: { xs: '400px', md: '500px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            p: { xs: 3, md: 6 },
            maxWidth: '800px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <img 
            src="/src/assets/logo.png" 
            alt="Atenas" 
            style={{
              width: '300px',
              height: 'auto',
              marginBottom: '2rem'
            }}
          />
        </Box>
      </Box>

      {/* Sección de Productos */}
      <Container 
        maxWidth={false}
        disableGutters
        sx={{ 
          width: '100vw',
          maxWidth: '100%',
          py: 6,
          px: { xs: 2, sm: 4, md: 6 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
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
          NUESTROS PRODUCTOS DESTACADOS
        </Typography>
        
        <Grid 
          container 
          spacing={4} 
          justifyContent="center"
        >
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
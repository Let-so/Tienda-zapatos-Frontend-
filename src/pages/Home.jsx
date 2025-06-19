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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get('/productos');
        console.log('Respuesta del servidor:', response); // Debugging
        if (response.data && Array.isArray(response.data)) {
          setProductos(response.data);
        } else {
          console.error('Formato de datos incorrecto:', response.data);
          setError('Error en el formato de datos');
        }
      } catch (err) {
        console.error('Error fetching productos:', err);
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
        <CircularProgress />
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
    <Container maxWidth="xl">
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        sx={{ 
          textAlign: 'center', 
          my: 4,
          fontWeight: 'bold',
          color: 'primary.main' 
        }}
      >
        Nuestros Productos
      </Typography>
      <Grid container spacing={3} sx={{ py: 2 }}>
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
    </Container>
  );
}
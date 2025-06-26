import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import api from '../api/api';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  IconButton,
  Alert,
  Snackbar,
  Chip,
  Divider,
  Paper
} from '@mui/material';
import {
  Add,
  Remove,
  ShoppingCart,
  ArrowBack,
  LocalShipping,
  Security,
  StarBorder
} from '@mui/icons-material';

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
  console.log('🔍 Cargando producto con ID:', id);
  api.get(`/productos/${id}`)
    .then(res => {
      console.log('✅ Producto cargado:', res.data);
      setProducto(res.data);
    })
    .catch(error => {
      console.error('❌ Error cargando producto:', error);
      setProducto(null);
    });
}, [id]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setCantidad(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(producto.idProducto, cantidad);
      setAlertMessage(`¡${producto.nombreProducto} agregado al carrito!`);
      setShowAlert(true);
      setCantidad(1); // Reset quantity after adding
    } catch (error) {
      setAlertMessage('Error al agregar al carrito');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  if (!producto) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography>Cargando...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Back button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Volver
      </Button>

      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardMedia
              component="img"
              image={producto.imagenURL || '/placeholder-image.jpg'}
              alt={producto.nombreProducto}
              sx={{
                height: { xs: 300, md: 500 },
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg';
              }}
            />
          </Card>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Box sx={{ pl: { md: 2 } }}>
            {/* Product Name */}
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              {producto.nombreProducto}
            </Typography>

            {/* Stock Status */}
            <Box sx={{ mb: 2 }}>
              <Chip
                label={producto.stock ? "En Stock" : "Sin Stock"}
                color={producto.stock ? "success" : "error"}
                variant="outlined"
              />
            </Box>

            {/* Price */}
            <Typography variant="h3" color="text.primary" gutterBottom fontWeight="bold">
              ${producto.precio?.toLocaleString('es-AR')}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Description */}
            <Typography variant="h6" gutterBottom>
              Descripción
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {producto.descripcion}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Quantity Selector */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Cantidad
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                  onClick={() => handleQuantityChange(cantidad - 1)}
                  disabled={cantidad <= 1}
                  size="large"
                >
                  <Remove />
                </IconButton>
                
                <TextField
                  value={cantidad}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    handleQuantityChange(value);
                  }}
                  inputProps={{
                    min: 1,
                    style: { textAlign: 'center', fontSize: '1.2rem' }
                  }}
                  sx={{ width: 80 }}
                />
                
                <IconButton
                  onClick={() => handleQuantityChange(cantidad + 1)}
                  size="large"
                >
                  <Add />
                </IconButton>
              </Box>
            </Box>

            {/* Add to Cart Button */}
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              disabled={!producto.stock || loading}
              fullWidth
              sx={{
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                mb: 3
              }}
            >
              {loading ? 'Agregando...' : 'Agregar al Carrito'}
            </Button>

            {/* Product Features */}
            <Paper elevation={1} sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom>
                Beneficios
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalShipping color="primary" />
                  <Typography variant="body2">Envío gratis en compras mayores a $50.000</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Security color="primary" />
                  <Typography variant="body2">Garantía oficial del fabricante</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StarBorder color="primary" />
                  <Typography variant="body2">Producto 100% original</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* Success/Error Alert */}
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity={alertMessage.includes('Error') ? 'error' : 'success'}
          variant="filled"
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
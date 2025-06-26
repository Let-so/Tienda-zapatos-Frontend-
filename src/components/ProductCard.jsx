import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FavContext } from '../context/FavContext';
import { 
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import { AddShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { addFav, removeFav, isFavorite } = useContext(FavContext);

  // Estado para el Snackbar
  const [open, setOpen] = useState(false);

  const handleAddToCart = async () => {
    try {
      await addToCart(product.idProducto, 1);
      setOpen(true);
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  };

  return (
    <Card sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease',
      borderRadius: '8px',
      border: '1px solid var(--neutral-200)',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
      }
    }}>
      <Link to={`/product/${product.idProducto}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="300"
          image={product.imagenURL || 'https://via.placeholder.com/300x300'}
          alt={product.nombreProducto}
          sx={{ 
            objectFit: 'cover',
            borderBottom: '1px solid var(--neutral-200)'
          }}
        />
        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div" 
            color="text.primary"
            sx={{ 
              fontSize: '1.1rem',
              fontWeight: '500'
            }}
          >
            {product.nombreProducto}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#333',
              fontWeight: 'bold',
              mt: 2
            }}
          >
            ${product.precio}
          </Typography>
        </CardContent>
      </Link>
      <CardActions sx={{ 
        justifyContent: 'space-between',
        padding: '16px',
        borderTop: '1px solid var(--neutral-200)'
      }}>
        <Button
          size="large"
          variant="contained"
          startIcon={
            <AddShoppingCart sx={{ color: 'var(--neutral-800)' }} />
          }
          onClick={handleAddToCart}
          sx={{
            backgroundColor: 'var(--gold)',
            color: 'var(--neutral-800)', // <-- color de la letra
            '&:hover': {
              backgroundColor: 'var(--gold-light)',
              color: 'var(--neutral-800)'
            }
          }}
        >
          Agregar
        </Button>
        <IconButton
          onClick={async () => {
            try {
              if (isFavorite(product.idProducto)) {
                await removeFav(product.idProducto);
              } else {
                await addFav(product.idProducto);
              }
            } catch (error) {
              console.error('Error:', error);
            }
          }}
          sx={{
            color: isFavorite(product.idProducto) ? 'var(--gold)' : 'var(--neutral-800)',
            '&:hover': {
              color: 'var(--gold)'
            }
          }}
        >
          {isFavorite(product.idProducto) ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
      {/* Snackbar de confirmación */}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          ¡Producto agregado al carrito!
        </Alert>
      </Snackbar>
    </Card>
  );
}




// src/components/ProductCard.jsx
import React, { useContext } from 'react';
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
  IconButton
} from '@mui/material';
import { AddShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { addFav, removeFav, isFavorite } = useContext(FavContext);

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
              color: 'var(--gold)',
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
          onClick={() => addToCart(product.idProducto, 1)}
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
          onClick={() => isFavorite(product.idProducto) 
            ? removeFav(product.idProducto) 
            : addFav(product.idProducto)}
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
    </Card>
  );
}




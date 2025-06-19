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
      maxWidth: 345,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: '0.3s',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: 3
      }
    }}>
      <Link to={`/product/${product.idProducto}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.imagenURL || 'https://via.placeholder.com/200x200'}
          alt={product.nombreProducto}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" color="text.primary">
            {product.nombreProducto}
          </Typography>
          <Typography variant="h6" color="primary">
            ${product.precio}
          </Typography>
        </CardContent>
      </Link>
      <CardActions sx={{ marginTop: 'auto', justifyContent: 'space-between' }}>
        <Button
          size="small"
          variant="contained"
          startIcon={<AddShoppingCart />}
          onClick={() => addToCart(product.idProducto, 1)}
        >
          Agregar
        </Button>
        <IconButton 
          onClick={() => isFavorite(product.idProducto) 
            ? removeFav(product.idProducto) 
            : addFav(product.idProducto)}
          color={isFavorite(product.idProducto) ? "error" : "default"}
        >
          {isFavorite(product.idProducto) ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
    </Card>
  );
}




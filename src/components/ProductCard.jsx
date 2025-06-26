// src/components/ProductCard.jsx
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { FavContext } from '../context/FavContext'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton
} from '@mui/material'
import { AddShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material'

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext)
  const { addFav, removeFav, isFavorite } = useContext(FavContext)

  // Base URL de tu API (defínela en .env como VITE_API_URL=http://localhost:3001)
  const API_URL = import.meta.env.VITE_API_URL || ''

  // Construye la URL absoluta de la imagen:
  // - si `imagenURL` ya empieza con http, úsala tal cual
  // - si es ruta relativa, antepón la base API_URL
  const imagePath = product.imagenURL ?? ''
  const imageSrc = imagePath.startsWith('http')
    ? imagePath
    : `${API_URL}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`

  return (
    <Card
      sx={{
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
      }}
    >
      <Link
        to={`/product/${product.idProducto}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <CardMedia
          component="img"
          height="300"
          image={imageSrc || 'https://via.placeholder.com/300x300?text=Sin+imagen'}
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
            sx={{ fontSize: '1.1rem', fontWeight: 500 }}
          >
            {product.nombreProducto}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'var(--gold)', fontWeight: 'bold', mt: 2 }}
          >
            ${product.precio}
          </Typography>
        </CardContent>
      </Link>
      <CardActions
        sx={{
          justifyContent: 'space-between',
          p: 2,
          borderTop: '1px solid var(--neutral-200)'
        }}
      >
        <Button
          size="large"
          variant="contained"
          startIcon={<AddShoppingCart sx={{ color: 'var(--neutral-800)' }} />}
          onClick={() => addToCart(product.idProducto, 1)}
          sx={{
            backgroundColor: 'var(--gold)',
            color: 'var(--neutral-800)',
            '&:hover': {
              backgroundColor: 'var(--gold-light)',
              color: 'var(--neutral-800)'
            }
          }}
        >
          Agregar
        </Button>
        <IconButton
          onClick={() =>
            isFavorite(product.idProducto)
              ? removeFav(product.idProducto)
              : addFav(product.idProducto)
          }
          sx={{
            color: isFavorite(product.idProducto) ? 'var(--gold)' : 'var(--neutral-800)',
            '&:hover': { color: 'var(--gold)' }
          }}
        >
          {isFavorite(product.idProducto) ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
    </Card>
  )
}



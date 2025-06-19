import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Box,
  Card,
  CardContent,
  Alert
} from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';

export default function Cart() {
  const { items, removeItem, updateItem, clearCart, total } = useContext(CartContext);

  if (!items.length) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="info">Tu carrito está vacío</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Tu Carrito
      </Typography>
      <Card>
        <CardContent>
          <List>
            {items.map((item) => (
              <ListItem key={item.idProducto} divider>
                <ListItemText
                  primary={item.nombreProducto}
                  secondary={`Precio: $${item.precio}`}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <IconButton
                    onClick={() => updateItem(item.idProducto, item.cantidad - 1)}
                    disabled={item.cantidad <= 1}
                  >
                    <Remove />
                  </IconButton>
                  <Typography sx={{ mx: 2 }}>{item.cantidad}</Typography>
                  <IconButton
                    onClick={() => updateItem(item.idProducto, item.cantidad + 1)}
                  >
                    <Add />
                  </IconButton>
                </Box>
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => removeItem(item.idProducto)}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Total: ${total}
            </Typography>
            <Box>
              <Button
                variant="outlined"
                color="error"
                onClick={clearCart}
                sx={{ mr: 2 }}
              >
                Vaciar Carrito
              </Button>
              <Button
                variant="contained"
                color="primary"
              >
                Finalizar Compra
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import api from '../api/api';

const CartContext = createContext();

function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const { user } = useContext(AuthContext);

  // Al montar, cargamos el carrito
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const res = await api.get('/carrito');
          // Ensure we always set an array
          setItems(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
          console.error('Error loading cart:', error);
          setItems([]);
        }
      }
    };
    loadCart();
  }, [user]);

  const addToCart = async (idProducto, cantidad = 1) => {
    try {
      const { data } = await api.post('/carrito/items', { // Cambiado a /carrito/agregar
        idProducto,
        cantidad
      });
      
      setItems(prev => {
        const exists = prev.find(i => i.idProducto === idProducto);
        if (exists) {
          return prev.map(i => 
            i.idProducto === idProducto 
              ? { ...i, cantidad: i.cantidad + cantidad }
              : i
          );
        }
        return [...prev, data];
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateItem = async (idProducto, cantidad) => {
    try {
      await api.put(`/carrito/items`, { // Cambiado a /carrito/actualizar
        idProducto,
        cantidad
      });
      setItems(prev => 
        prev.map(i => i.idProducto === idProducto ? { ...i, cantidad } : i)
      );
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  };

  const removeItem = async (idProducto) => {
    try {
      await api.delete(`/carrito/items/${idProducto}`); // Cambiado a /carrito/eliminar/
      setItems(prev => prev.filter(i => i.idProducto !== idProducto));
    } catch (error) {
      console.error('Error removing cart item:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/carrito'); // Cambiado a /carrito/vaciar
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const calculateTotal = () => {
    if (!Array.isArray(items) || items.length === 0) return 0;
    return items.reduce((acc, item) => {
      const price = Number(item.precio) || 0;
      const quantity = Number(item.cantidad) || 0;
      return acc + (price * quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      updateItem, 
      removeItem, 
      clearCart,
      total: calculateTotal()
    }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };

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
          // 🔧 FIX: Los items están en res.data.items, no en res.data
          setItems(Array.isArray(res.data.items) ? res.data.items : []);
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
      const { data } = await api.post('/carrito/items', {
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
    await api.put(`/carrito/items`, {
      idProducto,
      cantidad
    });
    // Recarga el carrito completo desde el backend
    const res = await api.get('/carrito');
    setItems(Array.isArray(res.data.items) ? res.data.items : []);
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

  const removeItem = async (idProducto) => {
    try {
      await api.delete(`/carrito/items/${idProducto}`);
      setItems(prev => prev.filter(i => i.idProducto !== idProducto));
    } catch (error) {
      console.error('Error removing cart item:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/carrito');
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const calculateTotal = () => {
    if (!Array.isArray(items) || items.length === 0) return 0;
    return items.reduce((acc, item) => {
      // 🔧 FIX: El precio está en item.producto.precio
      const price = Number(item.producto?.precio) || 0;
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
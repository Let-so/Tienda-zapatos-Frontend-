import React, { createContext, useState, useEffect } from 'react'
import api from '../api/api'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  // Al montar, cargamos el carrito
  useEffect(() => {
    api.get('/carrito')
       .then(res => setItems(res.data.items || []))
       .catch(() => setItems([]))
  }, [])

  const addToCart = async (idProducto, cantidad = 1) => {
    const { data } = await api.post('/carrito', { idProducto, cantidad })
    setItems(prev => {
      const exists = prev.find(i => i.idItemCarrito === data.idItemCarrito)
      if (exists) {
        return prev.map(i => i.idItemCarrito === data.idItemCarrito ? data : i)
      }
      return [...prev, data]
    })
  }

  const updateItem = async (idItemCarrito, cantidad) => {
    const { data } = await api.put(`/carrito/${idItemCarrito}`, { cantidad })
    setItems(prev => prev.map(i => i.idItemCarrito === data.idItemCarrito ? data : i))
  }

  const removeItem = async (idItemCarrito) => {
    await api.delete(`/carrito/${idItemCarrito}`)
    setItems(prev => prev.filter(i => i.idItemCarrito !== idItemCarrito))
  }

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider value={{ items, addToCart, updateItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}


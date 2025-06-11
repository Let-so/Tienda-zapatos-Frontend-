import React, { useContext, useEffect, useState } from 'react'
import api from '../api/api'
import { AuthContext } from '../context/AuthContext'

export default function Cart() {
  const { user } = useContext(AuthContext)
  const [items, setItems] = useState([])

  useEffect(() => {
    api.get('/carrito')
      .then(res => setItems(res.data.items || []))
      .catch(() => setItems([]))
  }, [])

  return (
    <div>
      <h1>Tu Carrito</h1>
      <ul>
        {items.map(item => (
          <li key={item.idItem}>
            {item.producto.nombreProducto} x{item.cantidad}
          </li>
        ))}
      </ul>
    </div>
  )
}

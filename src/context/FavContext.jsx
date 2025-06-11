import React, { createContext, useState, useEffect } from 'react'
import api from '../api/api'

export const FavContext = createContext()

export function FavProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    api.get('/favoritos')
       .then(res => setFavorites(res.data))
       .catch(() => setFavorites([]))
  }, [])

  const addFav = async (idProducto) => {
    const data = await api.post('/favoritos', { idProducto })
    setFavorites(prev => [...prev, data])
  }

  const removeFav = async (idFavorito) => {
    await api.delete(`/favoritos/${idFavorito}`)
    setFavorites(prev => prev.filter(f => f.idFavorito !== idFavorito))
  }

  const isFavorite = (idProducto) => 
    favorites.some(f => f.producto.idProducto === idProducto)

  return (
    <FavContext.Provider value={{ favorites, addFav, removeFav, isFavorite }}>
      {children}
    </FavContext.Provider>
  )
}

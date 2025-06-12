// src/context/FavContext.jsx
import React, { createContext, useState, useEffect } from 'react'
import api from '../api/api'

export const FavContext = createContext()

export function FavProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const loadFavs = async () => {
      try {
        const res = await api.get('/favoritos')
        setFavorites(res.data)
      } catch (err) {
        console.error('Error cargando favoritos', err)
        setFavorites([])
      }
    }
    loadFavs()
  }, [])  // o [token] si quieres recargar cuando cambie el token

  const addFav = async idProducto => {
    const { data } = await api.post('/favoritos', { idProducto })
    setFavorites(favs => [...favs, data])
  }

  const removeFav = async idFavorito => {
    await api.delete(`/favoritos/${idFavorito}`)
    setFavorites(favs => favs.filter(f => f.idFavorito !== idFavorito))
  }

  const isFavorite = idProducto =>
    favorites.some(f => f.producto.idProducto === idProducto)

  return (
    <FavContext.Provider value={{ favorites, addFav, removeFav, isFavorite }}>
      {children}
    </FavContext.Provider>
  )
}

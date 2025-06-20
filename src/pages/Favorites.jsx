// src/pages/Favorites.jsx
import React, { useState, useEffect } from 'react'
import api from '../api/api'
import ProductCard from '../components/ProductCard'

export default function Favorites() {
  const [favoritos, setFavoritos] = useState([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    api
      .get('/favoritos')
      .then(res => setFavoritos(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="p-4">Cargando favoritos…</p>
  if (!favoritos.length) return <p className="p-4">No tienes favoritos aún.</p>

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {favoritos
        .filter(fav => fav.producto && fav.producto.idProducto) // Solo productos válidos
        .map(fav => (
          <ProductCard
            key={fav.idFavorito}
            product={fav.producto}
          />
        ))}
      {favoritos.filter(fav => !fav.producto).length > 0 && (
        <div className="text-red-500 mb-2">
          Algunos favoritos no tienen producto asociado.
        </div>
      )}
    </div>
  )
}

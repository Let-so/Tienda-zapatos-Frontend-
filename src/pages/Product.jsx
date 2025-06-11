import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/api'

export default function Product() {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)

  useEffect(() => {
    api.get(`/productos/${id}`)
      .then(res => setProducto(res.data))
      .catch(() => setProducto(null))
  }, [id])

  if (!producto) return <p>Cargando...</p>

  return (
    <div>
      <h1>{producto.nombreProducto}</h1>
      <p>{producto.descripcion}</p>
      <p>Precio: ${producto.precio}</p>
    </div>
  )
}

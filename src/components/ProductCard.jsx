// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'
import { FavContext }  from '../context/FavContext'

export default function ProductCard({ product }) {
  const { addToCart }     = useContext(CartContext)
  const { addFav, removeFav, isFavorite } = useContext(FavContext)

  return (
    <div className="card">
        <div className="border p-4 rounded shadow">
      <Link to={`/p/${product.idProducto}`}>
        <img
          src={product.imagenURL}
          alt={product.nombreProducto}
          className="w-full h-48 object-cover mb-2"
        />
        <h3 className="text-lg font-semibold">{product.nombreProducto}</h3>
        <p className="text-gray-600">${product.precio}</p>
      </Link>
    </div>
      <img src={product.imagenURL} alt={product.nombreProducto} />
      <h3>{product.nombreProducto}</h3>
      <p>${product.precio}</p>
      <button onClick={() => addToCart(product.idProducto, 1)}>
        Agregar al carrito
      </button>
      {isFavorite(product.idProducto) ? (
        <button onClick={() => removeFav(product.idProducto)}>
          💔 Quitar de favoritos
        </button>
      ) : (
        <button onClick={() => addFav(product.idProducto)}>
          ❤️ Favorito
        </button>
      )}
    </div>
  )
}




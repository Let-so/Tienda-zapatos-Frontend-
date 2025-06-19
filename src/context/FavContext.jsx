// src/context/FavContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import api from '../api/api';

const FavContext = createContext();

function FavProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadFavs = async () => {
      if (user) { // Solo cargar favoritos si hay usuario
        try {
          const res = await api.get('/favoritos');
          setFavorites(res.data);
        } catch (err) {
          console.error('Error cargando favoritos', err);
          setFavorites([]);
        }
      }
    };
    loadFavs();
  }, [user]); // Dependencia agregada

  const addFav = async idProducto => {
    const { data } = await api.post('/favoritos', { idProducto });
    setFavorites(favs => [...favs, data]);
  };

  const removeFav = async idFavorito => {
    await api.delete(`/favoritos/${idFavorito}`);
    setFavorites(favs => favs.filter(f => f.idFavorito !== idFavorito));
  };

  const isFavorite = idProducto =>
    favorites.some(f => f.producto.idProducto === idProducto);

  return (
    <FavContext.Provider value={{ favorites, addFav, removeFav, isFavorite }}>
      {children}
    </FavContext.Provider>
  );
}

export { FavContext, FavProvider };

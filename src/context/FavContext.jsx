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
      if (user) {
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
  }, [user]);

  const addFav = async idProducto => {
    const { data } = await api.post('/favoritos', { idProducto });
    setFavorites(favs => [...favs, data]);
  };

  const removeFav = async idProducto => {
    await api.delete(`/favoritos/${idProducto}`);
    setFavorites(favs => favs.filter(f => f.producto && f.producto.idProducto !== idProducto));
  };

  const isFavorite = idProducto =>
    favorites.some(f => f.producto && f.producto.idProducto === idProducto);

  return (
    <FavContext.Provider value={{ favorites, addFav, removeFav, isFavorite }}>
      {children}
    </FavContext.Provider>
  );
}

export { FavContext, FavProvider };

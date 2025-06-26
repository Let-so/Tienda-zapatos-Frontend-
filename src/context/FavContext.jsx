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
          console.log('🔍 Favoritos cargados:', res.data);
          setFavorites(res.data);
        } catch (err) {
          console.error('❌ Error cargando favoritos', err);
          setFavorites([]);
        }
      } else {
        setFavorites([]);
      }
    };
    loadFavs();
  }, [user]);

  const addFav = async (idProducto) => {
    try {
      console.log('❤️ Agregando favorito:', idProducto);
      const { data } = await api.post('/favoritos', { idProducto });
      console.log('✅ Favorito agregado:', data);
      
      setFavorites(favs => [...favs, data]);
    } catch (error) {
      console.error('❌ Error agregando favorito:', error);
      throw error;
    }
  };

  const removeFav = async (idProducto) => {
  try {
    console.log('💔 Removiendo favorito:', idProducto);
    await api.delete(`/favoritos/${idProducto}`);
    console.log('✅ Favorito removido');
    
    // Cambiar para buscar por idProducto directamente
    setFavorites(favs => favs.filter(f => f.idProducto !== idProducto));
  } catch (error) {
    console.error('❌ Error removiendo favorito:', error);
    throw error;
  }
};

  const isFavorite = (idProducto) => {
  // Buscar directamente por idProducto, no por f.producto.idProducto
  const result = favorites.some(f => f.idProducto === idProducto);
  console.log(`🔍 ¿Es favorito ${idProducto}?`, result, favorites);
  return result;
};  

  return (
    <FavContext.Provider value={{ favorites, addFav, removeFav, isFavorite }}>
      {children}
    </FavContext.Provider>
  );
}

export { FavContext, FavProvider };

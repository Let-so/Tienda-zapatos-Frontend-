// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    api.get('/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Cargando productos…</p>;

  return <h1>¡Hola desde Home!</h1>;
}

 

 
    //<div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
     // {productos.map(p => (
       // <ProductCard key={p.idProducto} product={p} />
    //  ))}
   // </div>
  //);
import React, { useState, useEffect } from 'react';
import api from '../api/api';
import ProductCard from '../components/ProductCard';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const categories = {
    sneakers: {
      name: 'Sneakers',
      subcategories: ['Urban', 'Sports', 'Fashion', 'Canvas', 'Basics']
    },
    general: {
      name: 'General',
      categories: ['Night', 'Kids', 'Men', 'Winter', 'Summer']
    }
  };

  const sizes = Array.from({ length: 20 }, (_, i) => i + 26); // Genera talles del 26 al 45

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedSubCategory, selectedSize]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/productos', {
        params: {
          categoria: selectedCategory,
          subcategoria: selectedSubCategory,
          talle: selectedSize
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory(''); 
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  return (
    <div className="products-container">
      <div className="filters">
        <div className="filter-group">
          <select 
            value={selectedCategory} 
            onChange={handleCategoryChange}
            className="filter-select"
          >
            <option value="">Todas las Categorías</option>
            <option value="sneakers">Sneakers</option>
            {categories.general.categories.map(category => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>

          {selectedCategory === 'sneakers' && (
            <select 
              value={selectedSubCategory} 
              onChange={handleSubCategoryChange}
              className="filter-select"
            >
              <option value="">Todos los Tipos</option>
              {categories.sneakers.subcategories.map(subcat => (
                <option key={subcat} value={subcat.toLowerCase()}>
                  {subcat}
                </option>
              ))}
            </select>
          )}

          <select 
            value={selectedSize} 
            onChange={handleSizeChange}
            className="filter-select"
          >
            <option value="">Todos los Talles</option>
            {sizes.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
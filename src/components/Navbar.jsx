import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Buscar productos..."
            />
            <FaSearch className="search-icon" />
          </div>
          <div className="select-container">
            <select className="nav-select">
              <option value="">Categoría</option>
              <option value="zapatos">Zapatos</option>
              <option value="botas">Botas</option>
              <option value="sandalias">Sandalias</option>
            </select>
          </div>
          <div className="select-container">
            <select className="nav-select">
              <option value="">Talle</option>
              <option value="35">35</option>
              <option value="36">36</option>
              <option value="37">37</option>
              <option value="38">38</option>
              <option value="39">39</option>
              <option value="40">40</option>
            </select>
          </div>
        </div>

        <div className="logo-container">
          <img src="/logo.jpg" alt="Atenas" className="logo-image" />
        </div>

        <div className="nav-right">
          <div className="nav-controls">
            {user ? (
              <>
                <Link to="/profile" className="icon-button">
                  <FaUser />
                </Link>
                <Link to="/cart" className="cart-container">
                  <FaShoppingCart className="icon-button" />
                  <span className="cart-count">0</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-select">Iniciar sesión</Link>
                <Link to="/register" className="nav-select" style={{color: 'var(--gold)'}}>Crear cuenta</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="main-content">
        {/* Aquí va el contenido principal */}
      </div>
    </>
  )
}

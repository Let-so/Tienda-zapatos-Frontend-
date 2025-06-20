import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)

  return (
    <>
      <nav className="navbar" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div className="nav-left" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div className="search-container" style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative'
          }}>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar productos..."
              style={{
                padding: '0.5rem 2rem 0.5rem 1rem',
                borderRadius: '20px',
                border: '1px solid #ddd'
              }}
            />
            <FaSearch className="search-icon" style={{
              position: 'absolute',
              right: '0.75rem',
              color: 'var(--gold)'
            }} />
          </div>
          <div className="select-container" style={{
            display: 'flex',
            gap: '0.5rem'
          }}>
            <select className="nav-select" style={{
              padding: '0.5rem',
              borderRadius: '20px',
              border: '1px solid #ddd'
            }}>
              <option value="">Categoría</option>
              <option value="zapatos">Zapatos</option>
              <option value="botas">Botas</option>
              <option value="sandalias">Sandalias</option>
            </select>
          </div>
          <div className="select-container">
            <select className="nav-select" style={{
              padding: '0.5rem',
              borderRadius: '20px',
              border: '1px solid #ddd'
            }}>
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

        <div className="nav-right" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div className="nav-controls" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {user ? (
              <>
                <Link to="/profile" className="icon-button" style={{
                  color: 'var(--gold)',
                  fontSize: '1.2rem'
                }}>
                  <FaUser />
                </Link>
                <Link to="/cart" className="cart-container" style={{
                  color: 'var(--gold)',
                  fontSize: '1.2rem',
                  position: 'relative'
                }}>
                  <FaShoppingCart className="icon-button" />
                  <span className="cart-count" style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: 'var(--gold)',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px 6px',
                    fontSize: '0.8rem'
                  }}>0</span>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="nav-select" 
                  style={{
                    textDecoration: 'none',
                    color: '#333',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    transition: 'all 0.3s ease'
                  }}
                >Iniciar sesión</Link>
                <Link 
                  to="/register" 
                  className="nav-select" 
                  style={{
                    textDecoration: 'none',
                    color: 'var(--gold)',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    border: '1px solid var(--gold)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'var(--gold)',
                      color: 'white'
                    }
                  }}
                >Crear cuenta</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

// src/components/Navbar.jsx
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: 16 }}>Home</Link>
      {user ? (
        <>
          <Link to="/profile" style={{ marginRight: 16 }}>Profile</Link>
          <Link to="/cart" style={{ marginRight: 16 }}>Cart</Link>
          <Link to="/favorites" style={{ marginRight: 16 }}>Favorites</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: 16 }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  )
}

// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

import Navbar         from './components/Navbar'
import Footer         from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

import Home           from './pages/Home'
import ProductList    from './components/ProductList'
import Product        from './pages/Product'
import Login          from './pages/Login'
import Register       from './pages/Register'
import Cart           from './pages/Cart'
import Profile        from './pages/Profile'
import Favorites      from './pages/Favorites'

export default function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <Box component="main" sx={{ flexGrow: 1, py: 0 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* ... demás rutas ... */}
        </Routes>
      </Box>

      <Footer />
    </Box>
  )
}

// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Box, Typography } from '@mui/material'  
import Home from './pages/Home'
import ProductList from './components/ProductList'
import Product from './pages/Product'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Favorites from './pages/Favorites'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <React.Fragment>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h4">404 • Página no encontrada</Typography>
            </Box>
          }
        />
      </Routes>

      <Footer />
    </React.Fragment>
  )
}

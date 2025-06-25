import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Navbar from './components/Navbar'
import Header from './pages/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductList from './components/ProductList'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Favorites from './pages/Favorites'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      {/* Banner estático en toda la app */}
      <Header />

      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/cart" element={
            <ProtectedRoute><Cart /></ProtectedRoute>
          }/>

          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          }/>

          <Route path="/favorites" element={
            <ProtectedRoute><Favorites /></ProtectedRoute>
          }/>

          {/* fallback 404 */}
          <Route path="*" element={
            <Box sx={{ p:4, textAlign:'center' }}>
              <Typography variant="h4">404 • Página no encontrada</Typography>
            </Box>
          }/>
        </Routes>
      </Box>

      <Footer />
    </Box>
  )
}

export default App

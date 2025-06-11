import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { FavProvider } from './context/FavContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <FavProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FavProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
)

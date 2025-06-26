// src/components/Navbar.jsx
import React, { useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'

// **IMPORTACIONES DE MUI**
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  InputBase,
  Select,
  MenuItem,
  Button,
  Divider,
  ListSubheader
} from '@mui/material'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)

  return (
    <>
      {/* Un AppBar completo en lugar de mezclar <nav> y MUI */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>

          {/* Logo centrado */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <RouterLink to="/">
              <Box
                component="img"
                src="/logo.png"
                alt="Atenas Logo"
                sx={{ height: 60 }}
              />
            </RouterLink>
          </Box>

          {/* Buscador */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, mx: 3 }}>
            <InputBase
              placeholder="Buscar productos…"
              sx={{
                px: 2,
                py: 1,
                border: '1px solid #ddd',
                borderRadius: '20px',
                flex: 1
              }}
              endAdornment={<FaSearch color="goldenrod" />}
            />
            <Select
              displayEmpty
              value=""
              sx={{ minWidth: 100, borderRadius: '20px', '& .MuiSelect-select': { py: 1 } }}
              renderValue={() => 'Categoría'}
            >
              <ListSubheader disableSticky sx={{ fontWeight: 'bold', color: 'goldenrod', fontSize: 14, background: 'inherit' }}>
                SNEAKERS
              </ListSubheader>
              <MenuItem value="urban">Urban</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
              <MenuItem value="fashion">Fashion</MenuItem>
              <MenuItem value="canvas">Canvas</MenuItem>
              <MenuItem value="basic">Basic</MenuItem>
              <Divider />
              <ListSubheader disableSticky sx={{ fontWeight: 'bold', color: 'goldenrod', fontSize: 14, background: 'inherit' }}>
                SEASON & STYLE
              </ListSubheader>
              <MenuItem value="night">Night</MenuItem>
              <MenuItem value="winter">Winter</MenuItem>
              <MenuItem value="summer">Summer</MenuItem>
              <MenuItem value="kids">Kids</MenuItem>
              <MenuItem value="men">Men</MenuItem>
            </Select>
            <Select
              displayEmpty
              value=""
              sx={{ minWidth: 80, borderRadius: '20px', '& .MuiSelect-select': { py: 1 } }}
            >
              <MenuItem value="">Talle</MenuItem>
              {[35,36,37,38,39,40].map(t => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </Select>
          </Box>

          {/* Iconos de usuario / carrito */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user ? (
              <>
                <IconButton component={RouterLink} to="/profile" color="inherit">
                  <FaUser />
                </IconButton>
                <IconButton component={RouterLink} to="/cart" color="inherit">
                  <FaShoppingCart />
                  {/* podrías usar un Badge de MUI aquí para contar los items */}
                </IconButton>
                <Button color="inherit" onClick={logout}>Salir</Button>
              </>
            ) : (
              <>
                <Button component={RouterLink} to="/login" color="inherit">Iniciar sesión</Button>
                <Button component={RouterLink} to="/register" variant="outlined" color="inherit">
                  Crear cuenta
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

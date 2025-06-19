import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import Navbar from './Navbar';

function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            TIENDA ZAPATOS
          </Typography>
          <Navbar />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { FaInstagram, FaTruck, FaCreditCard, FaLock } from 'react-icons/fa';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        backgroundColor: 'white',
        borderTop: '1px solid #eaeaea',
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} textAlign="center" mb={4}>
            <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <FaInstagram />
              @atenas.importados
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4} textAlign="center">
            <FaTruck size={24} />
            <Typography variant="body1" mt={2}>
              Enviamos tu compra
              <br />
              Entregas a todo el país
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4} textAlign="center">
            <FaCreditCard size={24} />
            <Typography variant="body1" mt={2}>
              Pagá como quieras
              <br />
              Tarjetas de crédito o efectivo
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4} textAlign="center">
            <FaLock size={24} />
            <Typography variant="body1" mt={2}>
              Comprá con seguridad
              <br />
              Tus datos siempre protegidos
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
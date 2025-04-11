import React from 'react';
import { Box, TextField, Button, Typography, Divider } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '450px',
      margin: '0 auto',
      padding: '4rem 2rem',
      fontFamily: 'Outfit, sans-serif'
    }}>
      {/* Título */}
      <Typography variant="h4" sx={{
        fontFamily: 'Outfit',
        fontWeight: 700,
        color: '#413324',
        marginBottom: '2rem',
        fontSize: '2.5rem'
      }}>
        Crear cuenta
      </Typography>

      {/* Formulario */}
      <Box component="form" sx={{ width: '100%' }}>
        {/* Campo Nombre */}
        <Typography variant="subtitle1" sx={{
          fontFamily: 'Outfit',
          fontWeight: 500,
          color: '#413324',
          marginBottom: '0.5rem'
        }}>
          Nombre
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Tu nombre"
          sx={{
            marginBottom: '1.5rem',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: '#FFF'
            }
          }}
        />

        {/* Campo Apellido */}
        <Typography variant="subtitle1" sx={{
          fontWeight: 500,
          fontFamily: 'Outfit',
          color: '#413324',
          marginBottom: '0.5rem'
        }}>
          Apellido
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Tu apellido"
          sx={{
            marginBottom: '1.5rem',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: '#FFF'
            }
          }}
        />

        {/* Campo Email */}
        <Typography variant="subtitle1" sx={{
          fontWeight: 500,
          fontFamily: 'Outfit',
          color: '#413324',
          marginBottom: '0.5rem'
        }}>
          Correo electrónico
        </Typography>
        <TextField
          fullWidth
          type="email"
          variant="outlined"
          placeholder="tu@email.com"
          sx={{
            marginBottom: '1.5rem',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: '#FFF'
            }
          }}
        />

        {/* Campo Contraseña */}
        <Typography variant="subtitle1" sx={{
          fontWeight: 500,
          fontFamily: 'Outfit',
          color: '#413324',
          marginBottom: '0.5rem'
        }}>
          Contraseña
        </Typography>
        <TextField
          fullWidth
          type="password"
          variant="outlined"
          placeholder="••••••••"
          sx={{
            marginBottom: '2rem',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: '#FFF'
            }
          }}
        />

        {/* Botón Registrarse */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: '#7E7EC3',
            color: '#FFF',
            padding: '12px',
            borderRadius: '8px',
            fontFamily: 'Outfit',
            fontWeight: 600,
            fontSize: '1rem',
            marginBottom: '1.5rem',
            '&:hover': {
              backgroundColor: '#6a6aab'
            }
          }}
        >
          Registrarse
        </Button>

        {/* Divisor */}
        <Divider sx={{ margin: '2rem 0', color: '#ccc' }}>o</Divider>

        {/* Botón Google */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{
            color: '#413324',
            borderColor: '#ccc',
            padding: '12px',
            borderRadius: '8px',
            fontFamily: 'Outfit',
            fontWeight: 500,
            fontSize: '1rem',
            marginBottom: '2rem',
            '&:hover': {
              borderColor: '#413324'
            }
          }}
        >
          Registrarse con Google
        </Button>

        {/* Enlace a Login */}
        <Typography sx={{ textAlign: 'center', color: '#413324' }}>
          ¿Ya tienes una cuenta?{' '}
          <Typography 
            component="span" 
            sx={{
              color: '#7E7EC3',
              fontFamily: 'Outfit',
              fontWeight: 600,
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            <Link to ="/signin">Inicia sesión</Link>
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
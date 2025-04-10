// Importación de componentes de Material UI y React necesarios
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

// Define los nombres que se mostrarán en la barra para la navegación
const pages = ['Inventarios', 'Productos', 'Precios', 'Ordenes', 'Pagos', 'Envios'];

// Define las opciones del menú de usuario (por ejemplo, perfil, cuenta, etc.)
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// Objeto para mapear el nombre de la página (en mayúsculas) a la ruta correspondiente
const routes = {
  INVENTARIOS: "/inventories",
  PRODUCTOS: "/products",
  PRECIOS: "/prices",
  ORDENES: "/orders",
  PAGOS: "/payments",
  ENVIOS: "/shippings"
};

function ResponsiveAppBar() {
  // Permite la navegación programática a través de las rutas definidas
  const navigate = useNavigate();

  // Estado para controlar la apertura del menú de navegación en dispositivos móviles
  const [anchorElNav, setAnchorElNav] = useState(null);
  // Estado para controlar la apertura del menú del usuario (al hacer clic en el avatar)
  const [anchorElUser, setAnchorElUser] = useState(null);

  // Función para abrir el menú de navegación (version móvil)
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  // Función para abrir el menú de usuario
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // Función que maneja el clic en cualquiera de los elementos de navegación.
  // Recibe el nombre de la página clickeada, obtiene la ruta y redirige.
  const handleNavClick = (page) => {
    // Busca la ruta asociada a la página; si no hay, redirige a la página principal.
    const route = routes[page.toUpperCase()] || "/";
    navigate(route);
    // Cierra el menú de navegación (por ejemplo, en la versión móvil)
    setAnchorElNav(null);
  };

  // Función para cerrar el menú de usuario
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    // Componente AppBar que contiene la barra de navegación
    <AppBar position="static">
      <Container maxWidth="xl">
        {/* Toolbar organiza los elementos dentro de la barra */}
        <Toolbar disableGutters>
          {/* Ícono y logotipo para versión de escritorio */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Outfit',   // Fuente personalizada
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {/* Contenedor para el menú responsive (versión móvil) */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {/* Botón de menú (icono hamburguesa) */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* Menú desplegable para dispositivos móviles */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logotipo para versión móvil */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/" // Enlace para regresar a la página principal en móviles
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Outfit',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {/* Botones de navegación para versión de escritorio */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavClick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Menú del usuario: ícono de avatar y opciones desplegables */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/files/images/userDefault.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;

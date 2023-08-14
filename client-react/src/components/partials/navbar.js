import * as React from 'react';
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
import LogoutButton from '../buttons/logout-button';
import { Link } from 'react-router-dom';
import SearchBar from './searchbar';
import NetworkButton from '../buttons/network-button';
import logoImage from '../../images/logo.png'
import { useAuth0 } from '@auth0/auth0-react'; 



const pages = ['Profile', 'Connect', 'Chat'];
const settings = ['Profile', 'Connect', 'Chat', 'Logout'];

function ResponsiveAppBar({ showSearch, industries, selectedIndustries, setSelectedIndustries, filterProfilesByIndustry }) {
  const { logout } = useAuth0();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#13264D' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={logoImage}
            alt="Logo"
            style={{
              maxWidth: '250px',
              marginRight: '10%',
              display: { xs: 'flex', md: 'none' },
            }}
          />
  
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
  
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
  
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 4 }}> 
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link}
                to={`/${page.toLowerCase()}`}
              >
                {page}
              </Button>
            ))}
          </Box>
          
          {/* Logout Button placed here to be at the end */}
          <Button
            sx={{ my: 2, color: 'white', display: 'block' }}
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Logout
          </Button>
  
        </Toolbar>
      </Container>
    </AppBar>
  );    
}
export default ResponsiveAppBar;

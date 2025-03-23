import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ Import Auth Context

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Learn", path: "/courses" },
    { name: "Interview Prep", path: "/interview-prep" },
    ...(isAuthenticated
      ? [{ name: "Logout", path: "/login", onClick: logout }]
      : [
          { name: "Login", path: "/login" },
          { name: "Sign Up", path: "/register" },
        ]),
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#355E92' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="img" src="/src/assets/logo.png" sx={{ height: 60 }} />
        </Box>

        {!isMobile ? (
          <Box sx={{ display: 'flex', gap: 3 }}>
            {menuItems.map((item) => (
              <span key={item.name}>
                {item.onClick ? (
                  <span style={{ cursor: 'pointer', color: 'white', fontSize: 16 }} onClick={item.onClick}>
                    {item.name}
                  </span>
                ) : (
                  <Link to={item.path} style={{ textDecoration: 'none', color: 'white', fontSize: 16 }}>
                    {item.name}
                  </Link>
                )}
              </span>
            ))}
          </Box>
        ) : (
          <IconButton color="inherit" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        )}

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton color="inherit"><InstagramIcon /></IconButton>
          <IconButton color="inherit"><FacebookIcon /></IconButton>
          <IconButton color="inherit"><TwitterIcon /></IconButton>
        </Box>
      </Toolbar>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.name}
              component={item.onClick ? 'div' : Link}
              to={item.onClick ? undefined : item.path}
              onClick={() => {
                handleDrawerToggle();
                item.onClick?.();
              }}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
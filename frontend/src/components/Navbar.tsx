import React from 'react';
import { AppBar, Toolbar, Box, Link, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Navbar: React.FC = () => (
  <AppBar position="static" sx={{ backgroundColor: '#355E92' }}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box component="img" src="/src/assets/logo.png" sx={{ height: 50 }} />

      <Box sx={{ display: 'flex', gap: 3 }}>
        {["Home", "Learn", "Interview Prep", "Login", "Sign Up"].map((item) => (
          <Link
            key={item}
            component={RouterLink}
            to={`/${item.toLowerCase().replace(" ", "-")}`}
            underline="none"
            color="inherit"
            sx={{ fontSize: 16 }}
          >
            {item}
          </Link>
        ))}
      </Box>

      <Box>
        <IconButton color="inherit"><InstagramIcon /></IconButton>
        <IconButton color="inherit"><FacebookIcon /></IconButton>
        <IconButton color="inherit"><TwitterIcon /></IconButton>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;
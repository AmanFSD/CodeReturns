import React from 'react';
import { AppBar, Toolbar, Typography, Box, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Navbar: React.FC = () => (
  <AppBar position="static" sx={{ backgroundColor: '#355E92' }}>
    <Toolbar>
      <Box component="img" src="/src/assets/logo.png" sx={{ height: 60 }} />
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
        {["Home", "Learn", "Interview Prep", "Login", "Sign Up"].map((item) => (
          <Link key={item} href="#" underline="none" color="inherit" sx={{ fontSize: 16 }}>
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
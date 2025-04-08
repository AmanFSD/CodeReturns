// src/components/StudentNavbar.tsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";

const StudentNavbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Learn", path: "/courses" },
    { name: "Interview Prep", path: "/interview-prep" },
    { name: "Profile", path: "/profile" },
    { name: "Logout", onClick: handleLogout },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#355E92" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center" }}>
          <Box component="img" src="/src/assets/logo.png" sx={{ height: 60 }} />
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {menuItems.map((item) =>
            item.onClick ? (
              <span key={item.name} style={{ cursor: "pointer", color: "white" }} onClick={item.onClick}>
                {item.name}
              </span>
            ) : (
              <Link key={item.name} to={item.path!} style={{ textDecoration: "none", color: "white" }}>
                {item.name}
              </Link>
            )
          )}
        </Box>
        <IconButton color="inherit" onClick={() => setMobileOpen(!mobileOpen)} sx={{ display: { md: "none" } }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.name}
              button
              component={item.onClick ? "div" : Link}
              to={item.onClick ? undefined : item.path}
              onClick={() => {
                setMobileOpen(false);
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

export default StudentNavbar;
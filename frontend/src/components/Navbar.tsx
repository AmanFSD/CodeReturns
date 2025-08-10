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
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { userRole, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate("/login");
  };

  const publicMenu = [
    { name: "Home", path: "/" },
    { name: "Learn", path: "/courses" },
    { name: "Interview Prep", path: "/interview-prep" },
    { name: "Login", path: "/login" },
    { name: "Sign Up", path: "/register" },
  ];

  const studentMenu = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Learn", path: "/courses" },
    { name: "Interview Prep", path: "/interview-prep" },
    { name: "Profile", path: "/profile" },
    { name: "Logout", onClick: handleLogout },
  ];

  const mentorMenu = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/instructor/profile" },
    { name: "My Courses", path: "/instructor/my-courses" },
    { name: "Upload Course", path: "/instructor/upload" },
    { name: "Enrollments", path: "/instructor/enrollments" },
    { name: "Stats", path: "/instructor/stats" },
    { name: "Logout", onClick: handleLogout },
  ];

  const menuItems =
    isAuthenticated && userRole === "mentor"
      ? mentorMenu
      : isAuthenticated && userRole === "student"
      ? studentMenu
      : publicMenu;

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#355E92", top: 0, zIndex: 1100 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center" }}>
          <Box component="img" src={logo} alt="KJ Code" sx={{ height: 60 }} />
        </Box>

        {/* Desktop menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {menuItems.map((item) =>
            "onClick" in item && item.onClick ? (
              <span
                key={item.name}
                onClick={item.onClick}
                style={{ cursor: "pointer", color: "white" }}
              >
                {item.name}
              </span>
            ) : (
              <Link
                key={item.name}
                to={item.path!}
                style={{ textDecoration: "none", color: "white" }}
              >
                {item.name}
              </Link>
            )
          )}
        </Box>

        {/* Mobile menu button */}
        <IconButton
          sx={{ display: { md: "none" } }}
          onClick={() => setMobileOpen(!mobileOpen)}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.name}
              button
              component={item.path ? Link : "div"}
              to={item.path}
              onClick={() => {
                if (item.onClick) {
                  item.onClick();
                } else {
                  setMobileOpen(false);
                }
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
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg"; // Adjust path if needed

const navLinks = [
  { label: "Dashboard", to: "/admin/dashboard" },
  { label: "Applications", to: "/admin/applications" },
  { label: "Students", to: "/admin/students" },
  { label: "Courses", to: "/admin/courses" },
];

const AdminNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setMobileOpen(false)}
    >
      <List>
        {navLinks.map((item) => (
          <ListItem button key={item.label} component={Link} to={item.to}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src={logo}
              alt="Logo"
              style={{
                height: 40,
                width: 40,
                borderRadius: "50%",
                marginRight: 12,
                objectFit: "cover",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
            <Typography
              variant="h6"
              component={Link}
              to="/admin"
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "bold",
                letterSpacing: 1,
                fontSize: "1.5rem",
                mr: 3,
              }}
            >
              Admin Panel
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navLinks.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                component={Link}
                to={item.to}
                sx={{ textTransform: "none" }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default AdminNavbar;

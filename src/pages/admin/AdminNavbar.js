import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg"; // Adjust path if needed

const AdminNavbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
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
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            color="inherit"
            variant="outlined"
            sx={{
              borderRadius: 20,
              textTransform: "none",
              fontWeight: 500,
              px: 3,
              "&:hover": { bgcolor: "primary.light" },
            }}
            onClick={() => navigate("/admin/applications")}
          >
            Applications
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            sx={{
              borderRadius: 20,
              textTransform: "none",
              fontWeight: 500,
              px: 3,
              "&:hover": { bgcolor: "primary.light" },
            }}
            onClick={() => navigate("/admin/students")}
          >
            Students
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            sx={{
              borderRadius: 20,
              textTransform: "none",
              fontWeight: 500,
              px: 3,
              "&:hover": { bgcolor: "primary.light" },
            }}
            onClick={() => navigate("/admin/courses")}
          >
            Courses
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;

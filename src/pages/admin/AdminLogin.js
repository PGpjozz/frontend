import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (res.ok && data.access) {
        // Use the token from login response
        const userRes = await fetch("http://localhost:8000/api/user/", {
          headers: {
            Authorization: `Bearer ${data.access}`,
          },
        });
        const user = await userRes.json();
        if (user.is_superuser) {
          localStorage.setItem("adminToken", data.access);
          navigate("/admin/dashboard");
        } else {
          setError("Only admins can login.");
        }
      } else {
        setError("Invalid credentials.");
      }
    } catch {
      setError("Login failed.");
    }
  };

  return (
    <Container sx={{ py: 5 }}>
      <Box
        sx={{
          maxWidth: 400,
          mx: "auto",
          p: 3,
          background: "#fff",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Admin Login
        </Typography>
        <TextField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default AdminLogin;

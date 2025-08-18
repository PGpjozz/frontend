import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import PageWrapper from "../../components/PageWrapper";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [open, setOpen] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the form data to your backend or a service
    setOpen(true);
    setForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <PageWrapper>
      <Container
        sx={{
          py: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" gutterBottom align="center">
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }} align="center">
          Please fill out the form below and we’ll get back to you soon.
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 500,
            width: "100%",
            background: "#fff",
            p: 3,
            borderRadius: 2,
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send
          </Button>
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Message sent successfully!
          </Alert>
        </Snackbar>
      </Container>
    </PageWrapper>
  );
};

export default Contact;

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  InputLabel,
  InputAdornment,
} from "@mui/material";

const qualifications = [
  "Grade 11",
  "Grade 12",
  "Certificate",
  "Diploma",
  "Other",
];
const genders = ["Male", "Female", "Other", "Prefer not to say"];

const Application = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    email: "",
    phone: "",
    id_number: "",
    course: "",
    qualification: "",
    motivation: "",
    qualification_doc: null,
    id_doc: null,
    cv: null,
  });
  const [open, setOpen] = useState(false);

  // Fetch public courses
  useEffect(() => {
    fetch("http://localhost:8000/api/public-courses/")
      .then((res) => res.json())
      .then((data) =>
        setCourses(Array.isArray(data) ? data : data.results || [])
      )
      .catch(() => setCourses([]));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all form fields
    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== "") {
        formData.append(key, form[key]);
      }
    });

    try {
      const res = await fetch("http://localhost:8000/api/application/", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        setOpen(true);
        setForm({
          first_name: "",
          middle_name: "",
          last_name: "",
          gender: "",
          email: "",
          phone: "",
          id_number: "",
          course: "",
          qualification: "",
          motivation: "",
          qualification_doc: null,
          id_doc: null,
          cv: null,
        });
        // Reset file inputs
        ["qualification_doc", "id_doc", "cv"].forEach(
          (id) => (document.getElementById(id).value = "")
        );
      } else {
        console.log("Submission errors:", data);
      }
    } catch (err) {
      console.log("Submission failed:", err);
    }
  };

  return (
    <Container
      sx={{
        py: 5,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        Training Application
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
          width: "100%",
          mx: "auto",
          p: 3,
          background: "#fff",
          borderRadius: 2,
          boxShadow: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        encType="multipart/form-data"
      >
        <TextField
          label="First Name"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
          InputProps={{ style: { textAlign: "center" } }}
        />
        <TextField
          label="Middle Name"
          name="middle_name"
          value={form.middle_name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          InputProps={{ style: { textAlign: "center" } }}
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
          InputProps={{ style: { textAlign: "center" } }}
        />

        <TextField
          select
          label="Gender"
          name="gender"
          value={form.gender}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
          InputProps={{ style: { textAlign: "center" } }}
        >
          {genders.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
          InputProps={{ style: { textAlign: "center" } }}
        />
        <TextField
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
          InputProps={{ style: { textAlign: "center" } }}
        />
        <TextField
          label="ID Number"
          name="id_number"
          value={form.id_number}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
          inputProps={{
            maxLength: 13,
            pattern: "\\d{13}",
            style: { textAlign: "center" },
          }}
          helperText="ID number must be exactly 13 digits"
        />

        <TextField
          select
          label="Select Course"
          name="course"
          value={form.course}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
          InputProps={{ style: { textAlign: "center" } }}
        >
          {courses.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Highest Qualification"
          name="qualification"
          value={form.qualification}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
          InputProps={{ style: { textAlign: "center" } }}
        >
          {qualifications.map((q) => (
            <MenuItem key={q} value={q}>
              {q}
            </MenuItem>
          ))}
        </TextField>

        <InputLabel htmlFor="qualification_doc" sx={{ alignSelf: "center" }}>
          Upload Qualification
        </InputLabel>
        <input
          type="file"
          id="qualification_doc"
          name="qualification_doc"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleChange}
          style={{ marginBottom: 16, width: "100%", textAlign: "center" }}
          required
        />

        <InputLabel htmlFor="id_doc" sx={{ alignSelf: "center" }}>
          Upload ID
        </InputLabel>
        <input
          type="file"
          id="id_doc"
          name="id_doc"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleChange}
          style={{ marginBottom: 16, width: "100%", textAlign: "center" }}
          required
        />

        <InputLabel htmlFor="cv" sx={{ alignSelf: "center" }}>
          Upload CV
        </InputLabel>
        <input
          type="file"
          id="cv"
          name="cv"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          style={{ marginBottom: 16, width: "100%", textAlign: "center" }}
          required
        />

        <TextField
          label="Motivation"
          name="motivation"
          value={form.motivation}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
          InputProps={{ style: { textAlign: "center" } }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit Application
        </Button>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Application submitted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Application;

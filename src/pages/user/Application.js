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
  FormHelperText,
} from "@mui/material";

const qualifications = [
  "Grade 11",
  "Grade 12",
  "Certificate",
  "Diploma",
  "Other",
];
const genders = ["Male", "Female", "Other", "Prefer not to say"];

const requiredFields = [
  "first_name",
  "last_name",
  "gender",
  "email",
  "phone",
  "id_number",
  "course",
  "qualification",
  "id_doc",
];

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
  const [errors, setErrors] = useState({});

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
    // Only allow numbers for ID number
    if (name === "id_number") {
      const numericValue = value.replace(/\D/g, "");
      setForm({ ...form, [name]: numericValue });
      setErrors({ ...errors, [name]: undefined });
      return;
    }
    if (files && files.length > 0) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
    setErrors({ ...errors, [name]: undefined });
  };

  const validate = () => {
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (
        (field === "id_doc" && !form.id_doc) ||
        (field !== "id_doc" && (form[field] === "" || form[field] === null))
      ) {
        newErrors[field] = "This field is required";
      }
    });
    // Email format
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    // ID number format
    if (form.id_number && form.id_number.length !== 13) {
      newErrors.id_number = "ID number must be exactly 13 digits";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
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
        ["qualification_doc", "id_doc", "cv"].forEach(
          (id) => (document.getElementById(id).value = "")
        );
        setErrors({});
      } else {
        setErrors(data);
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

      {/* Professional Note Section */}
      <Box
        sx={{
          maxWidth: 500,
          width: "100%",
          mx: "auto",
          mb: 3,
          p: 2,
          background: "#f5f7fa",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          <strong>Important Information:</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Applications submitted during the current month will be enrolled for
          training starting the following month.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          You may pay a deposit at any time after submitting your application.
          However, full payment must be completed before training commences.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <strong>Banking Details:</strong>
          <br />
          Account Number: <b>10541111537</b>
          <br />
          Account Holder: <b>Sogwa Solutions Pty Ltd</b>
          <br />
          Please use your <b>ID number</b> as the payment reference.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Kindly send your proof of payment via WhatsApp to <b>083 583 6842</b>.
        </Typography>
      </Box>

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
          error={!!errors.first_name}
          helperText={errors.first_name}
          InputProps={{ style: { textAlign: "center" } }}
        />
        <TextField
          label="Middle Name"
          name="middle_name"
          value={form.middle_name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.middle_name}
          helperText={errors.middle_name}
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
          error={!!errors.last_name}
          helperText={errors.last_name}
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
          error={!!errors.gender}
          helperText={errors.gender}
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
          error={!!errors.email}
          helperText={errors.email}
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
          error={!!errors.phone}
          helperText={errors.phone}
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
          error={!!errors.id_number}
          helperText={errors.id_number || "ID number must be exactly 13 digits"}
          inputProps={{
            maxLength: 13,
            inputMode: "numeric",
            pattern: "\\d{13}",
            style: { textAlign: "center" },
          }}
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
          error={!!errors.course}
          helperText={errors.course}
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
          error={!!errors.qualification}
          helperText={errors.qualification}
          InputProps={{ style: { textAlign: "center" } }}
        >
          {qualifications.map((q) => (
            <MenuItem key={q} value={q}>
              {q}
            </MenuItem>
          ))}
        </TextField>

        {/* ID upload at the top, required */}
        <InputLabel htmlFor="id_doc" sx={{ alignSelf: "center", mt: 2 }}>
          Upload ID <span style={{ color: "red" }}>*</span>
        </InputLabel>
        <input
          type="file"
          id="id_doc"
          name="id_doc"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleChange}
          style={{ marginBottom: 8, width: "100%", textAlign: "center" }}
          required
        />
        {errors.id_doc && (
          <FormHelperText error sx={{ mb: 2 }}>
            {errors.id_doc}
          </FormHelperText>
        )}

        <InputLabel
          htmlFor="qualification_doc"
          sx={{ alignSelf: "center", mt: 2 }}
        >
          Upload Qualification (optional)
        </InputLabel>
        <input
          type="file"
          id="qualification_doc"
          name="qualification_doc"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleChange}
          style={{ marginBottom: 8, width: "100%", textAlign: "center" }}
        />
        {errors.qualification_doc && (
          <FormHelperText error sx={{ mb: 2 }}>
            {errors.qualification_doc}
          </FormHelperText>
        )}

        <InputLabel htmlFor="cv" sx={{ alignSelf: "center", mt: 2 }}>
          Upload CV (optional)
        </InputLabel>
        <input
          type="file"
          id="cv"
          name="cv"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          style={{ marginBottom: 8, width: "100%", textAlign: "center" }}
        />
        {errors.cv && (
          <FormHelperText error sx={{ mb: 2 }}>
            {errors.cv}
          </FormHelperText>
        )}

        <TextField
          label="Motivation"
          name="motivation"
          value={form.motivation}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
          error={!!errors.motivation}
          helperText={errors.motivation}
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

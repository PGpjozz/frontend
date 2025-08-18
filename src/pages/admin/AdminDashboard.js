import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Grid, Button } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    applications: 0,
    students: 0,
    courses: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken"); // <-- FIXED
    if (!token) {
      navigate("/admin/login");
      return;
    }
    // Fetch dashboard stats with authentication
    const fetchStats = async () => {
      try {
        const [appsRes, studentsRes, coursesRes] = await Promise.all([
          fetch("http://localhost:8000/api/applications/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:8000/api/students/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:8000/api/courses/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        if (
          appsRes.status === 401 ||
          studentsRes.status === 401 ||
          coursesRes.status === 401
        ) {
          setError("Unauthorized: Please login as admin.");
          navigate("/admin/login");
          return;
        }
        const apps = await appsRes.json();
        const students = await studentsRes.json();
        const courses = await coursesRes.json();
        setStats({
          applications: Array.isArray(apps)
            ? apps.length
            : Array.isArray(apps.results)
            ? apps.results.length
            : 0,
          students: Array.isArray(students)
            ? students.length
            : Array.isArray(students.results)
            ? students.results.length
            : 0,
          courses: Array.isArray(courses)
            ? courses.length
            : Array.isArray(courses.results)
            ? courses.results.length
            : 0,
        });
      } catch {
        setError("Failed to load dashboard stats.");
      }
    };
    fetchStats();
  }, [navigate]);

  if (error) return <div style={{ color: "red", padding: 20 }}>{error}</div>;

  return (
    <Container sx={{ py: 5, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Welcome to the administration panel. Here you can manage applications,
        enroll students, and review course details.
      </Typography>
      <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
        <Grid item>
          <Paper
            elevation={3}
            sx={{ p: 3, minWidth: 200, textAlign: "center" }}
          >
            <AssignmentIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Applications</Typography>
            <Typography variant="h4" color="primary">
              {stats.applications}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => navigate("/admin/applications")}
            >
              Manage Applications
            </Button>
          </Paper>
        </Grid>
        <Grid item>
          <Paper
            elevation={3}
            sx={{ p: 3, minWidth: 200, textAlign: "center" }}
          >
            <SchoolIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Students</Typography>
            <Typography variant="h4" color="success.main">
              {stats.students}
            </Typography>
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => navigate("/admin/students")}
            >
              View Students
            </Button>
          </Paper>
        </Grid>
        <Grid item>
          <Paper
            elevation={3}
            sx={{ p: 3, minWidth: 200, textAlign: "center" }}
          >
            <MenuBookIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Courses</Typography>
            <Typography variant="h4" color="secondary">
              {stats.courses}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => navigate("/admin/courses")}
            >
              View Courses
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;

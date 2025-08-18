import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Box,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: "", description: "" });
  const [editCourse, setEditCourse] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = "http://localhost:8000/api/courses/";

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin/login");
        return;
      }
      try {
        const res = await fetch(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) {
          setError("Unauthorized: Please login as admin.");
          navigate("/admin/login");
          return;
        }
        const data = await res.json();
        setCourses(Array.isArray(data) ? data : data.results || []);
      } catch {
        setError("Failed to load courses.");
      }
    };
    fetchCourses();
  }, [navigate]);

  const handleChange = (e) =>
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  const handleEditChange = (e) =>
    setEditCourse({ ...editCourse, [e.target.name]: e.target.value });

  const handleAddCourse = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newCourse),
    });
    if (res.status === 401) {
      setError("Unauthorized: Please login as admin.");
      navigate("/admin/login");
      return;
    }
    if (res.ok) {
      const added = await res.json();
      setCourses([...courses, added]);
      setOpen(false);
      setNewCourse({ name: "", description: "" });
    }
  };

  const handleEditCourse = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    const res = await fetch(`${API_URL}${editCourse.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: editCourse.name,
        description: editCourse.description,
      }),
    });
    if (res.status === 401) {
      setError("Unauthorized: Please login as admin.");
      navigate("/admin/login");
      return;
    }
    if (res.ok) {
      const updated = await res.json();
      setCourses((prev) =>
        prev.map((c) => (c.id === editCourse.id ? updated : c))
      );
      setEditOpen(false);
      setEditCourse(null);
    }
  };

  const handleDeleteCourse = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    const res = await fetch(`${API_URL}${editCourse.id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) {
      setError("Unauthorized: Please login as admin.");
      navigate("/admin/login");
      return;
    }
    if (res.ok) {
      setCourses((prev) => prev.filter((c) => c.id !== editCourse.id));
      setEditOpen(false);
      setEditCourse(null);
      setConfirmDeleteOpen(false);
    }
  };

  if (error) return <div style={{ color: "red", padding: 20 }}>{error}</div>;

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        <MenuBookIcon sx={{ mr: 1, verticalAlign: "middle" }} />
        Manage Courses
      </Typography>
      <Paper sx={{ p: 2, mb: 3, boxShadow: 2 }}>
        <Typography variant="body1" color="text.secondary">
          Add, edit, or delete training courses. See how many students are
          enrolled in each course.
        </Typography>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleIcon />}
        sx={{ mb: 3 }}
        onClick={() => setOpen(true)}
      >
        Add New Course
      </Button>
      <Table sx={{ background: "#fff", borderRadius: 2, boxShadow: 1 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <MenuBookIcon fontSize="small" /> Name
            </TableCell>
            <TableCell>Description</TableCell>
            <TableCell>
              <GroupIcon fontSize="small" /> Enrolled Students
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Chip label="No courses found." color="warning" />
              </TableCell>
            </TableRow>
          ) : (
            courses.map((course) => (
              <TableRow key={course.id} hover>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight={500}>
                    {course.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={course.enrolled_count || 0}
                    color={course.enrolled_count > 0 ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<EditIcon />}
                    sx={{ mr: 1 }}
                    onClick={() => {
                      setEditCourse(course);
                      setEditOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      setEditCourse(course);
                      setConfirmDeleteOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Add Course Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Course</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={newCourse.name}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            value={newCourse.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddCourse} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={editCourse?.name || ""}
            onChange={handleEditChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            value={editCourse?.description || ""}
            onChange={handleEditChange}
            fullWidth
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button
            onClick={handleEditCourse}
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
          >
            Save
          </Button>
          <Button
            onClick={() => setConfirmDeleteOpen(true)}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this course? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteCourse}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminCourses;

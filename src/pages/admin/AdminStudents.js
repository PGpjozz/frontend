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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Chip,
  Box,
  InputAdornment,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import SchoolIcon from "@mui/icons-material/School";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [sortField, setSortField] = useState("first_name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      if (!token) {
        navigate("/admin/login");
        return;
      }
      try {
        const res = await fetch("http://localhost:8000/api/students/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) {
          setError("Unauthorized: Please login as admin.");
          navigate("/admin/login");
          return;
        }
        const data = await res.json();
        setStudents(Array.isArray(data) ? data : data.results || []);
      } catch {
        setError("Failed to load students.");
      }
    };
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/courses/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCourses(Array.isArray(data) ? data : data.results || []);
      } catch {
        setCourses([]);
      }
    };
    fetchStudents();
    fetchCourses();
  }, [token, navigate]);

  const handleView = (student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleChange = (e) => {
    setSelectedStudent({
      ...selectedStudent,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const { qualification_file, id_file, cv_file, ...fields } = selectedStudent;
    const res = await fetch(
      `http://localhost:8000/api/students/${selectedStudent.id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fields),
      }
    );
    if (res.ok) {
      const updated = await res.json();
      setStudents(students.map((s) => (s.id === updated.id ? updated : s)));
      setOpen(false);
    } else {
      const err = await res.text();
      setError("Failed to save student: " + err);
      return;
    }
  };

  const handleDelete = async () => {
    const res = await fetch(
      `http://localhost:8000/api/students/${selectedStudent.id}/`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.ok) {
      setStudents(students.filter((s) => s.id !== selectedStudent.id));
      setConfirmOpen(false);
      setOpen(false);
    }
  };

  // --- Search, Sort, Filter Logic ---
  const filteredStudents = students
    .filter((student) => {
      // Search by name, email, id_number
      const searchText = search.toLowerCase();
      const matchesSearch =
        student.first_name?.toLowerCase().includes(searchText) ||
        student.last_name?.toLowerCase().includes(searchText) ||
        student.email?.toLowerCase().includes(searchText) ||
        student.id_number?.toLowerCase().includes(searchText);
      // Filter by course
      const matchesCourse =
        !filterCourse ||
        (student.enrolled_courses &&
          student.enrolled_courses.includes(
            courses.find((c) => c.id === filterCourse)?.name
          ));
      return matchesSearch && matchesCourse;
    })
    .sort((a, b) => {
      let valA = a[sortField] || "";
      let valB = b[sortField] || "";
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  if (error)
    return (
      <Box sx={{ color: "red", p: 3, textAlign: "center" }}>
        <Typography variant="h6">{error}</Typography>
      </Box>
    );

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        <SchoolIcon sx={{ mr: 1, verticalAlign: "middle" }} />
        Enrolled Students
      </Typography>
      <Paper sx={{ p: 2, mb: 3, boxShadow: 2 }}>
        <Typography variant="body1" color="text.secondary">
          View, search, sort, filter, edit, or dismiss enrolled students. Click
          document links to view files.
        </Typography>
      </Paper>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          label="Filter by Course"
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Courses</MenuItem>
          {courses.map((course) => (
            <MenuItem key={course.id} value={course.id}>
              {course.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Sort by"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          size="small"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="first_name">First Name</MenuItem>
          <MenuItem value="last_name">Last Name</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="id_number">ID Number</MenuItem>
        </TextField>
        <IconButton
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
          color="primary"
        >
          {sortOrder === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </IconButton>
      </Box>
      <Table sx={{ background: "#fff", borderRadius: 2, boxShadow: 1 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <BadgeIcon fontSize="small" /> Student #
            </TableCell>
            <TableCell>
              <PersonIcon fontSize="small" /> Name
            </TableCell>
            <TableCell>
              <EmailIcon fontSize="small" /> Email
            </TableCell>
            <TableCell>
              <BadgeIcon fontSize="small" /> ID Number
            </TableCell>
            <TableCell>
              <SchoolIcon fontSize="small" /> Courses
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredStudents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Chip label="No students found." color="warning" />
              </TableCell>
            </TableRow>
          ) : (
            filteredStudents.map((student) => (
              <TableRow key={student.id} hover>
                <TableCell>
                  <Chip
                    label={student.student_number || student.id}
                    color="primary"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" fontWeight={500}>
                    {student.first_name} {student.last_name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{student.email}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={student.id_number || "-"}
                    color={student.id_number ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {student.enrolled_courses
                    ? student.enrolled_courses.join(", ")
                    : "-"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditIcon />}
                    sx={{ mr: 1 }}
                    onClick={() => handleView(student)}
                  >
                    View/Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      setSelectedStudent(student);
                      setConfirmOpen(true);
                    }}
                  >
                    Dismiss
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* View/Edit Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Student Details</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            name="first_name"
            value={selectedStudent?.first_name || ""}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Last Name"
            name="last_name"
            value={selectedStudent?.last_name || ""}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            value={selectedStudent?.email || ""}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="ID Number"
            name="id_number"
            value={selectedStudent?.id_number || ""}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            inputProps={{ maxLength: 13, pattern: "\\d{13}" }}
            helperText="ID number must be exactly 13 digits"
          />
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Documents:
          </Typography>
          <div>
            <strong>Qualification:</strong>{" "}
            {selectedStudent?.qualification_file ? (
              <a
                href={selectedStudent.qualification_file}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#1976d2" }}
              >
                View/Download
              </a>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Not submitted
              </Typography>
            )}
          </div>
          <div>
            <strong>ID:</strong>{" "}
            {selectedStudent?.id_file ? (
              <a
                href={selectedStudent.id_file}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#1976d2" }}
              >
                View/Download
              </a>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Not submitted
              </Typography>
            )}
          </div>
          <div>
            <strong>CV:</strong>{" "}
            {selectedStudent?.cv_file ? (
              <a
                href={selectedStudent.cv_file}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#1976d2" }}
              >
                View/Download
              </a>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Not submitted
              </Typography>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        maxWidth="xs"
      >
        <DialogTitle>Confirm Dismissal</DialogTitle>
        <DialogContent>
          Are you sure you want to dismiss this student?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            autoFocus
          >
            Yes, Dismiss
          </Button>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminStudents;

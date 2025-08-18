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
  Paper,
  Box,
  Chip,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SchoolIcon from "@mui/icons-material/School";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("adminToken"); // JWT stored after admin login
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      if (!token) {
        navigate("/admin/login");
        return;
      }
      try {
        const res = await fetch("http://localhost:8000/api/applications/", {
          headers: {
            Authorization: `Bearer ${token}`, // token from localStorage
          },
        });
        if (res.status === 401) {
          setError("Unauthorized: Please login as admin.");
          navigate("/admin/login");
          return;
        }
        const data = await res.json();
        setApplications(Array.isArray(data) ? data : data.results || []);
      } catch {
        setError("Failed to load applications.");
      }
    };
    fetchApplications();
  }, [token, navigate]);

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:8000/api/applications/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setApplications(applications.filter((a) => a.id !== id));
  };

  const handleEnroll = async (id) => {
    const res = await fetch(
      `http://localhost:8000/api/applications/${id}/enroll/`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.ok) {
      setApplications(applications.filter((a) => a.id !== id));
    }
  };

  if (error)
    return (
      <Box sx={{ color: "red", p: 3, textAlign: "center" }}>
        <Typography variant="h6">{error}</Typography>
      </Box>
    );

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        <PersonIcon sx={{ mr: 1, verticalAlign: "middle" }} />
        Manage Applications
      </Typography>
      <Paper sx={{ p: 2, mb: 3, boxShadow: 2 }}>
        <Typography variant="body1" color="text.secondary">
          Review, enroll, or delete training applications. Click document links
          to view files.
        </Typography>
      </Paper>
      <Table sx={{ background: "#fff", borderRadius: 2, boxShadow: 1 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <PersonIcon fontSize="small" /> Full Name
            </TableCell>
            <TableCell>
              <EmailIcon fontSize="small" /> Email
            </TableCell>
            <TableCell>
              <PhoneIcon fontSize="small" /> Phone
            </TableCell>
            <TableCell>
              <SchoolIcon fontSize="small" /> Course
            </TableCell>
            <TableCell>
              <DescriptionIcon fontSize="small" /> CV
            </TableCell>
            <TableCell>
              <DescriptionIcon fontSize="small" /> ID
            </TableCell>
            <TableCell>
              <DescriptionIcon fontSize="small" /> Qualification
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <Chip label="No applications found." color="warning" />
              </TableCell>
            </TableRow>
          ) : (
            applications.map((app) => (
              <TableRow key={app.id} hover>
                <TableCell>
                  <Tooltip title="Applicant Name">
                    <span>
                      {`${app.first_name} ${app.middle_name} ${app.surname}`}
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title="Email">
                    <span>{app.email}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title="Phone">
                    <span>{app.phone}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Chip
                    label={app.course_name || app.course}
                    color="primary"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {app.cv ? (
                    <a
                      href={app.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "#1976d2" }}
                    >
                      View CV
                    </a>
                  ) : (
                    <Chip label="-" size="small" />
                  )}
                </TableCell>
                <TableCell>
                  {app.id_doc ? (
                    <a
                      href={app.id_doc}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "#1976d2" }}
                    >
                      View ID
                    </a>
                  ) : (
                    <Chip label="-" size="small" />
                  )}
                </TableCell>
                <TableCell>
                  {app.qualification_doc ? (
                    <a
                      href={app.qualification_doc}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "#1976d2" }}
                    >
                      View Qualification
                    </a>
                  ) : (
                    <Chip label="-" size="small" />
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip title="Enroll as Student">
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      startIcon={<CheckCircleIcon />}
                      onClick={() => handleEnroll(app.id)}
                      sx={{ mr: 1 }}
                    >
                      Enroll
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete Application">
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(app.id)}
                    >
                      Delete
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default AdminApplications;

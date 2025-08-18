import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Collapse,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";

import facilitator from "../../assets/facilitator.jpg";
import assessor from "../../assets/assessor.jpg";
import moderator from "../../assets/moderator.jpg";
import leadership from "../../assets/leadership.jpg";
import environment from "../../assets/environment.jpg";
import councillor from "../../assets/councillor.jpg";
import construction from "../../assets/construction.jpg";

const courses = [
  {
    title: "Facilitator",
    details: "US: 117871 | Level 5 | 10 credits",
    price: "R5000",
    description:
      "Become a certified facilitator and lead accredited training sessions.",
    image: facilitator,
    careers: [
      "Corporate Trainer",
      "Workshop Facilitator",
      "Skills Development Practitioner",
      "Education Consultant",
    ],
  },
  {
    title: "Assessor",
    details: "US: 115753 | Level 5 | 15 credits",
    price: "R5000",
    description:
      "Learn to assess learners' competence in your field of expertise.",
    image: assessor,
    careers: [
      "Assessment Specialist",
      "HR Development Officer",
      "Quality Assurance Coordinator",
      "Education Assessor",
    ],
  },
  {
    title: "Moderator",
    details: "US: 115759 | Level 6 | 10 credits",
    price: "R5000",
    description:
      "Moderate assessments and ensure quality assurance in training.",
    image: moderator,
    careers: [
      "Training Moderator",
      "Quality Assurance Manager",
      "Education Moderator",
      "Compliance Officer",
    ],
  },
  {
    title: "Leadership & Management",
    details: "Empower your strategic thinking and team leadership.",
    price: "Contact for price",
    description:
      "Develop essential leadership and management skills for any organization.",
    image: leadership,
    careers: [
      "Team Leader",
      "Project Manager",
      "Operations Manager",
      "Business Executive",
    ],
  },
  {
    title: "Environmental Management",
    details: "Learn sustainable practices for a greener future.",
    price: "Contact for price",
    description:
      "Understand environmental principles and implement sustainable solutions.",
    image: environment,
    careers: [
      "Environmental Officer",
      "Sustainability Consultant",
      "Green Project Manager",
      "Environmental Educator",
    ],
  },
  {
    title: "Ward Councillor Training",
    details: "Equip yourself for effective community governance.",
    price: "Contact for price",
    description:
      "Gain the knowledge and skills needed for successful local government leadership.",
    image: councillor,
    careers: [
      "Ward Councillor",
      "Community Leader",
      "Local Government Official",
      "Public Policy Advisor",
    ],
  },
  {
    title: "Building & Construction",
    details: "Gain practical skills for the construction industry.",
    price: "Contact for price",
    description:
      "Hands-on training for building, construction, and site management.",
    image: construction,
    careers: [
      "Construction Supervisor",
      "Site Foreman",
      "Builder",
      "Project Coordinator",
    ],
  },
];

const Training = () => {
  const [expanded, setExpanded] = useState(Array(courses.length).fill(false));
  const navigate = useNavigate();

  const handleExpandClick = (idx) => {
    setExpanded((prev) => prev.map((val, i) => (i === idx ? !val : val)));
  };

  return (
    <PageWrapper>
      <Container sx={{ py: 5 }}>
        <Typography variant="h3" gutterBottom>
          Accredited Skills Development Courses – 2025 Intake
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Empower your future with ETDP SETA-accredited programs that boost your
          employability by <b>90%</b>!
          <br />
          <b>Start Date:</b> 06 September 2025
          <br />
          <b>Schedule:</b> Saturdays – Sept 06, 13, 20 & 27 | 08h30–15h00
          <br />
          <b>Venue:</b> Port Elizabeth, Eastern Cape
          <br />
          <b>Breakfast & Lunch provided | Monthly training sessions</b>
        </Typography>
        <Grid container spacing={4}>
          {courses.map((course, idx) => (
            <Grid item xs={12} md={6} key={course.title}>
              <Card
                sx={{
                  boxShadow: 3,
                  transition: "0.2s",
                  "&:hover": { boxShadow: 6 },
                  minHeight: 320,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  backgroundImage: `url(${course.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  color: "white",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(25, 118, 210, 0.65)",
                    zIndex: 1,
                  }}
                />
                <CardContent sx={{ position: "relative", zIndex: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {course.details}
                  </Typography>
                  <Typography variant="body2" color="inherit" sx={{ mb: 1 }}>
                    {course.price}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {course.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => handleExpandClick(idx)}
                    sx={{ mb: 1, borderColor: "white", color: "white" }}
                  >
                    {expanded[idx]
                      ? "Hide Career Opportunities"
                      : "Show Career Opportunities"}
                  </Button>
                  <Collapse in={expanded[idx]}>
                    <Box sx={{ mt: 1 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold" }}
                      >
                        Career Opportunities:
                      </Typography>
                      <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
                        {course.careers.map((career) => (
                          <li key={career}>
                            <Typography variant="body2">{career}</Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  </Collapse>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ fontWeight: "bold", mt: 2 }}
                    onClick={() => navigate("/application")} // <-- use lowercase
                  >
                    Apply
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body2">
            <b>ETDP SETA Accreditation No:</b> ETDP10492
          </Typography>
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default Training;

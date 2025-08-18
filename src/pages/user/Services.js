import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Example images (add your own images in src/assets/ and update filenames)
import event from "../../assets/event.jpg";
import soap from "../../assets/soap.jpg";
import candle from "../../assets/candle.jpg";
import bread from "../../assets/bread.jpg";
import charcoal from "../../assets/charcoal.jpg";
import cake from "../../assets/cake.jpg";
import juice from "../../assets/juice.jpg";
import cellphone from "../../assets/cellphone.jpg";

const services = [
  {
    title: "Event Planning & Management",
    description:
      "Professional planning and management for all types of events. Let us make your occasion memorable and stress-free.",
    image: event,
  },
  {
    title: "Soap Making",
    description:
      "We produce high-quality, handcrafted soaps for personal and commercial use.",
    image: soap,
  },
  {
    title: "Candle Making",
    description:
      "Beautiful, custom candles for gifts, decor, and special occasions.",
    image: candle,
  },
  {
    title: "Bread Making",
    description: "Freshly baked bread available for orders and events.",
    image: bread,
  },
  {
    title: "Charcoal Making",
    description:
      "Reliable charcoal production for cooking and commercial needs.",
    image: charcoal,
  },
  {
    title: "Cake Baking",
    description:
      "Delicious cakes for birthdays, weddings, and all celebrations.",
    image: cake,
  },
  {
    title: "Juice Production",
    description: "Healthy and tasty juices made from fresh ingredients.",
    image: juice,
  },
  {
    title: "Cellphone Repair",
    description: "Expert repair and maintenance services for mobile phones.",
    image: cellphone,
  },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h3" gutterBottom>
        Our Services
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Sogwa Solutions offers a wide range of practical and business services
        to individuals, organizations, and communities. Contact us for quality,
        reliability, and professionalism in every service we deliver.
      </Typography>
      <Grid container spacing={4}>
        {services.map((service) => (
          <Grid item xs={12} md={6} key={service.title}>
            <Card
              sx={{
                boxShadow: 3,
                transition: "0.2s",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={service.image}
                alt={service.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {service.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {service.description}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate("/contact")}
                >
                  Enquire
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Services;

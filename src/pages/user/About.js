import React from "react";
import { Container, Typography, Box, Grid, Avatar } from "@mui/material";
import PageWrapper from "../../components/PageWrapper";
import bidvest from "../../assets/accreditation/bidvest.png";
import etdp from "../../assets/accreditation/etdp.png";
import saqa from "../../assets/accreditation/saqa.png";
import localSeta from "../../assets/accreditation/local_seta.jpg";
import constructionSeta from "../../assets/accreditation/construction_seta.jpg";
import cipc from "../../assets/accreditation/cipc.png";
import qcto from "../../assets/accreditation/qcto.png";
import director from "../../assets/director.jpg"; // Place MV Djofang's photo here

const About = () => (
  <PageWrapper>
    <Container sx={{ py: 5 }}>
      <Typography variant="h3" gutterBottom>
        About Sogwa Solutions
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Sogwa Solutions is committed to empowering individuals and communities
        through accredited skills development and practical business services.
        We are proud to be supported by our sponsor, <b>Bidvest Prestige</b>,
        and recognized by leading accreditation bodies in South Africa.
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Our Accreditations
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          <Box
            component="img"
            src={bidvest}
            alt="Bidvest Prestige"
            sx={{ height: 48 }}
          />
          <Box component="img" src={etdp} alt="ETDP SETA" sx={{ height: 48 }} />
          <Box component="img" src={saqa} alt="SAQA" sx={{ height: 48 }} />
          <Box
            component="img"
            src={localSeta}
            alt="Local SETA"
            sx={{ height: 48 }}
          />
          <Box
            component="img"
            src={constructionSeta}
            alt="Construction SETA"
            sx={{ height: 48 }}
          />
          <Box component="img" src={cipc} alt="CIPC" sx={{ height: 48 }} />
          <Box component="img" src={qcto} alt="QCTO" sx={{ height: 48 }} />
        </Box>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Director
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
            <Avatar
              src={director}
              alt="MV Djofang"
              sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              MV Djofang
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Director, Sogwa Solutions
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <b>Email:</b> mv.djofang@sogwasolutions.co.za
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontStyle: "italic", color: "primary.main" }}
            >
              "Empowering others is the greatest investment in our future. At
              Sogwa Solutions, we believe every person deserves the opportunity
              to learn, grow, and succeed. Join us on this journey of
              transformation and impact."
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body2">
          <b>ETDP SETA Accreditation No:</b> 12345
        </Typography>
        <Typography variant="body2">
          <b>Local Government SETA Accreditation No:</b> 67890
        </Typography>
        <Typography variant="body2">
          <b>Construction SETA Accreditation No:</b> 54321
        </Typography>
        <Typography variant="body2">
          <b>CIPC Registration No:</b> 09876
        </Typography>
        <Typography variant="body2">
          <b>QCTO Accreditation No:</b> 13579
        </Typography>
      </Box>
    </Container>
  </PageWrapper>
);

export default About;

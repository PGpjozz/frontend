import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import sogwaLogo from "../assets/logo.jpg";
import etdpLogo from "../assets/accreditation/etdp.png";
import saqaLogo from "../assets/accreditation/saqa.png";
import localSetaLogo from "../assets/accreditation/local_seta.jpg";
import constructionSetaLogo from "../assets/accreditation/construction_seta.jpg";
import cipcLogo from "../assets/accreditation/cipc.png";
import qctoLogo from "../assets/accreditation/qcto.png";
import bidvestLogo from "../assets/accreditation/bidvest.png";

const Footer = () => (
  <Box
    sx={{
      py: 4,
      mt: 6,
      color: "white",
      position: "relative",
      overflow: "hidden",
      backgroundImage: `url(${sogwaLogo})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      "&:before": {
        content: '""',
        position: "absolute",
        inset: 0,
        background: "rgba(25, 118, 210, 0.85)",
        zIndex: 0,
      },
    }}
  >
    <Container sx={{ position: "relative", zIndex: 1 }}>
      <Box sx={{ textAlign: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Box
            component="img"
            src={sogwaLogo}
            alt="Sogwa Solutions Logo"
            sx={{
              height: 48,
              width: 48,
              borderRadius: "50%",
              mr: 2,
              background: "#fff",
              p: 1,
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Sogwa Solutions
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Accredited Skills Development & Community Services
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          📞 Babalwa Jack: 072 368 5430&nbsp;&nbsp;|&nbsp;&nbsp; 📞 Siya: 083
          521 3272&nbsp;&nbsp;|&nbsp;&nbsp; 📧 sogwasolutions@gmail.com
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold", mb: 2 }}>
          ETDP SETA Accreditation No: ETDP10492
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Box
            component="img"
            src={etdpLogo}
            alt="ETDP SETA"
            sx={{ height: 32 }}
          />
          <Box component="img" src={saqaLogo} alt="SAQA" sx={{ height: 32 }} />
          <Box
            component="img"
            src={localSetaLogo}
            alt="Local SETA"
            sx={{ height: 32 }}
          />
          <Box
            component="img"
            src={constructionSetaLogo}
            alt="Construction SETA"
            sx={{ height: 32 }}
          />
          <Box component="img" src={cipcLogo} alt="CIPC" sx={{ height: 32 }} />
          <Box component="img" src={qctoLogo} alt="QCTO" sx={{ height: 32 }} />
          <Box
            component="img"
            src={bidvestLogo}
            alt="Bidvest"
            sx={{ height: 32 }}
          />
        </Box>
        <Typography
          variant="caption"
          sx={{ letterSpacing: 1, fontSize: "1rem", fontWeight: 500 }}
        >
          &copy; {new Date().getFullYear()} Sogwa Solutions &mdash; All rights
          reserved.
        </Typography>
      </Box>
    </Container>
  </Box>
);

export default Footer;

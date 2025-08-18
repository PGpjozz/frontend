import React, { useEffect, useState } from "react";
import {
  Container,
  ImageList,
  ImageListItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import PageWrapper from "../../components/PageWrapper";
import { fetchGallery } from "../../api/api";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery().then((res) => {
      setImages(res.data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;

  return (
    <PageWrapper>
      <Container sx={{ py: 5 }}>
        <Typography variant="h3" gutterBottom>
          Gallery
        </Typography>
        <ImageList variant="masonry" cols={3} gap={8}>
          {images.map((item) => (
            <ImageListItem key={item.id}>
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                style={{ borderRadius: "8px" }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </PageWrapper>
  );
};

export default Gallery;

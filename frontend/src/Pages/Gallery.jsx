import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import PageHeading from "../Components/PageHeading";
import ScrollReveal from "../Components/ScrollReveal";

const GALLERY_ITEMS = [
  {
    title: "Men's Hydrating Facial Care Routine",
    category: "Skincare",
    src: "https://images.pexels.com/photos/3808904/pexels-photo-3808904.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Precision Beard Grooming & Balm Care",
    category: "Beard Care",
    src: "https://images.pexels.com/photos/8467293/pexels-photo-8467293.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "SkSync Activated Charcoal Detox Cleanser",
    category: "Formula Lab",
    src: "https://images.pexels.com/photos/4210347/pexels-photo-4210347.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Post-Workout Hydration & Energy Refresh",
    category: "Fitness & Skin",
    src: "https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Wood & Musk Eau De Cologne Luxury Scent",
    category: "Fragrances",
    src: "https://images.pexels.com/photos/1961792/pexels-photo-1961792.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "10% Niacinamide Pore Refining Serum",
    category: "Serums",
    src: "https://images.pexels.com/photos/17545640/pexels-photo-17545640.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

export default function Gallery() {
  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <PageHeading
        title="Men's Aesthetics & Product Gallery"
        subtitle="A visual showcase of SkSync engineered cosmetics, beard styling, active serums, and luxury fragrances."
      />

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {GALLERY_ITEMS.map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <ScrollReveal delay={idx * 70} variant="scale">
              <Card elevation={4} sx={{ borderRadius: 4, overflow: "hidden", height: "100%" }}>
                <Box sx={{ position: "relative", overflow: "hidden" }}>
                  <CardMedia
                    component="img"
                    image={item.src}
                    alt={item.title}
                    loading="lazy"
                    sx={{
                      height: 240,
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                      "&:hover": { transform: "scale(1.08)" }
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      bgcolor: "#0f172a",
                      color: "#fff",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: "0.75rem",
                      fontWeight: 700
                    }}
                  >
                    {item.category}
                  </Box>
                </Box>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem", lineHeight: 1.3 }}>
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            </ScrollReveal>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: "center", pt: 2 }}>
        <Button
          component={RouterLink}
          to="/lookbook"
          variant="contained"
          size="large"
          sx={{ px: 4, py: 1.2, fontWeight: 700 }}
        >
          Explore Interactive Hotspot Lookbook &rarr;
        </Button>
      </Box>
    </Container>
  );
}

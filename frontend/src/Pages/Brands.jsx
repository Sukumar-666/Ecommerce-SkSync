import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FullBleedImage from "../Components/FullBleedImage";
import ScrollReveal from "../Components/ScrollReveal";

const BRANDS = [
  {
    name: "SkSync Men Lab",
    speciality: "Active Charcoal & Bio-Serums",
    rating: "4.9 ★",
    productsCount: "45 Products",
    image: "https://images.pexels.com/photos/4210347/pexels-photo-4210347.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "DermaCare Men",
    speciality: "Clinical Hydrators & SPF Defense",
    rating: "4.8 ★",
    productsCount: "38 Products",
    image: "https://images.pexels.com/photos/17545640/pexels-photo-17545640.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "PureRoots Grooming",
    speciality: "Beard Oils & Hair Styling Clays",
    rating: "4.7 ★",
    productsCount: "30 Products",
    image: "https://images.pexels.com/photos/3809795/pexels-photo-3809795.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Fragrance Co Luxury",
    speciality: "Woody, Amber & Aquatic Colognes",
    rating: "4.9 ★",
    productsCount: "25 Products",
    image: "https://images.pexels.com/photos/1961792/pexels-photo-1961792.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

const STATS = [
  { value: "4+", label: "Certified Partner Brands" },
  { value: "150+", label: "Formulated Products" },
  { value: "100%", label: "Dermatologically Tested" },
  { value: "4.8★", label: "Average Brand Rating" }
];

const QUALITY_PILLARS = [
  { title: "Clinical Standards", desc: "Every partner brand undergoes rigorous 60-day dermatological safety tests." },
  { title: "100% Authentic", desc: "Direct manufacturer sourcing guaranteed with tamper-evident sealing." },
  { title: "Cruelty Free", desc: "Strict zero animal testing policy enforced across all lab partners." },
  { title: "Eco-Conscious", desc: "Sustainable glass packaging and recyclable materials for all products." }
];

export default function Brands() {
  return (
    <>
      <FullBleedImage
        src="https://images.pexels.com/photos/4210347/pexels-photo-4210347.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="SkSync Partner Brands"
        height={280}
        chip="OUR PARTNERS"
        title="Brands & Laboratories"
        subtitle="Premium men's cosmetics brands curated by SkSync"
      />

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>

        {/* Stats Strip */}
        <ScrollReveal>
          <Grid container spacing={2} sx={{ mb: 6 }}>
            {STATS.map((s, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <Box
                  sx={{
                    p: 2.5,
                    textAlign: "center",
                    bgcolor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 800, color: "#1e40af", mb: 0.5 }}>
                    {s.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#6b7280", fontWeight: 500, fontSize: "0.85rem" }}>
                    {s.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </ScrollReveal>

        {/* Section Header */}
        <ScrollReveal>
          <Box sx={{ mb: 4, textAlign: { xs: "center", md: "left" } }}>
            <Chip label="PARTNER NETWORK" size="small" sx={{ bgcolor: "#eff6ff", color: "#1e40af", fontWeight: 700, mb: 1, letterSpacing: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827" }}>
              Our Partner Brands & Laboratories
            </Typography>
            <Typography variant="body1" sx={{ color: "#6b7280", mt: 1, maxWidth: 720 }}>
              SkSync partners exclusively with premier global cosmetics laboratories and certified men's personal care brands to deliver high-performance formulations.
            </Typography>
          </Box>
        </ScrollReveal>

        {/* Brands Grid - Responsive 1 col on xs, 2 on sm, 4 on md */}
        <Grid container spacing={3} sx={{ mb: 7 }}>
          {BRANDS.map((b) => (
            <Grid item xs={12} sm={6} md={3} key={b.name}>
              <ScrollReveal>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column", border: "1px solid #e5e7eb", transition: "all 0.3s ease", "&:hover": { boxShadow: "0 8px 24px -4px rgba(30,64,175,0.15)", transform: "translateY(-4px)" } }}>
                  <Box sx={{ overflow: "hidden", position: "relative" }}>
                    <CardMedia component="img" image={b.image} alt={b.name} sx={{ height: 190, objectFit: "cover", transition: "transform 0.4s ease", "&:hover": { transform: "scale(1.05)" } }} />
                    <Box sx={{ position: "absolute", top: 10, right: 10 }}>
                      <Chip label={b.rating} size="small" sx={{ bgcolor: "rgba(255,255,255,0.95)", color: "#1e40af", fontWeight: 800, fontSize: "0.75rem", boxShadow: 1 }} />
                    </Box>
                  </Box>
                  <CardContent sx={{ p: 2.5, flex: 1, display: "flex", flexDirection: "column" }}>
                    <Typography variant="caption" sx={{ color: "#1e40af", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, mb: 0.5 }}>
                      {b.productsCount}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, color: "#111827" }}>
                      {b.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#6b7280", mb: 2.5, flex: 1, lineHeight: 1.6 }}>
                      {b.speciality}
                    </Typography>
                    <Button
                      component={RouterLink}
                      to="/products"
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{
                        borderColor: "#1e40af",
                        color: "#1e40af",
                        fontWeight: 700,
                        py: 1,
                        "&:hover": { bgcolor: "#1e40af", color: "#fff" }
                      }}
                    >
                      Explore Brand Catalog →
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>

        {/* Quality Standards Grid */}
        <ScrollReveal>
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 3, textAlign: "center" }}>
              Our Brand Quality Guarantee
            </Typography>
            <Grid container spacing={3}>
              {QUALITY_PILLARS.map((q, idx) => (
                <Grid item xs={12} sm={6} md={3} key={idx}>
                  <Box
                    sx={{
                      p: 3,
                      height: "100%",
                      bgcolor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      textAlign: "center"
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e40af", mb: 1, fontSize: "1.05rem" }}>
                      {q.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#6b7280", lineHeight: 1.6 }}>
                      {q.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </ScrollReveal>

        {/* Callout Banner */}
        <ScrollReveal>
          <Box
            sx={{
              p: { xs: 3, md: 5 },
              background: "linear-gradient(135deg, #eff6ff 0%, #ecfdf5 100%)",
              borderRadius: "16px",
              border: "1.5px solid #dbeafe",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: 3
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 0.75 }}>
                Are you a Cosmetics or Grooming Manufacturer?
              </Typography>
              <Typography variant="body1" sx={{ color: "#4b5563" }}>
                Partner with SkSync to reach over 1,000,000 active male shoppers across Asia and Europe.
              </Typography>
            </Box>
            <Button
              component={RouterLink}
              to="/enquiry-form"
              variant="contained"
              sx={{
                bgcolor: "#1e40af",
                color: "#ffffff",
                fontWeight: 700,
                px: 3.5,
                py: 1.25,
                borderRadius: "10px",
                flexShrink: 0,
                "&:hover": { bgcolor: "#1e3a8a" }
              }}
            >
              Apply for Partnership
            </Button>
          </Box>
        </ScrollReveal>

      </Container>
    </>
  );
}

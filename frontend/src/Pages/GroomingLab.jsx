import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import PageHeading from "../Components/PageHeading";
import ScrollReveal from "../Components/ScrollReveal";

const INGREDIENTS = [
  {
    id: "charcoal",
    name: "Activated Bamboo Charcoal",
    concentration: "100% Pure Organic Grade",
    benefit: "Deep Pore Detox & Oil Magnet",
    description: "Acts like a micro-sponge to bind urban pollutants, excess oil, and impurities without stripping natural skin moisture.",
    image: "https://images.pexels.com/photos/4210347/pexels-photo-4210347.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "niacinamide",
    name: "Pure Niacinamide (Vitamin B3)",
    concentration: "10% High Potency Form",
    benefit: "Texture Refining & Blemish Reduction",
    description: "Visibly tightens enlarged pores, smooths rough skin texture, and evens out skin tone caused by sun exposure.",
    image: "https://images.pexels.com/photos/17545640/pexels-photo-17545640.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "caffeine",
    name: "Caffeine & Peptide Complex",
    concentration: "5% Bio-Active Matrix",
    benefit: "Anti-Fatigue & Dark Circle Energizer",
    description: "Stimulates micro-circulation under tired male eyes, reducing puffiness and brightening dull post-workout skin.",
    image: "https://images.pexels.com/photos/3808904/pexels-photo-3808904.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "salicylic",
    name: "Salicylic Acid (BHA)",
    concentration: "2% Encapsulated Release",
    benefit: "Ingrown Hair & Razor Bump Shield",
    description: "Penetrates deep into hair follicles to prevent ingrown hairs, beard acne, and post-shave redness.",
    image: "https://images.pexels.com/photos/8467293/pexels-photo-8467293.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

const CLINICAL_STATS = [
  { value: "98%", label: "Reduction in Excess Sebum & Daily Shine" },
  { value: "94%", label: "Soothing Relief From Razor Burn" },
  { value: "99%", label: "Users Noticed Smoother Skin Texture in 7 Days" },
  { value: "100%", label: "Dermatologically Tested & Cruelty Free" }
];

export default function GroomingLab() {
  const [selectedIng, setSelectedIng] = useState(INGREDIENTS[0]);
  const [showAfter, setShowAfter] = useState(false);

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <PageHeading
        title="SkSync Men Formula & Ingredient Science Lab"
        subtitle="Explore the high-performance bio-actives, dermatological research, and clinical proof behind every SkSync Men cosmetic formula."
      />

      {/* Hero Banner */}
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, md: 5 },
          mb: 6,
          borderRadius: 4,
          background: "linear-gradient(135deg, #0f172a 0%, #172554 50%, #1e40af 100%)",
          color: "#ffffff"
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Chip label="Clean Science Formulation" color="secondary" sx={{ mb: 2, fontWeight: 700 }} />
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
              Engineered For Thicker Male Skin
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.7, mb: 3 }}>
              Male skin is 20% thicker, produces 2x more sebum, and experiences daily friction from shaving. Our laboratory formulas use micro-encapsulated actives to penetrate deeper without leaving sticky residue.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Chip label="✓ Paraben-Free" sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff" }} />
              <Chip label="✓ Non-Comedogenic" sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff" }} />
              <Chip label="✓ 100% Vegan" sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff" }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src="https://images.pexels.com/photos/4210347/pexels-photo-4210347.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="SkSync Laboratory Science"
              sx={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 3, boxShadow: 6 }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Clinical Trial Metrics */}
      <ScrollReveal>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.main", mb: 3, textAlign: "center" }}>
          Clinical Trial Results & Proof
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {CLINICAL_STATS.map((st) => (
            <Grid item xs={6} md={3} key={st.label}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 4,
                  bgcolor: "background.paper",
                  borderTop: "4px solid #1e40af"
                }}
              >
                <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main", mb: 1 }}>
                  {st.value}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                  {st.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </ScrollReveal>

      {/* Ingredient Explorer */}
      <ScrollReveal>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.main", mb: 3 }}>
          Active Ingredients Deep Dive
        </Typography>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={5}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {INGREDIENTS.map((ing) => {
                const active = selectedIng.id === ing.id;
                return (
                  <Paper
                    key={ing.id}
                    onClick={() => setSelectedIng(ing)}
                    elevation={active ? 4 : 1}
                    sx={{
                      p: 2.5,
                      cursor: "pointer",
                      borderRadius: 3,
                      border: active ? "2px solid #1e40af" : "1px solid #e2e8f0",
                      bgcolor: active ? "rgba(30, 64, 175, 0.05)" : "background.paper",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: active ? "primary.main" : "text.primary" }}>
                        {ing.name}
                      </Typography>
                      <Chip label={ing.concentration} size="small" color={active ? "primary" : "default"} />
                    </Box>
                    <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                      {ing.benefit}
                    </Typography>
                  </Paper>
                );
              })}
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card elevation={3} sx={{ borderRadius: 4, height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                image={selectedIng.image}
                alt={selectedIng.name}
                sx={{ height: 260, objectFit: "cover" }}
              />
              <CardContent sx={{ p: 4, flexGrow: 1 }}>
                <Chip label={selectedIng.concentration} color="secondary" sx={{ mb: 1, fontWeight: 700 }} />
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                  {selectedIng.name}
                </Typography>
                <Typography variant="h6" sx={{ color: "primary.main", fontWeight: 700, mb: 2 }}>
                  Key Benefit: {selectedIng.benefit}
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                  {selectedIng.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ScrollReveal>

      {/* Interactive Skin Transformation Showcase */}
      <ScrollReveal>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4, bgcolor: "background.paper", textAlign: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.main", mb: 1 }}>
            7-Day Skin Clarity & Beard Softening Transformation
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
            Click below to toggle between Day 1 (Before SkSync Regimen) and Day 7 (After SkSync Regimen).
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
            <Button
              variant={!showAfter ? "contained" : "outlined"}
              onClick={() => setShowAfter(false)}
            >
              Day 1 (Before)
            </Button>
            <Button
              variant={showAfter ? "contained" : "outlined"}
              color="secondary"
              onClick={() => setShowAfter(true)}
            >
              Day 7 (After SkSync)
            </Button>
          </Box>

          <Box sx={{ maxWidth: 600, mx: "auto", position: "relative", borderRadius: 4, overflow: "hidden", boxShadow: 4 }}>
            <Box
              component="img"
              src={
                showAfter
                  ? "https://images.pexels.com/photos/3808904/pexels-photo-3808904.jpeg?auto=compress&cs=tinysrgb&w=800"
                  : "https://images.pexels.com/photos/8467293/pexels-photo-8467293.jpeg?auto=compress&cs=tinysrgb&w=800"
              }
              alt="Transformation View"
              sx={{ width: "100%", height: 320, objectFit: "cover", transition: "opacity 0.4s ease" }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                bgcolor: showAfter ? "secondary.main" : "grey.800",
                color: "#fff",
                px: 2,
                py: 0.5,
                borderRadius: 2,
                fontWeight: 700
              }}
            >
              {showAfter ? "✨ Day 7: 94% Smoother & Oil-Free" : "Day 1: Excessive Sebum & Razor Bumps"}
            </Box>
          </Box>
        </Paper>
      </ScrollReveal>
    </Container>
  );
}

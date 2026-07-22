import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import PageHeading from "../Components/PageHeading";
import ScrollReveal from "../Components/ScrollReveal";

const LOOKS = [
  {
    id: "executive",
    title: "The Executive Clean Shave & Matte Finish",
    subtitle: "Sharp, poreless confidence for boardrooms & meetings.",
    image: "https://images.pexels.com/photos/3808904/pexels-photo-3808904.jpeg?auto=compress&cs=tinysrgb&w=800",
    hotspots: [
      { top: "35%", left: "45%", name: "10% Niacinamide Serum", price: 899, category: "Skincare", desc: "Tightens pores and removes shine before morning meetings." },
      { top: "65%", left: "55%", name: "Cooling Aftershave Balm", price: 279, category: "Grooming", desc: "Instantly calms razor irritation with natural aloe & menthol." }
    ]
  },
  {
    id: "rugged",
    title: "The Rugged Beard Architect",
    subtitle: "Defined edges, soft hair texture, zero itchiness.",
    image: "https://images.pexels.com/photos/8467293/pexels-photo-8467293.jpeg?auto=compress&cs=tinysrgb&w=800",
    hotspots: [
      { top: "50%", left: "50%", name: "Matte Beard Wax", price: 299, category: "Grooming", desc: "Medium hold wax to shape flyaways without stiff residue." },
      { top: "70%", left: "40%", name: "Argan Beard Growth Oil", price: 899, category: "Grooming", desc: "Softens coarse beard hair and conditions skin underneath." }
    ]
  },
  {
    id: "active",
    title: "The Urban Fitness Hydrator",
    subtitle: "Post-gym sweat detox & instantaneous hydration.",
    image: "https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=800",
    hotspots: [
      { top: "30%", left: "50%", name: "Charcoal Face Wash for Men", price: 349, category: "Skincare", desc: "Washes away gym sweat, bacteria, and clogged pores." },
      { top: "60%", left: "60%", name: "Wood & Musk Cologne", price: 1199, category: "Fragrances", desc: "Fresh woody scent notes that last through workouts." }
    ]
  },
  {
    id: "night",
    title: "The Evening Signature Scent & Glow",
    subtitle: "Sophisticated aura for dinners and evening occasions.",
    image: "https://images.pexels.com/photos/4210347/pexels-photo-4210347.jpeg?auto=compress&cs=tinysrgb&w=800",
    hotspots: [
      { top: "40%", left: "40%", name: "Hydrating Face Serum", price: 899, category: "Skincare", desc: "Deep hydration booster with triple molecular hyaluronic acid." },
      { top: "75%", left: "50%", name: "Wood & Musk Cologne", price: 1199, category: "Fragrances", desc: "Rich amber and cedarwood base notes." }
    ]
  }
];

export default function Lookbook() {
  const navigate = useNavigate();
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setSelectedHotspot(null);
      navigate("/cart");
    }, 1000);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <PageHeading
        title="Men's Aesthetic Lookbook & Style Vault"
        subtitle="Explore curated men's grooming looks. Click on interactive photo hotspots to shop exact products used by models."
      />

      <Grid container spacing={4}>
        {LOOKS.map((look) => (
          <Grid item xs={12} md={6} key={look.id}>
            <ScrollReveal>
              <Card elevation={4} sx={{ borderRadius: 4, overflow: "hidden" }}>
                <Box sx={{ position: "relative" }}>
                  <Box
                    component="img"
                    src={look.image}
                    alt={look.title}
                    sx={{ width: "100%", height: 380, objectFit: "cover" }}
                  />

                  {/* Hotspots */}
                  {look.hotspots.map((hs) => (
                    <Box
                      key={hs.name}
                      onClick={() => setSelectedHotspot(hs)}
                      sx={{
                        position: "absolute",
                        top: hs.top,
                        left: hs.left,
                        transform: "translate(-50%, -50%)",
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        bgcolor: "secondary.main",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 0 6px rgba(79, 70, 229, 0.35)",
                        cursor: "pointer",
                        fontSize: 14,
                        fontWeight: 800,
                        transition: "transform 0.2s ease",
                        "&:hover": { transform: "translate(-50%, -50%) scale(1.25)" }
                      }}
                    >
                      +
                    </Box>
                  ))}
                </Box>

                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {look.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                    {look.subtitle}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {look.hotspots.map((hs) => (
                      <Chip
                        key={hs.name}
                        label={`📍 ${hs.name} (₹${hs.price})`}
                        onClick={() => setSelectedHotspot(hs)}
                        variant="outlined"
                        color="primary"
                        sx={{ cursor: "pointer" }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </ScrollReveal>
          </Grid>
        ))}
      </Grid>

      {/* Hotspot Product Modal */}
      <Dialog open={Boolean(selectedHotspot)} onClose={() => setSelectedHotspot(null)} maxWidth="xs" fullWidth>
        {selectedHotspot && (
          <>
            <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>
              {selectedHotspot.name}
            </DialogTitle>
            <DialogContent dividers>
              <Chip label={selectedHotspot.category} color="primary" size="small" sx={{ mb: 1.5 }} />
              <Typography variant="h4" sx={{ fontWeight: 800, color: "primary.main", mb: 1.5 }}>
                ₹{selectedHotspot.price}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                {selectedHotspot.desc}
              </Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
              <Button onClick={() => setSelectedHotspot(null)} color="inherit">
                Close
              </Button>
              <Button
                onClick={handleAddToCart}
                variant="contained"
                color={added ? "success" : "primary"}
              >
                {added ? "✓ Added to Cart!" : "Add to Cart"}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}

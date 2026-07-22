import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container, Typography, Box, Grid, Card,
  CardActionArea, CardMedia, CardContent, Chip, Button
} from "@mui/material";
import FullBleedImage from "../Components/FullBleedImage";
import ScrollReveal from "../Components/ScrollReveal";
import { useGenderContent } from "../utils/genderContent";

const MEN_CATEGORIES = [
  {
    title: "Men's Active Skincare",
    count: "120+ Products",
    desc: "Activated Charcoal, Niacinamide 10%, Hyaluronic Hydration",
    image: "https://www.mankind.co.uk/images?url=https://blogscdn.thehut.net/wp-content/uploads/sites/32/2018/09/03174215/1200x672_205645746_MC_MK_Mankind_March_Bespoke_Shot5_1200x672_acf_cropped.jpg&auto=avif&width=1200&fit=crop"
  },
  {
    title: "Beard & Shave Mastery",
    count: "95+ Products",
    desc: "Beard growth oils, precision shave gels, aftershave recovery balms",
    image: "https://www.u16.co.in/cdn/shop/files/download_9.png?v=1728038568&width=832"
  },
  {
    title: "Haircare & Matte Clay",
    count: "80+ Products",
    desc: "Matte styling waxes, anti-hairfall shampoos, scalp tonics",
    image: "https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Luxury Men's Fragrances",
    count: "65+ Products",
    desc: "Woody, spicy, amber, and aquatic long-lasting colognes",
    image: "https://images.pexels.com/photos/1961792/pexels-photo-1961792.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

const WOMEN_CATEGORIES = [
  {
    title: "Skincare & Glow",
    count: "140+ Products",
    desc: "Vitamin C, retinol, hydrating serums and moisturizers",
    image: "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Makeup Essentials",
    count: "110+ Products",
    desc: "Foundations, lipsticks, palettes and setting sprays",
    image: "https://images.pexels.com/photos/2688992/pexels-photo-2688992.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Haircare & Serums",
    count: "75+ Products",
    desc: "Nourishing hair serums, masks, and styling essentials",
    image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Women's Fragrances",
    count: "60+ Products",
    desc: "Floral, fruity, oriental and sensual perfume collections",
    image: "https://images.pexels.com/photos/1961793/pexels-photo-1961793.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

const TRENDING_TAGS = [
  "Activated Charcoal", "10% Niacinamide", "Beard Growth Oil",
  "Matte Hair Clay", "Wood & Musk Cologne", "Hydrating SPF 50",
  "Anti-Acne Foam", "Vitamin C Serum", "Precision Shave Gel"
];

export default function Categories() {
  const { gender } = useGenderContent();
  const categories = gender === "female" ? WOMEN_CATEGORIES : MEN_CATEGORIES;

  return (
    <>
      <FullBleedImage
        src="https://images.pexels.com/photos/3735622/pexels-photo-3735622.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="SkSync Categories"
        height={280}
        chip="COLLECTIONS"
        title="Shop by Category"
        subtitle="Discover curated grooming & cosmetics collections"
      />

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>

        {/* Trending Subcategory Chips */}
        <ScrollReveal>
          <Box sx={{ mb: 5 }}>
            <Typography variant="overline" sx={{ color: "#1e40af", fontWeight: 700, letterSpacing: 1.5, mb: 1, display: "block" }}>
              Trending Searches & Formulations
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {TRENDING_TAGS.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  component={RouterLink}
                  to="/products"
                  clickable
                  sx={{
                    bgcolor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    fontWeight: 600,
                    fontSize: "0.825rem",
                    py: 0.5,
                    "&:hover": { bgcolor: "#eff6ff", borderColor: "#1e40af", color: "#1e40af" }
                  }}
                />
              ))}
            </Box>
          </Box>
        </ScrollReveal>

        <ScrollReveal>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827" }}>
              {gender === "female" ? "Women's Beauty & Care" : "Men's Grooming & Skincare"}
            </Typography>
            <Typography variant="body1" sx={{ color: "#6b7280", mt: 0.5 }}>
              Engineered formulas categorized by target skin benefits, active ingredients, and daily routines.
            </Typography>
          </Box>
        </ScrollReveal>

        {/* Categories Grid - 2 cols on mobile, 2 on tablet, 4 on desktop */}
        <Grid container spacing={{ xs: 1.5, sm: 2.5, md: 3 }} sx={{ mb: 6 }}>
          {categories.map((cat, i) => (
            <Grid item xs={6} sm={6} md={3} key={cat.title}>
              <ScrollReveal style={{ transitionDelay: `${i * 80}ms` }}>
                <Card sx={{ height: "100%", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
                  <CardActionArea component={RouterLink} to="/products" sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}>
                    <Box sx={{ overflow: "hidden", position: "relative" }}>
                      <CardMedia
                        component="img"
                        image={cat.image}
                        alt={cat.title}
                        sx={{
                          height: { xs: 140, sm: 180, md: 220 },
                          objectFit: "cover",
                          transition: "transform 0.4s ease",
                          "&:hover": { transform: "scale(1.05)" },
                        }}
                      />
                      <Chip
                        label={cat.count}
                        size="small"
                        sx={{
                          position: "absolute",
                          bottom: 12,
                          left: 12,
                          bgcolor: "rgba(255,255,255,0.92)",
                          color: "#1e40af",
                          fontWeight: 800,
                          fontSize: "0.75rem",
                          boxShadow: 1
                        }}
                      />
                    </Box>
                    <CardContent sx={{ p: 2.5, flex: 1, display: "flex", flexDirection: "column" }}>
                      <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, color: "#111827" }}>
                        {cat.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#6b7280", lineHeight: 1.6 }}>
                        {cat.desc}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>

        {/* AI Routine Callout */}
        <ScrollReveal>
          <Box
            sx={{
              p: { xs: 3, md: 5 },
              background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
              color: "#ffffff",
              borderRadius: "16px",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: 3
            }}
          >
            <Box>
              <Chip label="🤖 AI ASSISTANT" sx={{ bgcolor: "#1e40af", color: "#fff", fontWeight: 800, mb: 1.5 }} />
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>Not sure which category fits your skin type?</Typography>
              <Typography variant="body1" sx={{ opacity: 0.85, maxWidth: 640 }}>
                Use our 60-second AI Routine Builder to diagnose your skin type and generate a personalized product regimen.
              </Typography>
            </Box>
            <Button
              component={RouterLink}
              to="/routine-builder"
              variant="contained"
              size="large"
              sx={{ px: 4, py: 1.5, fontWeight: 800, bgcolor: "#1e40af", borderRadius: "10px", whiteSpace: "nowrap", "&:hover": { bgcolor: "#1e3a8a" } }}
            >
              Start AI Quiz →
            </Button>
          </Box>
        </ScrollReveal>

      </Container>
    </>
  );
}

import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Container, Typography, Box, Grid, Card, CardContent,
  CardMedia, TextField, Button, Chip, Rating,
  InputAdornment, Divider, Paper
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FullBleedImage from "../Components/FullBleedImage";
import ScrollReveal from "../Components/ScrollReveal";
import { useGenderContent } from "../utils/genderContent";
const ALL_PRODUCTS = [
  {
    id: "p1",
    name: "Activated Charcoal Deep Clean Face Wash",
    brand: "SkSync Men",
    category: "Skincare",
    price: 349,
    originalPrice: 499,
    rating: 4.8,
    ratingCount: 1420,
    gender: "male",
    badge: "30% OFF",
    img: "https://mensco.in/cdn/shop/files/28.webp?v=1769256714&width=1946"
  },
  {
    id: "p2",
    name: "10% Niacinamide & Caffeine Pore Refining Serum",
    brand: "SkSync Men",
    category: "Skincare",
    price: 899,
    originalPrice: 1299,
    rating: 4.9,
    ratingCount: 2150,
    gender: "male",
    badge: "31% OFF",
    img: "https://images.pexels.com/photos/17545640/pexels-photo-17545640.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "p3",
    name: "Matte Finish Beard & Styling Wax",
    brand: "SkSync Men",
    category: "Grooming",
    price: 299,
    originalPrice: 449,
    rating: 4.7,
    ratingCount: 890,
    gender: "male",
    badge: "33% OFF",
    img: "https://vivapol.com/cdn/shop/files/M1_100ml_fb1b3b4e-b9c5-40ee-a5a5-aa31df60c4e9.png?v=1769667668&width=3840"
  },
  {
    id: "p4",
    name: "Cooling Aftershave Recovery Balm",
    brand: "SkSync Men",
    category: "Grooming",
    price: 279,
    originalPrice: 399,
    rating: 4.8,
    ratingCount: 750,
    gender: "male",
    badge: "30% OFF",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoQ-FzDRTcI-ehvx1Ei5Orali2SyCon5kW4eH12yE0X2NSJHVZr67df3iJ&s=10"
  },
  {
    id: "p5",
    name: "Wood & Musk Eau De Cologne Luxury Edition",
    brand: "Fragrance Co",
    category: "Fragrances",
    price: 1199,
    originalPrice: 1799,
    rating: 4.9,
    ratingCount: 3800,
    gender: "male",
    badge: "33% OFF",
    img: "https://images.pexels.com/photos/1961792/pexels-photo-1961792.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "p6",
    name: "Argan & Cedarwood Beard Growth Oil",
    brand: "SkSync Men",
    category: "Grooming",
    price: 499,
    originalPrice: 799,
    rating: 4.8,
    ratingCount: 1110,
    gender: "male",
    badge: "37% OFF",
    img: "https://images.pexels.com/photos/3808904/pexels-photo-3808904.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "p7",
    name: "Hydrating Hyaluronic Face Gel Moisturizer",
    brand: "DermaCare",
    category: "Skincare",
    price: 449,
    originalPrice: 699,
    rating: 4.6,
    ratingCount: 620,
    gender: "unisex",
    badge: "35% OFF",
    img: "https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "p8",
    name: "Volumizing Sea Salt Hair Spray for Men",
    brand: "PureRoots",
    category: "Haircare",
    price: 349,
    originalPrice: 499,
    rating: 4.7,
    ratingCount: 430,
    gender: "male",
    badge: "30% OFF",
    img: "https://images.pexels.com/photos/32816849/pexels-photo-32816849.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

function ProductCard({ prod }) {
  const navigate = useNavigate();
  const discountPct = Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100);

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ position: "relative", overflow: "hidden", borderRadius: "10px 10px 0 0" }}>
        <Chip
          label={prod.badge}
          size="small"
          sx={{
            position: "absolute", top: 10, left: 10, zIndex: 2,
            bgcolor: "#dc2626", color: "#fff", fontWeight: 700, fontSize: "0.7rem",
            height: 22, borderRadius: "5px",
          }}
        />
        <CardMedia
          component="img"
          image={prod.img}
          alt={prod.name}
          sx={{
            height: { xs: 150, sm: 190, md: 220 },
            objectFit: "cover",
            transition: "transform 0.4s ease",
            "&:hover": { transform: "scale(1.05)" },
          }}
        />
      </Box>

      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2 }}>
        <Typography
          variant="caption"
          sx={{ color: "#1e40af", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}
        >
          {prod.brand} · {prod.category}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, color: "#111827", mt: 0.5, mb: 1, lineHeight: 1.4, flex: 1 }}
        >
          {prod.name}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
          <Rating value={prod.rating} precision={0.1} readOnly size="small" />
          <Typography variant="caption" sx={{ color: "#6b7280" }}>
            ({prod.ratingCount.toLocaleString()})
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 2 }}>
          <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#111827" }}>
            ₹{prod.price}
          </Typography>
          <Typography sx={{ color: "#9ca3af", fontSize: "0.82rem", textDecoration: "line-through" }}>
            ₹{prod.originalPrice}
          </Typography>
          <Chip
            label={`${discountPct}% off`}
            size="small"
            sx={{ bgcolor: "#dbeafe", color: "#1e3a8a", fontWeight: 700, fontSize: "0.68rem", height: 18, borderRadius: "4px" }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            component={RouterLink}
            to="/product-details"
            variant="outlined"
            size="small"
            sx={{
              flex: 1, fontWeight: 600, borderColor: "#e5e7eb", color: "#374151",
              "&:hover": { borderColor: "#1e40af", color: "#1e40af" },
            }}
          >
            Details
          </Button>
          <Button
            onClick={() => navigate("/cart")}
            variant="contained"
            size="small"
            sx={{
              flex: 1, fontWeight: 700,
              bgcolor: "#1e40af",
              "&:hover": { bgcolor: "#1e3a8a" },
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function Products() {
  const { gender, content } = useGenderContent();
  const [search, setSearch]                 = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const genderFiltered = ALL_PRODUCTS.filter(
    (p) => p.gender === gender || p.gender === "unisex" || gender === "male"
  );

  const filtered = genderFiltered.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      selectedCategory === "All" || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const categories = ["All", ...content.categories];

  return (
    <>
      {/* Page Banner */}
      <FullBleedImage
        src="https://images.pexels.com/photos/3808904/pexels-photo-3808904.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="SkSync Product Catalog"
        height={260}
        chip="OUR CATALOG"
        title="Men's Cosmetics & Grooming"
        subtitle="Science-backed formulations for the modern man"
      />

      <Container maxWidth="xl" sx={{ py: 5 }}>
        {/* ── Toolbar ─────────────────────────────────── */}
        <ScrollReveal>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { md: "center" },
              justifyContent: "space-between",
              gap: 2,
              mb: 4,
            }}
          >
            <TextField
              size="small"
              placeholder="Search by name or ingredient…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18, color: "#9ca3af" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ width: { xs: "100%", md: 380 }, bgcolor: "#fff" }}
            />

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  onClick={() => setSelectedCategory(cat)}
                  variant={selectedCategory === cat ? "filled" : "outlined"}
                  sx={{
                    fontWeight: 600,
                    cursor: "pointer",
                    ...(selectedCategory === cat
                      ? { bgcolor: "#1e40af", color: "#fff", borderColor: "#1e40af" }
                      : { borderColor: "#d1d5db", color: "#374151", "&:hover": { borderColor: "#1e40af" } }),
                  }}
                />
              ))}
            </Box>
          </Box>
        </ScrollReveal>

        <Divider sx={{ mb: 4 }} />

        {/* ── Count ──────────────────────────────────── */}
        <ScrollReveal>
          <Typography sx={{ color: "#6b7280", fontSize: "0.875rem", mb: 3 }}>
            Showing <strong>{filtered.length}</strong> products
            {selectedCategory !== "All" && <> in <strong>{selectedCategory}</strong></>}
          </Typography>
        </ScrollReveal>

        {/* ── Product Grid ────────────────────────────── */}
        {filtered.length === 0 ? (
          <Paper
            sx={{
              p: 6,
              textAlign: "center",
              border: "1px solid #e5e7eb",
              boxShadow: "none",
            }}
          >
            <Typography variant="h6" sx={{ color: "#6b7280", mb: 1 }}>
              No products found
            </Typography>
            <Typography variant="body2" sx={{ color: "#9ca3af" }}>
              Try a different search term or category filter.
            </Typography>
            <Button
              sx={{ mt: 2, color: "#1e40af" }}
              onClick={() => { setSearch(""); setSelectedCategory("All"); }}
            >
              Clear Filters
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={{ xs: 1.5, sm: 2.5, md: 3 }}>
            {filtered.map((prod, i) => (
              <Grid item xs={6} sm={6} md={3} key={prod.id}>
                <ScrollReveal style={{ transitionDelay: `${i * 60}ms` }}>
                  <ProductCard prod={prod} />
                </ScrollReveal>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}

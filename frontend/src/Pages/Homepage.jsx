import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box, Container, Typography, Button, Chip,
  Card, CardMedia, CardContent, Rating, Avatar,
  Paper, Stack, Divider
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import RecyclingOutlinedIcon from "@mui/icons-material/Recycling";
import HeroCarousel from "../Components/HeroCarousel";
import ScrollReveal from "../Components/ScrollReveal";
import { useGenderContent } from "../utils/genderContent";

/* ────────────────────────────────────────────────── Data ── */
const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Activated Charcoal Face Wash",
    subtitle: "Deep Pore Cleanser",
    price: 349,
    originalPrice: 499,
    rating: 4.7,
    ratingCount: 2814,
    badge: "Bestseller",
    badgeColor: "#1e40af",
    image: "https://mensco.in/cdn/shop/files/28.webp?v=1769256714&width=1946",
  },
  {
    id: 2,
    name: "10% Niacinamide Serum",
    subtitle: "Oil Control & Pore Minimizer",
    price: 449,
    originalPrice: 649,
    rating: 4.8,
    ratingCount: 3421,
    badge: "30% OFF",
    badgeColor: "#dc2626",
    image: "https://cureviaskin.com/cdn/shop/files/oilcontrolporeminimizing.webp?",
  },
  {
    id: 3,
    name: "Beard Styling Wax",
    subtitle: "Strong Hold — All Day",
    price: 299,
    originalPrice: 399,
    rating: 4.6,
    ratingCount: 1890,
    badge: "New",
    badgeColor: "#7c3aed",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYlMZwb-LIidfN7i7bSHdnOt3ZIyeoMuMF0zfmZm4ynWjGI8In6Cx0O1T1&s=10",
  },
  {
    id: 4,
    name: "Wood & Musk EDP",
    subtitle: "Luxury Eau De Parfum",
    price: 1299,
    originalPrice: 1799,
    rating: 4.9,
    ratingCount: 5070,
    badge: "Top Rated",
    badgeColor: "#d97706",
    image: "https://images.pexels.com/photos/1961792/pexels-photo-1961792.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    name: "Vitamin C Face Scrub",
    subtitle: "Exfoliating Brightener",
    price: 399,
    originalPrice: 549,
    rating: 4.7,
    ratingCount: 1640,
    badge: "27% OFF",
    badgeColor: "#dc2626",
    image: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    name: "Anti-Hairfall Scalp Tonic",
    subtitle: "Root Strengthening Formula",
    price: 499,
    originalPrice: 699,
    rating: 4.8,
    ratingCount: 2210,
    badge: "Hot",
    badgeColor: "#059669",
    image: "https://cdn.shopify.com/s/files/1/1438/5948/products/beard_kit_premium_hilee_gift1.jpg?v=1546287058",
  },
];

const FEATURES = [
  { icon: <LocalShippingOutlinedIcon sx={{ fontSize: { xs: 24, md: 28 } }} />, title: "Free Delivery", desc: "On orders above ₹499" },
  { icon: <VerifiedOutlinedIcon sx={{ fontSize: { xs: 24, md: 28 } }} />, title: "100% Authentic", desc: "Lab-verified, seal guaranteed" },
  { icon: <ScienceOutlinedIcon sx={{ fontSize: { xs: 24, md: 28 } }} />, title: "Derma Tested", desc: "Formulated by skin specialists" },
  { icon: <RecyclingOutlinedIcon sx={{ fontSize: { xs: 24, md: 28 } }} />, title: "Eco Packaging", desc: "Recyclable amber glass bottles" },
];

const TESTIMONIALS = [
  { name: "Arjun Mehta", city: "Madurai", rating: 5, text: "The Niacinamide serum cleared my pores in 3 weeks. Genuinely the best skincare I've ever used." },
  { name: "Vikram Nair", city: "Sattur", rating: 5, text: "SkSync's beard oil is the only one I trust. Softens the beard and smells incredible all day." },
  { name: "Rohit Sharma", city: "Chennai", rating: 5, text: "Fragrance lasted 10+ hours. Got so many compliments. Will definitely re-purchase the Wood & Musk." },
];

const TICKER_MESSAGES = [
  "🚀 Free Shipping on orders above ₹499",
  "⚡ Up to 40% OFF Men's Grooming Kits",
  "🧬 Dermatologist-Formulated Skincare",
  "🌱 100% Cruelty-Free & Vegan",
  "🎁 Extra 15% OFF — Code: MENKING15",
];

/* ───────────────────────────────── ProductCard ── */
function ProductCard({ product }) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: { xs: "12px", md: "16px" },
        boxShadow: "0 2px 14px -2px rgba(0,0,0,0.08)",
        border: "1px solid #f0f0f0",
        overflow: "hidden",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
        "&:hover": {
          boxShadow: "0 10px 32px -4px rgba(0,0,0,0.15)",
          transform: "translateY(-4px)",
        },
      }}
    >
      {/* ── Image ── */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 160, sm: 190, md: 220 },
          flexShrink: 0,
          overflow: "hidden",
          bgcolor: "#f8fafc",
        }}
      >
        <CardMedia
          component="img"
          image={product.image || "https://placehold.co/400x220/e5e7eb/9ca3af?text=No+Image"}
          alt={product.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.45s ease",
            "&:hover": { transform: "scale(1.06)" },
          }}
        />
        {/* Badge */}
        <Chip
          label={product.badge}
          size="small"
          sx={{
            position: "absolute",
            top: { xs: 8, sm: 10 },
            left: { xs: 8, sm: 10 },
            bgcolor: product.badgeColor,
            color: "#fff",
            fontWeight: 700,
            fontSize: { xs: "0.62rem", sm: "0.68rem" },
            height: { xs: 20, sm: 22 },
            borderRadius: "6px",
            letterSpacing: 0.3,
          }}
        />
        {/* Discount badge top-right */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: 8, sm: 10 },
            right: { xs: 8, sm: 10 },
            bgcolor: "#fff",
            color: "#dc2626",
            fontWeight: 800,
            fontSize: { xs: "0.65rem", sm: "0.7rem" },
            px: { xs: 0.7, sm: 0.8 },
            py: 0.2,
            borderRadius: "6px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          -{discount}%
        </Box>
      </Box>

      {/* ── Content ── */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: { xs: 1.8, sm: 2.2, md: 2.5 },
          pb: { xs: "16px !important", md: "20px !important" },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "#1e40af",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 0.8,
            mb: 0.3,
            display: "block",
            fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
          }}
        >
          {product.subtitle}
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: "0.85rem", sm: "0.9rem", md: "0.95rem" },
            color: "#111827",
            mb: 0.8,
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: { xs: 36, sm: 40 },
          }}
        >
          {product.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.2 }}>
          <Rating value={product.rating} precision={0.1} readOnly size="small" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }} />
          <Typography variant="caption" sx={{ color: "#6b7280", fontWeight: 500, fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
            ({product.ratingCount.toLocaleString()})
          </Typography>
        </Box>

        {/* Price row */}
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mt: "auto", mb: { xs: 1.5, md: 2 } }}>
          <Typography sx={{ fontWeight: 800, fontSize: { xs: "1rem", sm: "1.1rem", md: "1.15rem" }, color: "#111827" }}>
            ₹{product.price}
          </Typography>
          <Typography sx={{ color: "#9ca3af", fontSize: { xs: "0.75rem", sm: "0.82rem" }, textDecoration: "line-through" }}>
            ₹{product.originalPrice}
          </Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          size="medium"
          component={RouterLink}
          to="/products"
          sx={{
            bgcolor: "#1e40af",
            color: "#fff",
            fontWeight: 700,
            borderRadius: { xs: "8px", sm: "10px" },
            py: { xs: 0.7, sm: 0.8, md: 1 },
            textTransform: "none",
            fontSize: { xs: "0.8rem", sm: "0.85rem" },
            "&:hover": { bgcolor: "#1e3a8a" },
            transition: "all 0.2s ease",
          }}
        >
          Shop Now
        </Button>
      </CardContent>
    </Card>
  );
}

/* ───────────────────────────────────────────────── Homepage ── */
export default function Homepage() {
  const { content } = useGenderContent();

  /* Ticker duplicate for seamless loop */
  const allMessages = [...TICKER_MESSAGES, ...TICKER_MESSAGES];

  return (
    <Box sx={{ overflowX: "hidden", bgcolor: "#ffffff" }}>
      {/* ══════════ 1. TICKER STRIP ══════════════════════════ */}
      <Box
        sx={{
          bgcolor: "#1e40af",
          color: "#fff",
          overflow: "hidden",
          py: { xs: 0.65, md: 0.85 },
          userSelect: "none",
        }}
      >
        <Box className="marquee-track">
          {allMessages.map((msg, i) => (
            <Typography
              key={i}
              variant="caption"
              sx={{ fontWeight: 600, mx: { xs: 2.5, md: 4 }, whiteSpace: "nowrap", fontSize: { xs: "0.75rem", md: "0.82rem" } }}
            >
              {msg}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* ══════════ 2. HERO CAROUSEL ═════════════════════════ */}
      <Container maxWidth="xl" sx={{ pt: { xs: 2, sm: 3 }, pb: { xs: 3, sm: 4 }, px: { xs: 2, sm: 3, md: 4 } }}>
        <HeroCarousel slides={content.heroSlides} height={{ xs: 360, sm: 440, md: 500 }} interval={4500}>
          <Chip
            label="✦ NEW COLLECTION 2026"
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.18)",
              color: "#fff",
              fontWeight: 700,
              mb: { xs: 1.5, md: 2.5 },
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.3)",
              letterSpacing: 1,
              fontSize: { xs: "0.68rem", sm: "0.75rem" },
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: { xs: "1.6rem", sm: "2.3rem", md: "3rem" },
              lineHeight: 1.22,
              maxWidth: 680,
              mb: { xs: 2, md: 3 },
              px: { xs: 1, sm: 0 },
              textShadow: "0 2px 14px rgba(0,0,0,0.5)",
            }}
          >
            {content.heroTagline}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              mt: 1,
              flexDirection: { xs: "column", sm: "row" },
              width: { xs: "100%", sm: "auto" },
              maxWidth: { xs: 290, sm: "none" },
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/products"
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: "#1e40af",
                color: "#fff",
                fontWeight: 700,
                px: { xs: 3, sm: 3.8 },
                py: { xs: 1.1, sm: 1.3 },
                fontSize: { xs: "0.875rem", sm: "0.95rem" },
                width: { xs: "100%", sm: "auto" },
                "&:hover": { bgcolor: "#1e3a8a" },
              }}
            >
              Shop Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/offers"
              sx={{
                borderColor: "rgba(255,255,255,0.65)",
                color: "#fff",
                fontWeight: 600,
                px: { xs: 3, sm: 3.5 },
                py: { xs: 1.1, sm: 1.3 },
                fontSize: { xs: "0.875rem", sm: "0.95rem" },
                width: { xs: "100%", sm: "auto" },
                "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.14)" },
              }}
            >
              View Offers
            </Button>
          </Box>
        </HeroCarousel>
      </Container>

      {/* ══════════ 3. CATEGORY CARDS (Strict 3x2 Matrix Grid) ════════════════════════ */}
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3, md: 4 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: { xs: 2, sm: 2.5, md: 3 },
          }}
        >
          {content.categoryCards.map((cat, i) => (
            <ScrollReveal key={i} delay={i * 60} sx={{ height: "100%", width: "100%" }}>
              <Box
                component={RouterLink}
                to="/categories"
                sx={{
                  display: "block",
                  width: "100%",
                  height: { xs: 200, sm: 240, md: 270 },
                  borderRadius: { xs: "14px", md: "18px" },
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 4px 16px -2px rgba(0,0,0,0.1)",
                  "&:hover img": {
                    transform: "scale(1.07)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={cat.image}
                  alt={cat.label}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.45s ease",
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.25) 55%, rgba(0,0,0,0) 100%)",
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    left: { xs: 14, sm: 18 },
                    bottom: { xs: 14, sm: 18 },
                    right: 14,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
                      lineHeight: 1.2,
                      textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                    }}
                  >
                    {cat.label}
                  </Typography>

                  <Typography
                    sx={{
                      color: "rgba(255,255,255,.85)",
                      fontSize: { xs: "0.75rem", sm: "0.85rem" },
                      mt: 0.3,
                      lineHeight: 1.3,
                    }}
                  >
                    {cat.subtitle}
                  </Typography>
                </Box>
              </Box>
            </ScrollReveal>
          ))}
        </Box>
      </Container>

      {/* ══════════ 4. OFFER BANNER ══════════════════════════ */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%)",
          py: { xs: 3.5, sm: 4, md: 5 },
          my: { xs: 3, md: 4 },
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <ScrollReveal>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "center", md: "center" },
                justifyContent: "space-between",
                textAlign: { xs: "center", md: "left" },
                gap: { xs: 2, md: 3 },
              }}
            >
              <Box>
                <Chip
                  label="LIMITED TIME OFFER"
                  size="small"
                  sx={{ bgcolor: "#1e40af", color: "#fff", fontWeight: 700, mb: 1.2, fontSize: "0.68rem" }}
                />
                <Typography
                  sx={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: { xs: "1.1rem", sm: "1.35rem", md: "1.5rem" },
                    color: "#ffffff",
                    lineHeight: 1.3,
                  }}
                >
                  {content.offerBanner}
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/offers"
                sx={{
                  bgcolor: "#1e40af",
                  color: "#fff",
                  fontWeight: 700,
                  px: { xs: 3, md: 3.5 },
                  py: { xs: 1.1, md: 1.3 },
                  fontSize: { xs: "0.85rem", md: "0.95rem" },
                  width: { xs: "100%", sm: "auto" },
                  maxWidth: { xs: 280, sm: "none" },
                  flexShrink: 0,
                  "&:hover": { bgcolor: "#1e3a8a" },
                }}
              >
                Claim Offer
              </Button>
            </Box>
          </ScrollReveal>
        </Container>
      </Box>

      {/* ══════════ 5. FEATURED PRODUCTS (Strict 3x2 Matrix Grid) ═════════════════════ */}
      <Box sx={{ bgcolor: "#f9fafb", py: { xs: 4, sm: 6, md: 7 } }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <ScrollReveal>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: { xs: 3, md: 4 } }}>
              <Box>
                <Typography variant="overline" sx={{ color: "#1e40af", fontWeight: 700, letterSpacing: 1.2, fontSize: { xs: "0.7rem", md: "0.78rem" } }}>
                  Hand-Picked
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827", fontSize: { xs: "1.35rem", sm: "1.75rem", md: "2.1rem" } }}>
                  {content.recommendationsTitle}
                </Typography>
              </Box>
              <Button
                component={RouterLink}
                to="/products"
                endIcon={<ArrowForwardIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                sx={{ color: "#1e40af", fontWeight: 600, fontSize: { xs: "0.8rem", sm: "0.9rem" }, "&:hover": { bgcolor: "#eff6ff" } }}
              >
                View All
              </Button>
            </Box>
          </ScrollReveal>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: { xs: 2, sm: 2.5, md: 3 },
            }}
          >
            {FEATURED_PRODUCTS.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 60} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ══════════ 6. WHY SKSYNC — FEATURES ════════════════ */}
      <Box sx={{ bgcolor: "#ffffff", py: { xs: 4, sm: 6, md: 7 } }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <ScrollReveal>
            <Box sx={{ textAlign: "center", mb: { xs: 3, md: 5 } }}>
              <Typography variant="overline" sx={{ color: "#1e40af", fontWeight: 700, letterSpacing: 1.5, fontSize: { xs: "0.7rem", md: "0.78rem" } }}>
                Why Us
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827", fontSize: { xs: "1.35rem", sm: "1.75rem", md: "2.1rem" } }}>
                The SkSync Difference
              </Typography>
            </Box>
          </ScrollReveal>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: { xs: 2, sm: 2.5, md: 3 },
            }}
          >
            {FEATURES.map((f, i) => (
              <ScrollReveal key={i} delay={i * 60} sx={{ height: "100%" }}>
                <Paper
                  sx={{
                    p: { xs: 2, sm: 3, md: 3.5 },
                    textAlign: "center",
                    border: "1px solid #e5e7eb",
                    boxShadow: "none",
                    borderRadius: { xs: "12px", md: "16px" },
                    "&:hover": { borderColor: "#1e40af", boxShadow: "0 4px 20px -4px rgba(30,64,175,0.18)" },
                    transition: "all 0.25s ease",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 44, sm: 48, md: 56 },
                      height: { xs: 44, sm: 48, md: 56 },
                      borderRadius: "14px",
                      bgcolor: "#eff6ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: { xs: 1.2, md: 2 },
                      color: "#1e40af",
                    }}
                  >
                    {f.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: { xs: "0.88rem", sm: "1rem", md: "1.1rem" } }}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#6b7280", fontSize: { xs: "0.75rem", sm: "0.82rem", md: "0.875rem" } }}>
                    {f.desc}
                  </Typography>
                </Paper>
              </ScrollReveal>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ══════════ 7. TESTIMONIALS ══════════════════════════ */}
      <Box sx={{ bgcolor: "#f9fafb", py: { xs: 4, sm: 6, md: 7 } }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <ScrollReveal>
            <Box sx={{ textAlign: "center", mb: { xs: 3, md: 5 } }}>
              <Typography variant="overline" sx={{ color: "#1e40af", fontWeight: 700, letterSpacing: 1.5, fontSize: { xs: "0.7rem", md: "0.78rem" } }}>
                Reviews
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827", fontSize: { xs: "1.35rem", sm: "1.75rem", md: "2.1rem" } }}>
                What Our Customers Say
              </Typography>
            </Box>
          </ScrollReveal>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: { xs: 2, sm: 2.5, md: 3 },
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={i} delay={i * 60} sx={{ height: "100%" }}>
                <Paper
                  sx={{
                    p: { xs: 2.5, sm: 3, md: 3.5 },
                    height: "100%",
                    border: "1px solid #e5e7eb",
                    boxShadow: "none",
                    borderRadius: { xs: "12px", md: "16px" },
                  }}
                >
                  <Rating value={t.rating} readOnly size="small" sx={{ mb: 1.5 }} />
                  <Typography
                    variant="body2"
                    sx={{ color: "#374151", lineHeight: 1.75, mb: 2.5, fontStyle: "italic", fontSize: { xs: "0.82rem", sm: "0.875rem" } }}
                  >
                    "{t.text}"
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      sx={{ width: 36, height: 36, bgcolor: "#1e40af", fontSize: "0.875rem", fontWeight: 700 }}
                    >
                      {t.name[0]}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: "0.875rem" }}>{t.name}</Typography>
                      <Typography sx={{ color: "#6b7280", fontSize: "0.78rem" }}>{t.city}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </ScrollReveal>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ══════════ 8. CTA SECTION ═══════════════════════════ */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1e40af 0%, #2563eb 100%)",
          py: { xs: 5, sm: 7, md: 9 },
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center", px: { xs: 2.5, sm: 3 } }}>
          <ScrollReveal>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                color: "#fff",
                mb: 2,
                fontSize: { xs: "1.5rem", sm: "2.1rem", md: "2.5rem" },
                lineHeight: 1.3,
              }}
            >
              Elevate Your Grooming Ritual
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.85)", mb: 4, maxWidth: 520, mx: "auto", fontSize: { xs: "0.875rem", sm: "1rem" } }}>
              Join over 1 million men who have upgraded their skincare routine with SkSync's science-backed formulations.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1.5, sm: 2 }} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/products"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: "#fff",
                  color: "#1e40af",
                  fontWeight: 700,
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.2, sm: 1.5 },
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  "&:hover": { bgcolor: "#eff6ff" },
                }}
              >
                Explore Products
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={RouterLink}
                to="/routine-builder"
                sx={{
                  borderColor: "rgba(255,255,255,0.7)",
                  color: "#fff",
                  fontWeight: 600,
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.2, sm: 1.5 },
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                Build My Routine
              </Button>
            </Stack>
          </ScrollReveal>
        </Container>
      </Box>
    </Box>
  );
}

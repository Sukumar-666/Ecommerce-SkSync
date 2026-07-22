import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import PageHeading from "../Components/PageHeading";
import ScrollReveal from "../Components/ScrollReveal";

const MEGA_DEALS = [
  {
    id: 1,
    name: "Activated Charcoal Deep Cleansing Face Wash (Pack of 2)",
    originalPrice: 698,
    dealPrice: 449,
    discount: "36% OFF",
    claimedPct: 88,
    rating: "4.8 ★",
    reviews: "2,410",
    image: "https://images.pexels.com/photos/4210347/pexels-photo-4210347.jpeg?auto=compress&cs=tinysrgb&w=600",
    badge: "Amazon & Flipkart Top Rated"
  },
  {
    id: 2,
    name: "10% Niacinamide + Caffeine Anti-Fatigue Serum Duo",
    originalPrice: 1798,
    dealPrice: 1099,
    discount: "39% OFF",
    claimedPct: 92,
    rating: "4.9 ★",
    reviews: "1,850",
    image: "https://images.pexels.com/photos/17545640/pexels-photo-17545640.jpeg?auto=compress&cs=tinysrgb&w=600",
    badge: "⚡ Lightning Deal"
  },
  {
    id: 3,
    name: "Matte Beard Wax & Aftershave Recovery Kit",
    originalPrice: 878,
    dealPrice: 549,
    discount: "37% OFF",
    claimedPct: 79,
    rating: "4.7 ★",
    reviews: "920",
    image: "https://images.pexels.com/photos/8467293/pexels-photo-8467293.jpeg?auto=compress&cs=tinysrgb&w=600",
    badge: "SkSync Assured"
  },
  {
    id: 4,
    name: "Wood & Musk Eau De Cologne Luxury Edition",
    originalPrice: 1999,
    dealPrice: 1199,
    discount: "40% OFF",
    claimedPct: 85,
    rating: "4.9 ★",
    reviews: "3,100",
    image: "https://images.pexels.com/photos/1961792/pexels-photo-1961792.jpeg?auto=compress&cs=tinysrgb&w=600",
    badge: "Best Seller"
  }
];

const COUPONS = [
  { code: "MENKING15", desc: "Flat 15% OFF on orders above ₹999", tag: "Most Popular" },
  { code: "SKSYNCFIRST", desc: "Extra ₹150 OFF for First-time Men Shoppers", tag: "New User" },
  { code: "FLIPDEAL", desc: "Buy 2 Get 1 FREE on all Grooming Kits", tag: "Combo Offer" }
];

export default function FlashDeals() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(14400); // 4 hours in seconds
  const [copiedCode, setCopiedCode] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 14400));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const copyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <PageHeading
        title="Flipkart & Amazon Style Mega Deal Zone"
        subtitle="Exclusive daily discounts, flash sales, and bank cashback offers on men's grooming & cosmetics."
      />

      {/* Countdown Timer Header */}
      <Paper
        elevation={4}
        sx={{
          p: 3,
          mb: 5,
          borderRadius: 4,
          background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
          color: "#ffffff",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2
        }}
      >
        <Box>
          <Chip label="⚡ BIG BILLION GROOMING SALE" sx={{ bgcolor: "#ffffff", color: "#dc2626", fontWeight: 800, mb: 1 }} />
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Lightning Deals End In:
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          <Paper sx={{ px: 2, py: 1, bgcolor: "#0f172a", color: "#fff", fontWeight: 800, fontSize: "1.5rem", borderRadius: 2 }}>
            {hours}h
          </Paper>
          <Typography variant="h4">:</Typography>
          <Paper sx={{ px: 2, py: 1, bgcolor: "#0f172a", color: "#fff", fontWeight: 800, fontSize: "1.5rem", borderRadius: 2 }}>
            {minutes}m
          </Paper>
          <Typography variant="h4">:</Typography>
          <Paper sx={{ px: 2, py: 1, bgcolor: "#0f172a", color: "#fff", fontWeight: 800, fontSize: "1.5rem", borderRadius: 2 }}>
            {seconds}s
          </Paper>
        </Box>
      </Paper>

      {/* Coupons Section */}
      <ScrollReveal>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.main", mb: 2 }}>
          Available Coupon Codes
        </Typography>
        <Grid container spacing={2} sx={{ mb: 5 }}>
          {COUPONS.map((cp) => (
            <Grid item xs={12} md={4} key={cp.code}>
              <Paper
                elevation={2}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  border: "2px dashed #1e40af",
                  bgcolor: "background.paper",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%"
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Chip label={cp.tag} color="primary" size="small" sx={{ mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "primary.main" }}>
                    {cp.code}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {cp.desc}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => copyCoupon(cp.code)}
                  sx={{ alignSelf: "flex-start" }}
                >
                  {copiedCode === cp.code ? "✓ Copied!" : "Copy Code"}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </ScrollReveal>

      {/* Mega Deal Cards */}
      <ScrollReveal>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.main", mb: 3 }}>
          Featured Lightning Deals
        </Typography>

        <Grid container spacing={3}>
          {MEGA_DEALS.map((deal) => (
            <Grid item xs={12} sm={6} md={3} key={deal.id}>
              <Card elevation={3} sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 4, position: "relative" }}>
                <Chip
                  label={deal.discount}
                  color="error"
                  size="small"
                  sx={{ position: "absolute", top: 12, left: 12, zIndex: 2, fontWeight: 800 }}
                />
                <CardMedia component="img" image={deal.image} alt={deal.name} sx={{ height: 190, objectFit: "cover" }} />

                <CardContent sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: "secondary.main", fontWeight: 700, display: "block", mb: 0.5 }}>
                      {deal.badge}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 1 }}>
                      {deal.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 1 }}>
                      {deal.rating} ({deal.reviews} ratings)
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 1.5 }}>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: "primary.main" }}>
                        ₹{deal.dealPrice}
                      </Typography>
                      <Typography variant="body2" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                        ₹{deal.originalPrice}
                      </Typography>
                    </Box>

                    {/* Stock Progress Bar */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="caption" sx={{ color: "error.main", fontWeight: 700 }}>
                          🔥 {deal.claimedPct}% Claimed
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          Limited Stock
                        </Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={deal.claimedPct} color="error" sx={{ height: 6, borderRadius: 3 }} />
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate("/cart")}
                    sx={{ py: 1, fontWeight: 700 }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </ScrollReveal>

      {/* Bank & Payment Offers */}
      <ScrollReveal>
        <Paper elevation={2} sx={{ p: 3, mt: 6, borderRadius: 4, bgcolor: "background.paper", borderLeft: "6px solid #16a34a" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "success.main", mb: 1 }}>
            💳 Bank & Payment Instant Discounts
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                • HDFC Bank Credit Cards: Instant 10% OFF up to ₹500
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                • ICICI Bank Netbanking: Flat ₹100 Cashback
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                • Paytm / PhonePe UPI: Scratch card up to ₹250
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </ScrollReveal>
    </Container>
  );
}

import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import FullBleedImage from "../Components/FullBleedImage";
import ScrollReveal from "../Components/ScrollReveal";

const OFFERS = [
  { offer: "Big Men's Grooming Sale",    discount: "Flat 15% OFF",      validTill: "Limited Time",  code: "MENKING15",   tag: "Most Popular" },
  { offer: "First Time Shopper Deal",    discount: "Flat ₹150 OFF",     validTill: "Ongoing",       code: "SKSYNCFIRST", tag: "New User"     },
  { offer: "Buy 2 Get 1 FREE Bundle",    discount: "33% Off Value",     validTill: "31 July 2026", code: "SKSYNC3FOR2", tag: "Combo"        },
  { offer: "Free Express Delivery",      discount: "Orders above ₹499", validTill: "Always Active", code: "FREESHIP",    tag: "Shipping"     }
];

const BANK_OFFERS = [
  { bank: "HDFC Bank Cards", desc: "Instant 10% Cashback up to ₹300 on min transaction ₹1,499." },
  { bank: "ICICI Credit Cards", desc: "Flat ₹250 instant discount on orders over ₹1,999." },
  { bank: "UPI & Paytm", desc: "Get up to ₹100 scratch card cashback on any UPI transaction." },
  { bank: "SkSync Wallet", desc: "Earn 5% reward points on every completed order automatically." }
];

const STEPS = [
  { num: "1", title: "Select Products", desc: "Add your favorite cosmetics, serums, or grooming kits to cart." },
  { num: "2", title: "Copy Promo Code", desc: "Click any 'Copy Code' button on this page to copy coupon." },
  { num: "3", title: "Apply at Checkout", desc: "Paste code at checkout and watch your total drop instantly." }
];

export default function Offers() {
  const [copiedCode, setCopiedCode] = useState("");

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  return (
    <>
      <FullBleedImage
        src="https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="SkSync Offers & Deals"
        height={280}
        chip="SAVINGS"
        title="Exclusive Offers & Promo Codes"
        subtitle="Save big on engineered skincare, beard kits, and luxury fragrances"
      />

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>

        {/* Hero Flash Deal Callout */}
        <ScrollReveal>
          <Paper
            sx={{
              p: { xs: 3, md: 5 },
              mb: 6,
              background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
              color: "#ffffff",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 3,
              borderRadius: "16px",
            }}
          >
            <Box>
              <Chip label="⚡ FLASH DEALS ACTIVE" sx={{ bgcolor: "#1e40af", color: "#fff", fontWeight: 800, mb: 1.5 }} />
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>SkSync Mega Deal Zone</Typography>
              <Typography variant="body1" sx={{ opacity: 0.85, maxWidth: 640 }}>
                Limited-time flash discounts on bestseller charcoal cleansers, niacinamide serums, and long-lasting fragrances.
              </Typography>
            </Box>
            <Button
              component={RouterLink}
              to="/deal-zone"
              variant="contained"
              size="large"
              sx={{ px: 4, py: 1.5, fontWeight: 800, bgcolor: "#1e40af", borderRadius: "10px", whiteSpace: "nowrap", "&:hover": { bgcolor: "#1e3a8a" } }}
            >
              Explore Flash Deals →
            </Button>
          </Paper>
        </ScrollReveal>

        {/* Promo Codes Grid */}
        <ScrollReveal>
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827", mb: 3 }}>
              Available Coupon Codes
            </Typography>
            <Grid container spacing={3}>
              {OFFERS.map((o) => (
                <Grid item xs={12} sm={6} key={o.code}>
                  <Paper
                    sx={{
                      p: 3,
                      border: "2px dashed #dbeafe",
                      bgcolor: "#ffffff",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      borderRadius: "14px",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      "&:hover": { transform: "translateY(-3px)", boxShadow: "0 6px 20px -4px rgba(30,64,175,0.12)" }
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                        <Chip label={o.tag} size="small" sx={{ bgcolor: "#eff6ff", color: "#1e40af", fontWeight: 700, borderRadius: "6px" }} />
                        <Typography variant="caption" sx={{ color: "#6b7280" }}>Valid: {o.validTill}</Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}>{o.offer}</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: "#1e40af", mb: 1 }}>{o.discount}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
                      <Chip label={`CODE: ${o.code}`} sx={{ bgcolor: "#eff6ff", color: "#1e40af", fontWeight: 800, fontSize: "0.88rem", border: "1px solid #dbeafe" }} />
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => copyCode(o.code)}
                        sx={{ bgcolor: "#1e40af", fontWeight: 700, px: 2.5, "&:hover": { bgcolor: "#1e3a8a" } }}
                      >
                        {copiedCode === o.code ? "✓ Copied!" : "Copy Code"}
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </ScrollReveal>

        {/* Bank & Payment Partner Cashback */}
        <ScrollReveal>
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 3 }}>
              Bank & Payment Partner Offers
            </Typography>
            <Grid container spacing={3}>
              {BANK_OFFERS.map((b, idx) => (
                <Grid item xs={12} sm={6} md={3} key={idx}>
                  <Box sx={{ p: 3, height: "100%", bgcolor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "12px" }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e40af", mb: 1, fontSize: "1rem" }}>
                      💳 {b.bank}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#6b7280", lineHeight: 1.6 }}>
                      {b.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </ScrollReveal>

        {/* How to Redeem Steps */}
        <ScrollReveal>
          <Box sx={{ p: { xs: 3, md: 5 }, bgcolor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px" }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 3, textAlign: "center" }}>
              How to Redeem Your Offers
            </Typography>
            <Grid container spacing={3}>
              {STEPS.map((s) => (
                <Grid item xs={12} md={4} key={s.num}>
                  <Box sx={{ textAlign: "center", p: 2 }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: "50%", bgcolor: "#eff6ff", color: "#1e40af", fontWeight: 900, fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2 }}>
                      {s.num}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: "#111827" }}>
                      {s.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#6b7280" }}>
                      {s.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </ScrollReveal>

      </Container>
    </>
  );
}

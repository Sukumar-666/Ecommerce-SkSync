import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box, Container, Grid, Typography, Link,
  Divider, IconButton, Stack
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";

const FOOTER_LINKS = [
  {
    heading: "Shop",
    links: [
      { label: "All Products",   to: "/products" },
      { label: "Men's Skincare", to: "/categories" },
      { label: "Beard & Shave",  to: "/categories" },
      { label: "Fragrances",     to: "/categories" },
      { label: "Flash Deals",    to: "/deal-zone"  },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "AI Routine Builder", to: "/routine-builder" },
      { label: "Formula Lab",        to: "/grooming-lab"   },
      { label: "Lookbook",           to: "/lookbook"       },
      { label: "Brands",             to: "/brands"         },
      { label: "Offers",             to: "/offers"         },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "About Us",        to: "/about"            },
      { label: "Contact",         to: "/contact"          },
      { label: "FAQs",            to: "/contact"          },
      { label: "Shipping Policy", to: "/shipping-policy"  },
      { label: "Return Policy",   to: "/return-policy"    },
    ],
  },
];

const TRUST_BADGES = [
  { icon: <LocalShippingOutlinedIcon sx={{ fontSize: 18 }} />, label: "Free shipping ₹499+" },
  { icon: <RefreshOutlinedIcon sx={{ fontSize: 18 }} />,       label: "15-day returns"       },
  { icon: <LockOutlinedIcon sx={{ fontSize: 18 }} />,          label: "Secure checkout"      },
  { icon: <HeadsetMicOutlinedIcon sx={{ fontSize: 18 }} />,    label: "24/7 Support"         },
];

const SOCIAL_LINKS = [
  { icon: <InstagramIcon sx={{ fontSize: 16 }} />, href: "#", label: "Instagram" },
  { icon: <FacebookIcon sx={{ fontSize: 16 }} />,  href: "#", label: "Facebook"  },
  { icon: <TwitterIcon sx={{ fontSize: 16 }} />,   href: "#", label: "Twitter"   },
  { icon: <YouTubeIcon sx={{ fontSize: 16 }} />,   href: "#", label: "YouTube"   },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#0f172a",
        color: "#cbd5e1",
        mt: "auto",
      }}
    >
      {/* ─── Trust Badges Strip ───────────────────────────────── */}
      <Box sx={{ bgcolor: "#1e293b", borderBottom: "1px solid #334155" }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: { xs: 2, md: 5 },
              py: 1.25,
            }}
          >
            {TRUST_BADGES.map((b) => (
              <Box
                key={b.label}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  color: "#94a3b8",
                }}
              >
                <Box sx={{ color: "#3b82f6", display: "flex" }}>{b.icon}</Box>
                <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: "#cbd5e1" }}>
                  {b.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ─── Main Footer Grid ─────────────────────────────────── */}
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
        <Grid container spacing={3}>

          {/* Brand Column — LEFT aligned */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "6px",
                  background: "linear-gradient(135deg, #1e40af 0%, #2563eb 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ color: "#fff", fontWeight: 900, fontSize: "0.85rem", lineHeight: 1 }}>
                  S
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  color: "#ffffff",
                  letterSpacing: -0.3,
                }}
              >
                Sk<span style={{ color: "#60a5fa" }}>Sync</span>
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: "0.8rem", lineHeight: 1.5, mb: 1.5, textAlign: "left" }}>
              Engineered for the modern man. Science-backed cosmetics &amp; grooming.
            </Typography>

            <Stack direction="row" spacing={0.75}>
              {SOCIAL_LINKS.map((s) => (
                <IconButton
                  key={s.label}
                  component="a"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  size="small"
                  sx={{
                    color: "#64748b",
                    border: "1px solid #334155",
                    borderRadius: "6px",
                    p: 0.5,
                    "&:hover": {
                      color: "#3b82f6",
                      borderColor: "#3b82f6",
                      bgcolor: "rgba(59,130,246,0.08)",
                    },
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Nav Columns — LEFT aligned headings & links */}
          {FOOTER_LINKS.map((col) => (
            <Grid item xs={6} sm={4} md={3} key={col.heading}>
              <Typography
                variant="overline"
                sx={{ color: "#ffffff", fontWeight: 700, letterSpacing: 1, fontSize: "0.7rem", mb: 1, display: "block", textAlign: "left" }}
              >
                {col.heading}
              </Typography>
              <Stack spacing={0.65} alignItems="flex-start">
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    component={RouterLink}
                    to={link.to}
                    sx={{
                      color: "#94a3b8",
                      fontSize: "0.8rem",
                      textDecoration: "none",
                      display: "inline-block",
                      "&:hover": { color: "#3b82f6" },
                      transition: "color 0.2s ease",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ─── Bottom Bar — copyright LEFT, links RIGHT ─────────── */}
      <Divider sx={{ borderColor: "#334155" }} />
      <Container maxWidth="xl">
        <Box
          sx={{
            py: 1.5,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography sx={{ fontSize: "0.75rem", color: "#64748b", textAlign: "left" }}>
            © {new Date().getFullYear()} SkSync Enterprise. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            {[
              { label: "Privacy Policy",     to: "/privacy-policy"      },
              { label: "Terms of Use",       to: "/terms-and-conditions" },
              { label: "Cookie Policy",      to: "#"                    },
            ].map((t) => (
              <Link
                key={t.label}
                component={RouterLink}
                to={t.to}
                sx={{ fontSize: "0.75rem", color: "#64748b", textDecoration: "none", "&:hover": { color: "#cbd5e1" } }}
              >
                {t.label}
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

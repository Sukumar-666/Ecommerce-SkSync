import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container, Typography, Box, Grid, Paper, Chip,
  Link, Divider, Avatar
} from "@mui/material";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import RecyclingOutlinedIcon from "@mui/icons-material/Recycling";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import FullBleedImage from "../Components/FullBleedImage";
import ScrollReveal from "../Components/ScrollReveal";

const MILESTONES = [
  { year: "2019", title: "Brand Foundation", desc: "Launched SkSync with 20 engineered men's skincare formulations." },
  { year: "2021", title: "Lab Expansion",    desc: "Expanded to 200+ cosmetics, active serums, and luxury fragrances."   },
  { year: "2023", title: "Global Partners",  desc: "Partnered with leading dermatologists across Asia and Europe."         },
  { year: "2026", title: "1M+ Customers",    desc: "Serving over 1 million happy shoppers with a 4.8★ average rating."    },
];

const VALUES = [
  { icon: <ScienceOutlinedIcon sx={{ fontSize: 26 }} />,        title: "Dermatologically Engineered", desc: "Formulated specifically for male skin thickness and sebum levels." },
  { icon: <VerifiedOutlinedIcon sx={{ fontSize: 26 }} />,       title: "100% Cruelty-Free & Vegan",   desc: "Ethically sourced active ingredients without animal testing." },
  { icon: <EmojiObjectsOutlinedIcon sx={{ fontSize: 26 }} />,   title: "Clinically Proven Results",   desc: "Guaranteed visible results in 4 weeks or your money back." },
  { icon: <RecyclingOutlinedIcon sx={{ fontSize: 26 }} />,      title: "Sustainable Packaging",       desc: "Recyclable glass bottles and eco-friendly amber packaging." },
];

const TEAM = [
  { name: "Aryan Singh",    role: "Founder & CEO",           initial: "A" },
  { name: "Dr. Priya Nair", role: "Head of Dermatology",     initial: "P" },
  { name: "Rahul Mehta",    role: "Chief Formulation Officer", initial: "R" },
];

export default function About() {
  return (
    <>
      {/* Banner */}
      <FullBleedImage
        src="https://images.pexels.com/photos/3808904/pexels-photo-3808904.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="About SkSync Cosmetics & Grooming"
        height={300}
        chip="ABOUT US"
        title="The Science of Modern Grooming"
        subtitle="Redefining men's skincare through innovation, science & luxury."
      />

      <Container maxWidth="xl" sx={{ py: 7 }}>

        {/* Mission */}
        <ScrollReveal>
          <Box sx={{ textAlign: "center", maxWidth: 680, mx: "auto", mb: 8 }}>
            <Chip label="OUR MISSION" sx={{ bgcolor: "#eff6ff", color: "#1e40af", fontWeight: 700, mb: 2, letterSpacing: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827", mb: 2 }}>
              Engineered for the Modern Man
            </Typography>
            <Typography variant="body1" sx={{ color: "#6b7280", lineHeight: 1.85 }}>
              SkSync was founded to solve a fundamental problem in men's grooming: traditional products were either
              overly perfumed or lacked effective dermatological ingredients. We engineer high-performance cosmetics,
              activated charcoal cleansers, 10% niacinamide serums, and long-lasting fragrances designed specifically
              for modern men.
            </Typography>
          </Box>
        </ScrollReveal>

        <Divider sx={{ mb: 8 }} />

        {/* Core Values */}
        <ScrollReveal>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="overline" sx={{ color: "#1e40af", fontWeight: 700, letterSpacing: 1.5 }}>
              Values
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827" }}>
              Our Core Pillars
            </Typography>
          </Box>
        </ScrollReveal>

        <Grid container spacing={3} sx={{ mb: 9 }}>
          {VALUES.map((val, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <ScrollReveal style={{ transitionDelay: `${i * 80}ms` }}>
                <Paper
                  sx={{
                    p: 3.5,
                    height: "100%",
                    border: "1px solid #e5e7eb",
                    boxShadow: "none",
                    display: "flex",
                    gap: 2.5,
                    "&:hover": { borderColor: "#1e40af", boxShadow: "0 4px 20px -4px rgba(30,64,175,0.15)" },
                    transition: "all 0.25s ease",
                  }}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "12px",
                      bgcolor: "#eff6ff",
                      color: "#1e40af",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {val.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: "#111827" }}>
                      {val.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#6b7280", lineHeight: 1.7 }}>
                      {val.desc}
                    </Typography>
                  </Box>
                </Paper>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ mb: 8 }} />

        {/* Timeline */}
        <ScrollReveal>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="overline" sx={{ color: "#1e40af", fontWeight: 700, letterSpacing: 1.5 }}>
              Journey
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827" }}>
              Our Growth Story
            </Typography>
          </Box>
        </ScrollReveal>

        <Grid container spacing={2.5} sx={{ mb: 9 }}>
          {MILESTONES.map((m, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <ScrollReveal style={{ transitionDelay: `${i * 80}ms` }}>
                <Paper
                  sx={{
                    p: 3,
                    height: "100%",
                    border: "1px solid #e5e7eb",
                    boxShadow: "none",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 800,
                      fontSize: "2.2rem",
                      color: "#1e40af",
                      lineHeight: 1,
                      mb: 1.5,
                    }}
                  >
                    {m.year}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.75, color: "#111827" }}>
                    {m.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#6b7280", lineHeight: 1.7 }}>
                    {m.desc}
                  </Typography>
                </Paper>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ mb: 8 }} />

        {/* Team */}
        <ScrollReveal>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="overline" sx={{ color: "#1e40af", fontWeight: 700, letterSpacing: 1.5 }}>
              Team
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827" }}>
              The People Behind SkSync
            </Typography>
          </Box>
        </ScrollReveal>

        <Grid container spacing={3} justifyContent="center" sx={{ mb: 8 }}>
          {TEAM.map((member, i) => (
            <Grid item xs={12} sm={4} key={i}>
              <ScrollReveal style={{ transitionDelay: `${i * 80}ms` }}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: "center",
                    border: "1px solid #e5e7eb",
                    boxShadow: "none",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 72,
                      height: 72,
                      bgcolor: "#1e40af",
                      fontSize: "1.7rem",
                      fontWeight: 700,
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    {member.initial}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.25 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#6b7280" }}>
                    {member.role}
                  </Typography>
                </Paper>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        <ScrollReveal>
          <Box
            sx={{
              textAlign: "center",
              p: 5,
              background: "linear-gradient(135deg, #eff6ff 0%, #ecfdf5 100%)",
              borderRadius: "16px",
              border: "1px solid #dbeafe",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 1 }}>
              Have questions or want to partner with us?
            </Typography>
            <Typography variant="body2" sx={{ color: "#6b7280", mb: 2.5 }}>
              Our team is always ready to help.
            </Typography>
            <Link
              component={RouterLink}
              to="/contact"
              sx={{
                display: "inline-block",
                color: "#1e40af",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Get in touch with our team →
            </Link>
          </Box>
        </ScrollReveal>
      </Container>
    </>
  );
}

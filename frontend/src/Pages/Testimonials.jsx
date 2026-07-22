import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import FormStatusAlert from "../Components/FormStatusAlert";
import FullBleedImage from "../Components/FullBleedImage";
import ScrollReveal from "../Components/ScrollReveal";
import useForm from "../utils/useForm";
import { validateRequired } from "../utils/validators";

const REVIEWS = [
  {
    photo: "https://images.pexels.com/photos/3808904/pexels-photo-3808904.jpeg?auto=compress&cs=tinysrgb&w=300",
    name: "Vikram Malhotra",
    title: "Corporate Executive",
    rating: "★★★★★ 5/5",
    review: '"The 10% Niacinamide Serum transformed my skin in 7 days. Zero oily shine before meetings and my pores look completely refined!"'
  },
  {
    photo: "https://images.pexels.com/photos/8467293/pexels-photo-8467293.jpeg?auto=compress&cs=tinysrgb&w=300",
    name: "Rohan Kapoor",
    title: "Fitness & Lifestyle Trainer",
    rating: "★★★★★ 5/5",
    review: '"Activated Charcoal Face Wash is a lifesaver post-workout. Cleanses gym sweat thoroughly without drying out my face. 10/10 recommend."'
  },
  {
    photo: "https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=300",
    name: "Dr. Sameer Nair",
    title: "Dermatologist & Skin Specialist",
    rating: "★★★★★ 5/5",
    review: '"Engineered with active ingredients that truly respect male facial skin density. Excellent non-comedogenic formulations."'
  }
];

export default function Testimonials() {
  const { values, errors, status, setStatus, handleChange, validateAll, reset } = useForm(
    { name: "", rating: "5", review: "" },
    { name: validateRequired, review: validateRequired }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    setStatus({ type: "success", message: "Thank you! Your verified review has been submitted." });
    reset();
  };

  return (
    <>
      <FullBleedImage
        src="https://images.pexels.com/photos/3808904/pexels-photo-3808904.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="Men's Testimonials & Reviews"
        height={300}
        title="What Men Say About SkSync"
        subtitle="Verified customer reviews from over 50,000 satisfied shoppers and skin specialists."
      />

      {/* Auto-scrolling marquee */}
      <Box sx={{ bgcolor: "#0f172a", color: "#fff", py: 2.5, overflow: "hidden", mb: 6 }}>
        <Box className="marquee-track" sx={{ gap: 6, alignItems: "center" }}>
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2, px: 2, whiteSpace: "nowrap" }}>
              <Avatar src={r.photo} alt={r.name} sx={{ width: 48, height: 48, border: "2px solid #3b82f6" }} />
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 15 }}>{r.name}</Typography>
                <Typography sx={{ fontSize: 13, color: "warning.main", fontWeight: 700 }}>{r.rating}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ pb: 6 }}>
        {/* Testimonials Cards Grid */}
        <ScrollReveal>
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {REVIEWS.map((r, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card elevation={3} sx={{ height: "100%", borderRadius: 4, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <Avatar src={r.photo} alt={r.name} sx={{ width: 56, height: 56, border: "2px solid #1e40af" }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>
                          {r.name}
                        </Typography>
                        <Chip label={r.title} size="small" color="primary" sx={{ fontSize: "0.7rem", fontWeight: 700 }} />
                      </Box>
                    </Box>

                    <Typography variant="subtitle2" sx={{ color: "warning.dark", fontWeight: 800, mb: 1 }}>
                      {r.rating} Verified Buyer
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic", lineHeight: 1.6 }}>
                      {r.review}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </ScrollReveal>

        {/* Submit Review Form */}
        <ScrollReveal variant="scale">
          <Paper elevation={3} sx={{ p: 4, maxWidth: 560, mx: "auto", borderRadius: 4, bgcolor: "background.paper" }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "primary.main", mb: 1 }}>
              Share Your SkSync Experience
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
              Your feedback helps us continue engineering top-tier men's grooming & cosmetic products.
            </Typography>

            <FormStatusAlert status={status} />

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                margin="normal"
                label="Your Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                select
                fullWidth
                margin="normal"
                label="Rating"
                name="rating"
                value={values.rating}
                onChange={handleChange}
              >
                {["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"].map((r) => (
                  <MenuItem key={r} value={r.charAt(0)}>
                    {r}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                margin="normal"
                label="Your Review"
                name="review"
                multiline
                rows={4}
                value={values.review}
                onChange={handleChange}
                error={!!errors.review}
                helperText={errors.review}
              />
              <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 3, py: 1.2, fontWeight: 700 }}>
                Submit Verified Review
              </Button>
            </Box>
          </Paper>
        </ScrollReveal>
      </Container>
    </>
  );
}

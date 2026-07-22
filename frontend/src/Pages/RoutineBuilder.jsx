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
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import PageHeading from "../Components/PageHeading";
import ScrollReveal from "../Components/ScrollReveal";

const STEPS = ["Skin & Beard Type", "Primary Goal", "Daily Routine", "Your Customized Plan"];

const SKIN_TYPES = [
  { id: "oily", title: "Oily / Heavy Shine", desc: "Excess sebum production, enlarged pores, prone to shine" },
  { id: "dry", title: "Dry / Flaky", desc: "Tight skin feeling, roughness, needs intensive deep hydration" },
  { id: "combo", title: "Combination", desc: "Oily T-zone (forehead/nose) with dry cheeks" },
  { id: "sensitive", title: "Sensitive / Razor Burn", desc: "Easily irritated, razor bumps, redness post-shave" }
];

const GOALS = [
  { id: "oil_acne", title: "Oil & Acne Defense", icon: "🛡️", desc: "Clear breakout, tighten pores, matte finish all day" },
  { id: "beard_care", title: "Beard & Shave Mastery", icon: "🧔", desc: "Soft beard hair, zero itch, soothing post-shave balm" },
  { id: "anti_aging", title: "Anti-Fatigue & Glow", icon: "⚡", desc: "Reduce dark circles, firm skin line, tired eye repair" },
  { id: "hydration", title: "Deep Hydration & Barrier", icon: "💧", desc: "24-hour hydration without greasy feel" }
];

const HABITS = [
  { id: "quick", title: "Quick & Easy (2 mins)", desc: "Simple 2-step cleanser & moisturizer" },
  { id: "pro", title: "Pro Groomer (5 mins)", desc: "Complete 4-step routine: Wash, Serum, Hydrate & Beard Oil" },
  { id: "athlete", title: "Active / Gym Goer", desc: "Sweat-proof, anti-bacterial cleansing & cooling mist" }
];

const BUNDLE_SOLUTIONS = {
  oil_acne: {
    name: "SkSync Men Matte & Clear Defense Trio",
    originalPrice: 1597,
    bundlePrice: 1199,
    savings: "25% OFF",
    items: [
      { name: "Activated Charcoal Face Wash for Men", price: 349, img: "https://images.pexels.com/photos/4210347/pexels-photo-4210347.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { name: "10% Niacinamide Pore Refining Serum", price: 899, img: "https://images.pexels.com/photos/17545640/pexels-photo-17545640.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { name: "Oil-Control Hydro Gel Moisturizer", price: 349, img: "https://images.pexels.com/photos/8467293/pexels-photo-8467293.jpeg?auto=compress&cs=tinysrgb&w=400" }
    ],
    morningSteps: ["1. Wash face with Activated Charcoal Cleanser", "2. Apply 3 drops of Niacinamide Serum", "3. Lock in moisture with Hydro Gel"],
    nightSteps: ["1. Deep cleanse impurities", "2. Apply Serum to targeted spots", "3. Rest and restore skin barrier overnight"]
  },
  beard_care: {
    name: "SkSync Men Beard & Precision Shave Kit",
    originalPrice: 1477,
    bundlePrice: 1099,
    savings: "26% OFF",
    items: [
      { name: "Cooling Aftershave Balm", price: 279, img: "https://images.pexels.com/photos/8467293/pexels-photo-8467293.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { name: "Matte Beard & Hair Wax", price: 299, img: "https://images.pexels.com/photos/3809795/pexels-photo-3809795.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { name: "Argan & Cedarwood Beard Growth Oil", price: 899, img: "https://images.pexels.com/photos/3808904/pexels-photo-3808904.jpeg?auto=compress&cs=tinysrgb&w=400" }
    ],
    morningSteps: ["1. Shave or trim beard edges", "2. Massage Cooling Aftershave Balm", "3. Apply 4 drops of Beard Growth Oil & style with Matte Wax"],
    nightSteps: ["1. Cleanse beard with warm water", "2. Nourish skin beneath beard with Argan Oil"]
  },
  default: {
    name: "SkSync Men Complete Executive Grooming Box",
    originalPrice: 1727,
    bundlePrice: 1299,
    savings: "25% OFF",
    items: [
      { name: "Charcoal Face Wash for Men", price: 349, img: "https://images.pexels.com/photos/4210347/pexels-photo-4210347.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { name: "Hydrating Face Serum", price: 899, img: "https://images.pexels.com/photos/17545640/pexels-photo-17545640.jpeg?auto=compress&cs=tinysrgb&w=400" },
      { name: "Wood & Musk Eau De Cologne", price: 479, img: "https://images.pexels.com/photos/1961792/pexels-photo-1961792.jpeg?auto=compress&cs=tinysrgb&w=400" }
    ],
    morningSteps: ["1. Deep cleanse with Charcoal Face Wash", "2. Hydrate skin with 4 drops Serum", "3. Spritz Wood & Musk Cologne"],
    nightSteps: ["1. Wash away urban pollution", "2. Replenish hydration before sleep"]
  }
};

export default function RoutineBuilder() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [skinType, setSkinType] = useState("oily");
  const [goal, setGoal] = useState("oil_acne");
  const [habit, setHabit] = useState("pro");
  const [added, setAdded] = useState(false);

  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const solution = BUNDLE_SOLUTIONS[goal] || BUNDLE_SOLUTIONS.default;

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => {
      navigate("/cart");
    }, 1200);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <PageHeading
        title="AI Men's Grooming & Skincare Routine Builder"
        subtitle="Answer 3 quick questions to discover your engineered grooming regimen and custom product bundle."
      />

      {/* Stepper Header */}
      <Paper elevation={2} sx={{ p: 3, mb: 5, borderRadius: 4, bgcolor: "background.paper" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Step 1: Skin Type */}
      {activeStep === 0 && (
        <ScrollReveal>
          <Box sx={{ maxWidth: 800, mx: "auto" }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "primary.main" }}>
              Step 1: Select Your Primary Skin & Beard Profile
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
              Understanding your skin condition helps select active ingredients engineered specifically for men's thicker skin layer.
            </Typography>

            <Grid container spacing={2}>
              {SKIN_TYPES.map((st) => {
                const selected = skinType === st.id;
                return (
                  <Grid item xs={12} sm={6} key={st.id}>
                    <Card
                      onClick={() => setSkinType(st.id)}
                      elevation={selected ? 6 : 1}
                      sx={{
                        cursor: "pointer",
                        border: selected ? "2px solid #1e40af" : "1px solid #e2e8f0",
                        bgcolor: selected ? "rgba(30, 64, 175, 0.04)" : "background.paper",
                        p: 1.5,
                        transition: "all 0.2s ease"
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {st.title}
                          </Typography>
                          {selected && <Chip label="Selected" color="primary" size="small" />}
                        </Box>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {st.desc}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
              <Button variant="contained" size="large" onClick={handleNext} sx={{ px: 4, py: 1.2 }}>
                Continue to Step 2 &rarr;
              </Button>
            </Box>
          </Box>
        </ScrollReveal>
      )}

      {/* Step 2: Primary Goal */}
      {activeStep === 1 && (
        <ScrollReveal>
          <Box sx={{ maxWidth: 800, mx: "auto" }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "primary.main" }}>
              Step 2: What is your #1 Grooming Goal?
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
              Select the main result you want to achieve in the next 14 days.
            </Typography>

            <Grid container spacing={2}>
              {GOALS.map((g) => {
                const selected = goal === g.id;
                return (
                  <Grid item xs={12} sm={6} key={g.id}>
                    <Card
                      onClick={() => setGoal(g.id)}
                      elevation={selected ? 6 : 1}
                      sx={{
                        cursor: "pointer",
                        border: selected ? "2px solid #1e40af" : "1px solid #e2e8f0",
                        bgcolor: selected ? "rgba(30, 64, 175, 0.04)" : "background.paper",
                        p: 1.5,
                        transition: "all 0.2s ease"
                      }}
                    >
                      <CardContent>
                        <Typography variant="h2" sx={{ mb: 1 }}>
                          {g.icon}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                          {g.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {g.desc}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <Button variant="outlined" onClick={handleBack}>
                &larr; Back
              </Button>
              <Button variant="contained" size="large" onClick={handleNext} sx={{ px: 4, py: 1.2 }}>
                Continue to Step 3 &rarr;
              </Button>
            </Box>
          </Box>
        </ScrollReveal>
      )}

      {/* Step 3: Routine Habit */}
      {activeStep === 2 && (
        <ScrollReveal>
          <Box sx={{ maxWidth: 800, mx: "auto" }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "primary.main" }}>
              Step 3: How much time do you want to spend daily?
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
              We design routines that fit seamlessly into your morning and post-workout schedules.
            </Typography>

            <Grid container spacing={2}>
              {HABITS.map((h) => {
                const selected = habit === h.id;
                return (
                  <Grid item xs={12} key={h.id}>
                    <Card
                      onClick={() => setHabit(h.id)}
                      elevation={selected ? 6 : 1}
                      sx={{
                        cursor: "pointer",
                        border: selected ? "2px solid #1e40af" : "1px solid #e2e8f0",
                        bgcolor: selected ? "rgba(30, 64, 175, 0.04)" : "background.paper",
                        p: 2,
                        transition: "all 0.2s ease"
                      }}
                    >
                      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {h.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {h.desc}
                          </Typography>
                        </Box>
                        {selected && <Chip label="Selected" color="primary" />}
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <Button variant="outlined" onClick={handleBack}>
                &larr; Back
              </Button>
              <Button variant="contained" size="large" onClick={handleNext} sx={{ px: 4, py: 1.2 }}>
                Generate My Custom Regimen &rarr;
              </Button>
            </Box>
          </Box>
        </ScrollReveal>
      )}

      {/* Step 4: Final Custom Regimen */}
      {activeStep === 3 && (
        <ScrollReveal>
          <Box sx={{ maxWidth: 960, mx: "auto" }}>
            {/* Header Banner */}
            <Paper
              elevation={4}
              sx={{
                p: 4,
                mb: 4,
                borderRadius: 4,
                background: "linear-gradient(135deg, #0f172a 0%, #1e40af 100%)",
                color: "#ffffff"
              }}
            >
              <Chip label="Engineered Result Ready" color="secondary" sx={{ mb: 2, fontWeight: 700 }} />
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                {solution.name}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Tailored for <b>{skinType.toUpperCase()}</b> skin with a focus on <b>{goal.replace("_", " ").toUpperCase()}</b>.
              </Typography>
            </Paper>

            <Grid container spacing={4}>
              {/* Product Bundle Cards */}
              <Grid item xs={12} md={7}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}>
                  Recommended 3-Piece Product Bundle
                </Typography>
                <Grid container spacing={2}>
                  {solution.items.map((it) => (
                    <Grid item xs={12} sm={4} key={it.name}>
                      <Card elevation={2} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                        <Box
                          component="img"
                          src={it.img}
                          alt={it.name}
                          sx={{ width: "100%", height: 130, objectFit: "cover" }}
                        />
                        <CardContent sx={{ p: 1.5, flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 1 }}>
                            {it.name}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: "primary.main" }}>
                            ₹{it.price}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {/* Daily Routine Guide */}
                <Paper elevation={1} sx={{ p: 3, mt: 3, borderRadius: 3, bgcolor: "background.paper" }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}>
                    ☀️ Morning Routine (AM)
                  </Typography>
                  {solution.morningSteps.map((step) => (
                    <Typography key={step} variant="body2" sx={{ mb: 1, color: "text.primary" }}>
                      {step}
                    </Typography>
                  ))}

                  <Typography variant="h6" sx={{ fontWeight: 700, mt: 3, mb: 2, color: "primary.main" }}>
                    🌙 Night Routine (PM)
                  </Typography>
                  {solution.nightSteps.map((step) => (
                    <Typography key={step} variant="body2" sx={{ mb: 1, color: "text.primary" }}>
                      {step}
                    </Typography>
                  ))}
                </Paper>
              </Grid>

              {/* Pricing & Checkout Summary Box */}
              <Grid item xs={12} md={5}>
                <Paper elevation={4} sx={{ p: 3, borderRadius: 4, bgcolor: "background.paper", border: "2px solid #1e40af" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Custom Bundle Price
                    </Typography>
                    <Chip label={solution.savings} color="error" sx={{ fontWeight: 800 }} />
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, mb: 2 }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
                      ₹{solution.bundlePrice}
                    </Typography>
                    <Typography variant="h6" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                      ₹{solution.originalPrice}
                    </Typography>
                  </Box>

                  <Typography variant="caption" sx={{ color: "success.main", fontWeight: 700, display: "block", mb: 3 }}>
                    ✓ You Save ₹{solution.originalPrice - solution.bundlePrice} + Free Express Delivery Included
                  </Typography>

                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleAddToCart}
                    color={added ? "success" : "primary"}
                    sx={{ py: 1.5, fontSize: "1.05rem", fontWeight: 700, mb: 2 }}
                  >
                    {added ? "✓ Bundle Added to Cart!" : "Add Complete Bundle to Cart"}
                  </Button>

                  <Button variant="outlined" fullWidth onClick={() => setActiveStep(0)}>
                    Recalculate Quiz
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </ScrollReveal>
      )}
    </Container>
  );
}

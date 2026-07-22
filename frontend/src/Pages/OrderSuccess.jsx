import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScrollReveal from "../Components/ScrollReveal";

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order || {
    _id: "ORD" + Math.floor(100000 + Math.random() * 900000),
    createdAt: new Date().toISOString(),
    total: 1347,
    paymentMethod: "CARD",
    status: "PROCESSING"
  };

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <ScrollReveal variant="scale">
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 5,
            maxWidth: 720,
            mx: "auto",
            bgcolor: "background.paper",
            textAlign: "center",
            borderTop: "6px solid #16a34a"
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 72, color: "success.main", mb: 2 }} />
          <Chip label="ORDER CONFIRMED" color="success" sx={{ fontWeight: 800, mb: 2 }} />

          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: "text.primary" }}>
            Thank You For Your Order!
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 540, mx: "auto", mb: 4 }}>
            Your order for engineered men's cosmetics has been placed successfully. A confirmation email and SMS tracking link have been dispatched.
          </Typography>

          <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 3, bgcolor: "#f8fafc", textAlign: "left" }}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Order ID</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>#{String(order._id).slice(-8).toUpperCase()}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Order Date</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{new Date(order.createdAt).toLocaleDateString()}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Amount Paid</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "primary.main" }}>₹{order.total}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" color="text.secondary">Estimated Delivery</Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "success.main" }}>Tomorrow by 5 PM</Typography>
              </Grid>
            </Grid>
          </Paper>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button component={RouterLink} to="/profile" variant="contained" size="large" sx={{ fontWeight: 700, px: 4 }}>
              Track Order Status
            </Button>
            <Button component={RouterLink} to="/products" variant="outlined" size="large" sx={{ fontWeight: 700, px: 4 }}>
              Continue Shopping
            </Button>
          </Box>
        </Paper>
      </ScrollReveal>
    </Container>
  );
}

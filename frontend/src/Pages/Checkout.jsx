import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import PageHeading from "../Components/PageHeading";
import ScrollReveal from "../Components/ScrollReveal";
import useForm from "../utils/useForm";
import { validateRequired, validatePincode } from "../utils/validators";

const CHECKOUT_ITEMS = [
  { name: "Activated Charcoal Deep Cleansing Face Wash", qty: 1, price: 349 },
  { name: "10% Niacinamide & Caffeine Serum", qty: 1, price: 899 },
  { name: "Matte Beard Wax", qty: 1, price: 299 }
];

export default function Checkout() {
  const navigate = useNavigate();
  const { values, errors, handleChange, validateAll } = useForm(
    { name: "Rahul Verma", address: "402 Corporate Heights, MG Road", city: "Mumbai", state: "Maharashtra", pincode: "400001", phone: "9876543210" },
    {
      name: validateRequired,
      address: validateRequired,
      city: validateRequired,
      pincode: (v) => validateRequired(v) || validatePincode(v),
      phone: validateRequired
    }
  );

  const subtotal = CHECKOUT_ITEMS.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = Math.round(subtotal * 0.15); // MENKING15
  const total = subtotal - discount;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    navigate("/payment", { state: { shippingAddress: values, total } });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <PageHeading
        title="Express Checkout"
        subtitle="Provide your shipping details for express 24-hour delivery."
      />

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={4}>
          {/* Shipping Details */}
          <Grid item xs={12} md={7}>
            <ScrollReveal>
              <Paper elevation={4} sx={{ p: 4, borderRadius: 4, bgcolor: "background.paper" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "primary.main" }}>
                    🚚 Shipping & Delivery Address
                  </Typography>
                  <Chip label="Express Delivery" color="success" size="small" sx={{ fontWeight: 700 }} />
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Full Name" name="name" required value={values.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Phone Number" name="phone" required value={values.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Address Line" name="address" multiline rows={2} required value={values.address} onChange={handleChange} error={!!errors.address} helperText={errors.address} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="City" name="city" required value={values.city} onChange={handleChange} error={!!errors.city} helperText={errors.city} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField select fullWidth label="State" name="state" value={values.state} onChange={handleChange}>
                      {["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Other"].map((s) => (
                        <MenuItem key={s} value={s}>{s}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField fullWidth label="Pincode" name="pincode" required value={values.pincode} onChange={handleChange} error={!!errors.pincode} helperText={errors.pincode} />
                  </Grid>
                </Grid>
              </Paper>
            </ScrollReveal>
          </Grid>

          {/* Order Items & Summary */}
          <Grid item xs={12} md={5}>
            <ScrollReveal variant="scale">
              <Paper elevation={4} sx={{ p: 4, borderRadius: 4, bgcolor: "background.paper", border: "2px solid #1e40af" }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Order Review ({CHECKOUT_ITEMS.length} Items)
                </Typography>

                <Box sx={{ mb: 3 }}>
                  {CHECKOUT_ITEMS.map((it) => (
                    <Box key={it.name} sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: "1px solid #f1f5f9" }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{it.name}</Typography>
                        <Typography variant="caption" color="text.secondary">Qty: {it.qty}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>₹{it.price * it.qty}</Typography>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>₹{subtotal}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, color: "success.main" }}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>Coupon Savings (MENKING15)</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>- ₹{discount}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">Delivery</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: "success.main" }}>FREE</Typography>
                </Box>

                <Box sx={{ borderTop: "2px solid #1e40af", pt: 2, mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>Amount Payable</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: "primary.main" }}>₹{total}</Typography>
                </Box>

                <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 1.4, fontSize: "1.05rem", fontWeight: 800, mb: 2 }}>
                  Proceed to Secure Payment &rarr;
                </Button>

                <Box sx={{ textAlign: "center" }}>
                  <Link component={RouterLink} to="/cart" color="primary.main" fontWeight={700} underline="hover">
                    &larr; Return to Shopping Cart
                  </Link>
                </Box>
              </Paper>
            </ScrollReveal>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

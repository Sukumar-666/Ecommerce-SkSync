import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PageHeading from "../Components/PageHeading";
import ScrollReveal from "../Components/ScrollReveal";

const INITIAL_MEN_CART = [
  { id: 1, name: "Activated Charcoal Deep Cleansing Face Wash", price: 349, qty: 1, img: "https://images.pexels.com/photos/4210347/pexels-photo-4210347.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 2, name: "10% Niacinamide & Caffeine Serum", price: 899, qty: 1, img: "https://images.pexels.com/photos/17545640/pexels-photo-17545640.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 3, name: "Matte Beard Wax", price: 299, qty: 1, img: "https://images.pexels.com/photos/3809795/pexels-photo-3809795.jpeg?auto=compress&cs=tinysrgb&w=400" }
];

export default function Cart() {
  const [items, setItems] = useState(INITIAL_MEN_CART);
  const [coupon, setCoupon] = useState("MENKING15");
  const [discountApplied, setDiscountApplied] = useState(true);

  const updateQty = (id, qty) => {
    const value = Math.max(1, Number(qty) || 1);
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty: value } : it)));
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const discount = discountApplied && subtotal > 0 ? Math.round(subtotal * 0.15) : 0;
  const shipping = subtotal >= 499 || items.length === 0 ? 0 : 50;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === "MENKING15" || coupon.trim().toUpperCase() === "SKSYNCFIRST") {
      setDiscountApplied(true);
    } else {
      alert("Invalid code! Try MENKING15 for 15% OFF");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <PageHeading
        title="Your Shopping Cart"
        subtitle="Review your selected engineered cosmetics & grooming items before proceeding to checkout."
      />

      <Grid container spacing={4}>
        {/* Cart Item Cards */}
        <Grid item xs={12} md={8}>
          {items.length === 0 ? (
            <Paper elevation={2} sx={{ p: 5, textAlign: "center", borderRadius: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Your cart is empty
              </Typography>
              <Button component={RouterLink} to="/products" variant="contained">
                Browse Men's Catalog
              </Button>
            </Paper>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {items.map((it) => (
                <ScrollReveal key={it.id}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2.5,
                      borderRadius: 4,
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                      bgcolor: "background.paper"
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        component="img"
                        src={it.img}
                        alt={it.name}
                        sx={{ width: 80, height: 80, objectFit: "cover", borderRadius: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                          {it.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "primary.main", fontWeight: 700 }}>
                          ₹{it.price}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <TextField
                        size="small"
                        type="number"
                        value={it.qty}
                        onChange={(e) => updateQty(it.id, e.target.value)}
                        sx={{ width: 70 }}
                        inputProps={{ style: { textAlign: "center", fontWeight: 700 } }}
                      />
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, minWidth: 70, textAlign: "right" }}>
                        ₹{it.price * it.qty}
                      </Typography>
                      <IconButton onClick={() => removeItem(it.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                </ScrollReveal>
              ))}
            </Box>
          )}

          <Box sx={{ mt: 3 }}>
            <Link component={RouterLink} to="/products" color="primary.main" fontWeight={700} underline="hover">
              &larr; Continue Shopping
            </Link>
          </Box>
        </Grid>

        {/* Order Summary & Coupon Box */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 4, bgcolor: "background.paper", border: "2px solid #1e40af" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              Order Summary
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
              <Typography variant="body2" color="text.secondary">Subtotal</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>₹{subtotal}</Typography>
            </Box>

            {discountApplied && discount > 0 && (
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5, color: "success.main" }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>Coupon Discount (MENKING15)</Typography>
                <Typography variant="body2" sx={{ fontWeight: 800 }}>- ₹{discount}</Typography>
              </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Shipping Fee</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: shipping === 0 ? "success.main" : "text.primary" }}>
                {shipping === 0 ? "FREE" : `₹${shipping}`}
              </Typography>
            </Box>

            <Box sx={{ borderTop: "1px solid #e2e8f0", pt: 2, mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Total Amount</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "primary.main" }}>₹{total}</Typography>
            </Box>

            {/* Coupon Code Input */}
            <Box component="form" onSubmit={handleApplyCoupon} sx={{ display: "flex", gap: 1, mb: 3 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <Button type="submit" variant="outlined" sx={{ fontWeight: 700 }}>
                Apply
              </Button>
            </Box>

            <Button
              component={RouterLink}
              to="/checkout"
              variant="contained"
              size="large"
              fullWidth
              disabled={items.length === 0}
              sx={{ py: 1.4, fontSize: "1.05rem", fontWeight: 800 }}
            >
              Proceed to Checkout &rarr;
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

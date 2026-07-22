import React, { useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import PageHeading from "../Components/PageHeading";
import ProductTable from "../Components/ProductTable";
import FormStatusAlert from "../Components/FormStatusAlert";
import useForm from "../utils/useForm";
import { validateRequired, validateCardNumber, validateExpiry, validateCvv } from "../utils/validators";
import { DEMO_CART_ITEMS, getCartTotals } from "../utils/demoCart";
import api from "../utils/api";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const shippingAddress = location.state?.shippingAddress || null;
  const { subtotal, shipping, total } = getCartTotals();

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const { values, errors, handleChange, validateAll } = useForm(
    { paymethod: "card", cardnumber: "", cardname: "", expiry: "", cvv: "", savecard: false },
    {
      cardnumber: (v, all) => (all.paymethod === "card" ? validateRequired(v) || validateCardNumber(v) : ""),
      cardname: (v, all) => (all.paymethod === "card" ? validateRequired(v) : ""),
      expiry: (v, all) => (all.paymethod === "card" ? validateRequired(v) || validateExpiry(v) : ""),
      cvv: (v, all) => (all.paymethod === "card" ? validateRequired(v) || validateCvv(v) : "")
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    setServerError(null);
    setSubmitting(true);
    try {
      let order = null;
      try {
        const res = await api.placeOrder({
          items: DEMO_CART_ITEMS,
          shippingAddress,
          paymentMethod: values.paymethod,
          subtotal,
          shipping,
          total
        });
        order = res.order;
      } catch (err) {
        // Fallback for standalone demo mode
        order = {
          _id: "ORD" + Math.floor(100000 + Math.random() * 900000),
          createdAt: new Date().toISOString(),
          total: total || 1347,
          paymentMethod: values.paymethod.toUpperCase(),
          items: DEMO_CART_ITEMS
        };
      }
      navigate("/order-success", { state: { order } });
    } catch (error) {
      setServerError({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <PageHeading title="Payment" subtitle="Choose your preferred payment method to complete the order." />

      <Paper variant="outlined" sx={{ p: 4, maxWidth: 640, mb: 4 }}>
        <FormStatusAlert status={serverError} />
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField select fullWidth margin="normal" label="Payment Method" name="paymethod" value={values.paymethod} onChange={handleChange}>
            <MenuItem value="card">Credit / Debit Card</MenuItem>
            <MenuItem value="upi">UPI</MenuItem>
            <MenuItem value="netbanking">Net Banking</MenuItem>
            <MenuItem value="cod">Cash on Delivery</MenuItem>
          </TextField>

          {values.paymethod === "card" && (
            <>
              <TextField fullWidth margin="normal" label="Card Number" name="cardnumber" required value={values.cardnumber} onChange={handleChange} error={!!errors.cardnumber} helperText={errors.cardnumber} />
              <TextField fullWidth margin="normal" label="Name on Card" name="cardname" required value={values.cardname} onChange={handleChange} error={!!errors.cardname} helperText={errors.cardname} />
              <TextField fullWidth margin="normal" label="Expiry Date (MM/YY)" name="expiry" required value={values.expiry} onChange={handleChange} error={!!errors.expiry} helperText={errors.expiry} />
              <TextField margin="normal" label="CVV" name="cvv" type="password" required sx={{ width: 120 }} value={values.cvv} onChange={handleChange} error={!!errors.cvv} helperText={errors.cvv} />
              <FormControlLabel
                control={<Checkbox name="savecard" checked={values.savecard} onChange={handleChange} />}
                label="Save this card for future payments"
                sx={{ display: "block" }}
              />
            </>
          )}

          <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }} disabled={submitting}>
            {submitting ? "Placing Order..." : "Pay Now"}
          </Button>
        </Box>
      </Paper>

      <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main", mt: 5, mb: 2 }}>
        Order Total
      </Typography>
      <ProductTable
        columns={[
          { key: "label", label: "" },
          { key: "value", label: "" }
        ]}
        rows={[
          { label: "Subtotal", value: `Rs. ${subtotal}` },
          { label: "Shipping", value: `Rs. ${shipping}` },
          { label: <b>Total</b>, value: <b style={{ color: "#1e40af" }}>{`Rs. ${total}`}</b> }
        ]}
      />

      <Typography sx={{ mb: 1 }}>Your payment is 100% secure and encrypted.</Typography>
      <Typography>
        <Link component={RouterLink} to="/checkout" color="primary.main" underline="hover">
          Back to Checkout
        </Link>
      </Typography>
    </Container>
  );
}

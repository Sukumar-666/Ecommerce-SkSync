import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PageHeading from "../Components/PageHeading";
import ProductTable from "../Components/ProductTable";
import FormStatusAlert from "../Components/FormStatusAlert";

export default function ProductDetails() {
  const [qty, setQty] = useState(1);
  const [status, setStatus] = useState(null);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setStatus({ type: "success", message: `Added ${qty} item(s) to your cart.` });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <PageHeading title="Product Details" />

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={5} md={6}>
          <Box
            component="img"
            src="https://images.pexels.com/photos/30926227/pexels-photo-30926227.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Matte Lipstick - Ruby Red"
            sx={{ width: "100%", borderRadius: 2, boxShadow: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            Matte- Ruby Red
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 0.5 }}>
            Brand: GlowUp
          </Typography>
          <Typography variant="h6" color="primary.main" sx={{ mb: 0.5 }}>
            Rs. 499
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Rating: 4.5/5 (320 reviews)
          </Typography>
          <Typography sx={{ mb: 2 }}>
            A long-lasting, smudge-proof matte lipstick enriched with Vitamin E for soft, hydrated lips all day long.
          </Typography>

          <FormStatusAlert status={status} />
          <Box component="form" onSubmit={handleAddToCart} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              label="Quantity"
              type="number"
              size="small"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              sx={{ width: 100 }}
              inputProps={{ min: 1 }}
            />
            <Button type="submit" variant="contained">
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main", mt: 5, mb: 2 }}>
        Specifications
      </Typography>
      <ProductTable
        columns={[
          { key: "attribute", label: "Attribute" },
          { key: "detail", label: "Detail" }
        ]}
        rows={[
          { attribute: "Weight", detail: "3.5g" },
          { attribute: "Shade", detail: "Ruby Red" },
          { attribute: "Finish", detail: "Matte" },
          { attribute: "Shelf Life", detail: "36 Months" }
        ]}
      />

      <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main", mt: 5, mb: 2 }}>
        Customer Reviews
      </Typography>
      <List sx={{ listStyleType: "disc", pl: 3, mb: 3 }}>
        <ListItem sx={{ display: "list-item", p: 0 }}>"Amazing color payoff and stays on all day!" - Priya</ListItem>
        <ListItem sx={{ display: "list-item", p: 0 }}>"Very smooth application, does not dry out lips." - Anjali</ListItem>
        <ListItem sx={{ display: "list-item", p: 0 }}>"Good product for the price." - Meera</ListItem>
      </List>

      <Typography>
        <Link component={RouterLink} to="/products" color="primary.main" underline="hover">
          Back to Products
        </Link>{" "}
        |{" "}
        <Link component={RouterLink} to="/cart" color="primary.main" underline="hover">
          Go to Cart
        </Link>
      </Typography>
    </Container>
  );
}

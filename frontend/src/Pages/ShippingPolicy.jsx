import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PageHeading from "../Components/PageHeading";
import ProductTable from "../Components/ProductTable";

const timelines = [
  { location: "Metro Cities", delivery: "2-3 Business Days" },
  { location: "Other Cities", delivery: "4-5 Business Days" },
  { location: "Remote Areas", delivery: "6-8 Business Days" }
];

export default function ShippingPolicy() {
  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <PageHeading title="Shipping Policy" subtitle="We aim to deliver your orders as quickly and safely as possible." />

      <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main", mt: 5, mb: 2 }}>
        Delivery Timelines
      </Typography>
      <ProductTable
        columns={[
          { key: "location", label: "Location" },
          { key: "delivery", label: "Estimated Delivery" }
        ]}
        rows={timelines}
      />

      <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main", mt: 5, mb: 2 }}>
        Shipping Charges
      </Typography>
      <List sx={{ listStyleType: "disc", pl: 3, mb: 3 }}>
        <ListItem sx={{ display: "list-item", p: 0 }}>Free shipping on orders above Rs. 999</ListItem>
        <ListItem sx={{ display: "list-item", p: 0 }}>Rs. 50 flat shipping fee for orders below Rs. 999</ListItem>
      </List>

      <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main", mt: 5, mb: 2 }}>
        Order Tracking
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Once your order is shipped, you will receive a tracking link via email and SMS. You can also track your
        order from the{" "}
        <Link component={RouterLink} to="/profile" color="primary.main" underline="hover">
          Profile
        </Link>{" "}
        page.
      </Typography>

      <Typography>
        For shipping issues, please{" "}
        <Link component={RouterLink} to="/contact" color="primary.main" underline="hover">
          contact our support team
        </Link>
        .
      </Typography>
    </Container>
  );
}

import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PageHeading from "../Components/PageHeading";

export default function PrivacyPolicy() {
  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <PageHeading
        title="Privacy Policy"
        subtitle="At SkSync, we value your privacy and are committed to protecting your personal information."
      />

      <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main", mt: 5, mb: 2 }}>
        Information We Collect
      </Typography>
      <List sx={{ listStyleType: "disc", pl: 3, mb: 3 }}>
        {[
          "Name, email address, and phone number",
          "Shipping and billing address",
          "Payment information (processed securely)",
          "Browsing behavior on our website"
        ].map((item) => (
          <ListItem key={item} sx={{ display: "list-item", p: 0 }}>
            {item}
          </ListItem>
        ))}
      </List>

      <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main", mt: 5, mb: 2 }}>
        How We Use Your Information
      </Typography>
      <List sx={{ listStyleType: "decimal", pl: 3, mb: 3 }}>
        {[
          "To process and deliver your orders",
          "To send order updates and promotional offers",
          "To improve our products and services",
          "To provide customer support"
        ].map((item) => (
          <ListItem key={item} sx={{ display: "list-item", p: 0 }}>
            {item}
          </ListItem>
        ))}
      </List>

      <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main", mt: 5, mb: 2 }}>
        Data Security
      </Typography>
      <Typography sx={{ mb: 3 }}>
        We use industry-standard encryption to protect your data. We never sell your personal information to third
        parties.
      </Typography>

      <Typography>
        For questions about this policy, please{" "}
        <Link component={RouterLink} to="/contact" color="primary.main" underline="hover">
          contact us
        </Link>
        .
      </Typography>
    </Container>
  );
}

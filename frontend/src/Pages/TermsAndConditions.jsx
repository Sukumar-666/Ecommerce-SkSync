import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PageHeading from "../Components/PageHeading";

export default function TermsAndConditions() {
  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <PageHeading
        title="Terms and Conditions"
        subtitle="By using the SkSync website, you agree to the following terms and conditions."
      />

      <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main", mt: 5, mb: 2 }}>
        General Terms
      </Typography>
      <List sx={{ listStyleType: "decimal", pl: 3, mb: 3 }}>
        {[
          "You must be at least 18 years old to make a purchase.",
          "All product information is accurate to the best of our knowledge.",
          "Prices are subject to change without prior notice.",
          "We reserve the right to refuse service to anyone."
        ].map((item) => (
          <ListItem key={item} sx={{ display: "list-item", p: 0 }}>
            {item}
          </ListItem>
        ))}
      </List>

      <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main", mt: 5, mb: 2 }}>
        Account Responsibility
      </Typography>
      <Typography sx={{ mb: 3 }}>
        You are responsible for maintaining the confidentiality of your account and password.
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main", mt: 5, mb: 2 }}>
        Intellectual Property
      </Typography>
      <Typography sx={{ mb: 3 }}>
        All content on this website, including images, text, and logos, is the property of SkSync and may not be
        used without permission.
      </Typography>

      <Typography>
        Read our{" "}
        <Link component={RouterLink} to="/privacy-policy" color="primary.main" underline="hover">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link component={RouterLink} to="/return-policy" color="primary.main" underline="hover">
          Return Policy
        </Link>{" "}
        as well.
      </Typography>
    </Container>
  );
}

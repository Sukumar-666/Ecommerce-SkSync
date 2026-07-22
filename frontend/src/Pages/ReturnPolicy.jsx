import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PageHeading from "../Components/PageHeading";
import ProductTable from "../Components/ProductTable";

const refundSteps = [
  { step: "1", description: "Request a return from your Profile page" },
  { step: "2", description: "Pack the item securely" },
  { step: "3", description: "Courier partner picks up the item" },
  { step: "4", description: "Refund credited within 5-7 business days" }
];

export default function ReturnPolicy() {
  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <PageHeading
        title="Return & Refund Policy"
        subtitle="Your satisfaction is important to us. Please review our return policy below."
      />

      <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main", mt: 5, mb: 2 }}>
        Return Eligibility
      </Typography>
      <List sx={{ listStyleType: "decimal", pl: 3, mb: 3 }}>
        {[
          "Products must be returned within 7 days of delivery.",
          "Items must be unused and in original packaging.",
          "Certain hygiene products (lipsticks, makeup applicators) are non-returnable once opened."
        ].map((item) => (
          <ListItem key={item} sx={{ display: "list-item", p: 0 }}>
            {item}
          </ListItem>
        ))}
      </List>

      <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main", mt: 5, mb: 2 }}>
        Refund Process
      </Typography>
      <ProductTable
        columns={[
          { key: "step", label: "Step" },
          { key: "description", label: "Description" }
        ]}
        rows={refundSteps}
      />

      <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main", mt: 5, mb: 2 }}>
        Exchange Policy
      </Typography>
      <Typography sx={{ mb: 3 }}>
        We offer free exchanges for size or shade mismatches within 7 days of delivery.
      </Typography>

      <Typography>
        Need to start a return? Visit your{" "}
        <Link component={RouterLink} to="/profile" color="primary.main" underline="hover">
          Profile
        </Link>{" "}
        or{" "}
        <Link component={RouterLink} to="/contact" color="primary.main" underline="hover">
          contact support
        </Link>
        .
      </Typography>
    </Container>
  );
}

import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";

/**
 * MiniPageFooter — a clean two-line footer for standalone/auth pages
 * that are not wrapped in the full Layout (which already has Footer).
 * Usage: drop it at the bottom of any page Container.
 */
export default function MiniPageFooter() {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        pt: 3,
        pb: 4,
        mt: 3,
      }}
    >
      <Divider sx={{ mb: 2.5, borderColor: "#e2e8f0" }} />
      <Typography sx={{ fontSize: "0.78rem", color: "#9ca3af", mb: 0.25 }}>
        © {new Date().getFullYear()} SkSync Enterprise. All rights reserved.
      </Typography>
      <Typography sx={{ fontSize: "0.78rem", color: "#94a3b8" }}>
        <Link component={RouterLink} to="/privacy-policy" sx={{ color: "#1e40af", mx: 0.75, fontWeight: 600 }} underline="hover">
          Privacy Policy
        </Link>
        ·
        <Link component={RouterLink} to="/terms-and-conditions" sx={{ color: "#1e40af", mx: 0.75, fontWeight: 600 }} underline="hover">
          Terms of Use
        </Link>
        ·
        <Link component={RouterLink} to="/contact" sx={{ color: "#1e40af", mx: 0.75, fontWeight: 600 }} underline="hover">
          Contact Support
        </Link>
      </Typography>
    </Box>
  );
}

import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import BackToTopButton from "./BackToTopButton";

export default function Layout() {
  const location = useLocation();

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <ScrollToTop />
      <Navbar />
      {/* Fade transition between routed pages — purely cosmetic, no change to routing/business logic */}
      <Fade in key={location.pathname} timeout={450}>
        <Box component="main" sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Fade>
      <Footer />
      <BackToTopButton />
    </Box>
  );
}

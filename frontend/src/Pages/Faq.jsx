import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import PageHeading from "../Components/PageHeading";
import ScrollReveal from "../Components/ScrollReveal";

const FAQ_SECTIONS = [
  {
    title: "🧬 Skincare & Active Ingredients Science",
    items: [
      { q: "Are SkSync products specifically engineered for men's skin?", a: "Yes. Male facial skin is 20% thicker and produces twice the amount of sebum compared to female skin. Our formulas use high-potency ingredients like Activated Charcoal, 10% Niacinamide, and 2% Salicylic Acid for deep penetration without greasy residue." },
      { q: "How quickly can I expect results from the 14-day routine?", a: "Most users report visibly reduced oil shine within 24 hours, and tighter pores + smoother skin texture within 7 days of daily use." },
      { q: "Are all products dermatologically tested and cruelty-free?", a: "100% yes. All SkSync products are certified cruelty-free, 100% vegan, and dermatologically tested for sensitive male skin." }
    ]
  },
  {
    title: "⚡ Amazon & Flipkart Orders & Express Delivery",
    items: [
      { q: "How fast will my order arrive?", a: "Express shipping takes 24 to 48 hours in metro cities. Standard shipping takes 3-4 business days across India." },
      { q: "How can I track my shipment?", a: "After placing an order, you will receive a tracking link via SMS/Email. You can also view live status in your Profile dashboard." },
      { q: "Is discreet packaging provided?", a: "Yes, all orders are shipped in plain, tamper-evident SkSync eco-friendly boxes." }
    ]
  },
  {
    title: "💳 Payments, Coupons & Refunds",
    items: [
      { q: "What payment methods are supported?", a: "We accept all major Credit/Debit cards, UPI (Google Pay, PhonePe, Paytm), Netbanking, and Cash on Delivery (COD)." },
      { q: "How do I apply coupon codes like MENKING15?", a: "Enter the code in the coupon box during checkout or on the Shopping Cart page to claim instant discounts." },
      { q: "What is the return policy?", a: "We offer a 10-day hassle-free return and money-back guarantee if you are not satisfied with your results." }
    ]
  }
];

export default function Faq() {
  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <PageHeading
        title="Frequently Asked Questions"
        subtitle="Find instant answers to questions regarding men's skincare science, order delivery, payment methods, and returns."
      />

      {FAQ_SECTIONS.map((sec) => (
        <ScrollReveal key={sec.title}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "primary.main", mb: 2 }}>
              {sec.title}
            </Typography>

            {sec.items.map((item, idx) => (
              <Accordion
                key={idx}
                elevation={2}
                sx={{
                  mb: 1.5,
                  borderRadius: "12px !important",
                  "&:before": { display: "none" },
                  border: "1px solid #e2e8f0"
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon color="primary" />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {item.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0, pb: 2, color: "text.secondary", lineHeight: 1.7 }}>
                  <Typography variant="body2">{item.a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </ScrollReveal>
      ))}

      <ScrollReveal>
        <Paper elevation={2} sx={{ p: 4, mt: 4, borderRadius: 4, bgcolor: "background.paper", textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "primary.main", mb: 1 }}>
            Still Have Questions?
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
            Our customer support advisors and skin specialists are available 24/7.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button component={RouterLink} to="/contact" variant="contained" sx={{ fontWeight: 700 }}>
              Contact Support
            </Button>
            <Button component={RouterLink} to="/routine-builder" variant="outlined" sx={{ fontWeight: 700 }}>
              Take AI Routine Quiz
            </Button>
          </Box>
        </Paper>
      </ScrollReveal>
    </Container>
  );
}

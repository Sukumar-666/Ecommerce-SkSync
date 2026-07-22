import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import PageHeading from "../Components/PageHeading";
import FormStatusAlert from "../Components/FormStatusAlert";
import ScrollReveal from "../Components/ScrollReveal";
import useForm from "../utils/useForm";
import { validateRequired, validateEmail } from "../utils/validators";

const DEPARTMENTS = [
  { dept: "Customer Care & Orders", email: "support@sksync.com", phone: "+91-9876543210", hours: "24/7 Priority Support" },
  { dept: "Brand & Wholesale Sales", email: "sales@sksync.com", phone: "+91-9876543211", hours: "Mon-Sat 9am-6pm" },
  { dept: "Dermatological Research", email: "lab@sksync.com", phone: "+91-9876543212", hours: "Mon-Fri 10am-5pm" }
];

export default function Contact() {
  const { values, errors, status, setStatus, handleChange, validateAll, reset } = useForm(
    { name: "", email: "", subject: "", message: "" },
    { name: validateRequired, email: (v) => validateRequired(v) || validateEmail(v) }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    setStatus({ type: "success", message: "Thanks for reaching out! Our team will respond within 2 hours." });
    reset();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <PageHeading
        title="Contact SkSync Support & HQ"
        subtitle="Need assistance with an order, product recommendations, or wholesale enquiries? We're here to help."
      />

      <Grid container spacing={4} sx={{ mb: 6 }}>
        {/* Department Info Cards */}
        <Grid item xs={12} md={5}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {DEPARTMENTS.map((d) => (
              <ScrollReveal key={d.dept}>
                <Paper elevation={2} sx={{ p: 3, borderRadius: 4, bgcolor: "background.paper", borderLeft: "4px solid #1e40af" }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: "primary.main" }}>
                    {d.dept}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 600 }}>
                    📧 Email: <a href={`mailto:${d.email}`}>{d.email}</a>
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 600 }}>
                    📞 Phone: {d.phone}
                  </Typography>
                  <Chip label={d.hours} size="small" color="primary" sx={{ mt: 1, fontWeight: 700 }} />
                </Paper>
              </ScrollReveal>
            ))}
          </Box>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={7}>
          <ScrollReveal variant="scale">
            <Paper elevation={4} sx={{ p: 4, borderRadius: 4, bgcolor: "background.paper" }}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: "primary.main", mb: 1 }}>
                Send Us a Direct Message
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                Fill out the form below and an advisor will contact you.
              </Typography>

              <FormStatusAlert status={status} />

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      required
                      value={values.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      required
                      value={values.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  margin="normal"
                  label="Subject"
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="How can we help you?"
                  name="message"
                  multiline
                  rows={4}
                  value={values.message}
                  onChange={handleChange}
                />
                <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 3, py: 1.3, fontWeight: 700 }}>
                  Send Message
                </Button>
              </Box>
            </Paper>
          </ScrollReveal>
        </Grid>
      </Grid>

      {/* HQ Address Box */}
      <ScrollReveal>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 4, bgcolor: "background.paper", borderTop: "5px solid #0f172a" }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: "primary.main" }}>
            📍 Corporate Headquarters
          </Typography>
          <Typography variant="body1" sx={{ color: "text.primary", lineHeight: 1.6, mb: 2 }}>
            <b>SkSync Enterprise Pvt. Ltd.</b>
            <br />
            123 Innovation Tower, Andheri East, Mumbai, Maharashtra 400069, India
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            For corporate partnership and B2B vendor inquiries, please visit our{" "}
            <Link component={RouterLink} to="/enquiry-form" color="primary.main" fontWeight={700} underline="hover">
              Enquiry Form &rarr;
            </Link>
          </Typography>
        </Paper>
      </ScrollReveal>
    </Container>
  );
}

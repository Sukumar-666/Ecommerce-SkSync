import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import PageHeading from "../Components/PageHeading";
import FormStatusAlert from "../Components/FormStatusAlert";
import useForm from "../utils/useForm";
import { validateRequired, validateEmail } from "../utils/validators";

export default function EnquiryForm() {
  const { values, errors, status, setStatus, handleChange, validateAll, reset } = useForm(
    { name: "", email: "", phone: "", enquirytype: "Product Enquiry", message: "" },
    {
      name: validateRequired,
      email: (v) => validateRequired(v) || validateEmail(v),
      message: validateRequired
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    setStatus({ type: "success", message: "Your enquiry has been submitted. Our team will get back to you soon." });
    reset();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <PageHeading
        title="Enquiry Form"
        subtitle="Have a question about our products, bulk orders, or partnerships? Fill out the form below."
      />

      <Paper variant="outlined" sx={{ p: 4, maxWidth: 640, mb: 4 }}>
        <FormStatusAlert status={status} />
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField fullWidth margin="normal" label="Name" name="name" required value={values.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} />
          <TextField fullWidth margin="normal" label="Email" name="email" type="email" required value={values.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
          <TextField fullWidth margin="normal" label="Phone" name="phone" value={values.phone} onChange={handleChange} />
          <TextField select fullWidth margin="normal" label="Enquiry Type" name="enquirytype" value={values.enquirytype} onChange={handleChange}>
            {["Product Enquiry", "Bulk Order", "Partnership", "Complaint", "Other"].map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth margin="normal" label="Message" name="message" multiline rows={5} required value={values.message} onChange={handleChange} error={!!errors.message} helperText={errors.message} />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Submit Enquiry
          </Button>
        </Box>
      </Paper>

      <Typography sx={{ mb: 1 }}>Our team will get back to you within 24-48 hours.</Typography>
      <Typography>
        For urgent queries, please{" "}
        <Link component={RouterLink} to="/contact" color="primary.main" underline="hover">
          contact us directly
        </Link>
        .
      </Typography>
    </Container>
  );
}

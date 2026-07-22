import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import PageHeading from "../Components/PageHeading";
import ProductTable from "../Components/ProductTable";
import FormStatusAlert from "../Components/FormStatusAlert";
import useForm from "../utils/useForm";
import { validateRequired, validateEmail } from "../utils/validators";

const openPositions = [
  { position: "Beauty Consultant", location: "Mumbai", type: "Full Time" },
  { position: "Marketing Executive", location: "Bangalore", type: "Full Time" },
  { position: "Web Developer", location: "Remote", type: "Full Time" }
];

export default function ApplicationForm() {
  const { values, errors, status, setStatus, handleChange, validateAll, reset } = useForm(
    { fullname: "", email: "", phone: "", position: "Beauty Consultant", experience: "", coverletter: "" },
    {
      fullname: validateRequired,
      email: (v) => validateRequired(v) || validateEmail(v)
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    setStatus({ type: "success", message: "Your application has been submitted. We'll be in touch!" });
    reset();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <PageHeading
        title="Career Application Form"
        subtitle="Join the SkSync team! Fill out the form below to apply for open positions."
      />

      <Paper variant="outlined" sx={{ p: 4, maxWidth: 640, mb: 4 }}>
        <FormStatusAlert status={status} />
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField fullWidth margin="normal" label="Full Name" name="fullname" required value={values.fullname} onChange={handleChange} error={!!errors.fullname} helperText={errors.fullname} />
          <TextField fullWidth margin="normal" label="Email" name="email" type="email" required value={values.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
          <TextField fullWidth margin="normal" label="Phone" name="phone" required value={values.phone} onChange={handleChange} />
          <TextField select fullWidth margin="normal" label="Position" name="position" value={values.position} onChange={handleChange}>
            {["Beauty Consultant", "Marketing Executive", "Customer Support", "Warehouse Staff", "Web Developer"].map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth margin="normal" label="Experience (Years)" name="experience" value={values.experience} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Cover Letter" name="coverletter" multiline rows={5} value={values.coverletter} onChange={handleChange} />
          <Button variant="outlined" component="label" sx={{ mt: 1, mb: 1 }}>
            Upload Resume
            <input type="file" hidden />
          </Button>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Submit Application
          </Button>
        </Box>
      </Paper>

      <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main", mt: 5, mb: 2 }}>
        Open Positions
      </Typography>
      <ProductTable
        columns={[
          { key: "position", label: "Position" },
          { key: "location", label: "Location" },
          { key: "type", label: "Type" }
        ]}
        rows={openPositions}
      />
    </Container>
  );
}

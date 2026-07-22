import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PageHeading from "../Components/PageHeading";
import FormStatusAlert from "../Components/FormStatusAlert";
import useForm from "../utils/useForm";
import { validateRequired, validateEmail } from "../utils/validators";

export default function ForgotPassword() {
  const { values, errors, status, setStatus, handleChange, validateAll, reset } = useForm(
    { email: "" },
    { email: (v) => validateRequired(v) || validateEmail(v) }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    setStatus({ type: "success", message: "If that email is registered, a reset link has been sent." });
    reset();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Paper variant="outlined" sx={{ p: 4, maxWidth: 480, mx: "auto", mb: 4 }}>
        <PageHeading
          title="Forgot Password"
          subtitle="Enter your registered email address below and we will send you a link to reset your password."
        />
        <FormStatusAlert status={status} />

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 2 }}>
            Send Reset Link
          </Button>
        </Box>

        <Typography sx={{ mt: 2 }}>
          Remembered your password?{" "}
          <Link component={RouterLink} to="/login" color="primary.main" underline="hover">
            Back to Login
          </Link>
        </Typography>
      </Paper>

      <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main", mt: 5, mb: 2 }}>
        Need Help?
      </Typography>
      <List sx={{ listStyleType: "disc", pl: 3 }}>
        <ListItem sx={{ display: "list-item", p: 0 }}>Check your spam/junk folder for the reset email</ListItem>
        <ListItem sx={{ display: "list-item", p: 0 }}>Make sure you enter the correct registered email</ListItem>
        <ListItem sx={{ display: "list-item", p: 0 }}>
          <Link component={RouterLink} to="/contact" color="primary.main" underline="hover">
            Contact Support
          </Link>{" "}
          if you still face issues
        </ListItem>
      </List>
    </Container>
  );
}

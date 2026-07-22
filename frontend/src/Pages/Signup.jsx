import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Link,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio
} from "@mui/material";
import FormStatusAlert from "../Components/FormStatusAlert";
import { validateRequired, validateEmail, validateMobile, validatePassword } from "../utils/validators";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    gender: "", // no default — gender is a deliberate, required choice
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [signupComplete, setSignupComplete] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const validateForm = () => {
    const newErrors = {
      name: validateRequired(formData.name),
      email: validateRequired(formData.email) || validateEmail(formData.email),
      mobile: validateRequired(formData.mobile) || validateMobile(formData.mobile),
      password: validateRequired(formData.password) || validatePassword(formData.password),
      confirmPassword:
        validateRequired(formData.confirmPassword) ||
        (formData.confirmPassword !== formData.password ? "Passwords do not match." : ""),
      gender: formData.gender ? "" : "Please select Male or Female to personalize your shopping experience."
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((msg) => !msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!formData.terms) {
      setStatus({ type: "error", message: "Please agree to the Terms & Conditions to continue." });
      return;
    }

    setSubmitting(true);
    const result = await signup({
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      gender: formData.gender
    });
    setSubmitting(false);

    if (!result.ok) {
      setStatus({ type: "error", message: result.message });
      return;
    }

    // No auto-login here — the account isn't active until the user clicks
    // the verification link we just emailed them.
    setSignupComplete(true);
    setStatus({ type: "success", message: result.message });
  };

  if (signupComplete) {
    return (
      <Box sx={{ minHeight: "calc(100vh - 64px)", bgcolor: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", py: 6, px: 2 }}>
        <Box sx={{ width: "100%", maxWidth: 440 }}>
          <Paper sx={{ p: { xs: 3, md: 4.5 }, border: "1px solid #e5e7eb", boxShadow: "0 4px 20px -4px rgba(0,0,0,0.08)", textAlign: "center" }}>
            <Box sx={{ width: 56, height: 56, borderRadius: "14px", background: "linear-gradient(135deg, #1e40af, #2563eb)", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2.5, fontSize: "1.6rem" }}>🎉</Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827", mb: 1 }}>Account Created!</Typography>
            <Typography variant="body2" sx={{ color: "#6b7280", mb: 3, lineHeight: 1.7 }}>
              Your account has been created successfully.<br />You can now sign in directly with your email and password.
            </Typography>
            <Button component={RouterLink} to="/login" variant="contained" size="large" sx={{ bgcolor: "#1e40af", fontWeight: 700, "&:hover": { bgcolor: "#1e3a8a" } }}>
              Sign In Now
            </Button>
          </Paper>
        </Box>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box sx={{ minHeight: "calc(100vh - 200px)", bgcolor: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", py: 4, px: 2 }}>
        <Box sx={{ width: "100%", maxWidth: 480 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: "12px", background: "linear-gradient(135deg, #1e40af, #2563eb)", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2, fontSize: "1.4rem" }}>✨</Box>
            <Typography sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#111827", letterSpacing: -0.3 }}>Create your account</Typography>
            <Typography variant="body2" sx={{ color: "#6b7280", mt: 0.5 }}>Join SkSync and enjoy exclusive deals & personalised picks</Typography>
          </Box>

          <Paper sx={{ p: { xs: 3, md: 4 }, border: "1px solid #e5e7eb", boxShadow: "0 4px 20px -4px rgba(0,0,0,0.08)" }}>
            <FormStatusAlert status={status} />

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField label="Full Name" name="name" value={formData.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} fullWidth />
              <TextField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} fullWidth />
              <TextField label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} error={!!errors.mobile} helperText={errors.mobile} fullWidth />
              <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} fullWidth />
              <TextField label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} error={!!errors.confirmPassword} helperText={errors.confirmPassword} fullWidth />

              <FormControl error={!!errors.gender}>
                <FormLabel sx={{ fontWeight: 600, color: "text.primary", mb: 0.5 }}>Shop as</FormLabel>
                <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                  <FormControlLabel value="female" control={<Radio sx={{ color: "#1e40af", "&.Mui-checked": { color: "#1e40af" } }} />} label="Female" />
                  <FormControlLabel value="male" control={<Radio sx={{ color: "#1e40af", "&.Mui-checked": { color: "#1e40af" } }} />} label="Male" />
                </RadioGroup>
                {errors.gender && <Typography variant="caption" color="error">{errors.gender}</Typography>}
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>Personalises the products and offers shown to you.</Typography>
              </FormControl>

              <FormControlLabel
                control={<Checkbox name="terms" checked={formData.terms} onChange={handleChange} size="small" sx={{ color: "#1e40af", "&.Mui-checked": { color: "#1e40af" } }} />}
                label={<Typography variant="body2">I agree to the{" "}<Link component={RouterLink} to="/terms-and-conditions" sx={{ color: "#1e40af", fontWeight: 600 }}>Terms &amp; Conditions</Link></Typography>}
              />

              <Button variant="contained" type="submit" fullWidth size="large" disabled={submitting} sx={{ bgcolor: "#1e40af", fontWeight: 700, py: 1.3, "&:hover": { bgcolor: "#1e3a8a" } }}>
                {submitting ? "Creating account…" : "Create Account"}
              </Button>
            </Box>

            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="body2" sx={{ color: "#6b7280" }}>
                Already have an account?{" "}
                <Link component={RouterLink} to="/login" sx={{ color: "#1e40af", fontWeight: 700 }}>Sign in</Link>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default Signup;

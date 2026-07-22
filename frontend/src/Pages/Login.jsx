import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Container, Box, Paper, Typography, TextField,
  MenuItem, Button, FormControlLabel, Checkbox, Link, Divider
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormStatusAlert from "../Components/FormStatusAlert";
import { validateRequired, validateEmail } from "../utils/validators";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login, resendVerification, session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate(session.role === "admin" ? "/admin-dashboard" : "/home", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const [formData, setFormData]           = useState({ role: "customer", email: "", password: "", remember: false });
  const [errors, setErrors]               = useState({});
  const [status, setStatus]               = useState(null);
  const [submitting, setSubmitting]       = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const validateForm = () => {
    const newErrors = {
      email:    validateRequired(formData.email)    || validateEmail(formData.email),
      password: validateRequired(formData.password),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((msg) => !msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setNeedsVerification(false);
    setSubmitting(true);
    const result = await login({ email: formData.email, password: formData.password, role: formData.role });
    setSubmitting(false);

    if (!result.ok) {
      setStatus({ type: "error", message: result.message });
      if (result.message?.toLowerCase().includes("verify your email")) setNeedsVerification(true);
      return;
    }
    if (!result.otpRequired) {
      navigate(result.user?.role === "admin" ? "/admin-dashboard" : "/home", { replace: true });
      return;
    }
    navigate("/verify-otp", {
      state: { pendingToken: result.pendingToken, email: formData.email, remember: formData.remember, devOtp: result.devOtp },
    });
  };

  const handleResendVerification = async () => {
    setSubmitting(true);
    const result = await resendVerification(formData.email);
    setSubmitting(false);
    setStatus({ type: result.ok ? "success" : "error", message: result.message });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box
        sx={{
          minHeight: "calc(100vh - 200px)",
          bgcolor: "#f9fafb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
          px: 2,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 440 }}>
        {/* Brand mark */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #1e40af, #2563eb)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <LockOutlinedIcon sx={{ color: "#fff", fontSize: 22 }} />
          </Box>
          <Typography
            sx={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "1.6rem",
              color: "#111827",
              letterSpacing: -0.3,
            }}
          >
            Welcome back
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280", mt: 0.5 }}>
            Sign in to your SkSync account
          </Typography>
        </Box>

        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 20px -4px rgba(0,0,0,0.08)",
          }}
        >
          <FormStatusAlert status={status} />

          {needsVerification && (
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Button size="small" onClick={handleResendVerification} disabled={submitting} sx={{ color: "#1e40af" }}>
                Resend verification email
              </Button>
            </Box>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              select
              label="Sign in as"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>

            <TextField
              label="Email address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <FormControlLabel
                control={<Checkbox name="remember" checked={formData.remember} onChange={handleChange} size="small" sx={{ color: "#1e40af", "&.Mui-checked": { color: "#1e40af" } }} />}
                label={<Typography variant="body2">Remember Me</Typography>}
              />
              <Link component={RouterLink} to="/forgot-password" sx={{ fontSize: "0.85rem", color: "#1e40af", fontWeight: 600 }}>
                Forgot password?
              </Link>
            </Box>

            <Button
              variant="contained"
              type="submit"
              fullWidth
              size="large"
              disabled={submitting}
              sx={{
                bgcolor: "#1e40af",
                fontWeight: 700,
                py: 1.3,
                fontSize: "0.95rem",
                "&:hover": { bgcolor: "#1e3a8a" },
              }}
            >
              {submitting ? "Verifying…" : "Sign In"}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" sx={{ textAlign: "center", color: "#6b7280" }}>
            Don't have an account?{" "}
            <Link component={RouterLink} to="/signup" sx={{ color: "#1e40af", fontWeight: 700 }}>
              Create one here
            </Link>
          </Typography>
        </Paper>

        {/* Demo hint */}
        <Typography variant="caption" sx={{ display: "block", textAlign: "center", mt: 2.5, color: "#9ca3af", lineHeight: 1.6 }}>
          Demo admin: run <code>npm run seed</code> in /backend then use<br />
          Email: <strong>admin@sksync.com</strong> · Password: <strong>Admin@123</strong> · Role: Admin
        </Typography>
      </Box>
    </Box>
  </Container>
  );
}
export default Login;

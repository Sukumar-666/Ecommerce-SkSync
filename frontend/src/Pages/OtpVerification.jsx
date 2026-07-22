import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { Container, Paper, Typography, TextField, Button, Box, Link } from "@mui/material";
import FormStatusAlert from "../Components/FormStatusAlert";
import { useAuth } from "../context/AuthContext";

const RESEND_COOLDOWN_SECONDS = 45;

export default function OtpVerification() {
  const { verifyLoginOtp, resendLoginOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { pendingToken, email, devOtp } = location.state || {};
  const [otp, setOtp] = useState(devOtp || "");
  const [status, setStatus] = useState(
    devOtp ? { type: "info", message: `Your verification code is: ${devOtp}` } : null
  );
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef(null);

  // No pendingToken means someone landed here directly (e.g. refreshed the
  // page) without going through Login first — send them back rather than
  // show a broken form.
  useEffect(() => {
    if (!pendingToken) navigate("/login", { replace: true });
  }, [pendingToken, navigate]);

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    timerRef.current = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [cooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      setStatus({ type: "error", message: "Enter the 6-digit code from your email." });
      return;
    }
    setSubmitting(true);
    const result = await verifyLoginOtp({ pendingToken, otp });
    setSubmitting(false);

    if (!result.ok) {
      setStatus({ type: "error", message: result.message });
      return;
    }
    navigate(result.role === "admin" ? "/admin-dashboard" : "/home", { replace: true });
  };

  const handleResend = async () => {
    setSubmitting(true);
    const result = await resendLoginOtp(pendingToken);
    setSubmitting(false);
    if (result.devOtp) setOtp(result.devOtp);
    setStatus({ type: result.ok ? "success" : "error", message: result.message });
    if (result.ok) setCooldown(RESEND_COOLDOWN_SECONDS);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Paper
        elevation={0}
        sx={{
          my: 4,
          mx: "auto",
          maxWidth: 500,
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 24px -4px rgba(30,64,175,0.10)",
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "14px",
            background: "linear-gradient(135deg, #1e40af, #2563eb)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2.5,
            fontSize: "1.6rem",
          }}
        >
          🔐
        </Box>

        <Typography
          variant="h5"
          sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: "#111827", mb: 0.5 }}
        >
          Verify It's You
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3, fontSize: "0.9rem" }}>
          We've sent a 6-digit code to <strong>{email}</strong>. Enter it below to finish logging in.
        </Typography>

        <FormStatusAlert status={status} />

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            inputProps={{ maxLength: 6, inputMode: "numeric", style: { textAlign: "center", letterSpacing: 8, fontSize: 24 } }}
            fullWidth
            autoFocus
          />
          <Button
            variant="contained"
            type="submit"
            size="large"
            disabled={submitting}
            sx={{ bgcolor: "#1e40af", fontWeight: 700, py: 1.3, "&:hover": { bgcolor: "#1e3a8a" } }}
          >
            {submitting ? "Verifying..." : "Verify & Continue"}
          </Button>
        </Box>

        <Typography sx={{ mt: 3, fontSize: "0.875rem", color: "#6b7280" }}>
          Didn't get a code?{" "}
          {cooldown > 0 ? (
            <span>Resend available in {cooldown}s</span>
          ) : (
            <Link
              component="button"
              type="button"
              onClick={handleResend}
              sx={{ color: "#1e40af", fontWeight: 600 }}
              underline="hover"
            >
              Resend code
            </Link>
          )}
        </Typography>
        <Typography align="center" sx={{ mt: 1 }}>
          <Link component={RouterLink} to="/login" sx={{ color: "#64748b", fontSize: "0.85rem" }} underline="hover">
            ← Back to login
          </Link>
        </Typography>
      </Paper>

      {/* Two-line professional mini footer */}
      <Box
        component="footer"
        sx={{
          textAlign: "center",
          pt: 3,
          pb: 4,
          borderTop: "1px solid #e2e8f0",
          mt: 2,
        }}
      >
        <Typography sx={{ fontSize: "0.78rem", color: "#9ca3af", mb: 0.25 }}>
          © {new Date().getFullYear()} SkSync Enterprise. All rights reserved.
        </Typography>
        <Typography sx={{ fontSize: "0.78rem", color: "#94a3b8" }}>
          <Link component={RouterLink} to="/privacy-policy" sx={{ color: "#1e40af", mx: 0.75, fontWeight: 600 }} underline="hover">Privacy Policy</Link>
          ·
          <Link component={RouterLink} to="/terms-and-conditions" sx={{ color: "#1e40af", mx: 0.75, fontWeight: 600 }} underline="hover">Terms of Use</Link>
          ·
          <Link component={RouterLink} to="/contact" sx={{ color: "#1e40af", mx: 0.75, fontWeight: 600 }} underline="hover">Contact</Link>
        </Typography>
      </Box>
    </Container>
  );
}

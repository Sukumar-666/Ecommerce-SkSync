import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Container, Paper, Typography, Button, CircularProgress, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import MiniPageFooter from "../Components/MiniPageFooter";

export default function VerifyEmail() {
  const { token } = useParams();
  const { verifyEmail } = useAuth();
  const [state, setState] = useState({ status: "loading", message: "" });

  useEffect(() => {
    let active = true;
    (async () => {
      const result = await verifyEmail(token);
      if (!active) return;
      setState({ status: result.ok ? "success" : "error", message: result.message });
    })();
    return () => {
      active = false;
    };
  }, [token, verifyEmail]);

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper
        elevation={0}
        sx={{
          my: 4,
          mx: "auto",
          p: 5,
          borderRadius: 3,
          textAlign: "center",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 24px -4px rgba(30,64,175,0.10)",
        }}
      >
        {state.status === "loading" && (
          <>
            <CircularProgress sx={{ mb: 2, color: "#1e40af" }} />
            <Typography color="text.secondary">Verifying your email...</Typography>
          </>
        )}

        {state.status === "success" && (
          <>
            <Box
              sx={{
                fontSize: "2.5rem",
                mb: 2,
              }}
            >
              🎉
            </Box>
            <Typography
              variant="h5"
              sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: "#111827", mb: 1 }}
            >
              Email Verified!
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3, fontSize: "0.9rem" }}>
              {state.message}
            </Typography>
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              size="large"
              sx={{ bgcolor: "#1e40af", fontWeight: 700, "&:hover": { bgcolor: "#1e3a8a" } }}
            >
              Go to Login
            </Button>
          </>
        )}

        {state.status === "error" && (
          <>
            <Box sx={{ fontSize: "2.5rem", mb: 2 }}>❌</Box>
            <Typography
              variant="h5"
              sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: "#dc2626", mb: 1 }}
            >
              Verification Failed
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3, fontSize: "0.9rem" }}>
              {state.message}
            </Typography>
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              size="large"
              sx={{ borderColor: "#1e40af", color: "#1e40af", fontWeight: 700 }}
            >
              Back to Login
            </Button>
          </>
        )}
      </Paper>

      <MiniPageFooter />
    </Container>
  );
}

import React from "react";
import Alert from "@mui/material/Alert";

export default function FormStatusAlert({ status }) {
  if (!status) return null;
  return (
    <Alert severity={status.type === "success" ? "success" : "error"} sx={{ mb: 3 }}>
      {status.message}
    </Alert>
  );
}

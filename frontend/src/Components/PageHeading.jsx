import React from "react";
import Typography from "@mui/material/Typography";

export default function PageHeading({ title, subtitle, color = "primary.dark" }) {
  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 700, color, mb: subtitle ? 1 : 3 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {subtitle}
        </Typography>
      )}
    </>
  );
}

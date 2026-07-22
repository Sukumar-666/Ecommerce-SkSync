import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

/**
 * Clean page-header banner — full-width image with overlay text.
 * Uses width:100% on a non-offset container so it won't cause
 * horizontal overflow or content overlap.
 */
export default function FullBleedImage({ src, alt, height = 280, title, subtitle, chip }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height,
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        loading="lazy"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform 6s ease",
          "&:hover": { transform: "scale(1.03)" },
        }}
      />
      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(17,24,39,0.3) 0%, rgba(17,24,39,0.72) 100%)",
        }}
      />
      {/* Text Content */}
      {(title || subtitle) && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: { xs: 2, md: 4 },
            gap: 1.5,
          }}
        >
          {chip && (
            <Chip
              label={chip}
              size="small"
              sx={{
                bgcolor: "#1e40af",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: 1,
              }}
            />
          )}
          {title && (
            <Typography
              variant="h3"
              sx={{
                color: "#fff",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: { xs: "1.6rem", md: "2.4rem" },
                textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                lineHeight: 1.2,
              }}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.82)",
                maxWidth: 520,
                fontSize: { xs: "0.9rem", md: "1rem" },
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

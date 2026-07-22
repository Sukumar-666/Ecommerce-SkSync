import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";

/**
 * Wraps any content and animates it in (fade + rise, or fade + scale) the
 * first time it scrolls into view. Pure CSS transition driven by an
 * IntersectionObserver — no animation library required, so it drops into
 * any existing page without new dependencies.
 *
 * Usage:
 *   <ScrollReveal><Typography variant="h5">Featured Categories</Typography></ScrollReveal>
 *   <ScrollReveal variant="scale" delay={150}>...</ScrollReveal>
 */
export default function ScrollReveal({ children, variant = "up", delay = 0, threshold = 0.15, ...boxProps }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  const className = variant === "scale" ? "reveal-scale" : "reveal";

  return (
    <Box
      ref={ref}
      className={`${className} ${visible ? "reveal-visible" : ""}`}
      sx={{ transitionDelay: `${delay}ms`, ...boxProps.sx }}
      {...boxProps}
    >
      {children}
    </Box>
  );
}

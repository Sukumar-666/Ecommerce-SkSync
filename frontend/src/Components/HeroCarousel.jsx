import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

/**
 * Full-width, auto-advancing image carousel for hero banners.
 * - Autoplays on an interval, pauses on hover/focus.
 * - Swipeable on touch, click-through arrows and dot navigation for manual control.
 * - Pure React state, no carousel library — keeps bundle size and
 *   dependency risk low while giving the "auto-scrolling" behavior requested.
 *
 * Usage:
 *   <HeroCarousel
 *     height={520}
 *     slides={[{ image: "url1", alt: "..." }, { image: "url2", alt: "..." }]}
 *   >
 *     <Typography variant="h1">Welcome to SkSync</Typography>
 *   </HeroCarousel>
 */
export default function HeroCarousel({ slides, height = 480, interval = 4500, children }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const goTo = useCallback((i) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || count <= 1) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearInterval(timer);
  }, [paused, count, interval]);

  // basic swipe support
  const touchStartX = React.useRef(null);
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) prev();
    else if (delta < -50) next();
    touchStartX.current = null;
  };

  return (
    <Box
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      sx={{
        position: "relative",
        width: "100%",
        height,
        overflow: "hidden",
        borderRadius: { xs: 0, md: 4 },
        boxShadow: 6,
      }}
    >
      {slides.map((slide, i) => (
        <Box
          key={slide.image}
          className={`hero-slide ${i === index ? "hero-slide-active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
          aria-hidden={i !== index}
        />
      ))}

      {/* Dark gradient so overlay text stays readable on any image */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(15,23,42,0.45) 0%, rgba(15,23,42,0.75) 100%)",
        }}
      />

      {/* Overlay content (headline, CTA, etc.) passed in by the page */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
          px: 3,
        }}
      >
        {children}
      </Box>

      {count > 1 && (
        <>
          <IconButton
            onClick={prev}
            aria-label="Previous slide"
            sx={{
              position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
              zIndex: 3, color: "#fff", bgcolor: "rgba(0,0,0,0.25)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.45)" },
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={next}
            aria-label="Next slide"
            sx={{
              position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
              zIndex: 3, color: "#fff", bgcolor: "rgba(0,0,0,0.25)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.45)" },
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>

          <Box sx={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", gap: 1 }}>
            {slides.map((slide, i) => (
              <Box
                key={slide.image}
                onClick={() => goTo(i)}
                sx={{
                  width: i === index ? 22 : 8,
                  height: 8,
                  borderRadius: 999,
                  bgcolor: i === index ? "#fff" : "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  transition: "width 0.3s ease, background-color 0.3s ease",
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

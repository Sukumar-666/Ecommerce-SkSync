import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1e40af",      // SkSync Navy Blue
      dark: "#1e3a8a",
      light: "#3b82f6",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#111827",      // Deep Charcoal
      dark: "#030712",
      light: "#1f2937",
      contrastText: "#ffffff"
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff"
    },
    text: {
      primary: "#111827",
      secondary: "#6b7280"
    },
    divider: "#e2e8f0",
    success: { main: "#059669" },
    warning: { main: "#d97706" },
    error:   { main: "#dc2626" }
  },
  shape: {
    borderRadius: 10
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "sans-serif"
    ].join(","),
    h1: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, letterSpacing: -1   },
    h2: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, letterSpacing: -0.5 },
    h3: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700                      },
    h4: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700                      },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.6 }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
          "&:hover": { boxShadow: "none" }
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#1e3a8a",
            transform: "translateY(-1px)",
            transition: "all 0.2s ease"
          }
        },
        outlinedPrimary: {
          borderWidth: 1.5,
          "&:hover": { borderWidth: 1.5 }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.07)"
        },
        elevation3: {
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.07)"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "1px solid #e2e8f0",
          boxShadow: "none",
          transition: "box-shadow 0.2s ease, transform 0.2s ease",
          "&:hover": {
            boxShadow: "0 8px 24px -4px rgba(30,64,175,0.12)",
            transform: "translateY(-2px)"
          }
        }
      }
    },
    MuiTextField: {
      defaultProps: { size: "small" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1e40af"
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1e40af"
            }
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 600 }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: "#e2e8f0" }
      }
    }
  }
});

export default theme;

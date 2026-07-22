import React, { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar, Toolbar, Box, Container, Button, IconButton,
  InputBase, Badge, Menu, MenuItem, Divider,
  Typography, Drawer, List, ListItem, ListItemButton, ListItemText
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { label: "Home",        to: "/home" },
  { label: "Products",    to: "/products" },
  { label: "Categories",  to: "/categories" },
  { label: "Brands",      to: "/brands" },
  { label: "Offers",      to: "/offers" },
  { label: "About",       to: "/about" },
];

const FEATURE_LINKS = [
  { label: "Flash Deals",   to: "/deal-zone"     },
  { label: "AI Routine",    to: "/routine-builder"},
  { label: "Formula Lab",   to: "/grooming-lab"  },
  { label: "Lookbook",      to: "/lookbook"      },
];

const SEARCH_SUGGESTIONS = [
  "Activated Charcoal Face Wash",
  "Niacinamide Serum",
  "Beard Styling Wax",
  "Wood & Musk Cologne",
  "Argan Beard Growth Oil"
];

export default function Navbar() {
  const { session, logout } = useAuth();
  const navigate   = useNavigate();
  const location   = useLocation();

  const [searchOpen, setSearchOpen]       = useState(false);
  const [searchQuery, setSearchQuery]     = useState("");
  const [suggestions, setSuggestions]     = useState(false);
  const [drawerOpen, setDrawerOpen]       = useState(false);
  const [accountAnchor, setAccountAnchor] = useState(null);
  const [moreAnchor, setMoreAnchor]       = useState(null);

  const isActive = (to) => location.pathname === to;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSuggestions(false);
      setSearchOpen(false);
      navigate("/products");
    }
  };

  const handleLogout = () => {
    setAccountAnchor(null);
    logout();
    navigate("/login");
  };

  const accountName = session
    ? (session.name || "User").split(" ")[0]
    : null;

  return (
    <>
      {/* ─── Single sticky Navbar ─────────────────────────────── */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          top: 0,
          zIndex: 1100,
          bgcolor: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          color: "#111827",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              height: 64,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {/* ── Brand Logo ────────────────────────── */}
            <Box
              component={RouterLink}
              to="/home"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                textDecoration: "none",
                mr: { xs: "auto", md: 3 },
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #1e40af 0%, #2563eb 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 0.5,
                }}
              >
                <Typography sx={{ color: "#fff", fontWeight: 900, fontSize: "0.95rem", lineHeight: 1 }}>
                  S
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.2rem",
                  color: "#111827",
                  letterSpacing: -0.3,
                }}
              >
                Sk<span style={{ color: "#1e40af" }}>Sync</span>
              </Typography>
            </Box>

            {/* ── Desktop Nav Links ──────────────────── */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 0.5,
                flex: 1,
              }}
            >
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.to}
                  component={RouterLink}
                  to={link.to}
                  size="small"
                  sx={{
                    color: isActive(link.to) ? "#1e40af" : "#374151",
                    fontWeight: isActive(link.to) ? 700 : 500,
                    fontSize: "0.875rem",
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 2,
                    position: "relative",
                    "&::after": isActive(link.to)
                      ? {
                          content: '""',
                          position: "absolute",
                          bottom: 2,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "18px",
                          height: "2px",
                          borderRadius: "2px",
                          backgroundColor: "#1e40af",
                        }
                      : {},
                    "&:hover": { color: "#1e40af", bgcolor: "#eff6ff" },
                  }}
                >
                  {link.label}
                </Button>
              ))}

              {/* More (Feature Pages) */}
              <Button
                size="small"
                endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 16, transition: "transform 0.2s", transform: Boolean(moreAnchor) ? "rotate(180deg)" : "rotate(0deg)" }} />}
                onClick={(e) => setMoreAnchor(e.currentTarget)}
                sx={{
                  color: Boolean(moreAnchor) ? "#1e40af" : "#374151",
                  fontWeight: Boolean(moreAnchor) ? 700 : 500,
                  fontSize: "0.875rem",
                  px: 1.5,
                  bgcolor: Boolean(moreAnchor) ? "#eff6ff" : "transparent",
                  "&:hover": { color: "#1e40af", bgcolor: "#eff6ff" },
                }}
              >
                More
              </Button>
              <Menu
                anchorEl={moreAnchor}
                open={Boolean(moreAnchor)}
                onClose={() => setMoreAnchor(null)}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 180,
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 8px 20px -4px rgba(0,0,0,0.12)",
                    borderRadius: 2,
                  },
                }}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              >
                {FEATURE_LINKS.map((link) => (
                  <MenuItem
                    key={link.to}
                    component={RouterLink}
                    to={link.to}
                    onClick={() => setMoreAnchor(null)}
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      py: 1,
                      "&:hover": { color: "#1e40af", bgcolor: "#eff6ff" },
                    }}
                  >
                    {link.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* ── Right Actions ──────────────────────── */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>

              {/* Search Toggle */}
              <IconButton
                onClick={() => setSearchOpen((s) => !s)}
                size="small"
                sx={{ color: "#374151", "&:hover": { color: "#1e40af" } }}
                aria-label="Search"
              >
                <SearchIcon fontSize="small" />
              </IconButton>

              {/* Wishlist */}
              <IconButton
                component={RouterLink}
                to="/products"
                size="small"
                sx={{
                  color: "#374151",
                  display: { xs: "none", sm: "inline-flex" },
                  "&:hover": { color: "#1e40af" },
                }}
                aria-label="Wishlist"
              >
                <FavoriteBorderIcon fontSize="small" />
              </IconButton>

              {/* Cart */}
              <IconButton
                component={RouterLink}
                to="/cart"
                size="small"
                sx={{ color: "#374151", "&:hover": { color: "#1e40af" } }}
                aria-label="Cart"
              >
                <Badge
                  badgeContent={2}
                  sx={{
                    "& .MuiBadge-badge": {
                      bgcolor: "#1e40af",
                      color: "#fff",
                      fontSize: "0.65rem",
                      minWidth: 16,
                      height: 16,
                    },
                  }}
                >
                  <ShoppingCartOutlinedIcon fontSize="small" />
                </Badge>
              </IconButton>

              {/* Account */}
              <Button
                size="small"
                onClick={(e) => setAccountAnchor(e.currentTarget)}
                startIcon={<PersonOutlinedIcon fontSize="small" />}
                endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 14 }} />}
                sx={{
                  display: { xs: "none", sm: "inline-flex" },
                  color: "#374151",
                  fontWeight: 600,
                  fontSize: "0.825rem",
                  px: 1.5,
                  borderRadius: 2,
                  "&:hover": { color: "#1e40af", bgcolor: "#eff6ff" },
                }}
              >
                {accountName ? `Hi, ${accountName}` : "Sign In"}
              </Button>
              <Menu
                anchorEl={accountAnchor}
                open={Boolean(accountAnchor)}
                onClose={() => setAccountAnchor(null)}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 190,
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 8px 20px -4px rgba(0,0,0,0.12)",
                    borderRadius: 2,
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {session ? (
                  [
                    session.role === "admin" && (
                      <MenuItem
                        key="admin"
                        component={RouterLink}
                        to="/admin-dashboard"
                        onClick={() => setAccountAnchor(null)}
                        sx={{ fontSize: "0.875rem", fontWeight: 700, color: "#1e40af" }}
                      >
                        ⚙️  Admin Panel
                      </MenuItem>
                    ),
                    <MenuItem
                      key="profile"
                      component={RouterLink}
                      to="/profile"
                      onClick={() => setAccountAnchor(null)}
                      sx={{ fontSize: "0.875rem", fontWeight: 600 }}
                    >
                      👤  My Profile
                    </MenuItem>,
                    <Divider key="div" />,
                    <MenuItem
                      key="logout"
                      onClick={handleLogout}
                      sx={{ fontSize: "0.875rem", color: "#dc2626" }}
                    >
                      Sign Out
                    </MenuItem>,
                  ]
                ) : (
                  [
                    <MenuItem
                      key="login"
                      component={RouterLink}
                      to="/login"
                      onClick={() => setAccountAnchor(null)}
                      sx={{ fontSize: "0.875rem", fontWeight: 700, color: "#1e40af" }}
                    >
                      Sign In
                    </MenuItem>,
                    <MenuItem
                      key="signup"
                      component={RouterLink}
                      to="/signup"
                      onClick={() => setAccountAnchor(null)}
                      sx={{ fontSize: "0.875rem" }}
                    >
                      Create Account
                    </MenuItem>,
                  ]
                )}
              </Menu>

              {/* Mobile Hamburger */}
              <IconButton
                onClick={() => setDrawerOpen(true)}
                size="small"
                sx={{ display: { xs: "flex", md: "none" }, color: "#374151" }}
                aria-label="Open menu"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>

        {/* ── Inline Search Bar (slides down below Toolbar) ───── */}
        {searchOpen && (
          <Box
            sx={{
              borderTop: "1px solid #e5e7eb",
              bgcolor: "#f9fafb",
              py: 1.5,
              px: { xs: 2, md: 0 },
            }}
          >
            <Container maxWidth="xl">
              <Box
                component="form"
                onSubmit={handleSearch}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "#ffffff",
                  border: "1.5px solid #bfdbfe",
                  borderRadius: "10px",
                  px: 1.5,
                  py: 0.5,
                  maxWidth: 640,
                  mx: "auto",
                  position: "relative",
                }}
              >
                <SearchIcon sx={{ color: "#9ca3af", fontSize: 20, mr: 1, flexShrink: 0 }} />
                <InputBase
                  autoFocus
                  placeholder="Search skincare, beard care, colognes, serums…"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSuggestions(true);
                  }}
                  sx={{ flex: 1, fontSize: "0.9rem" }}
                  onFocus={() => setSuggestions(true)}
                />
                {searchQuery && (
                  <IconButton size="small" onClick={() => { setSearchQuery(""); setSuggestions(false); }}>
                    <CloseIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
                  </IconButton>
                )}
                <IconButton size="small" onClick={() => setSearchOpen(false)} sx={{ ml: 0.5 }}>
                  <CloseIcon sx={{ fontSize: 18, color: "#6b7280" }} />
                </IconButton>

                {/* Suggestion List */}
                {suggestions && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      left: 0,
                      right: 0,
                      bgcolor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "10px",
                      boxShadow: "0 8px 20px -4px rgba(0,0,0,0.12)",
                      overflow: "hidden",
                      zIndex: 200,
                    }}
                  >
                    {SEARCH_SUGGESTIONS.map((s) => (
                      <Box
                        key={s}
                        onClick={() => {
                          setSearchQuery(s);
                          setSuggestions(false);
                          navigate("/products");
                        }}
                        sx={{
                          px: 2,
                          py: 1.2,
                          fontSize: "0.875rem",
                          color: "#374151",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          "&:hover": { bgcolor: "#eff6ff", color: "#1e40af" },
                          borderBottom: "1px solid #f9fafb",
                        }}
                      >
                        <SearchIcon sx={{ fontSize: 15, color: "#9ca3af" }} />
                        {s}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Container>
          </Box>
        )}
      </AppBar>

      {/* ─── Mobile Drawer ──────────────────────────────────── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280 } }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e5e7eb" }}>
          <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#1e40af" }}>
            SkSync
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <List disablePadding>
          {[...NAV_LINKS, ...FEATURE_LINKS].map((link) => (
            <ListItem disablePadding key={link.to}>
              <ListItemButton
                component={RouterLink}
                to={link.to}
                onClick={() => setDrawerOpen(false)}
                sx={{ py: 1.25, px: 2.5, "&:hover": { bgcolor: "#eff6ff", color: "#1e40af" } }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ px: 2.5, pt: 1 }}>
          {session ? (
            <Button
              fullWidth
              variant="outlined"
              color="error"
              size="small"
              onClick={() => { setDrawerOpen(false); handleLogout(); }}
            >
              Sign Out
            </Button>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button
                fullWidth
                variant="contained"
                component={RouterLink}
                to="/login"
                onClick={() => setDrawerOpen(false)}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                variant="outlined"
                component={RouterLink}
                to="/signup"
                onClick={() => setDrawerOpen(false)}
              >
                Create Account
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
}

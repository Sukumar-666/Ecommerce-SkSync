import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Grid, Paper, Chip, Button,
  CircularProgress, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Select, MenuItem,
  FormControl, InputLabel, Avatar, Divider, Stack, InputAdornment,
  Tooltip, Alert, Snackbar, LinearProgress, Switch, FormControlLabel
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { id: "overview",  label: "Overview",   Icon: DashboardIcon  },
  { id: "products",  label: "Products",   Icon: InventoryIcon  },
  { id: "orders",    label: "Orders",     Icon: ShoppingBagIcon },
  { id: "users",     label: "Users",      Icon: PeopleIcon     },
  { id: "settings",  label: "Site Control", Icon: SettingsIcon },
];

const STATUS_STYLES = {
  Placed:    { bg: "#dbeafe", color: "#1e40af" },
  Shipped:   { bg: "#fef9c3", color: "#92400e" },
  Delivered: { bg: "#dcfce7", color: "#15803d" },
  Cancelled: { bg: "#fee2e2", color: "#b91c1c" },
};
const STATUS_LIST = ["Placed", "Shipped", "Delivered", "Cancelled"];

const EMPTY_PRODUCT = {
  name: "", category: "", brand: "", price: "", discountPrice: "",
  description: "", image: "", stock: "", gender: "unisex"
};

export default function AdminDashboard() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab,      setActiveTab]      = useState("overview");
  const [sidebarOpen,    setSidebarOpen]    = useState(true);
  const [loading,        setLoading]        = useState(true);
  const [users,          setUsers]          = useState([]);
  const [orders,         setOrders]         = useState([]);
  const [products,       setProducts]       = useState([]);
  const [snack,          setSnack]          = useState(null);
  const [productDialog,  setProductDialog]  = useState(false);
  const [productForm,    setProductForm]    = useState(EMPTY_PRODUCT);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productSaving,  setProductSaving]  = useState(false);
  const [deleteConfirm,  setDeleteConfirm]  = useState(null);
  const [productSearch,  setProductSearch]  = useState("");
  const [orderSearch,    setOrderSearch]    = useState("");
  const [userSearch,     setUserSearch]     = useState("");
  const [orderFilter,    setOrderFilter]    = useState("All");

  /* ── Site Settings State ── */
  const [siteSettings, setSiteSettings] = useState({
    tickerText: "🚀 Free Shipping on orders above ₹499 | ⚡ Up to 40% OFF Men's Grooming Kits | 🎁 Extra 15% OFF — Code: MENKING15",
    promoCode: "MENKING15",
    promoDiscount: "15%",
    freeShippingMin: 499,
    maintenanceMode: false,
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [{ users: u }, { orders: o }, { products: p }] = await Promise.all([
        api.listUsers(), api.allOrders(), api.getProducts(),
      ]);
      setUsers(u); setOrders(o); setProducts(p);
    } catch (err) {
      setSnack({ msg: err.message, severity: "error" });
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);
  const adminsCount  = users.filter(u => u.role === "admin").length;

  function openAdd()  { setEditingProduct(null); setProductForm(EMPTY_PRODUCT); setProductDialog(true); }
  function openEdit(p) {
    setEditingProduct(p._id);
    setProductForm({ name: p.name||"", category: p.category||"", brand: p.brand||"",
      price: p.price??"", discountPrice: p.discountPrice??"",
      description: p.description||"", image: p.image||"", stock: p.stock??"", gender: p.gender||"unisex" });
    setProductDialog(true);
  }

  async function saveProduct() {
    setProductSaving(true);
    try {
      const payload = { ...productForm, price: Number(productForm.price), stock: Number(productForm.stock),
        discountPrice: productForm.discountPrice !== "" ? Number(productForm.discountPrice) : null };
      if (editingProduct) {
        const { product } = await api.updateProduct(editingProduct, payload);
        setProducts(ps => ps.map(p => p._id === editingProduct ? product : p));
        setSnack({ msg: "Product updated!", severity: "success" });
      } else {
        const { product } = await api.createProduct(payload);
        setProducts(ps => [product, ...ps]);
        setSnack({ msg: "Product created!", severity: "success" });
      }
      setProductDialog(false);
    } catch (err) { setSnack({ msg: err.message, severity: "error" }); }
    finally { setProductSaving(false); }
  }

  async function confirmDelete() {
    try {
      await api.deleteProduct(deleteConfirm);
      setProducts(ps => ps.filter(p => p._id !== deleteConfirm));
      setSnack({ msg: "Product deleted.", severity: "success" });
    } catch (err) { setSnack({ msg: err.message, severity: "error" }); }
    finally { setDeleteConfirm(null); }
  }

  async function updateStatus(orderId, status) {
    try {
      const { order } = await api.updateOrderStatus(orderId, status);
      setOrders(os => os.map(o => o._id === orderId ? { ...o, status: order.status } : o));
      setSnack({ msg: "Status updated to " + status, severity: "success" });
    } catch (err) { setSnack({ msg: err.message, severity: "error" }); }
  }

  const fProducts = products.filter(p =>
    (p.name||"").toLowerCase().includes(productSearch.toLowerCase()) ||
    (p.category||"").toLowerCase().includes(productSearch.toLowerCase()));
  const fOrders = orders.filter(o => {
    const ms = orderFilter === "All" || o.status === orderFilter;
    const mq = !orderSearch || (o.user?.name||o.user?.email||"").toLowerCase().includes(orderSearch.toLowerCase()) || o._id.includes(orderSearch);
    return ms && mq;
  });
  const fUsers = users.filter(u =>
    (u.name||"").toLowerCase().includes(userSearch.toLowerCase()) ||
    (u.email||"").toLowerCase().includes(userSearch.toLowerCase()));

  const sw = sidebarOpen ? 240 : 64;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f1f5f9" }}>

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <Box sx={{
        width: sw, flexShrink: 0, bgcolor: "#0f172a", display: "flex", flexDirection: "column",
        transition: "width 0.25s ease", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 1200, overflowX: "hidden",
      }}>
        {/* Brand */}
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1.5, borderBottom: "1px solid rgba(255,255,255,0.08)", minHeight: 64 }}>
          <Box sx={{ width: 36, height: 36, borderRadius: "10px", background: "linear-gradient(135deg,#3b82f6,#1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Typography sx={{ color: "#fff", fontWeight: 900, fontSize: "1rem" }}>S</Typography>
          </Box>
          {sidebarOpen && <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem", whiteSpace: "nowrap" }}>SkSync <span style={{ color: "#3b82f6" }}>Admin</span></Typography>}
          <IconButton onClick={() => setSidebarOpen(s => !s)} size="small" sx={{ ml: "auto", color: "rgba(255,255,255,0.5)", "&:hover": { color: "#fff" } }}>
            {sidebarOpen ? <CloseIcon sx={{ fontSize: 18 }} /> : <MenuIcon sx={{ fontSize: 18 }} />}
          </IconButton>
        </Box>

        {/* Nav links */}
        <Box sx={{ flex: 1, pt: 2 }}>
          {NAV_ITEMS.map(({ id, label, Icon }) => {
            const active = activeTab === id;
            return (
              <Tooltip key={id} title={!sidebarOpen ? label : ""} placement="right">
                <Box onClick={() => setActiveTab(id)} sx={{
                  display: "flex", alignItems: "center", gap: 1.5, px: 2, py: 1.4, mx: 1, mb: 0.5,
                  borderRadius: "10px", cursor: "pointer",
                  bgcolor: active ? "rgba(59,130,246,0.18)" : "transparent",
                  borderLeft: active ? "3px solid #3b82f6" : "3px solid transparent",
                  color: active ? "#3b82f6" : "rgba(255,255,255,0.55)",
                  transition: "all 0.18s ease",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.07)", color: "#fff" },
                }}>
                  <Icon sx={{ fontSize: 20, flexShrink: 0 }} />
                  {sidebarOpen && <Typography sx={{ fontWeight: active ? 700 : 500, fontSize: "0.875rem", whiteSpace: "nowrap" }}>{label}</Typography>}
                </Box>
              </Tooltip>
            );
          })}
        </Box>

        {/* Admin info + logout */}
        <Box sx={{ p: 2, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {sidebarOpen && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Avatar sx={{ width: 34, height: 34, bgcolor: "#1d4ed8", fontSize: "0.85rem", fontWeight: 700 }}>{(session?.name || "A")[0]}</Avatar>
              <Box>
                <Typography sx={{ color: "#fff", fontSize: "0.8rem", fontWeight: 700, lineHeight: 1.2 }}>{session?.name || "Admin"}</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem" }}>Administrator</Typography>
              </Box>
            </Box>
          )}
          <Tooltip title={!sidebarOpen ? "Logout" : ""} placement="right">
            <Box onClick={() => { logout(); navigate("/login"); }} sx={{
              display: "flex", alignItems: "center", gap: 1.5, px: 1.5, py: 1,
              borderRadius: "8px", cursor: "pointer", color: "rgba(255,255,255,0.45)",
              "&:hover": { bgcolor: "rgba(239,68,68,0.15)", color: "#f87171" }, transition: "all 0.18s",
            }}>
              <LogoutIcon sx={{ fontSize: 18, flexShrink: 0 }} />
              {sidebarOpen && <Typography sx={{ fontSize: "0.8rem", fontWeight: 500 }}>Logout</Typography>}
            </Box>
          </Tooltip>
        </Box>
      </Box>

      {/* ── Main content ─────────────────────────────────────── */}
      <Box sx={{ ml: sw + "px", flex: 1, transition: "margin-left 0.25s ease", minWidth: 0 }}>

        {/* Topbar */}
        <Box sx={{ position: "sticky", top: 0, zIndex: 100, bgcolor: "#fff", borderBottom: "1px solid #e2e8f0", px: 4, py: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: "1.15rem", color: "#0f172a" }}>
              {NAV_ITEMS.find(n => n.id === activeTab)?.label}
            </Typography>
            <Typography sx={{ fontSize: "0.78rem", color: "#94a3b8" }}>SkSync Admin Panel · Total Website Control</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
            <Button startIcon={<RefreshIcon />} onClick={loadData} size="small" sx={{ color: "#64748b", fontWeight: 600, "&:hover": { bgcolor: "#f1f5f9" } }}>Refresh</Button>
            <Button variant="outlined" size="small" onClick={() => navigate("/home")} sx={{ borderColor: "#cbd5e1", color: "#334155", fontWeight: 600 }}>Visit Store</Button>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ pt: 10, textAlign: "center" }}>
            <CircularProgress sx={{ color: "#3b82f6" }} />
            <Typography sx={{ mt: 2, color: "#64748b" }}>Loading data from MongoDB…</Typography>
          </Box>
        ) : (
          <Box sx={{ p: { xs: 2, md: 4 } }}>

            {/* ══ OVERVIEW ══════════════════════════════════ */}
            {activeTab === "overview" && (
              <>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  {[
                    { label: "Total Revenue", value: "₹" + totalRevenue.toLocaleString("en-IN"), color: "#3b82f6", bg: "#eff6ff", Icon: CurrencyRupeeIcon },
                    { label: "Total Orders",  value: orders.length,   color: "#8b5cf6", bg: "#f5f3ff", Icon: ShoppingBagIcon },
                    { label: "Total Users",   value: users.length,    color: "#10b981", bg: "#ecfdf5", Icon: PeopleIcon },
                    { label: "Total Products",value: products.length, color: "#f59e0b", bg: "#fffbeb", Icon: InventoryIcon },
                  ].map((s, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                      <Paper sx={{ p: 3, borderRadius: "14px", border: "1px solid #e2e8f0", boxShadow: "none" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <Box>
                            <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, mb: 0.5 }}>{s.label}</Typography>
                            <Typography sx={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>{s.value}</Typography>
                          </Box>
                          <Box sx={{ bgcolor: s.bg, borderRadius: "10px", p: 1.2, color: s.color, display: "flex" }}><s.Icon /></Box>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1.5 }}>
                          <TrendingUpIcon sx={{ fontSize: 14, color: "#10b981" }} />
                          <Typography sx={{ fontSize: "0.72rem", color: "#10b981", fontWeight: 600 }}>Live · MongoDB Sync</Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Paper sx={{ borderRadius: "14px", border: "1px solid #e2e8f0", boxShadow: "none" }}>
                      <Box sx={{ px: 3, pt: 3, pb: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>Recent Orders</Typography>
                        <Button size="small" onClick={() => setActiveTab("orders")} sx={{ color: "#3b82f6", fontWeight: 600, fontSize: "0.78rem" }}>View All</Button>
                      </Box>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ bgcolor: "#f8fafc" }}>
                              {["Order ID","Customer","Total","Status"].map(h => (
                                <TableCell key={h} sx={{ fontWeight: 700, color: "#64748b", fontSize: "0.72rem", textTransform: "uppercase" }}>{h}</TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {orders.slice(0, 6).map(o => (
                              <TableRow key={o._id} hover sx={{ "&:last-child td": { border: 0 } }}>
                                <TableCell sx={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#3b82f6" }}>#{o._id.slice(-8).toUpperCase()}</TableCell>
                                <TableCell sx={{ fontSize: "0.85rem" }}>{o.user?.name || o.user?.email || "—"}</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>₹{o.total}</TableCell>
                                <TableCell><Chip label={o.status} size="small" sx={{ bgcolor: STATUS_STYLES[o.status]?.bg || "#f1f5f9", color: STATUS_STYLES[o.status]?.color || "#64748b", fontWeight: 600, fontSize: "0.72rem" }} /></TableCell>
                              </TableRow>
                            ))}
                            {!orders.length && <TableRow><TableCell colSpan={4} sx={{ textAlign: "center", py: 4, color: "#94a3b8" }}>No orders yet.</TableCell></TableRow>}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ borderRadius: "14px", border: "1px solid #e2e8f0", boxShadow: "none", p: 3, height: "100%" }}>
                      <Typography sx={{ fontWeight: 700, color: "#0f172a", mb: 2.5 }}>User Breakdown</Typography>
                      {[{ label: "Customers", count: users.length - adminsCount, color: "#3b82f6" }, { label: "Admins", count: adminsCount, color: "#8b5cf6" }].map(r => (
                        <Box key={r.label} sx={{ mb: 2.5 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                            <Typography sx={{ fontSize: "0.85rem", fontWeight: 600 }}>{r.label}</Typography>
                            <Typography sx={{ fontSize: "0.85rem", fontWeight: 700 }}>{r.count}</Typography>
                          </Box>
                          <LinearProgress variant="determinate" value={users.length ? (r.count / users.length) * 100 : 0}
                            sx={{ height: 6, borderRadius: 3, bgcolor: "#f1f5f9", "& .MuiLinearProgress-bar": { bgcolor: r.color, borderRadius: 3 } }} />
                        </Box>
                      ))}
                      <Divider sx={{ my: 2 }} />
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: "0.85rem", color: "#64748b" }}>Total Registered</Typography>
                        <Typography sx={{ fontWeight: 800, fontSize: "1.2rem" }}>{users.length}</Typography>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </>
            )}

            {/* ══ PRODUCTS ═════════════════════════════════ */}
            {activeTab === "products" && (
              <>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, gap: 2 }}>
                  <TextField size="small" placeholder="Search products…" value={productSearch} onChange={e => setProductSearch(e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: "#94a3b8" }} /></InputAdornment> }}
                    sx={{ width: 280, "& fieldset": { borderColor: "#e2e8f0" } }} />
                  <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}
                    sx={{ bgcolor: "#1e40af", "&:hover": { bgcolor: "#1e3a8a" }, fontWeight: 700, borderRadius: "10px" }}>
                    Add Product
                  </Button>
                </Box>
                <Paper sx={{ borderRadius: "14px", border: "1px solid #e2e8f0", boxShadow: "none" }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#f8fafc" }}>
                          {["Product","Category","Brand","Price","Stock","Gender","Actions"].map(h => (
                            <TableCell key={h} sx={{ fontWeight: 700, color: "#64748b", fontSize: "0.72rem", textTransform: "uppercase" }}>{h}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {fProducts.map(p => (
                          <TableRow key={p._id} hover sx={{ "&:last-child td": { border: 0 } }}>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                <Box component="img" src={p.image || "https://placehold.co/40x40/e5e7eb/9ca3af?text=?"} alt={p.name}
                                  sx={{ width: 40, height: 40, borderRadius: "8px", objectFit: "cover", flexShrink: 0 }} />
                                <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", color: "#0f172a" }}>{p.name}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell><Chip label={p.category} size="small" sx={{ bgcolor: "#eff6ff", color: "#1e40af", fontWeight: 600, fontSize: "0.72rem" }} /></TableCell>
                            <TableCell sx={{ fontSize: "0.85rem" }}>{p.brand || "—"}</TableCell>
                            <TableCell>
                              <Typography sx={{ fontWeight: 700 }}>₹{p.discountPrice || p.price}</Typography>
                              {p.discountPrice && <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8", textDecoration: "line-through" }}>₹{p.price}</Typography>}
                            </TableCell>
                            <TableCell>
                              <Chip label={p.stock} size="small" sx={{
                                bgcolor: p.stock > 10 ? "#dcfce7" : p.stock > 0 ? "#fef9c3" : "#fee2e2",
                                color: p.stock > 10 ? "#15803d" : p.stock > 0 ? "#92400e" : "#b91c1c", fontWeight: 700, fontSize: "0.75rem"
                              }} />
                            </TableCell>
                            <TableCell sx={{ fontSize: "0.8rem", textTransform: "capitalize" }}>{p.gender}</TableCell>
                            <TableCell>
                              <Stack direction="row" spacing={0.5}>
                                <Tooltip title="Edit">
                                  <IconButton size="small" onClick={() => openEdit(p)} sx={{ color: "#3b82f6", "&:hover": { bgcolor: "#eff6ff" } }}><EditIcon sx={{ fontSize: 17 }} /></IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                  <IconButton size="small" onClick={() => setDeleteConfirm(p._id)} sx={{ color: "#ef4444", "&:hover": { bgcolor: "#fee2e2" } }}><DeleteIcon sx={{ fontSize: 17 }} /></IconButton>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                        {!fProducts.length && <TableRow><TableCell colSpan={7} sx={{ textAlign: "center", py: 5, color: "#94a3b8" }}>No products found.</TableCell></TableRow>}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </>
            )}

            {/* ══ ORDERS ═══════════════════════════════════ */}
            {activeTab === "orders" && (
              <>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3, flexWrap: "wrap" }}>
                  <TextField size="small" placeholder="Search by customer / order ID…" value={orderSearch} onChange={e => setOrderSearch(e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: "#94a3b8" }} /></InputAdornment> }}
                    sx={{ width: 300, "& fieldset": { borderColor: "#e2e8f0" } }} />
                  <FormControl size="small" sx={{ minWidth: 140 }}>
                    <InputLabel>Status</InputLabel>
                    <Select value={orderFilter} label="Status" onChange={e => setOrderFilter(e.target.value)}>
                      <MenuItem value="All">All</MenuItem>
                      {STATUS_LIST.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <Typography sx={{ ml: "auto", fontSize: "0.85rem", color: "#64748b" }}>{fOrders.length} orders</Typography>
                </Box>
                <Paper sx={{ borderRadius: "14px", border: "1px solid #e2e8f0", boxShadow: "none" }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#f8fafc" }}>
                          {["Order ID","Customer","Date","Items","Total","Payment","Status","Update"].map(h => (
                            <TableCell key={h} sx={{ fontWeight: 700, color: "#64748b", fontSize: "0.72rem", textTransform: "uppercase" }}>{h}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {fOrders.map(o => (
                          <TableRow key={o._id} hover sx={{ "&:last-child td": { border: 0 } }}>
                            <TableCell sx={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#3b82f6" }}>#{o._id.slice(-8).toUpperCase()}</TableCell>
                            <TableCell sx={{ fontSize: "0.85rem" }}>{o.user?.name || o.user?.email || "—"}</TableCell>
                            <TableCell sx={{ fontSize: "0.8rem", color: "#64748b" }}>{new Date(o.createdAt).toLocaleDateString("en-IN")}</TableCell>
                            <TableCell sx={{ fontSize: "0.85rem" }}>{o.items?.length || 0} item(s)</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>₹{o.total}</TableCell>
                            <TableCell><Chip label={(o.paymentMethod||"cod").toUpperCase()} size="small" sx={{ bgcolor: "#f1f5f9", color: "#475569", fontWeight: 600, fontSize: "0.72rem" }} /></TableCell>
                            <TableCell><Chip label={o.status} size="small" sx={{ bgcolor: STATUS_STYLES[o.status]?.bg || "#f1f5f9", color: STATUS_STYLES[o.status]?.color || "#64748b", fontWeight: 600, fontSize: "0.72rem" }} /></TableCell>
                            <TableCell>
                              <FormControl size="small" sx={{ minWidth: 120 }}>
                                <Select value={o.status} onChange={e => updateStatus(o._id, e.target.value)} sx={{ fontSize: "0.8rem", "& fieldset": { borderColor: "#e2e8f0" } }}>
                                  {STATUS_LIST.map(s => <MenuItem key={s} value={s} sx={{ fontSize: "0.8rem" }}>{s}</MenuItem>)}
                                </Select>
                              </FormControl>
                            </TableCell>
                          </TableRow>
                        ))}
                        {!fOrders.length && <TableRow><TableCell colSpan={8} sx={{ textAlign: "center", py: 5, color: "#94a3b8" }}>No orders found.</TableCell></TableRow>}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </>
            )}

            {/* ══ USERS ════════════════════════════════════ */}
            {activeTab === "users" && (
              <>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                  <TextField size="small" placeholder="Search by name or email…" value={userSearch} onChange={e => setUserSearch(e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: "#94a3b8" }} /></InputAdornment> }}
                    sx={{ width: 300, "& fieldset": { borderColor: "#e2e8f0" } }} />
                  <Typography sx={{ fontSize: "0.85rem", color: "#64748b" }}>{fUsers.length} users</Typography>
                </Box>
                <Paper sx={{ borderRadius: "14px", border: "1px solid #e2e8f0", boxShadow: "none" }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#f8fafc" }}>
                          {["User","Email","Mobile","Gender","Role","Joined"].map(h => (
                            <TableCell key={h} sx={{ fontWeight: 700, color: "#64748b", fontSize: "0.72rem", textTransform: "uppercase" }}>{h}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {fUsers.map(u => (
                          <TableRow key={u._id} hover sx={{ "&:last-child td": { border: 0 } }}>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                <Avatar sx={{ width: 34, height: 34, bgcolor: u.role === "admin" ? "#1d4ed8" : "#0ea5e9", fontSize: "0.85rem", fontWeight: 700 }}>
                                  {(u.name || u.email || "U")[0].toUpperCase()}
                                </Avatar>
                                <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", color: "#0f172a" }}>{u.name || "—"}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell sx={{ fontSize: "0.85rem" }}>{u.email}</TableCell>
                            <TableCell sx={{ fontSize: "0.85rem" }}>{u.mobile || "—"}</TableCell>
                            <TableCell sx={{ fontSize: "0.8rem", textTransform: "capitalize" }}>{u.gender || "—"}</TableCell>
                            <TableCell>
                              <Chip label={u.role} size="small" sx={{ bgcolor: u.role === "admin" ? "#e0e7ff" : "#dbeafe", color: u.role === "admin" ? "#172554" : "#1d4ed8", fontWeight: 700, fontSize: "0.72rem" }} />
                            </TableCell>
                            <TableCell sx={{ fontSize: "0.8rem", color: "#64748b" }}>{u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-IN") : "—"}</TableCell>
                          </TableRow>
                        ))}
                        {!fUsers.length && <TableRow><TableCell colSpan={6} sx={{ textAlign: "center", py: 5, color: "#94a3b8" }}>No users found.</TableCell></TableRow>}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </>
            )}

            {/* ══ SITE CONTROL / SETTINGS ══════════════════ */}
            {activeTab === "settings" && (
              <Paper sx={{ p: 4, borderRadius: "14px", border: "1px solid #e2e8f0", boxShadow: "none", maxWidth: 800 }}>
                <Typography sx={{ fontWeight: 800, fontSize: "1.2rem", color: "#0f172a", mb: 0.5 }}>
                  Website Settings & Announcement Control
                </Typography>
                <Typography sx={{ fontSize: "0.85rem", color: "#64748b", mb: 3 }}>
                  Configure website banners, active coupon codes, shipping thresholds, and store status.
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Homepage Ticker Announcement Strip"
                      multiline
                      rows={2}
                      value={siteSettings.tickerText}
                      onChange={e => setSiteSettings(s => ({ ...s, tickerText: e.target.value }))}
                      helperText="This announcement scrolls continuously across the top bar of the website."
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Active Coupon Code"
                      value={siteSettings.promoCode}
                      onChange={e => setSiteSettings(s => ({ ...s, promoCode: e.target.value }))}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Coupon Discount Percentage / Amount"
                      value={siteSettings.promoDiscount}
                      onChange={e => setSiteSettings(s => ({ ...s, promoDiscount: e.target.value }))}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Free Shipping Threshold (₹)"
                      type="number"
                      value={siteSettings.freeShippingMin}
                      onChange={e => setSiteSettings(s => ({ ...s, freeShippingMin: Number(e.target.value) }))}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={siteSettings.maintenanceMode}
                          onChange={e => setSiteSettings(s => ({ ...s, maintenanceMode: e.target.checked }))}
                          color="primary"
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: siteSettings.maintenanceMode ? "#ef4444" : "#334155" }}>
                          {siteSettings.maintenanceMode ? "Store Maintenance Mode (ON)" : "Store Active & Live (OFF)"}
                        </Typography>
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={() => setSnack({ msg: "Website settings saved successfully!", severity: "success" })}
                      sx={{ bgcolor: "#1e40af", "&:hover": { bgcolor: "#1e3a8a" }, fontWeight: 700, px: 4, borderRadius: "8px" }}
                    >
                      Save Settings
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            )}

          </Box>
        )}
      </Box>

      {/* ── Add/Edit Product Dialog ──────────────────────────── */}
      <Dialog open={productDialog} onClose={() => setProductDialog(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: "16px" } }}>
        <DialogTitle sx={{ fontWeight: 800, color: "#0f172a", pb: 1 }}>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 2.5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}><TextField fullWidth size="small" label="Product Name *" value={productForm.name} onChange={e => setProductForm(f => ({ ...f, name: e.target.value }))} sx={{ "& fieldset": { borderRadius: "8px" } }} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Category *" value={productForm.category} onChange={e => setProductForm(f => ({ ...f, category: e.target.value }))} sx={{ "& fieldset": { borderRadius: "8px" } }} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Brand" value={productForm.brand} onChange={e => setProductForm(f => ({ ...f, brand: e.target.value }))} sx={{ "& fieldset": { borderRadius: "8px" } }} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Price (₹) *" type="number" value={productForm.price} onChange={e => setProductForm(f => ({ ...f, price: e.target.value }))} sx={{ "& fieldset": { borderRadius: "8px" } }} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Discount Price (₹)" type="number" value={productForm.discountPrice} onChange={e => setProductForm(f => ({ ...f, discountPrice: e.target.value }))} sx={{ "& fieldset": { borderRadius: "8px" } }} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Stock *" type="number" value={productForm.stock} onChange={e => setProductForm(f => ({ ...f, stock: e.target.value }))} sx={{ "& fieldset": { borderRadius: "8px" } }} /></Grid>
            <Grid item xs={12} sm={6}>
              <FormControl size="small" fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select value={productForm.gender} label="Gender" onChange={e => setProductForm(f => ({ ...f, gender: e.target.value }))} sx={{ borderRadius: "8px" }}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="unisex">Unisex</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}><TextField fullWidth size="small" label="Image URL" value={productForm.image} onChange={e => setProductForm(f => ({ ...f, image: e.target.value }))} sx={{ "& fieldset": { borderRadius: "8px" } }} /></Grid>
            <Grid item xs={12}><TextField fullWidth size="small" label="Description" multiline rows={3} value={productForm.description} onChange={e => setProductForm(f => ({ ...f, description: e.target.value }))} sx={{ "& fieldset": { borderRadius: "8px" } }} /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button onClick={() => setProductDialog(false)} sx={{ color: "#64748b", fontWeight: 600 }}>Cancel</Button>
          <Button variant="contained" onClick={saveProduct}
            disabled={productSaving || !productForm.name || !productForm.category || !productForm.price}
            sx={{ bgcolor: "#1e40af", "&:hover": { bgcolor: "#1e3a8a" }, fontWeight: 700, borderRadius: "8px", px: 3 }}>
            {productSaving ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : editingProduct ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Delete Confirm Dialog ────────────────────────────── */}
      <Dialog open={Boolean(deleteConfirm)} onClose={() => setDeleteConfirm(null)} PaperProps={{ sx: { borderRadius: "14px" } }}>
        <DialogTitle sx={{ fontWeight: 800, color: "#0f172a" }}>Delete Product?</DialogTitle>
        <DialogContent><Typography sx={{ color: "#475569" }}>This action cannot be undone. The product will be permanently removed from the database.</Typography></DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button onClick={() => setDeleteConfirm(null)} sx={{ color: "#64748b", fontWeight: 600 }}>Cancel</Button>
          <Button variant="contained" onClick={confirmDelete} sx={{ bgcolor: "#ef4444", "&:hover": { bgcolor: "#dc2626" }, fontWeight: 700, borderRadius: "8px" }}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* ── Snackbar ─────────────────────────────────────────── */}
      <Snackbar open={Boolean(snack)} autoHideDuration={3500} onClose={() => setSnack(null)} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity={snack?.severity || "info"} onClose={() => setSnack(null)} sx={{ fontWeight: 600, borderRadius: "10px" }}>{snack?.msg}</Alert>
      </Snackbar>
    </Box>
  );
}

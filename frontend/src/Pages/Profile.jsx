import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import PageHeading from "../Components/PageHeading";
import ProductTable from "../Components/ProductTable";
import FormStatusAlert from "../Components/FormStatusAlert";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const STATUS_COLOR = {
  Placed: "info",
  Shipped: "warning",
  Delivered: "success",
  Cancelled: "error"
};

export default function Profile() {
  const { session, logout, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", mobile: "" });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const [{ user }, { orders: myOrders }] = await Promise.all([api.getProfile(), api.myOrders()]);
        if (!isMounted) return;
        setFormData({ name: user.name, mobile: user.mobile });
        setOrders(myOrders);
      } catch (error) {
        if (isMounted) setStatus({ type: "error", message: error.message });
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.updateProfile({ name: formData.name, mobile: formData.mobile });
      await refreshProfile();
      setStatus({ type: "success", message: "Profile updated successfully." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 10, textAlign: "center" }}>
        <CircularProgress color="primary" />
      </Container>
    );
  }

  const orderRows = orders.map((o) => ({
    id: o._id.slice(-8).toUpperCase(),
    date: new Date(o.createdAt).toLocaleDateString(),
    status: <Chip label={o.status} color={STATUS_COLOR[o.status] || "default"} size="small" />,
    total: `Rs. ${o.total}`
  }));

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <PageHeading title="My Profile" />

      <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main", mt: 3, mb: 2 }}>
        Personal Information
      </Typography>
      <ProductTable
        columns={[
          { key: "label", label: "" },
          { key: "value", label: "" }
        ]}
        rows={[
          { label: "Name", value: session?.name || "—" },
          { label: "Email", value: session?.email || "—" },
          { label: "Mobile", value: session?.mobile || "—" },
          { label: "Role", value: session?.role === "admin" ? "Admin" : "Customer" }
        ]}
      />

      <Paper variant="outlined" sx={{ p: 4, maxWidth: 480, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Update Profile
        </Typography>
        <FormStatusAlert status={status} />
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField fullWidth margin="normal" label="Name" name="name" value={formData.name} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Update Profile
          </Button>
        </Box>
      </Paper>

      <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main", mt: 5, mb: 2 }}>
        My Orders
      </Typography>
      <ProductTable
        columns={[
          { key: "id", label: "Order ID" },
          { key: "date", label: "Date" },
          { key: "status", label: "Status" },
          { key: "total", label: "Total" }
        ]}
        rows={orderRows.length ? orderRows : [{ id: "No orders yet.", date: "", status: "", total: "" }]}
      />

      <Button onClick={handleLogout} color="error" variant="outlined">
        Logout
      </Button>
    </Container>
  );
}

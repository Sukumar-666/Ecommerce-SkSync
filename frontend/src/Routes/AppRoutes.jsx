import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Components/Layout";
import ProtectedRoute from "../Components/ProtectedRoute";

import Homepage from "../Pages/Homepage";
import About from "../Pages/About";
import Products from "../Pages/Products";
import Categories from "../Pages/Categories";
import Brands from "../Pages/Brands";
import Offers from "../Pages/Offers";
import Gallery from "../Pages/Gallery";
import Testimonials from "../Pages/Testimonials";
import Contact from "../Pages/Contact";
import Faq from "../Pages/Faq";
import Cart from "../Pages/Cart";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import OtpVerification from "../Pages/OtpVerification";
import VerifyEmail from "../Pages/VerifyEmail";
import ForgotPassword from "../Pages/ForgotPassword";
import Profile from "../Pages/Profile";
import Checkout from "../Pages/Checkout";
import Payment from "../Pages/Payment";
import OrderSuccess from "../Pages/OrderSuccess";
import ProductDetails from "../Pages/ProductDetails";
import EnquiryForm from "../Pages/EnquiryForm";
import ApplicationForm from "../Pages/ApplicationForm";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import TermsAndConditions from "../Pages/TermsAndConditions";
import ShippingPolicy from "../Pages/ShippingPolicy";
import ReturnPolicy from "../Pages/ReturnPolicy";
import AdminDashboard from "../Pages/AdminDashboard";

import RoutineBuilder from "../Pages/RoutineBuilder";
import GroomingLab from "../Pages/GroomingLab";
import Lookbook from "../Pages/Lookbook";
import FlashDeals from "../Pages/FlashDeals";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* The site now opens on Login; Homepage moved to /home.
            /login is kept as an alias since other pages link to it. */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Homepage />} />

        {/* 4 Creative & Feature Pages */}
        <Route path="/routine-builder" element={<RoutineBuilder />} />
        <Route path="/grooming-lab" element={<GroomingLab />} />
        <Route path="/lookbook" element={<Lookbook />} />
        <Route path="/deal-zone" element={<FlashDeals />} />

        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/enquiry-form" element={<EnquiryForm />} />
        <Route path="/application-form" element={<ApplicationForm />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected: placing/viewing an order requires a logged-in user
            since orders are saved against req.user in MongoDB. */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute requiredRole="any">
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute requiredRole="any">
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-success"
          element={
            <ProtectedRoute requiredRole="any">
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        {/* Protected: any logged-in user */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute requiredRole="any">
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Admin dashboard — outside Layout (has its own full-screen sidebar) */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;

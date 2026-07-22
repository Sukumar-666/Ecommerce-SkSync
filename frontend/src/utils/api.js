// Every request goes through here. Two big changes from the old version:
//   1. The access token now lives in memory only (a module variable), not
//      localStorage — it disappears on tab close/refresh by design.
//   2. The refresh token lives in an httpOnly cookie the browser sends
//      automatically (credentials: "include") — JS can never read it, which
//      is what makes it safe to keep it long-lived.
// On page load, AuthContext calls silentRefresh() once to turn that cookie
// back into a fresh access token, so the user doesn't have to log in again
// just because they refreshed the page.

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://sksync-backend.onrender.com/api";

let accessToken = null;
export function getAccessToken() {
  return accessToken;
}
export function setAccessToken(token) {
  accessToken = token;
}

async function rawRequest(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth && accessToken) headers.Authorization = `Bearer ${accessToken}`;

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      credentials: "include", // sends/receives the httpOnly refresh cookie
      body: body ? JSON.stringify(body) : undefined
    });
  } catch {
    throw new Error("Could not reach the server. Is the backend running?");
  }

  const data = await response.json().catch(() => ({}));
  return { response, data };
}

// Attempts to turn the refresh cookie into a new access token.
// Returns the new token, or null if there's no valid session.
export async function silentRefresh() {
  const { response, data } = await rawRequest("/auth/refresh", { method: "POST" });
  if (!response.ok) {
    accessToken = null;
    return null;
  }
  accessToken = data.accessToken;
  return data;
}

async function request(path, options = {}) {
  let { response, data } = await rawRequest(path, options);

  // Access token expired mid-session — refresh once, silently, and retry.
  if (!response.ok && data.code === "TOKEN_EXPIRED") {
    const refreshed = await silentRefresh();
    if (refreshed) {
      ({ response, data } = await rawRequest(path, options));
    }
  }

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }
  return data;
}

const api = {
  // --- Signup / email verification ---
  signup: (payload) => request("/auth/signup", { method: "POST", body: payload }),
  verifyEmail: (token) => request(`/auth/verify-email/${token}`),
  resendVerification: (email) => request("/auth/resend-verification", { method: "POST", body: { email } }),

  // --- Login (step 1: password) + 2FA (step 2: OTP) ---
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  verifyOtp: (payload) => request("/auth/verify-otp", { method: "POST", body: payload }),
  resendOtp: (pendingToken) => request("/auth/resend-otp", { method: "POST", body: { pendingToken } }),

  // --- Session ---
  refresh: silentRefresh,
  logout: () => request("/auth/logout", { method: "POST" }),
  logoutAll: () => request("/auth/logout-all", { method: "POST", auth: true }),
  me: () => request("/auth/me", { auth: true }),

  // --- Users ---
  getProfile: () => request("/users/profile", { auth: true }),
  updateProfile: (payload) => request("/users/profile", { method: "PUT", body: payload, auth: true }),
  listUsers: () => request("/users", { auth: true }),

  // --- Products (gender-personalized) ---
  getProducts: (params = "") => request(`/products${params}`),
  getProduct: (id) => request(`/products/${id}`),

  // --- Products (admin CRUD) ---
  createProduct: (payload) => request("/products", { method: "POST", body: payload, auth: true }),
  updateProduct: (id, payload) => request(`/products/${id}`, { method: "PUT", body: payload, auth: true }),
  deleteProduct: (id) => request(`/products/${id}`, { method: "DELETE", auth: true }),

  // --- Orders ---
  placeOrder: (payload) => request("/orders", { method: "POST", body: payload, auth: true }),
  myOrders: () => request("/orders/my", { auth: true }),
  allOrders: () => request("/orders", { auth: true }),
  updateOrderStatus: (id, status) => request(`/orders/${id}/status`, { method: "PUT", body: { status }, auth: true }),
};

export default api;

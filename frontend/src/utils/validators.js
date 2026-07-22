// Field-level validators — same rules as the original vanilla-JS validation.js,
// reused across every form in the React app.

export const PATTERNS = {
  name: /^[A-Za-z\s]{2,50}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  mobile: /^[6-9]\d{9}$/,
  pincode: /^\d{6}$/,
  cardNumber: /^\d{13,16}$/,
  cvv: /^\d{3,4}$/,
  expiry: /^(0[1-9]|1[0-2])\/\d{2}$/
};

export function validateRequired(value) {
  if (value === undefined || value === null) return "This field is required.";
  if (typeof value === "boolean") return value ? "" : "This field is required.";
  return String(value).trim() === "" ? "This field is required." : "";
}

export function validateEmail(value) {
  if (!value) return "";
  return PATTERNS.email.test(value.trim()) ? "" : "Please enter a valid email address.";
}

export function validateMobile(value) {
  if (!value) return "";
  return PATTERNS.mobile.test(value.trim()) ? "" : "Please enter a valid 10-digit mobile number.";
}

export function validatePincode(value) {
  if (!value) return "";
  return PATTERNS.pincode.test(value.trim()) ? "" : "Please enter a valid 6-digit pincode.";
}

export function validateName(value) {
  if (!value) return "";
  return PATTERNS.name.test(value.trim()) ? "" : "Please enter a valid name (letters only).";
}

export function validatePassword(value) {
  if (!value) return "";
  return value.length >= 6 ? "" : "Password must be at least 6 characters.";
}

export function validateConfirmPassword(value, password) {
  if (!value) return "";
  return value === password ? "" : "Passwords do not match.";
}

export function validateCardNumber(value) {
  if (!value) return "";
  return PATTERNS.cardNumber.test(value.replace(/\s/g, "")) ? "" : "Enter a valid 13-16 digit card number.";
}

export function validateCvv(value) {
  if (!value) return "";
  return PATTERNS.cvv.test(value.trim()) ? "" : "Enter a valid 3-4 digit CVV.";
}

export function validateExpiry(value) {
  if (!value) return "";
  return PATTERNS.expiry.test(value.trim()) ? "" : "Use MM/YY format for expiry date.";
}

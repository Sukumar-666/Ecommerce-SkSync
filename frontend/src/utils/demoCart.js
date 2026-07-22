// In a full build this would come from the Cart page / a cart context.
// Kept as a small shared constant so Checkout, Payment, and Order Success
// all agree on the same items/totals when placing a real order via the API.
export const DEMO_CART_ITEMS = [
  { name: "Matte Lipstick", price: 499, qty: 1 },
  { name: "Hydrating Face Serum", price: 899, qty: 1 },
  { name: "Kajal Pencil", price: 199, qty: 2 }
];

export const SHIPPING_FEE = 50;

export function getCartTotals(items = DEMO_CART_ITEMS) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  return { subtotal, shipping: SHIPPING_FEE, total: subtotal + SHIPPING_FEE };
}

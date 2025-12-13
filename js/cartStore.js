const CART_KEY = "shopnest_cart_v1";

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart:updated"));
}

export function getCart() {
  return readCart();
}

export function getCartCount() {
  return readCart().reduce((sum, it) => sum + (it.qty || 0), 0);
}

export function addToCart(product, qty = 1) {
  const cart = readCart();
  const found = cart.find((x) => x.id === product.id);

  if (found) found.qty += qty;
  else cart.push({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    category: product.category,
    qty
  });

  writeCart(cart);
}

export function updateQty(id, nextQty) {
  const cart = readCart();
  const item = cart.find((x) => x.id === id);
  if (!item) return;

  item.qty = Math.max(1, Number(nextQty) || 1);
  writeCart(cart);
}

export function removeFromCart(id) {
  const cart = readCart().filter((x) => x.id !== id);
  writeCart(cart);
}

export function clearCart() {
  writeCart([]);
}

const KEY = "shopnest:wishlist";

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

function write(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("wishlist:updated"));
}

export function getWishlist() {
  return read();
}

export function isInWishlist(id) {
  return read().some((p) => p.id === id);
}

export function addToWishlist(product) {
  const items = read();
  if (!items.some((p) => p.id === product.id)) {
    items.push(product);
    write(items);
  }
}

export function removeFromWishlist(id) {
  write(read().filter((p) => p.id !== id));
}

export function toggleWishlist(product) {
  isInWishlist(product.id)
    ? removeFromWishlist(product.id)
    : addToWishlist(product);
}

export function clearWishlist() {
  write([]);
}

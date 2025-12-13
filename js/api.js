const API_URL = "https://fakestoreapi.com/products";

export async function getProducts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

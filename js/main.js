import { getProducts } from "./api.js";
import { initProducts, showSkeleton } from "./products.js";
import { initAuthUI } from "./auth-ui.js";
import { getCartCount } from "./cartStore.js";
import { loadFooter } from "./footer.js";

loadFooter();

function renderNavCartCount() {
  const el = document.getElementById("nav-cart-count");
  if (el) el.textContent = String(getCartCount());
}

async function init() {
  initAuthUI();
  renderNavCartCount();
  window.addEventListener("cart:updated", renderNavCartCount);

  showSkeleton();

  try {
    const products = await getProducts();
    initProducts(products);
  } catch (e) {
    const grid = document.getElementById("cards");
    if (grid) grid.innerHTML = `<p style="color: var(--muted);">Failed to load products. Refresh and try again.</p>`;
    console.error(e);
  }
}

init();

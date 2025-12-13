import { initAuthUI } from "./auth-ui.js";
import { getWishlist, clearWishlist, removeFromWishlist } from "./wishlistStore.js";
import { addToCart } from "./cartStore.js";

function money(n) {
  return `$${Number(n).toFixed(2)}`;
}

function render() {
  const root = document.getElementById("wishlist-items");
  const items = getWishlist();

  if (!root) return;

  if (items.length === 0) {
    root.innerHTML = `
      <div class="empty">
        <p style="margin:0 0 8px;"><strong>Your wishlist is empty.</strong></p>
        <p style="margin:0;">Browse products and tap “Wishlist” to save items.</p>
      </div>
    `;
    return;
  }

  root.innerHTML = items.map((it) => `
    <article class="item">
      <div class="item__img">
        <img src="${it.image}" alt="${it.title}" loading="lazy" />
      </div>

      <div>
        <h3 class="item__title" title="${it.title}">${it.title}</h3>
        <p class="item__meta">${it.category} • ${money(it.price)}</p>
      </div>

      <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-end;">
        <button class="btn btn--primary" type="button" data-cart="${it.id}">Add to cart</button>
        <button class="btn btn--ghost" type="button" data-remove="${it.id}">Remove</button>
      </div>
    </article>
  `).join("");

  root.querySelectorAll("[data-cart]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.cart);
      const item = getWishlist().find(x => x.id === id);
      if (!item) return;
      addToCart(item, 1);
      btn.textContent = "Added ✓";
      setTimeout(() => (btn.textContent = "Add to cart"), 700);
    });
  });

  root.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => removeFromWishlist(Number(btn.dataset.remove)));
  });
}

document.getElementById("clear-wishlist")?.addEventListener("click", clearWishlist);
window.addEventListener("wishlist:updated", render);

initAuthUI();
render();

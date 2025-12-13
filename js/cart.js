import { initAuthUI } from "./auth-ui.js";
import { getCart, getCartCount, updateQty, removeFromCart, clearCart } from "./cartStore.js";
import { loadFooter } from "./footer.js";

loadFooter();

function money(n) {
  return `$${Number(n).toFixed(2)}`;
}

function renderNavCount() {
  const el = document.getElementById("nav-cart-count");
  if (el) el.textContent = String(getCartCount());
}

function render() {
  const root = document.getElementById("cart-items");
  const items = getCart();

  renderNavCount();

  if (!root) return;

  if (items.length === 0) {
    root.innerHTML = `
      <div class="empty">
        <p style="margin:0 0 8px;"><strong>Your cart is empty.</strong></p>
        <p style="margin:0;">Go back and add something cool ✨</p>
      </div>
    `;
    updateSummary();
    return;
  }

  root.innerHTML = items.map((it) => `
    <article class="cartItem">
      <div class="cartItem__img">
        <img src="${it.image}" alt="${it.title}" loading="lazy" />
      </div>

      <div>
        <h3 class="cartItem__title" title="${it.title}">${it.title}</h3>
        <div class="cartItem__meta">
          <span>${it.category}</span>
          <span>•</span>
          <span>${money(it.price)}</span>

          <span style="margin-left:auto;"></span>

          <div class="qty" aria-label="Quantity controls">
            <button class="qty__btn" data-dec="${it.id}" type="button">−</button>
            <span class="qty__num">${it.qty}</span>
            <button class="qty__btn" data-inc="${it.id}" type="button">+</button>
          </div>
        </div>
      </div>

      <div class="cartItem__right">
        <div style="font-weight:900;">${money(it.price * it.qty)}</div>
        <button class="btn btn--ghost" data-remove="${it.id}" type="button">Remove</button>
      </div>
    </article>
  `).join("");

  root.querySelectorAll("[data-inc]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.inc);
      const item = getCart().find(x => x.id === id);
      if (item) updateQty(id, item.qty + 1);
    });
  });

  root.querySelectorAll("[data-dec]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.dec);
      const item = getCart().find(x => x.id === id);
      if (item) updateQty(id, Math.max(1, item.qty - 1));
    });
  });

  root.querySelectorAll("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => removeFromCart(Number(btn.dataset.remove)));
  });

  updateSummary();
}

function updateSummary() {
  const items = getCart();
  const count = items.reduce((s, it) => s + it.qty, 0);
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);

  const sItems = document.getElementById("summary-items");
  const sSub = document.getElementById("summary-subtotal");
  const sTotal = document.getElementById("summary-total");

  if (sItems) sItems.textContent = String(count);
  if (sSub) sSub.textContent = money(subtotal);
  if (sTotal) sTotal.textContent = money(subtotal);
}

document.getElementById("clear-cart")?.addEventListener("click", () => clearCart());

window.addEventListener("cart:updated", render);

initAuthUI();
render();

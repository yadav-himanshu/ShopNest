import { initAuthUI } from "./auth-ui.js";
import { getCart, clearCart } from "./cartStore.js";

function money(n) {
  return `$${Number(n).toFixed(2)}`;
}

function renderCheckout() {
  const items = getCart();
  const list = document.getElementById("checkout-items");
  const empty = document.getElementById("empty-checkout");

  const countEl = document.getElementById("co-items");
  const subEl = document.getElementById("co-subtotal");
  const totalEl = document.getElementById("co-total");
  const placeBtn = document.getElementById("place-order");

  const count = items.reduce((s, it) => s + it.qty, 0);
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);

  if (countEl) countEl.textContent = String(count);
  if (subEl) subEl.textContent = money(subtotal);
  if (totalEl) totalEl.textContent = money(subtotal);

  if (!list) return;

  if (items.length === 0) {
    list.innerHTML = "";
    if (empty) empty.hidden = false;
    if (placeBtn) placeBtn.disabled = true;
    return;
  }

  if (empty) empty.hidden = true;
  if (placeBtn) placeBtn.disabled = false;

  list.innerHTML = items.map((it) => `
    <div class="mini">
      <div class="mini__img"><img src="${it.image}" alt="${it.title}" /></div>
      <div>
        <p class="mini__title" title="${it.title}">${it.title}</p>
        <p class="mini__meta">${it.qty} × ${money(it.price)}</p>
      </div>
      <div style="font-weight:900;">${money(it.qty * it.price)}</div>
    </div>
  `).join("");
}

document.getElementById("checkout-form")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const items = getCart();
  if (items.length === 0) return;

  // Demo checkout: clear cart and show success message
  clearCart();

  document.getElementById("order-success")?.removeAttribute("hidden");
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  renderCheckout();
});

window.addEventListener("cart:updated", renderCheckout);

initAuthUI();
renderCheckout();

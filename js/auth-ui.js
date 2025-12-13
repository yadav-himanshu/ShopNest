import { isLoggedIn, getLoggedInName, logoutUser } from "./auth.js";
import { getCartCount } from "./cartStore.js";

function setHidden(el, hidden) {
  if (!el) return;
  el.hidden = hidden;
}

function updateCartBadge() {
  const badge = document.getElementById("nav-cart-count");
  if (badge) badge.textContent = String(getCartCount());
}

export function initAuthUI() {
  const guest = document.getElementById("guest-actions");
  const user = document.getElementById("user-actions");
  const userName = document.getElementById("user-name");
  const logoutBtn = document.getElementById("logout-button");

  const logged = isLoggedIn();

  // ✅ Fix: ensure exactly one section is visible
  setHidden(guest, logged);
  setHidden(user, !logged);

  setHidden(logoutBtn, !logged);


  if (logged && userName) {
    userName.textContent = `Hi, ${getLoggedInName() || "User"}`;
  }

  logoutBtn?.addEventListener("click", () => {
    logoutUser();
    window.location.href = "index.html";
  });

  // Update cart badge now + when cart changes
  updateCartBadge();
  window.addEventListener("cart:updated", updateCartBadge);

  // Mobile menu toggle
  const menuBtn = document.getElementById("menu-toggle");
  const menu = document.getElementById("nav-menu");

  menuBtn?.addEventListener("click", () => {
    const open = menu?.getAttribute("data-open") === "true";
    menu?.setAttribute("data-open", open ? "false" : "true");
  });

  // Close menu when clicking a nav link (mobile UX)
  document.querySelectorAll("#nav-menu a").forEach((a) => {
    a.addEventListener("click", () => menu?.setAttribute("data-open", "false"));
  });
}

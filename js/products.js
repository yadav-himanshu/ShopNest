import { addToCart } from "./cartStore.js";

const PAGE_SIZE = 6;

let allProducts = [];
let viewProducts = [];
let currentPage = 1;

let state = {
  q: "",
  category: "all",
  sort: "default",
};

function money(n) {
  return `$${Number(n).toFixed(2)}`;
}

function totalPages() {
  return Math.max(1, Math.ceil(viewProducts.length / PAGE_SIZE));
}

function sliceForPage(page) {
  const start = (page - 1) * PAGE_SIZE;
  return viewProducts.slice(start, start + PAGE_SIZE);
}

function clampPage(page) {
  return Math.min(Math.max(page, 1), totalPages());
}

function uniqueCategories(products) {
  return [...new Set(products.map(p => p.category))].sort();
}

function applyFilters() {
  const q = state.q.trim().toLowerCase();

  viewProducts = allProducts.filter((p) => {
    const matchesQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);

    const matchesCat = state.category === "all" || p.category === state.category;

    return matchesQ && matchesCat;
  });

  switch (state.sort) {
    case "price-asc":
      viewProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      viewProducts.sort((a, b) => b.price - a.price);
      break;
    case "title-asc":
      viewProducts.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "title-desc":
      viewProducts.sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      // keep API order
      break;
  }
}

function updateCount() {
  const el = document.getElementById("result-count");
  if (!el) return;
  el.textContent = `${viewProducts.length} products • Page ${currentPage}/${totalPages()}`;
}

function renderCards(items) {
  const grid = document.getElementById("cards");
  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = `<p style="color: var(--muted);">No products found.</p>`;
    return;
  }

  grid.innerHTML = items.map((p) => `
    <article class="card" data-open="${p.id}">
      <div class="card__media">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
      </div>

      <div class="card__body">
        <h2 class="card__title" title="${p.title}">${p.title}</h2>
        <p class="card__desc">${p.description}</p>

        <div class="card__meta">
          <span class="category">${p.category}</span>
          <span class="price">${money(p.price)}</span>
        </div>
      </div>

      <div class="card__actions">
        <button class="btn btn--primary btn--cart" type="button" data-cart="${p.id}">
          Add to cart
        </button>
        
        <button class="btn btn--ghost btn--view" type="button" data-view="${p.id}">
          View
        </button>
      </div>
    </article>
  `).join("");

  // Prevent card click when clicking buttons
  grid.querySelectorAll("[data-cart]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = Number(btn.dataset.cart);
      const product = allProducts.find(x => x.id === id);
      if (!product) return;

      addToCart(product, 1);
      btn.textContent = "Added ✓";
      setTimeout(() => (btn.textContent = "Add to cart"), 700);
    });
  });

  grid.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openModal(Number(btn.dataset.view));
    });
  });

  grid.querySelectorAll("[data-open]").forEach((card) => {
    card.addEventListener("click", () => openModal(Number(card.dataset.open)));
  });
}

function renderPagination() {
  const prev = document.getElementById("prev-page");
  const next = document.getElementById("next-page");
  const pages = document.getElementById("page-buttons");

  const tp = totalPages();
  currentPage = clampPage(currentPage);

  if (prev) prev.disabled = currentPage === 1;
  if (next) next.disabled = currentPage === tp;

  if (pages) {
    const maxButtons = 7;
    const half = Math.floor(maxButtons / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(tp, start + maxButtons - 1);
    start = Math.max(1, end - maxButtons + 1);

    pages.innerHTML = Array.from({ length: end - start + 1 }, (_, i) => {
      const n = start + i;
      return `
        <button class="btn ${n === currentPage ? "btn--primary" : "btn--ghost"}"
          type="button" data-page="${n}" aria-current="${n === currentPage ? "page" : "false"}">
          ${n}
        </button>
      `;
    }).join("");

    pages.querySelectorAll("[data-page]").forEach((b) => {
      b.addEventListener("click", () => {
        currentPage = Number(b.dataset.page);
        update();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  if (prev) prev.onclick = () => { currentPage--; update(); window.scrollTo({ top: 0, behavior: "smooth" }); };
  if (next) next.onclick = () => { currentPage++; update(); window.scrollTo({ top: 0, behavior: "smooth" }); };
}

function renderCategorySelect() {
  const sel = document.getElementById("category-select");
  if (!sel) return;

  const cats = uniqueCategories(allProducts);
  sel.innerHTML = `<option value="all">All categories</option>` + cats.map(c => `<option value="${c}">${c}</option>`).join("");
  sel.value = state.category;
}

function bindControls() {
  const search = document.getElementById("search-input");
  const cat = document.getElementById("category-select");
  const sort = document.getElementById("sort-select");

  search?.addEventListener("input", () => {
    state.q = search.value;
    currentPage = 1;
    update();
  });

  cat?.addEventListener("change", () => {
    state.category = cat.value;
    currentPage = 1;
    update();
  });

  sort?.addEventListener("change", () => {
    state.sort = sort.value;
    currentPage = 1;
    update();
  });
}

/* Modal */
function openModal(id) {
  const product = allProducts.find(p => p.id === id);
  if (!product) return;

  const modal = document.getElementById("product-modal");
  const content = document.getElementById("modal-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="modalGrid">
      <div class="modalImg">
        <img src="${product.image}" alt="${product.title}" />
      </div>
      <div>
        <h2 class="modalTitle">${product.title}</h2>
        <p class="modalText">${product.description}</p>

        <div class="modalRow">
          <span class="category">${product.category}</span>
          <span class="price" style="font-size:18px;">${money(product.price)}</span>
        </div>

        <div class="modalRow" style="margin-top:14px;">
          <button class="btn btn--primary" id="modal-add" type="button">Add to cart</button>
          <a class="btn btn--ghost" href="cart.html">Go to cart</a>
        </div>
      </div>
    </div>
  `;

  content.querySelector("#modal-add")?.addEventListener("click", () => {
    addToCart(product, 1);
    const btn = content.querySelector("#modal-add");
    if (btn) {
      btn.textContent = "Added ✓";
      btn.disabled = true;
      setTimeout(() => { btn.disabled = false; btn.textContent = "Add to cart"; }, 700);
    }
  });

  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("product-modal");
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function bindModal() {
  const modal = document.getElementById("product-modal");
  if (!modal) return;

  modal.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.dataset && t.dataset.close === "true") closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

export function showSkeleton() {
  const grid = document.getElementById("cards");
  if (!grid) return;

  grid.innerHTML = Array.from({ length: PAGE_SIZE }, () => `
    <div class="skel">
      <div class="skel__media"></div>
      <div class="skel__line lg"></div>
      <div class="skel__line md"></div>
      <div class="skel__line sm"></div>
      <div class="skel__line md"></div>
    </div>
  `).join("");
}

export function initProducts(products) {
  allProducts = Array.isArray(products) ? products : [];
  viewProducts = [...allProducts];
  currentPage = 1;

  renderCategorySelect();
  bindControls();
  bindModal();

  update();
}

function update() {
  applyFilters();
  currentPage = clampPage(currentPage);
  renderCards(sliceForPage(currentPage));
  renderPagination();
  updateCount();
}

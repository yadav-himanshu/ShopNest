import { ApiService } from '../services/ApiService.js';
import { ProductCard } from '../components/ProductCard.js';
import { Skeleton } from '../components/Skeleton.js';

export class ShopPage {
    constructor(root, params) {
        this.root = root;
        this.params = params;
        this.products = [];
        this.categories = [];
        this.currentCategory = params?.get('category') || 'all';
        this.currentSort = 'default';
        this.searchQuery = '';
        this.isLoading = true;
    }

    async render() {
        this.root.innerHTML = `
      <div class="page shop-page">
        <header class="hero">
          <div class="container hero-container">
            <h1 class="hero-title">Experience Premium.<br/>Shop with Style.</h1>
            <p class="hero-subtitle">Curated collection of the finest essentials for your lifestyle.</p>
          </div>
        </header>

        <section class="container shop-section">
          <div class="shop-toolbar glass">
            <div class="toolbar-search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="search-icon" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" id="search-input" class="search-input" placeholder="Search for products...">
            </div>
            
            <div class="toolbar-filters">
              <div class="filter-group">
                <label>Category</label>
                <select id="category-select" class="select toolbar-select">
                  <option value="all">All Categories</option>
                </select>
              </div>
              <div class="filter-group">
                <label>Sort By</label>
                <select id="sort-select" class="select toolbar-select">
                  <option value="default">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          <div class="results-bar">
            <span id="results-count" class="badge">Checking products...</span>
          </div>

          <div id="product-grid" class="product-grid">
          </div>
        </section>
      </div>
    `;

        const gridEl = this.root.querySelector('#product-grid');
        gridEl.innerHTML = '';
        for (let i = 0; i < 8; i++) {
            gridEl.appendChild(Skeleton.productCard());
        }

        this.injectStyles();
        this.attachEvents();

        await this.fetchData();
    }

    async fetchData() {
        try {
            this.products = await ApiService.getProducts();
            this.categories = [...new Set(this.products.map(p => p.category))];

            const catSelect = this.root.querySelector('#category-select');
            this.categories.forEach(cat => {
                const opt = document.createElement('option');
                opt.value = cat;
                opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
                catSelect.appendChild(opt);
            });

            // Set initial value from params if exists
            if (this.currentCategory !== 'all') {
                catSelect.value = this.currentCategory;
            }

            this.isLoading = false;
            this.updateView();
        } catch (e) {
            this.root.querySelector('#product-grid').innerHTML = `
        <div class="error-state">
          <h3>Connection Error</h3>
          <p>We couldn't load the store products. Please try again later.</p>
          <button class="btn btn-primary" onclick="window.location.reload()">Refresh Page</button>
        </div>
      `;
        }
    }

    attachEvents() {
        const searchInput = this.root.querySelector('#search-input');
        const catSelect = this.root.querySelector('#category-select');
        const sortSelect = this.root.querySelector('#sort-select');

        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.updateView();
        });

        catSelect.addEventListener('change', (e) => {
            this.currentCategory = e.target.value;
            this.updateView();
        });

        sortSelect.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.updateView();
        });
    }

    getFilteredProducts() {
        let filtered = [...this.products];

        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(p => p.category === this.currentCategory);
        }

        if (this.searchQuery) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(this.searchQuery) ||
                p.category.toLowerCase().includes(this.searchQuery)
            );
        }

        switch (this.currentSort) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating.rate - a.rating.rate);
                break;
            default:
                break;
        }

        return filtered;
    }

    updateView() {
        if (this.isLoading) return;

        const filtered = this.getFilteredProducts();
        const grid = this.root.querySelector('#product-grid');
        const count = this.root.querySelector('#results-count');

        grid.innerHTML = '';
        count.textContent = `Showing ${filtered.length} products`;

        if (filtered.length === 0) {
            grid.innerHTML = `
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <h3>No matches found</h3>
          <p>Try searching for something else or clearing your filters.</p>
        </div>
      `;
            return;
        }

        filtered.forEach(p => {
            grid.appendChild(ProductCard.create(p));
        });
    }

    injectStyles() {
        if (document.getElementById('shop-page-styles')) return;
        const style = document.createElement('style');
        style.id = 'shop-page-styles';
        style.textContent = `
      .shop-page {
        padding-top: 0 !important;
      }
      .hero {
        background: radial-gradient(circle at top right, var(--accent-light) 0%, var(--bg-secondary) 100%);
        padding: var(--space-12) 0;
        margin-bottom: var(--space-8);
        border-bottom: 1px solid var(--border-light);
      }
      .hero-title {
        font-size: 3.5rem;
        margin-bottom: var(--space-4);
        line-height: 1.1;
        letter-spacing: -2px;
        color: var(--text-primary);
      }
      .hero-subtitle {
        font-size: 1.25rem;
        max-width: 500px;
        color: var(--text-secondary);
      }
      .shop-section {
        margin-bottom: var(--space-12);
      }
      .shop-toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-6);
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-8);
        padding: var(--space-6);
        border-radius: var(--radius-2xl);
        background: var(--bg-primary);
        box-shadow: var(--shadow-xl);
        border: 1px solid var(--border-light);
      }
      .toolbar-search {
        position: relative;
        flex: 1;
        min-width: 300px;
      }
      .search-icon {
        position: absolute;
        left: var(--space-4);
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
        pointer-events: none;
        z-index: 2;
      }
      .search-input {
        width: 100%;
        padding: var(--space-3) var(--space-4) var(--space-3) 48px;
        border-radius: var(--radius-xl);
        border: 1px solid var(--border-medium);
        background: var(--bg-tertiary);
        font-size: 1rem;
        transition: all 0.2s;
      }
      .search-input:focus {
        border-color: var(--accent-base);
        background: var(--bg-primary);
        box-shadow: 0 0 0 4px var(--accent-light);
      }
      .toolbar-filters {
        display: flex;
        gap: var(--space-4);
      }
      .filter-group {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
      }
      .filter-group label {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        color: var(--text-muted);
        letter-spacing: 0.05em;
      }
      .toolbar-select {
        min-width: 160px;
        border-radius: var(--radius-lg);
      }
      .results-bar {
        margin-bottom: var(--space-6);
        display: flex;
        align-items: center;
      }
      .product-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: var(--space-8);
      }
      .empty-state, .error-state {
        grid-column: 1 / -1;
        text-align: center;
        padding: var(--space-12) 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-4);
      }
      @media (max-width: 768px) {
        .hero-title { font-size: 2.5rem; }
        .shop-toolbar { gap: var(--space-4); }
        .toolbar-search { min-width: 100%; }
        .toolbar-filters { width: 100%; justify-content: space-between; }
        .toolbar-select { min-width: 48%; }
      }
    `;
        document.head.appendChild(style);
    }
}

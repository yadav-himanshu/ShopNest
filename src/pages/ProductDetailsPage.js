import { ApiService } from '../services/ApiService.js';
import { CartService } from '../services/CartService.js';
import { WishlistService } from '../services/WishlistService.js';
import { Toast } from '../components/Toast.js';
import { formatCurrency } from '../utils/helpers.js';

export class ProductDetailsPage {
  constructor(root, params) {
    this.root = root;
    this.params = params;
    this.product = null;
    this.isLoading = true;
  }

  async render() {
    this.root.innerHTML = `
      <div class="page container pdp-page">
        <a href="/" class="btn btn-ghost back-btn" style="margin-bottom: var(--space-6); display: inline-flex; align-items: center;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Collection
        </a>
        <div id="pdp-content">
          <div class="pdp-skeleton">
            <div class="skeleton-img-box skeleton"></div>
            <div class="skeleton-info">
              <div class="skeleton skeleton-text" style="height: 40px; margin-bottom: 20px;"></div>
              <div class="skeleton skeleton-text" style="width: 40%; height: 32px; margin-bottom: 30px;"></div>
              <div class="skeleton skeleton-text" style="height: 100px; margin-bottom: 30px;"></div>
              <div class="skeleton skeleton-text" style="height: 56px; width: 220px; border-radius: 28px;"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.injectStyles();
    await this.fetchProduct();
  }

  async fetchProduct() {
    const id = this.params.get('id');

    if (!id) {
      this.root.querySelector('#pdp-content').innerHTML = `
        <div class="error-state">
          <h3>Product Not Found</h3>
          <p>We couldn't find the item you're looking for.</p>
          <a href="/" class="btn btn-primary">Back to Store</a>
        </div>
      `;
      return;
    }

    try {
      this.product = await ApiService.getProduct(id);
      this.isLoading = false;
      this.updateView();
    } catch (e) {
      this.root.querySelector('#pdp-content').innerHTML = `
        <div class="error-state">
          <h3>Oops! Something went wrong</h3>
          <p>We had trouble loading the product details.</p>
          <button class="btn btn-primary" onclick="window.location.reload()">Retry</button>
        </div>
      `;
    }
  }

  updateView() {
    const content = this.root.querySelector('#pdp-content');
    const p = this.product;

    content.innerHTML = `
      <div class="pdp-grid">
        <div class="pdp-image-col">
          <div class="pdp-image-wrapper glass">
            <img src="${p.image}" alt="${p.title}" class="pdp-image" />
          </div>
        </div>
        <div class="pdp-info-col">
          <div class="pdp-meta">
            <span class="pdp-category">${p.category}</span>
            <div class="pdp-rating">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--warning)" stroke="var(--warning)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <strong>${p.rating.rate}</strong>
              <span class="rating-count">(${p.rating.count} reviews)</span>
            </div>
          </div>
          
          <h1 class="pdp-title">${p.title}</h1>
          <div class="pdp-price">${formatCurrency(p.price)}</div>
          
          <div class="pdp-description">
            <h3>Description</h3>
            <p>${p.description}</p>
          </div>
          
          <div class="pdp-actions">
            <button id="pdp-add-btn" class="btn btn-primary btn-lg btn-block">
              Add to Cart
            </button>
            <button id="pdp-wishlist-btn" class="btn btn-outline btn-lg wishlist-toggle-btn ${WishlistService.isInWishlist(p.id) ? 'active' : ''}">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="${WishlistService.isInWishlist(p.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </button>
          </div>
          
          <div class="pdp-features">
            <div class="feature">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l5 5l10 -10"></path></svg>
              <span>Authentic Quality</span>
            </div>
            <div class="feature">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              <span>Express Shipping Available</span>
            </div>
          </div>
        </div>
      </div>
    `;

    this.root.querySelector('#pdp-add-btn').addEventListener('click', () => {
      CartService.addItem(this.product);
      Toast.show('Added to cart!');
      window.dispatchEvent(new CustomEvent('cart:toggle'));
    });

    const wishlistBtn = this.root.querySelector('#pdp-wishlist-btn');
    wishlistBtn.addEventListener('click', () => {
      const added = WishlistService.toggleWishlist(this.product);
      wishlistBtn.classList.toggle('active', added);
      const svg = wishlistBtn.querySelector('svg');
      svg.setAttribute('fill', added ? 'currentColor' : 'none');
      Toast.show(added ? 'Added to wishlist' : 'Removed from wishlist', 'info');
    });
  }

  injectStyles() {
    if (document.getElementById('pdp-styles')) return;
    const style = document.createElement('style');
    style.id = 'pdp-styles';
    style.textContent = `
      .pdp-page { padding-bottom: var(--space-12); }
      .pdp-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-12);
        align-items: start;
      }
      .pdp-image-wrapper {
        background: #ffffff;
        border-radius: var(--radius-2xl);
        padding: var(--space-10);
        border: 1px solid var(--border-light);
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: var(--shadow-xl);
      }
      .pdp-image {
        max-height: 500px;
        width: 100%;
        object-fit: contain;
        transition: transform 0.5s ease;
      }
      .pdp-image:hover { transform: scale(1.05); }

      .pdp-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-4);
      }
      .pdp-category {
        color: var(--accent-base);
        text-transform: uppercase;
        font-weight: 800;
        font-size: 0.75rem;
        letter-spacing: 0.1em;
      }
      .pdp-rating {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.875rem;
      }
      .pdp-rating strong { color: var(--text-primary); }
      .rating-count { color: var(--text-muted); }

      .pdp-title {
        font-size: 2.75rem;
        margin-bottom: var(--space-2);
        line-height: 1.1;
        letter-spacing: -1px;
      }
      .pdp-price {
        font-size: 2.25rem;
        font-weight: 800;
        color: var(--text-primary);
        margin-bottom: var(--space-8);
      }
      .pdp-description {
        margin-bottom: var(--space-10);
      }
      .pdp-description h3 {
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: var(--space-3);
        color: var(--text-primary);
      }
      .pdp-description p {
        font-size: 1.0625rem;
        line-height: 1.6;
        color: var(--text-secondary);
      }

      .pdp-actions {
        display: flex;
        gap: var(--space-4);
        margin-bottom: var(--space-8);
      }
      .pdp-actions #pdp-add-btn { flex: 1; height: 56px; border-radius: 28px; }
      .wishlist-toggle-btn {
        width: 56px;
        height: 56px;
        border-radius: 50% !important;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-muted);
        transition: all 0.2s;
        padding: 0 !important;
      }
      .wishlist-toggle-btn.active, .wishlist-toggle-btn:hover {
        color: #ef4444;
        border-color: #fecaca;
        background: #fff;
      }

      .pdp-features {
        margin-top: var(--space-10);
        padding-top: var(--space-8);
        border-top: 1px solid var(--border-light);
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-4);
      }
      .feature {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        color: var(--text-secondary);
        font-weight: 600;
        font-size: 0.875rem;
      }
      .feature svg { color: var(--accent-base); }

      @media (max-width: 1024px) {
        .pdp-grid { grid-template-columns: 1fr; gap: var(--space-8); }
        .pdp-title { font-size: 2rem; }
      }
    `;
    document.head.appendChild(style);
  }
}

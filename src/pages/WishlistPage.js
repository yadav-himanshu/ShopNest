import { WishlistService } from '../services/WishlistService.js';
import { formatCurrency } from '../utils/helpers.js';
import { Toast } from '../components/Toast.js';

export class WishlistPage {
    constructor(root) {
        this.root = root;
    }

    async render() {
        const wishlist = WishlistService.getWishlist();

        this.root.innerHTML = `
      <div class="container page wishlist-page">
        <div class="header-section">
          <h1>My Wishlist</h1>
          <p>${wishlist.length} items saved for later</p>
        </div>

        ${wishlist.length === 0 ? `
          <div class="empty-wishlist glass card text-center">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <h2>Your wishlist is empty</h2>
            <p>Save items you like to see them here and buy them later!</p>
            <a href="/" class="btn btn-primary">Start Shopping</a>
          </div>
        ` : `
          <div class="wishlist-grid">
            ${wishlist.map(product => `
              <div class="wishlist-item glass card" data-id="${product.id}">
                <div class="item-img">
                  <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="item-info">
                  <h3>${product.name}</h3>
                  <div class="item-meta">
                    <span class="price">${formatCurrency(product.price)}</span>
                    <span class="category">${product.category}</span>
                  </div>
                </div>
                <div class="item-actions">
                  <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                  <button class="btn btn-outline remove-btn" data-id="${product.id}">Remove</button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;

        this.attachEvents();
        this.injectStyles();
    }

    attachEvents() {
        const removeBtns = this.root.querySelectorAll('.remove-btn');
        const addToCartBtns = this.root.querySelectorAll('.add-to-cart-btn');

        removeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const wishlist = WishlistService.getWishlist();
                const product = wishlist.find(p => p.id === parseInt(id));
                if (product) {
                    WishlistService.toggleWishlist(product);
                    Toast.show('Item removed from wishlist', 'info');
                    this.render();
                }
            });
        });

        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const wishlist = WishlistService.getWishlist();
                const product = wishlist.find(p => p.id === parseInt(id));
                if (product) {
                    // Dispatch custom event for cart service
                    window.dispatchEvent(new CustomEvent('cart-add', { detail: product }));
                    Toast.show('Added to cart!', 'success');
                }
            });
        });
    }

    injectStyles() {
        if (document.getElementById('wishlist-styles')) return;
        const style = document.createElement('style');
        style.id = 'wishlist-styles';
        style.textContent = `
      .wishlist-page { margin-top: var(--space-8); }
      .header-section { margin-bottom: var(--space-8); text-align: center; }
      .header-section h1 { font-size: 2.5rem; letter-spacing: -1px; margin-bottom: var(--space-2); }
      .header-section p { color: var(--text-muted); }

      .empty-wishlist { padding: var(--space-12); display: flex; flex-direction: column; align-items: center; gap: var(--space-4); }
      .empty-wishlist svg { margin-bottom: var(--space-4); opacity: 0.5; }

      .wishlist-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-6); }
      .wishlist-item { display: flex; flex-direction: column; padding: var(--space-4); border-radius: var(--radius-2xl); transition: transform 0.2s; }
      .wishlist-item:hover { transform: translateY(-4px); border-color: var(--accent-base); }
      
      .item-img { aspect-ratio: 1; border-radius: var(--radius-xl); overflow: hidden; background: white; margin-bottom: var(--space-4); padding: var(--space-4); }
      .item-img img { width: 100%; height: 100%; object-fit: contain; }

      .item-info { flex: 1; margin-bottom: var(--space-4); }
      .item-info h3 { font-size: 1.125rem; margin-bottom: var(--space-2); font-weight: 700; color: var(--text-primary); }
      .item-meta { display: flex; align-items: center; justify-content: space-between; }
      .price { font-size: 1.25rem; font-weight: 800; color: var(--accent-base); }
      .category { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; background: var(--bg-secondary); padding: 4px 10px; border-radius: 100px; }

      .item-actions { display: flex; flex-direction: column; gap: var(--space-2); }
      .item-actions button { width: 100%; }
    `;
        document.head.appendChild(style);
    }
}

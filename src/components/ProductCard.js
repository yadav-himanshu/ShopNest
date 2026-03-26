import { formatCurrency } from '../utils/helpers.js';
import { CartService } from '../services/CartService.js';
import { WishlistService } from '../services/WishlistService.js';
import { Toast } from './Toast.js';

export class ProductCard {
  static create(product) {
    const card = document.createElement('article');
    card.className = 'product-card';
    const isInWishlist = WishlistService.isInWishlist(product.id);

    card.innerHTML = `
      <div class="product-image-container">
        <a href="/product?id=${product.id}">
          <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy" />
          <div class="product-overlay">
            <span>View Details</span>
          </div>
        </a>
        <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" aria-label="Toggle wishlist">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="${isInWishlist ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </button>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <a href="/product?id=${product.id}" class="product-title-link">
          <h3 class="product-title">${product.title}</h3>
        </a>
        <div class="product-rating">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--warning)" stroke="var(--warning)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <span>${product.rating.rate}</span>
          <span class="rating-count">(${product.rating.count})</span>
        </div>
        <div class="product-bottom">
          <span class="product-price">${formatCurrency(product.price)}</span>
          <button class="btn btn-primary add-to-cart-btn" aria-label="Add to cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        </div>
      </div>
    `;

    const wishlistBtn = card.querySelector('.wishlist-btn');
    wishlistBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const added = WishlistService.toggleWishlist(product);
      wishlistBtn.classList.toggle('active', added);
      const svg = wishlistBtn.querySelector('svg');
      svg.setAttribute('fill', added ? 'currentColor' : 'none');
      Toast.show(added ? 'Added to wishlist' : 'Removed from wishlist', 'info');
    });

    const addBtn = card.querySelector('.add-to-cart-btn');
    addBtn.addEventListener('click', (e) => {
      e.preventDefault(); // prevent navigation
      CartService.addItem(product);
      Toast.show('Added to cart!');
      // small pop animation on button
      addBtn.style.transform = 'scale(0.9)';
      setTimeout(() => addBtn.style.transform = '', 150);
    });

    this.injectStyles();
    return card;
  }

  static injectStyles() {
    if (document.getElementById('product-card-styles')) return;
    const style = document.createElement('style');
    style.id = 'product-card-styles';
    style.textContent = `
      .product-card {
        background: var(--bg-primary);
        border: 1px solid var(--border-light);
        border-radius: var(--radius-xl);
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .product-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
        border-color: var(--border-medium);
      }
      .product-image-container {
        position: relative;
        padding-top: 100%; /* 1:1 aspect ratio */
        background: var(--bg-primary); /* to ensure white bg for transparent product imgs */
        overflow: hidden;
        display: block;
      }
      .product-image {
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        object-fit: contain;
        padding: var(--space-4);
        transition: transform 0.5s ease;
        filter: drop-shadow(0 4px 6px rgba(0,0,0,0.05));
      }
      .product-overlay {
        position: absolute;
        inset: 0;
        background: rgba(15, 23, 42, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .product-overlay span {
        background: var(--bg-tertiary);
        color: var(--text-primary);
        padding: var(--space-2) var(--space-4);
        border-radius: var(--radius-full);
        font-weight: 500;
        font-size: 0.875rem;
        transform: translateY(10px);
        transition: transform 0.3s ease;
      }
      .product-card:hover .product-overlay {
        opacity: 1;
      }
      .product-card:hover .product-image {
        transform: scale(1.05);
      }
      .product-card:hover .product-overlay span {
        transform: translateY(0);
      }
      .product-info {
        padding: var(--space-4);
        display: flex;
        flex-direction: column;
        flex: 1;
      }
      .product-category {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--accent-base);
        font-weight: 700;
        margin-bottom: var(--space-1);
      }
      .product-title-link {
        margin-bottom: var(--space-2);
        flex: 1;
      }
      .product-title {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-primary);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-height: 1.4;
      }
      .product-rating {
        display: flex;
        align-items: center;
        gap: var(--space-1);
        font-size: 0.875rem;
        color: var(--text-primary);
        font-weight: 600;
        margin-bottom: var(--space-4);
      }
      .rating-count {
        color: var(--text-muted);
        font-weight: 400;
        margin-left: 2px;
      }
      .product-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: auto;
      }
      .product-price {
        font-size: 1.25rem;
        font-weight: 800;
        color: var(--text-primary);
      }
      .add-to-cart-btn {
        width: 36px;
        height: 36px;
        padding: 0;
        border-radius: var(--radius-full);
      }
      .wishlist-btn {
        position: absolute;
        top: var(--space-3);
        right: var(--space-3);
        width: 36px;
        height: 36px;
        background: var(--bg-primary);
        color: var(--text-muted);
        border: 1px solid var(--border-light);
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        transition: all 0.2s;
        box-shadow: var(--shadow-sm);
      }
      .wishlist-btn:hover {
        transform: scale(1.1);
        color: #ef4444;
        border-color: #fecaca;
      }
      .wishlist-btn.active {
        color: #ef4444;
        background: #fff;
      }
    `;
    document.head.appendChild(style);
  }
}

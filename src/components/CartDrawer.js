import { CartService } from '../services/CartService.js';
import { formatCurrency, createElementFromHTML } from '../utils/helpers.js';

export class CartDrawer {
  static root = null;
  static container = null;
  static isOpen = false;

  static mount(rootElement) {
    this.root = rootElement;
    this.injectStyles();
    this.render();

    window.addEventListener('cart:toggle', () => this.toggle());
    window.addEventListener('cart:updated', () => {
      if (this.isOpen) this.renderContent();
    });
  }

  static toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.container.classList.add('open');
      document.body.style.overflow = 'hidden'; // prevent bg scroll
      this.renderContent();
    } else {
      this.container.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  static render() {
    this.container = createElementFromHTML(`
      <div class="cart-drawer-wrapper">
        <div class="cart-overlay"></div>
        <aside class="cart-drawer">
          <header class="cart-header">
            <h2>Your Cart</h2>
            <button class="btn btn-ghost close-cart" aria-label="Close cart">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </header>
          <div class="cart-body"></div>
          <footer class="cart-footer">
            <div class="cart-total-row">
              <span>Total</span>
              <span class="cart-total-price">$0.00</span>
            </div>
            <a href="/checkout" class="btn btn-primary checkout-btn" style="width: 100%; padding: var(--space-4); font-size: 1rem;">
              Proceed to Checkout
            </a>
          </footer>
        </aside>
      </div>
    `);

    this.container.querySelector('.cart-overlay').addEventListener('click', () => this.toggle());
    this.container.querySelector('.close-cart').addEventListener('click', () => this.toggle());

    // Close cart when clicking link
    this.container.querySelector('.checkout-btn').addEventListener('click', () => {
      this.toggle();
    });

    this.root.appendChild(this.container);
  }

  static renderContent() {
    const list = this.container.querySelector('.cart-body');
    const totalEl = this.container.querySelector('.cart-total-price');
    const cart = CartService.getCart();

    if (cart.length === 0) {
      list.innerHTML = `
        <div class="cart-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: var(--space-4);"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <p>Your cart is empty</p>
          <button class="btn btn-secondary mt-4 keep-shopping">Keep Shopping</button>
        </div>
      `;
      list.querySelector('.keep-shopping').addEventListener('click', () => {
        this.toggle();
        // optionally navigate to /
      });
      totalEl.textContent = '$0.00';
      return;
    }

    list.innerHTML = '';
    cart.forEach(item => {
      const itemEl = createElementFromHTML(`
        <div class="cart-item">
          <img class="cart-item-img" src="${item.image}" alt="${item.title}">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.title}</h4>
            <div class="cart-item-price">${formatCurrency(item.price)}</div>
            
            <div class="cart-item-actions">
              <div class="quantity-ctrl">
                <button class="qty-btn minus" data-id="${item.id}">-</button>
                <span class="qty">${item.quantity}</span>
                <button class="qty-btn plus" data-id="${item.id}">+</button>
              </div>
              <button class="btn btn-ghost remove-btn" data-id="${item.id}">Remove</button>
            </div>
          </div>
        </div>
      `);
      list.appendChild(itemEl);
    });

    // Attach events cleanly
    list.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(btn.getAttribute('data-id'));
        const item = cart.find(i => i.id === id);
        if (btn.classList.contains('minus')) {
          CartService.updateQuantity(id, item.quantity - 1);
        } else {
          CartService.updateQuantity(id, item.quantity + 1);
        }
      });
    });

    list.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        CartService.removeItem(Number(btn.getAttribute('data-id')));
      });
    });

    totalEl.textContent = formatCurrency(CartService.getCartTotal());
  }

  static injectStyles() {
    if (document.getElementById('cart-drawer-styles')) return;
    const style = document.createElement('style');
    style.id = 'cart-drawer-styles';
    style.textContent = `
      .cart-drawer-wrapper {
        position: fixed;
        inset: 0;
        z-index: 999;
        pointer-events: none;
      }
      .cart-overlay {
        position: absolute;
        inset: 0;
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(4px);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .cart-drawer {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        max-width: 400px;
        background: var(--bg-primary);
        box-shadow: -10px 0 30px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        flex-direction: column;
        pointer-events: auto;
      }
      .cart-drawer-wrapper.open {
        pointer-events: auto;
      }
      .cart-drawer-wrapper.open .cart-overlay { opacity: 1; }
      .cart-drawer-wrapper.open .cart-drawer { transform: translateX(0); }
      .cart-header {
        padding: var(--space-4) var(--space-6);
        background: var(--bg-primary);
        border-bottom: 1px solid var(--border-light);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .cart-header h2 { font-size: 1.25rem; }
      
      .cart-body {
        flex: 1;
        overflow-y: auto;
        padding: var(--space-4) var(--space-6);
        display: flex;
        flex-direction: column;
        gap: var(--space-6);
      }
      .cart-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: var(--text-muted);
        text-align: center;
      }
      .cart-item {
        display: flex;
        gap: var(--space-4);
      }
      .cart-item-img {
        width: 80px;
        height: 80px;
        object-fit: contain;
        background: white;
        padding: var(--space-2);
        border: 1px solid var(--border-light);
        border-radius: var(--radius-md);
      }
      .cart-item-info {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .cart-item-title {
        font-size: 0.875rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-bottom: var(--space-1);
      }
      .cart-item-price {
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: auto;
      }
      .cart-item-actions {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: var(--space-2);
      }
      .quantity-ctrl {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        background: var(--bg-tertiary);
        border-radius: var(--radius-md);
        padding: 2px;
      }
      .qty-btn {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        border-radius: var(--radius-sm);
        color: var(--text-primary);
      }
      .qty-btn:hover { background: var(--border-light); }
      .qty { font-size: 0.875rem; font-weight: 600; min-width: 20px; text-align: center; }
      .remove-btn {
        font-size: 0.75rem;
        padding: var(--space-1) var(--space-2);
        color: var(--danger);
      }
      .remove-btn:hover { background: var(--danger-light); color: var(--danger); }
      
      .cart-footer {
        padding: var(--space-6);
        border-top: 1px solid var(--border-light);
        background: var(--bg-tertiary);
      }
      .cart-total-row {
        display: flex;
        justify-content: space-between;
        font-size: 1.25rem;
        font-weight: 800;
        margin-bottom: var(--space-4);
      }
      .mt-4 { margin-top: 1rem; }
    `;
    document.head.appendChild(style);
  }
}

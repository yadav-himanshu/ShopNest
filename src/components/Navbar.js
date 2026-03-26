import { AuthService } from '../services/AuthService.js';
import { CartService } from '../services/CartService.js';
import { WishlistService } from '../services/WishlistService.js';
import { createElementFromHTML } from '../utils/helpers.js';

export class Navbar {
  static root = null;
  static container = null;

  static mount(rootElement) {
    this.root = rootElement;
    this.render();

    window.addEventListener('auth:change', () => this.render());
    window.addEventListener('cart:updated', () => this.updateCartCount());
    window.addEventListener('wishlist:updated', () => this.updateWishlistCount());

    this.injectStyles();
  }

  static render() {
    if (this.container) {
      this.root.removeChild(this.container);
    }

    const isAuthenticated = AuthService.isAuthenticated();
    const user = isAuthenticated ? AuthService.getUser() : null;
    const cartCount = CartService.getCartCount();
    const wishlistCount = WishlistService.getWishlist().length;

    const authHTML = isAuthenticated
      ? `
        <div class="nav-user">
          <a href="/profile" class="nav-profile-link">
            <div class="avatar">${user.name.charAt(0)}</div>
            <span class="nav-greeting">Account</span>
          </a>
          <button id="nav-logout-btn" class="nav-logout">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
      `
      : `
        <div class="nav-auth">
          <a href="/login" class="btn btn-ghost">Log in</a>
          <a href="/signup" class="btn btn-primary">Join</a>
        </div>
      `;

    this.container = createElementFromHTML(`
      <nav class="navbar">
        <div class="container navbar-container">
          <div class="nav-left">
            <a href="/" class="nav-brand">
              <div class="logo-icon">S</div>
              <span class="logo-text">ShopNest</span>
            </a>
            
            <div class="nav-links">
              <a href="/" class="nav-link">Everything</a>
              <a href="/?category=men's clothing" class="nav-link">Men</a>
              <a href="/?category=women's clothing" class="nav-link">Women</a>
              <a href="/?category=electronics" class="nav-link">Tech</a>
              <a href="/?category=jewelery" class="nav-link">Gems</a>
              <div class="mobile-only-auth">
                ${authHTML}
              </div>
            </div>
          </div>

          <div class="nav-right">
            <div class="nav-actions">
              <button id="theme-toggle" class="nav-icon-btn" aria-label="Toggle theme">
                <svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              </button>
              <div class="desktop-only-auth">
                ${authHTML}
              </div>
              <a href="/wishlist" class="nav-icon-btn nav-wishlist-btn" aria-label="Wishlist">
                <div class="wishlist-icon-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  <span class="wishlist-badge ${wishlistCount > 0 ? 'visible' : ''}">${wishlistCount}</span>
                </div>
              </a>
              <button id="nav-cart-btn" class="nav-cart-trigger" aria-label="Open cart">
                <div class="cart-icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  <span class="cart-badge">${cartCount}</span>
                </div>
                <span class="cart-label">Cart</span>
              </button>
            </div>
            
            <button id="mobile-menu-btn" class="mobile-menu-toggle" aria-label="Menu">
              <svg class="hamburger-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              <svg class="close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
      </nav>
    `);

    this.root.appendChild(this.container);
    this.attachEvents();
  }

  static updateCartCount() {
    if (!this.container) return;
    const badge = this.container.querySelector('.cart-badge');
    if (badge) {
      badge.textContent = CartService.getCartCount();
      badge.classList.add('pop');
      setTimeout(() => badge.classList.remove('pop'), 300);
    }
  }

  static updateWishlistCount() {
    if (!this.container) return;
    const badge = this.container.querySelector('.wishlist-badge');
    if (badge) {
      const count = WishlistService.getWishlist().length;
      badge.textContent = count;
      badge.classList.toggle('visible', count > 0);
      badge.classList.add('pop');
      setTimeout(() => badge.classList.remove('pop'), 300);
    }
  }

  static attachEvents() {
    const logoutBtn = this.container.querySelector('#nav-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        AuthService.logout();
        window.history.pushState(null, null, '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
    }

    const cartBtn = this.container.querySelector('#nav-cart-btn');
    if (cartBtn) {
      cartBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('cart:toggle'));
      });
    }

    const mobileBtn = this.container.querySelector('#mobile-menu-btn');
    if (mobileBtn) {
      mobileBtn.addEventListener('click', () => {
        const navLinks = this.container.querySelector('.nav-links');
        const isOpen = navLinks.classList.toggle('active');
        mobileBtn.classList.toggle('is-open', isOpen);
      });
    }

    const themeBtn = this.container.querySelector('#theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      const navLinks = this.container.querySelector('.nav-links');
      const mobileBtn = this.container.querySelector('#mobile-menu-btn');
      if (navLinks.classList.contains('active')) {
        if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
          navLinks.classList.remove('active');
          mobileBtn.classList.remove('is-open');
        }
      }
    });

    // Close menu when clicking a link
    this.container.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        this.container.querySelector('.nav-links').classList.remove('active');
        this.container.querySelector('#mobile-menu-btn').classList.remove('is-open');
      });
    });
  }

  static injectStyles() {
    if (document.getElementById('navbar-styles')) return;
    const style = document.createElement('style');
    style.id = 'navbar-styles';
    style.textContent = `
      .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: var(--header-height);
        background: var(--glass-bg);
        backdrop-filter: blur(var(--glass-blur));
        -webkit-backdrop-filter: blur(var(--glass-blur));
        border-bottom: 1px solid var(--border-light);
        z-index: 1000;
        display: flex;
        align-items: center;
      }
      .navbar-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .nav-left {
        display: flex;
        align-items: center;
        gap: var(--space-10);
      }
      .nav-brand {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-weight: 800;
        font-size: 1.5rem;
        color: var(--text-primary);
        letter-spacing: -1px;
      }
      .logo-icon {
        background: var(--logo-gradient);
        color: white;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        font-size: 1.5rem;
        font-weight: 800;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
      }
      .logo-text {
        color: var(--logo-text);
        font-weight: 800;
        font-size: 1.5rem;
        transition: color 0.3s ease;
      }
      .nav-links {
        display: flex;
        gap: var(--space-6);
      }
      .nav-link {
        font-size: 0.9375rem;
        font-weight: 600;
        color: var(--text-secondary);
        transition: color 0.2s;
      }
      .nav-link:hover { color: var(--accent-base); }

      .nav-right {
        display: flex;
        align-items: center;
        gap: var(--space-4);
      }
      .nav-actions {
        display: flex;
        align-items: center;
        gap: var(--space-4);
      }
      .nav-icon-btn {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-lg);
        color: var(--text-secondary);
        transition: all 0.2s;
      }
      .nav-icon-btn:hover {
        background: var(--bg-tertiary);
        color: var(--accent-base);
      }
      
      /* Theme Icons Visibility */
      #theme-toggle .moon-icon { display: none; }
      #theme-toggle .sun-icon { display: block; }
      
      [data-theme="dark"] #theme-toggle .moon-icon { display: block; }
      [data-theme="dark"] #theme-toggle .sun-icon { display: none; }
      
      /* Fallback for system dark mode if no manual preference set */
      @media (prefers-color-scheme: dark) {
        :root:not([data-theme="light"]) #theme-toggle .moon-icon { display: block; }
        :root:not([data-theme="light"]) #theme-toggle .sun-icon { display: none; }
      }
      .nav-user {
        display: flex;
        align-items: center;
        gap: var(--space-4);
      }
      .nav-profile-link {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-weight: 600;
        font-size: 0.875rem;
        color: var(--text-primary);
      }
      .avatar {
        width: 32px;
        height: 32px;
        background: var(--bg-tertiary);
        border: 1px solid var(--border-light);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        color: var(--accent-base);
      }
      .nav-logout {
        color: var(--text-muted);
        transition: color 0.2s;
      }
      .nav-logout:hover { color: var(--danger); }

      .nav-cart-trigger {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--text-primary);
        font-weight: 600;
        font-size: 0.875rem;
      }
      .cart-icon-wrapper {
        position: relative;
      }
      .cart-badge {
        position: absolute;
        top: -8px;
        right: -8px;
        background: var(--accent-base);
        color: white;
        font-size: 0.7rem;
        font-weight: 800;
        min-width: 18px;
        height: 18px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid white;
      }

      .mobile-menu-toggle { display: none; }
      .mobile-menu-toggle .close-icon { display: none; }
      .mobile-menu-toggle.is-open .hamburger-icon { display: none; }
      .mobile-menu-toggle.is-open .close-icon { display: block; }

      .mobile-only-auth { display: none; }

      .wishlist-icon-wrapper { position: relative; }
      .wishlist-badge {
        position: absolute;
        top: -6px;
        right: -6px;
        background: #ef4444;
        color: white;
        font-size: 0.65rem;
        font-weight: 800;
        min-width: 16px;
        height: 16px;
        border-radius: 50%;
        display: none;
        align-items: center;
        justify-content: center;
        border: 2px solid var(--bg-primary);
      }
      .wishlist-badge.visible { display: flex; }

      .pop { animation: badge-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      @keyframes badge-pop {
        0% { transform: scale(1); }
        50% { transform: scale(1.4); }
        100% { transform: scale(1); }
      }

      @media (max-width: 900px) {
        .desktop-only-auth { display: none; }
        .mobile-only-auth { 
          display: block; 
          margin-top: var(--space-4);
          padding-top: var(--space-4);
          border-top: 1px solid var(--border-light);
        }
        .nav-links { 
          display: none; 
          transform: translateY(-10px);
          opacity: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .nav-links.active {
          display: flex;
          opacity: 1;
          transform: translateY(0);
          flex-direction: column;
          position: absolute;
          top: var(--header-height);
          left: 0;
          right: 0;
          background: var(--bg-primary);
          padding: var(--space-6);
          border-bottom: 1px solid var(--border-light);
          box-shadow: var(--shadow-lg);
          z-index: 1001;
        }
        .nav-link {
          padding: var(--space-3) 0;
          font-size: 1.125rem;
        }
        .mobile-menu-toggle { display: block; }
        .cart-label { display: none; }
        .nav-actions { gap: var(--space-2); }
        .nav-icon-btn { width: 36px; height: 36px; }
      }
    `;
    document.head.appendChild(style);
  }
}

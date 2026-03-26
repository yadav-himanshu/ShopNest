import { createElementFromHTML } from '../utils/helpers.js';

export class Footer {
  static mount(rootElement) {
    const footer = createElementFromHTML(`
      <footer class="footer">
        <div class="container">
          <div class="footer-top">
            <div class="footer-column brand-col">
              <a href="/" class="footer-logo">
                <div class="logo-icon">S</div>
                <span class="logo-text">ShopNest</span>
              </a>
              <p>Redefining your shopping experience with curated sets of premium essentials. Quality you can trust, style you'll love.</p>
              <div class="social-links">
                <a href="#" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
              </div>
            </div>
            
            <div class="footer-column">
              <h4>Explore</h4>
              <ul>
                <li><a href="/">All Products</a></li>
                <li><a href="/?category=electronics">Electronics</a></li>
                <li><a href="/?category=jewelery">Jewelery</a></li>
                <li><a href="/?category=men's clothing">Men's Fashion</a></li>
                <li><a href="/?category=women's clothing">Women's Fashion</a></li>
              </ul>
            </div>
            
            <div class="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="/about">About Us</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
              </ul>
            </div>

            <div class="footer-column newsletter-col">
              <h4>Newsletter</h4>
              <p>Join our club & get 15% off your first order.</p>
              <form class="newsletter-form" onsubmit="event.preventDefault(); alert('Subscribed!')">
                <input type="email" placeholder="Email Address" required>
                <button type="submit">Join</button>
              </form>
            </div>
          </div>
          
          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} ShopNest. All Rights Reserved. Built with Vanilla JS.</p>
          </div>
        </div>
      </footer>
    `);

    rootElement.appendChild(footer);
    this.injectStyles();
  }

  static injectStyles() {
    if (document.getElementById('footer-styles')) return;
    const style = document.createElement('style');
    style.id = 'footer-styles';
    style.textContent = `
      .footer {
        background: var(--bg-tertiary);
        color: var(--text-primary);
        padding: var(--space-12) 0 var(--space-6);
        margin-top: auto;
        border-top: 1px solid var(--border-light);
      }
      .footer-top {
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
        gap: var(--space-10);
        margin-bottom: var(--space-10);
      }
      .footer-logo {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        margin-bottom: var(--space-6);
        text-decoration: none;
      }
      .footer-logo .logo-icon {
        background: var(--logo-gradient);
        color: white;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        font-size: 1.25rem;
        font-weight: 800;
      }
      .footer-logo .logo-text {
        color: var(--logo-text);
        font-weight: 800;
        font-size: 1.5rem;
        letter-spacing: -1px;
      }
      .footer-column p {
        color: var(--text-secondary);
        font-size: 0.9375rem;
        line-height: 1.6;
        margin-bottom: var(--space-6);
      }
      .footer-column h4 {
        color: var(--text-primary);
        font-size: 1rem;
        margin-bottom: var(--space-6);
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }
      .footer-column ul {
        list-style: none;
        padding: 0;
      }
      .footer-column ul li {
        margin-bottom: var(--space-3);
      }
      .footer-column ul li a {
        color: var(--text-secondary);
        transition: color 0.2s;
        font-size: 0.9375rem;
      }
      .footer-column ul li a:hover { color: var(--accent-base); }

      .social-links {
        display: flex;
        gap: var(--space-4);
      }
      .social-links a {
        color: var(--text-secondary);
        transition: transform 0.2s, color 0.2s;
      }
      .social-links a:hover {
        color: var(--accent-base);
        transform: translateY(-2px);
      }

      .newsletter-form {
        display: flex;
        gap: var(--space-2);
      }
      .newsletter-form input {
        background: var(--bg-primary);
        border: 1px solid var(--border-medium);
        padding: var(--space-3);
        border-radius: var(--radius-md);
        color: var(--text-primary);
        flex: 1;
        font-size: 0.875rem;
      }
      .newsletter-form button {
        background: var(--accent-base);
        color: white;
        padding: var(--space-3) var(--space-6);
        border-radius: var(--radius-md);
        font-weight: 700;
        font-size: 0.875rem;
      }

      .footer-bottom {
        padding-top: var(--space-8);
        border-top: 1px solid var(--border-light);
        text-align: center;
        color: var(--text-muted);
        font-size: 0.875rem;
      }

      @media (max-width: 1024px) {
        .footer-top { grid-template-columns: 1fr 1fr; }
      }
      @media (max-width: 600px) {
        .footer-top { grid-template-columns: 1fr; }
        .footer-logo { font-size: 1.5rem; }
      }
    `;
    document.head.appendChild(style);
  }
}

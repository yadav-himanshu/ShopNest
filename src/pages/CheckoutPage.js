import { CartService } from '../services/CartService.js';
import { AuthService } from '../services/AuthService.js';
import { OrderService } from '../services/OrderService.js';
import { formatCurrency } from '../utils/helpers.js';
import { Toast } from '../components/Toast.js';

export class CheckoutPage {
  constructor(root) {
    this.root = root;
    this.currentStep = 1; // 1: Shipping, 2: Payment, 3: Success
    this.formData = {
      fullName: '',
      email: '',
      address: '',
      city: '',
      zip: '',
      cardNumber: '',
      expiry: '',
      cvv: ''
    };
  }

  async render() {
    if (!AuthService.isAuthenticated()) {
      window.history.pushState(null, null, '/login');
      window.dispatchEvent(PopStateEvent('popstate'));
      return;
    }

    const cart = CartService.getCart();
    const total = CartService.getCartTotal();

    if (cart.length === 0 && this.currentStep !== 3) {
      this.root.innerHTML = `
        <div class="container page checkout-page">
          <div class="empty-checkout">
            <h2>Your cart is empty</h2>
            <p>Add some items to your cart before checking out.</p>
            <a href="/" class="btn btn-primary">Go to Shop</a>
          </div>
        </div>
      `;
      return;
    }

    this.renderStep(cart, total);
    this.injectStyles();
  }

  renderStep(cart, total) {
    let stepContent = '';

    if (this.currentStep === 1) {
      stepContent = this.renderShippingStep();
    } else if (this.currentStep === 2) {
      stepContent = this.renderPaymentStep();
    } else {
      stepContent = this.renderSuccessStep();
    }

    this.root.innerHTML = `
      <div class="container page checkout-page">
        <div class="checkout-layout">
          <div class="checkout-main">
            <div class="checkout-stepper">
              <div class="step ${this.currentStep >= 1 ? 'active' : ''}">
                <div class="step-num">1</div>
                <span>Shipping</span>
              </div>
              <div class="step-line ${this.currentStep >= 2 ? 'active' : ''}"></div>
              <div class="step ${this.currentStep >= 2 ? 'active' : ''}">
                <div class="step-num">2</div>
                <span>Payment</span>
              </div>
              <div class="step-line ${this.currentStep >= 3 ? 'active' : ''}"></div>
              <div class="step ${this.currentStep >= 3 ? 'active' : ''}">
                <div class="step-num">3</div>
                <span>Review</span>
              </div>
            </div>

            <div class="checkout-card glass">
              ${stepContent}
            </div>
          </div>

          ${this.currentStep < 3 ? `
          <aside class="checkout-sidebar">
            <div class="order-summary glass">
              <h3>Order Summary</h3>
              <div class="summary-items">
                ${cart.map(item => `
                  <div class="summary-item">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="summary-item-info">
                      <span class="summary-item-title">${item.title}</span>
                      <span class="summary-item-price">${item.quantity} × ${formatCurrency(item.price)}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
              <div class="summary-totals">
                <div class="summary-row">
                  <span>Subtotal</span>
                  <span>${formatCurrency(total)}</span>
                </div>
                <div class="summary-row">
                  <span>Shipping</span>
                  <span class="text-success">Free</span>
                </div>
                <div class="summary-row total">
                  <span>Total</span>
                  <span>${formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </aside>
          ` : ''}
        </div>
      </div>
    `;

    this.attachEvents();
  }

  renderShippingStep() {
    return `
      <form id="shipping-form" class="checkout-form">
        <h2>Shipping Information</h2>
        <div class="form-grid">
          <div class="form-group full">
            <label>Full Name</label>
            <input type="text" name="fullName" value="${this.formData.fullName}" placeholder="John Doe" required>
          </div>
          <div class="form-group full">
            <label>Email Address</label>
            <input type="email" name="email" value="${this.formData.email}" placeholder="john@example.com" required>
          </div>
          <div class="form-group full">
            <label>Street Address</label>
            <input type="text" name="address" value="${this.formData.address}" placeholder="123 Main St" required>
          </div>
          <div class="form-group">
            <label>City</label>
            <input type="text" name="city" value="${this.formData.city}" placeholder="New York" required>
          </div>
          <div class="form-group">
            <label>ZIP Code</label>
            <input type="text" name="zip" value="${this.formData.zip}" placeholder="10001" required>
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary btn-block">Continue to Payment</button>
        </div>
      </form>
    `;
  }

  renderPaymentStep() {
    return `
      <form id="payment-form" class="checkout-form">
        <h2>Payment Details</h2>
        <p class="form-subtitle">All transactions are secure and encrypted.</p>
        <div class="form-grid">
          <div class="form-group full">
            <label>Card Number</label>
            <div class="input-with-icon">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
               <input type="text" name="cardNumber" value="${this.formData.cardNumber}" placeholder="0000 0000 0000 0000" required>
            </div>
          </div>
          <div class="form-group">
            <label>Expiry Date</label>
            <input type="text" name="expiry" value="${this.formData.expiry}" placeholder="MM/YY" required>
          </div>
          <div class="form-group">
            <label>CVV</label>
            <input type="password" name="cvv" value="${this.formData.cvv}" placeholder="123" required>
          </div>
        </div>
        <div class="form-actions payment-actions">
          <button type="button" id="back-to-shipping" class="btn btn-ghost">Back</button>
          <button type="submit" class="btn btn-primary">Place Order — ${formatCurrency(CartService.getCartTotal())}</button>
        </div>
      </form>
    `;
  }

  renderSuccessStep() {
    return `
      <div class="success-message">
        <div class="success-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2>Order Confirmed!</h2>
        <p>Thank you for your purchase. We've sent a confirmation email to <strong>${this.formData.email}</strong>.</p>
        <div class="success-actions">
          <a href="/profile" class="btn btn-primary">View My Orders</a>
          <a href="/" class="btn btn-ghost">Continue Shopping</a>
        </div>
      </div>
    `;
  }

  attachEvents() {
    const shippingForm = this.root.querySelector('#shipping-form');
    if (shippingForm) {
      shippingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(shippingForm);
        this.formData = { ...this.formData, ...Object.fromEntries(fd.entries()) };
        this.currentStep = 2;
        this.render();
      });
    }

    const backBtn = this.root.querySelector('#back-to-shipping');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.currentStep = 1;
        this.render();
      });
    }

    const paymentForm = this.root.querySelector('#payment-form');
    if (paymentForm) {
      paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(paymentForm);
        this.formData = { ...this.formData, ...Object.fromEntries(fd.entries()) };

        // Finalize order
        const user = AuthService.getUser();
        const items = CartService.getCart();
        const total = CartService.getCartTotal();

        OrderService.placeOrder(user.email, items, total, {
          fullName: this.formData.fullName,
          address: this.formData.address,
          city: this.formData.city
        });

        CartService.clearCart();
        this.currentStep = 3;
        this.render();
        Toast.show('Order placed successfully!', 'success');
      });
    }
  }

  injectStyles() {
    if (document.getElementById('checkout-styles')) return;
    const style = document.createElement('style');
    style.id = 'checkout-styles';
    style.textContent = `
      .checkout-layout {
        display: grid;
        grid-template-columns: 1fr 380px;
        gap: var(--space-10);
        margin-top: var(--space-8);
      }
      .checkout-stepper {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-4);
        margin-bottom: var(--space-10);
      }
      .step {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--text-muted);
        font-weight: 600;
        font-size: 0.875rem;
      }
      .step.active { color: var(--accent-base); }
      .step-num {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--bg-tertiary);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
      }
      .step.active .step-num { background: var(--accent-base); color: white; }
      .step-line {
        flex: 0 0 40px;
        height: 2px;
        background: var(--border-light);
      }
      .step-line.active { background: var(--accent-base); }

      .checkout-card {
        padding: var(--space-8);
        border-radius: var(--radius-2xl);
        background: var(--bg-primary);
        border: 1px solid var(--border-light);
      }
      .checkout-form h2 {
        margin-bottom: var(--space-2);
        font-size: 1.5rem;
        letter-spacing: -0.5px;
      }
      .form-subtitle {
        color: var(--text-muted);
        font-size: 0.875rem;
        margin-bottom: var(--space-6);
      }
      .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-4);
      }
      .form-group.full { grid-column: 1 / -1; }
      .form-group label {
        display: block;
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: var(--space-2);
      }
      .form-group input {
        width: 100%;
        padding: var(--space-3);
        border: 1px solid var(--border-medium);
        border-radius: var(--radius-lg);
      }
      .input-with-icon {
        position: relative;
      }
      .input-with-icon svg {
        position: absolute;
        left: var(--space-3);
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
      }
      .input-with-icon input {
        padding-left: 44px;
      }
      .form-actions {
        margin-top: var(--space-8);
      }
      .payment-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .order-summary {
        padding: var(--space-6);
        border-radius: var(--radius-xl);
        background: var(--bg-secondary);
        border: 1px solid var(--border-light);
        position: sticky;
        top: calc(var(--header-height) + var(--space-6));
      }
      .summary-items {
        margin: var(--space-6) 0;
        max-height: 300px;
        overflow-y: auto;
      }
      .summary-item {
        display: flex;
        gap: var(--space-4);
        margin-bottom: var(--space-4);
      }
      .summary-item img {
        width: 50px;
        height: 50px;
        object-fit: contain;
        background: white; /* keep white for product transparent imgs */
        padding: 4px;
        border-radius: var(--radius-md);
      }
      .summary-item-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .summary-item-title {
        font-size: 0.8125rem;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .summary-item-price { font-size: 0.75rem; color: var(--text-muted); }
      
      .summary-totals {
        border-top: 1px solid var(--border-light);
        padding-top: var(--space-4);
      }
      .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--space-2);
        font-size: 0.9375rem;
      }
      .summary-row.total {
        margin-top: var(--space-4);
        font-weight: 800;
        font-size: 1.125rem;
        color: var(--text-primary);
      }

      .success-message {
        text-align: center;
        padding: var(--space-6);
      }
      .success-icon {
        width: 80px;
        height: 80px;
        background: var(--success);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto var(--space-6);
      }
      .success-actions {
        display: flex;
        gap: var(--space-4);
        justify-content: center;
        margin-top: var(--space-8);
      }

      @media (max-width: 1024px) {
        .checkout-layout { grid-template-columns: 1fr; }
        .checkout-sidebar { order: -1; }
        .order-summary { position: static; }
      }
    `;
    document.head.appendChild(style);
  }
}

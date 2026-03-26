import { OrderService } from '../services/OrderService.js';
import { formatCurrency } from '../utils/helpers.js';

export class OrderDetailsPage {
    constructor(root, params) {
        this.root = root;
        this.orderId = params.get('id');
    }

    async render() {
        const order = OrderService.getOrderById(this.orderId);

        if (!order) {
            this.root.innerHTML = `
        <div class="container page error-page">
          <div class="glass card text-center">
            <h2>Order Not Found</h2>
            <p>The order you are looking for does not exist or has been removed.</p>
            <a href="/profile" class="btn btn-primary">Back to Profile</a>
          </div>
        </div>
      `;
            return;
        }

        this.root.innerHTML = `
      <div class="container page order-details-page">
        <div class="header-section">
          <a href="/profile" class="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
            Back to Profile
          </a>
          <div class="header-content">
            <h1>Order ${order.id}</h1>
            <span class="status-badge ${order.status.toLowerCase()}">${order.status}</span>
          </div>
          <p class="order-date">Placed on ${new Date(order.date).toLocaleString()}</p>
        </div>

        <div class="details-grid">
          <div class="items-section glass card">
            <h3>Order Items</h3>
            <div class="order-items-list">
              ${order.items.map(item => `
                <div class="order-item">
                  <div class="item-img glass">
                    <img src="${item.image}" alt="${item.name}">
                  </div>
                  <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                  </div>
                  <div class="item-price">
                    <strong>${formatCurrency(item.price * item.quantity)}</strong>
                  </div>
                </div>
              `).join('')}
            </div>
            <div class="order-summary">
              <div class="summary-row total">
                <span>Total Amount Paid</span>
                <strong>${formatCurrency(order.total)}</strong>
              </div>
            </div>
          </div>

          <div class="sidebar-info">
            <div class="shipping-section glass card">
              <h3>Shipping Address</h3>
              <p><strong>${order.shippingDetails.fullName}</strong></p>
              <p>${order.shippingDetails.address}</p>
              <p>${order.shippingDetails.city}, ${order.shippingDetails.zipCode}</p>
              <p>${order.shippingDetails.country}</p>
            </div>
            
            <div class="payment-section glass card">
              <h3>Payment Method</h3>
              <div class="payment-method">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                <span>Ending in 4242</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

        this.injectStyles();
    }

    injectStyles() {
        if (document.getElementById('order-details-styles')) return;
        const style = document.createElement('style');
        style.id = 'order-details-styles';
        style.textContent = `
      .order-details-page { margin-top: var(--space-8); }
      .header-section { margin-bottom: var(--space-8); }
      .back-link { display: inline-flex; align-items: center; gap: var(--space-2); color: var(--text-muted); text-decoration: none; font-size: 0.9375rem; margin-bottom: var(--space-4); }
      .back-link:hover { color: var(--accent-base); }
      
      .header-content { display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-2); }
      .header-content h1 { font-size: 2.5rem; letter-spacing: -1px; }
      .order-date { color: var(--text-muted); }

      .details-grid { display: grid; grid-template-columns: 1fr 340px; gap: var(--space-6); align-items: start; }
      .card { padding: var(--space-6); border-radius: var(--radius-2xl); margin-bottom: var(--space-6); }
      .card h3 { font-size: 1.25rem; margin-bottom: var(--space-6); letter-spacing: -0.3px; }

      .order-items-list { display: flex; flex-direction: column; gap: var(--space-4); margin-bottom: var(--space-8); }
      .order-item { display: flex; align-items: center; gap: var(--space-4); padding-bottom: var(--space-4); border-bottom: 1px solid var(--border-light); }
      .item-img { width: 64px; height: 64px; border-radius: var(--radius-md); overflow: hidden; }
      .item-img img { width: 100%; height: 100%; object-fit: contain; }
      .item-info { flex: 1; }
      .item-info h4 { font-size: 1rem; margin-bottom: 2px; }
      .item-info p { color: var(--text-muted); font-size: 0.875rem; }

      .order-summary { padding-top: var(--space-4); }
      .summary-row { display: flex; justify-content: space-between; align-items: center; }
      .summary-row.total strong { font-size: 1.5rem; color: var(--accent-base); }

      .status-badge { padding: 4px 12px; border-radius: 100px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
      .status-badge.processing { background: #E0F2FE; color: #0369A1; }

      .shipping-section p { margin-bottom: 4px; color: var(--text-secondary); }
      .payment-method { display: flex; align-items: center; gap: var(--space-3); color: var(--text-secondary); }

      @media (max-width: 992px) {
        .details-grid { grid-template-columns: 1fr; }
      }
    `;
        document.head.appendChild(style);
    }
}

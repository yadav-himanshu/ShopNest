import { AuthService } from '../services/AuthService.js';
import { OrderService } from '../services/OrderService.js';
import { formatCurrency } from '../utils/helpers.js';

export class ProfilePage {
  constructor(root) {
    this.root = root;
  }

  async render() {
    if (!AuthService.isAuthenticated()) {
      window.history.pushState(null, null, '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }

    const user = AuthService.getUser();
    const orders = OrderService.getUserOrders(user.email);

    this.root.innerHTML = `
      <div class="container page profile-page">
        <div class="profile-header">
          <div class="user-info-card glass">
            <div class="profile-avatar">${user.name.charAt(0)}</div>
            <div class="profile-details">
              <h1>${user.name}</h1>
              <p>${user.email}</p>
            </div>
            <a href="/edit-profile" class="btn btn-outline">Edit Profile</a>
          </div>
        </div>

        <div class="profile-content">
          <div class="orders-section">
            <h2 class="section-title">Order History</h2>
            ${orders.length === 0 ? `
              <div class="empty-orders glass">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                <h3>No orders yet</h3>
                <p>You haven't placed any orders with us yet. Start shopping to see your history!</p>
                <a href="/" class="btn btn-primary">Start Shopping</a>
              </div>
            ` : `
              <div class="order-list">
                ${orders.map(order => `
                  <div class="order-card glass">
                    <div class="order-id">
                      <span>Order ID</span>
                      <strong>#${order.id}</strong>
                    </div>
                    <div class="order-date">
                      <span>Placed On</span>
                      <strong>${new Date(order.date).toLocaleDateString()}</strong>
                    </div>
                    <div class="order-total">
                      <span>Total Amount</span>
                      <strong>${formatCurrency(order.total)}</strong>
                    </div>
                    <div class="order-status">
                      <span class="status-badge ${order.status.toLowerCase()}">${order.status}</span>
                    </div>
                    <a href="/order-details?id=${order.id}" class="btn btn-ghost">Details</a>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>
      </div>
    `;

    this.injectStyles();
  }

  injectStyles() {
    if (document.getElementById('profile-styles')) return;
    const style = document.createElement('style');
    style.id = 'profile-styles';
    style.textContent = `
      .profile-page {
        margin-top: var(--space-8);
      }
      .profile-header {
        margin-bottom: var(--space-10);
      }
      .user-info-card {
        padding: var(--space-8);
        border-radius: var(--radius-2xl);
        background: var(--bg-primary);
        border: 1px solid var(--border-light);
        display: flex;
        align-items: center;
        gap: var(--space-6);
        box-shadow: var(--shadow-xl);
      }
      .profile-avatar {
        width: 80px;
        height: 80px;
        background: var(--accent-base);
        color: white;
        font-size: 2.5rem;
        font-weight: 800;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 16px -4px var(--accent-light);
      }
      .profile-details { flex: 1; }
      .profile-details h1 { font-size: 2rem; margin-bottom: 2px; letter-spacing: -1px; }
      .profile-details p { color: var(--text-muted); font-size: 1rem; }

      .section-title {
        font-size: 1.5rem;
        margin-bottom: var(--space-6);
        letter-spacing: -0.5px;
      }
      .empty-orders {
        padding: var(--space-12);
        text-align: center;
        border-radius: var(--radius-2xl);
        border: 2px dashed var(--border-light);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-4);
      }
      
      .order-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
      }
      .order-card {
        padding: var(--space-6);
        border-radius: var(--radius-xl);
        background: var(--bg-primary);
        border: 1px solid var(--border-light);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4);
        transition: transform 0.2s;
      }
      .order-card:hover { transform: translateY(-2px); border-color: var(--accent-base); }
      .order-card div { display: flex; flex-direction: column; }
      .order-card span { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
      .order-card strong { font-size: 0.9375rem; color: var(--text-primary); }

      .status-badge {
        padding: 4px 12px;
        border-radius: 100px;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
      }
      .status-badge.processing { background: #E0F2FE; color: #0369A1; }

      @media (max-width: 768px) {
        .user-info-card { flex-direction: column; text-align: center; }
        .order-card { flex-direction: column; align-items: flex-start; }
      }
    `;
    document.head.appendChild(style);
  }
}

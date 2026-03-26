import { AuthService } from '../services/AuthService.js';
import { Toast } from '../components/Toast.js';

export class LoginPage {
  constructor(root) {
    this.root = root;
  }

  render() {
    this.root.innerHTML = `
      <div class="page container" style="display: flex; align-items: center; justify-content: center; min-height: 60vh;">
        <form id="login-form" class="auth-form">
          <h2>Welcome Back</h2>
          <p class="subtitle">Sign in to your ShopNest account</p>
          
          <div class="input-group">
            <label class="input-label" for="email">Email</label>
            <input type="email" id="email" class="input" required placeholder="you@example.com">
          </div>
          
          <div class="input-group" style="margin-bottom: var(--space-6);">
            <label class="input-label" for="password">Password</label>
            <input type="password" id="password" class="input" required placeholder="••••••••">
          </div>
          
          <button type="submit" class="btn btn-primary" style="width: 100%; padding: var(--space-3); font-size: 1rem;">
            Sign In
          </button>
          
          <p style="text-align: center; margin-top: var(--space-6); font-size: 0.875rem;">
            Don't have an account? <a href="/signup" style="color: var(--accent-base); font-weight: 600;">Sign up</a>
          </p>
        </form>
      </div>
    `;

    this.root.querySelector('#login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const pass = e.target.password.value;

      try {
        AuthService.login(email, pass);
        Toast.show('Successfully logged in.');

        // Use standard push state and trigger route manually or via router logic
        // We will just do a standard history push
        window.history.pushState(null, null, '/');
        // trigger router handle
        const popStateEvent = new PopStateEvent('popstate');
        window.dispatchEvent(popStateEvent);
        // The router in main.js handles popstate globally
      } catch (err) {
        Toast.show(err.message, 'error');
      }
    });
  }
}

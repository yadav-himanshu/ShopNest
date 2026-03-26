import { AuthService } from '../services/AuthService.js';
import { Toast } from '../components/Toast.js';

export class SignupPage {
    constructor(root) {
        this.root = root;
    }

    render() {
        this.root.innerHTML = `
      <div class="page container" style="display: flex; align-items: center; justify-content: center; min-height: 60vh;">
        <form id="signup-form" class="auth-form">
          <h2>Create Account</h2>
          <p class="subtitle">Join ShopNest today</p>
          
          <div class="input-group">
            <label class="input-label" for="name">Full Name</label>
            <input type="text" id="name" class="input" required placeholder="John Doe">
          </div>

          <div class="input-group">
            <label class="input-label" for="email">Email</label>
            <input type="email" id="email" class="input" required placeholder="you@example.com">
          </div>
          
          <div class="input-group" style="margin-bottom: var(--space-6);">
            <label class="input-label" for="password">Password</label>
            <input type="password" id="password" class="input" required placeholder="••••••••" minlength="6">
          </div>
          
          <button type="submit" class="btn btn-primary" style="width: 100%; padding: var(--space-3); font-size: 1rem;">
            Create Account
          </button>
          
          <p style="text-align: center; margin-top: var(--space-6); font-size: 0.875rem;">
            Already have an account? <a href="/login" style="color: var(--accent-base); font-weight: 600;">Log in</a>
          </p>
        </form>
      </div>
    `;

        this.root.querySelector('#signup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = e.target.name.value;
            const email = e.target.email.value;
            const pass = e.target.password.value;

            try {
                AuthService.signup(name, email, pass);
                Toast.show('Account created successfully!');

                window.history.pushState(null, null, '/');
                const popStateEvent = new PopStateEvent('popstate');
                window.dispatchEvent(popStateEvent);
            } catch (err) {
                Toast.show(err.message, 'error');
            }
        });
    }
}

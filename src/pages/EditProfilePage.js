import { AuthService } from '../services/AuthService.js';
import { Toast } from '../components/Toast.js';

export class EditProfilePage {
    constructor(root) {
        this.root = root;
    }

    async render() {
        const user = AuthService.getUser();
        if (!user) {
            window.history.pushState(null, null, '/login');
            window.dispatchEvent(new PopStateEvent('popstate'));
            return;
        }

        this.root.innerHTML = `
      <div class="container page edit-profile-page">
        <div class="header-section">
          <h1>Edit Profile</h1>
          <p>Update your personal information</p>
        </div>

        <form id="edit-profile-form" class="glass card">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" name="name" value="${user.name}" required>
          </div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" value="${user.email}" required>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-outline" id="cancel-btn">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    `;

        this.attachEvents();
        this.injectStyles();
    }

    attachEvents() {
        const form = this.root.querySelector('#edit-profile-form');
        const cancelBtn = this.root.querySelector('#cancel-btn');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');

            if (AuthService.updateUser({ name, email })) {
                Toast.show('Profile updated successfully!', 'success');
                window.history.pushState(null, null, '/profile');
                window.dispatchEvent(new PopStateEvent('popstate'));
            } else {
                Toast.show('Failed to update profile', 'error');
            }
        });

        cancelBtn.addEventListener('click', () => {
            window.history.pushState(null, null, '/profile');
            window.dispatchEvent(new PopStateEvent('popstate'));
        });
    }

    injectStyles() {
        if (document.getElementById('edit-profile-styles')) return;
        const style = document.createElement('style');
        style.id = 'edit-profile-styles';
        style.textContent = `
      .edit-profile-page {
        max-width: 600px;
        margin: var(--space-8) auto;
      }
      .header-section { margin-bottom: var(--space-8); text-align: center; }
      .header-section h1 { font-size: 2.5rem; letter-spacing: -1px; margin-bottom: var(--space-2); }
      .header-section p { color: var(--text-muted); }

      .card { padding: var(--space-8); border-radius: var(--radius-2xl); }
      .form-group { margin-bottom: var(--space-6); }
      .form-group label { display: block; margin-bottom: var(--space-2); font-weight: 600; color: var(--text-secondary); }
      .form-group input { width: 100%; padding: var(--space-3) var(--space-4); border-radius: var(--radius-lg); border: 1px solid var(--border-light); background: var(--bg-primary); color: var(--text-primary); transition: all 0.2s; }
      .form-group input:focus { outline: none; border-color: var(--accent-base); box-shadow: 0 0 0 4px var(--accent-light); }

      .form-actions { display: flex; gap: var(--space-4); margin-top: var(--space-8); }
      .form-actions button { flex: 1; }
    `;
        document.head.appendChild(style);
    }
}

import { createElementFromHTML } from '../utils/helpers.js';

export class Toast {
    static container = null;

    static init(rootElement) {
        this.container = createElementFromHTML(`<div class="toast-container"></div>`);
        rootElement.appendChild(this.container);

        // Inject styles statically for this component
        const style = document.createElement('style');
        style.textContent = `
      .toast-container {
        position: fixed;
        bottom: var(--space-4);
        right: var(--space-4);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        pointer-events: none;
      }
      .toast-msg {
        background: var(--bg-primary);
        color: var(--text-primary);
        padding: var(--space-3) var(--space-4);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-weight: 500;
        animation: slideIn 0.3s ease forwards;
        pointer-events: auto;
        border-left: 4px solid var(--accent-base);
      }
      .toast-msg.error {
        border-left-color: var(--danger);
      }
      .toast-msg.success {
        border-left-color: var(--success);
      }
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes fadeOut {
        to { opacity: 0; transform: translateY(10px); }
      }
    `;
        document.head.appendChild(style);
    }

    static show(message, type = 'success', duration = 3000) {
        if (!this.container) return;

        const toast = createElementFromHTML(`
      <div class="toast-msg ${type}">
        ${message}
      </div>
    `);

        this.container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}

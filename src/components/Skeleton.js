export class Skeleton {
    static productCard() {
        const el = document.createElement('div');
        el.className = 'skeleton-card';
        el.innerHTML = `
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton-content">
        <div class="skeleton skeleton-text" style="width: 40%; margin-bottom: 8px;"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text" style="width: 70%;"></div>
        <div class="skeleton-bottom">
            <div class="skeleton skeleton-text" style="width: 30%; height: 24px;"></div>
            <div class="skeleton skeleton-circle"></div>
        </div>
      </div>
    `;

        this.injectStyles();
        return el;
    }

    static injectStyles() {
        if (document.getElementById('skeleton-styles')) return;
        const style = document.createElement('style');
        style.id = 'skeleton-styles';
        style.textContent = `
      .skeleton-card {
        background: var(--bg-primary);
        border: 1px solid var(--border-light);
        border-radius: var(--radius-xl);
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .skeleton-img {
        padding-top: 100%;
        width: 100%;
      }
      .skeleton-content {
        padding: var(--space-4);
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .skeleton-text {
        height: 1rem;
        border-radius: var(--radius-sm);
        margin-bottom: var(--space-2);
        width: 100%;
      }
      .skeleton-bottom {
        margin-top: auto;
        padding-top: var(--space-4);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .skeleton-circle {
        width: 36px;
        height: 36px;
        border-radius: var(--radius-full);
      }
    `;
        document.head.appendChild(style);
    }
}

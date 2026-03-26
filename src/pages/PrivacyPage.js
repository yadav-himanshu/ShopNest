export class PrivacyPage {
    constructor(root) {
        this.root = root;
    }

    async render() {
        this.root.innerHTML = `
      <div class="page container info-page">
        <header class="info-header">
          <h1>Privacy Policy</h1>
          <p class="lead">Last updated: March 26, 2026</p>
        </header>

        <article class="content-article glass" style="padding: var(--space-8) var(--space-12); border-radius: var(--radius-2xl);">
          <section style="margin-bottom: var(--space-8);">
            <h2>1. Information Collection</h2>
            <p>We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This includes your name, email, shipping address, and payment information.</p>
          </section>

          <section style="margin-bottom: var(--space-8);">
            <h2>2. How We Use Data</h2>
            <p>Your information allows us to process orders, provide customer support, and send you personalized updates about your purchases and new arrivals.</p>
          </section>

          <section style="margin-bottom: var(--space-8);">
            <h2>3. Information Sharing</h2>
            <p>We do not sell your personal data. We only share information with third-party service providers (like shipping carriers and payment processors) strictly to fulfill your orders.</p>
          </section>

          <section style="margin-bottom: var(--space-8);">
            <h2>4. Security</h2>
            <p>We implement industry-standard security measures to protect your information. However, no method of transmission over the Internet is 100% secure.</p>
          </section>

          <section style="margin-bottom: var(--space-8);">
            <h2>5. Your Rights</h2>
            <p>You have the right to access, update, or delete your personal information at any time through your account settings or by contacting us.</p>
          </section>
        </article>
      </div>
    `;
    }
}

export class TermsPage {
    constructor(root) {
        this.root = root;
    }

    async render() {
        this.root.innerHTML = `
      <div class="page container info-page">
        <header class="info-header">
          <h1>Terms of Service</h1>
          <p class="lead">Last updated: March 26, 2026</p>
        </header>

        <article class="content-article glass" style="padding: var(--space-8) var(--space-12); border-radius: var(--radius-2xl);">
          <section style="margin-bottom: var(--space-8);">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using ShopNest, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
          </section>

          <section style="margin-bottom: var(--space-8);">
            <h2>2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on ShopNest's website for personal, non-commercial transitory viewing only.</p>
          </section>

          <section style="margin-bottom: var(--space-8);">
            <h2>3. Disclaimer</h2>
            <p>The materials on ShopNest's website are provided on an 'as is' basis. ShopNest makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </section>

          <section style="margin-bottom: var(--space-8);">
            <h2>4. Limitations</h2>
            <p>In no event shall ShopNest or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ShopNest's website.</p>
          </section>

          <section style="margin-bottom: var(--space-8);">
            <h2>5. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which ShopNest operates and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
          </section>
        </article>
      </div>
    `;
    }
}

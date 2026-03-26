export class AboutPage {
  constructor(root) {
    this.root = root;
  }

  async render() {
    this.root.innerHTML = `
      <div class="page container info-page">
        <header class="info-header">
          <h1>Our Story</h1>
          <p class="lead">Elevating your daily essentials through thoughtful design and curated quality.</p>
        </header>

        <section class="info-section">
          <div class="info-grid">
            <div class="info-content">
              <h2>The ShopNest Mission</h2>
              <p>Founded with a simple goal in mind: to make premium lifestyle products accessible to everyone. We believe that the items you use every day should be beautiful, functional, and built to last.</p>
              <p>Our team scours the globe to find unique pieces that meet our rigorous standards for craftsmanship and sustainability. From minimalist tech accessories to hand-crafted jewelry, every item in our collection has a story to tell.</p>
            </div>
            <div class="info-image glass">
              <div class="placeholder-img" style="background: var(--logo-gradient); height: 300px; border-radius: var(--radius-xl); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; font-weight: 800;">S</div>
            </div>
          </div>
        </section>

        <section class="info-section stats-section">
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-number">10k+</span>
              <span class="stat-label">Happy Customers</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">500+</span>
              <span class="stat-label">Curated Products</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">24/7</span>
              <span class="stat-label">Premium Support</span>
            </div>
          </div>
        </section>

        <section class="info-section text-center quality-section glass">
          <h2>Quality You Can Trust</h2>
          <p style="max-width: 700px; margin: 0 auto var(--space-8);">Every product in our store undergoes a multi-step quality check. We partner directly with makers and innovators to ensure that you receive nothing but the best.</p>
          <a href="/" class="btn btn-primary btn-lg">Explore Collection</a>
        </section>
      </div>
    `;

    this.injectStyles();
  }

  injectStyles() {
    if (document.getElementById('info-page-styles')) return;
    const style = document.createElement('style');
    style.id = 'info-page-styles';
    style.textContent = `
      .info-page { padding-top: var(--space-12); padding-bottom: var(--space-20); }
      .info-header { text-align: center; margin-bottom: var(--space-16); }
      .info-header h1 { font-size: 3.5rem; letter-spacing: -2px; margin-bottom: var(--space-4); }
      .info-header .lead { font-size: 1.25rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto; }
      
      .info-section { margin-bottom: var(--space-20); }
      .quality-section { 
        padding: var(--space-16) var(--space-8); 
        border-radius: var(--radius-2xl);
        margin-bottom: var(--space-12);
        background: var(--bg-secondary);
        border: 1px solid var(--border-light);
      }
      .info-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: var(--space-12); align-items: center; }
      .info-content h2 { font-size: 2rem; margin-bottom: var(--space-6); color: var(--text-primary); }
      .info-content p { font-size: 1.125rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: var(--space-6); }
      
      .stats-grid { 
        display: grid; 
        grid-template-columns: repeat(3, 1fr); 
        gap: var(--space-8); 
        background: var(--bg-tertiary);
        padding: var(--space-12);
        border-radius: var(--radius-2xl);
        text-align: center;
      }
      .stat-number { display: block; font-size: 2.5rem; font-weight: 800; color: var(--accent-base); margin-bottom: var(--space-2); }
      .stat-label { font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); font-weight: 700; }
      
      .text-center { text-align: center; }
      
      @media (max-width: 900px) {
        .info-grid { grid-template-columns: 1fr; gap: var(--space-10); }
        .info-header h1 { font-size: 2.5rem; }
        .stats-grid { grid-template-columns: 1fr; gap: var(--space-10); }
      }
    `;
    document.head.appendChild(style);
  }
}

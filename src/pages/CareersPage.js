export class CareersPage {
    constructor(root) {
        this.root = root;
    }

    async render() {
        this.root.innerHTML = `
      <div class="page container info-page">
        <header class="info-header">
          <h1>Join the Team</h1>
          <p class="lead">We're always looking for passionate people to help us build the next generation of e-commerce.</p>
        </header>

        <section class="info-section glass" style="padding: var(--space-12); text-align: center; border-radius: var(--radius-2xl);">
          <div class="career-icon" style="font-size: 3rem; margin-bottom: var(--space-6);">🚀</div>
          <h2>Dream Big with ShopNest</h2>
          <p style="max-width: 600px; margin: 0 auto var(--space-8);">At ShopNest, we value creativity, curiosity, and a drive to solve complex problems. Whether you're a designer, developer, or marketing expert, we'd love to hear from you.</p>
          
          <div class="contact-card" style="background: var(--bg-tertiary); padding: var(--space-8); border-radius: var(--radius-xl); display: inline-block;">
             <h3 style="margin-bottom: var(--space-4);">Ready to start?</h3>
             <p style="margin-bottom: var(--space-4);">Send your resume and portfolio to:</p>
             <a href="mailto:careers@shopnest.com" class="btn btn-primary btn-lg" style="font-size: 1.25rem;">careers@shopnest.com</a>
          </div>
        </section>

        <section class="info-section">
          <div class="info-grid">
            <div class="info-content">
              <h2>Why ShopNest?</h2>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: var(--space-4); display: flex; align-items: center; gap: var(--space-3);">
                  <span style="color: var(--accent-base); font-size: 1.25rem;">✔</span>
                  <span>Remote-first culture with global teammates</span>
                </li>
                <li style="margin-bottom: var(--space-4); display: flex; align-items: center; gap: var(--space-3);">
                  <span style="color: var(--accent-base); font-size: 1.25rem;">✔</span>
                  <span>Flexible working hours and unlimited PTO</span>
                </li>
                <li style="margin-bottom: var(--space-4); display: flex; align-items: center; gap: var(--space-3);">
                  <span style="color: var(--accent-base); font-size: 1.25rem;">✔</span>
                  <span>Competitive salary and equity packages</span>
                </li>
                <li style="margin-bottom: var(--space-4); display: flex; align-items: center; gap: var(--space-3);">
                  <span style="color: var(--accent-base); font-size: 1.25rem;">✔</span>
                  <span>Annual learning & development budget</span>
                </li>
              </ul>
            </div>
            <div class="info-image">
               <div style="background: var(--bg-tertiary); padding: var(--space-12); border-radius: var(--radius-2xl); border: 1px solid var(--border-light);">
                  <h3 style="margin-bottom: var(--space-4);">Internship Program</h3>
                  <p>Are you a student or recent graduate? Check back in the fall for our next round of engineering and design internships.</p>
               </div>
            </div>
          </div>
        </section>
      </div>
    `;

        // Reusing styles from AboutPage or injecting them if needed
        if (!document.getElementById('info-page-styles')) {
            // Fallback or explicit injection logic could go here, 
            // but since I'm creating a new page, I'll ensure global styles or shared classes are used.
        }
    }
}

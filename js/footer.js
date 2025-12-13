// js/footer.js
export function loadFooter() {
  const excludedPages = ["login.html", "signup.html"];
  const currentPage = window.location.pathname.split("/").pop();

  if (excludedPages.includes(currentPage)) return;

  const footer = document.createElement("footer");
  footer.className = "footer";

  footer.innerHTML = `
    <div class="page__container">
      <div class="footer__grid">
        <div>
          <h3 class="footer__title">ShopNest</h3>
          <p class="footer__text">
            A modern eCommerce UI project built with Vanilla JavaScript.
            Browse products, open details, and manage a cart using
            localStorage — designed to be clean, fast, and CV-ready.
          </p>
        </div>

        <div>
          <h3 class="footer__title">Quick links</h3>
          <div class="footer__links">
            <a href="index.html">Shop</a>
            <a href="cart.html">Cart</a>
          </div>
        </div>

        <div>
          <h3 class="footer__title">Support</h3>
          <p class="footer__text">Email: support@shopnest.demo</p>
          <p class="footer__text">Hours: Mon–Sat, 10:00 AM – 6:00 PM</p>
          <p class="footer__text">
            This is a demo project — payments are not enabled.
          </p>
        </div>
      </div>

      <div class="footer__bottom">
        <span>© 2025 ShopNest. All rights reserved.</span>
        <span>Built by Himanshu • HTML • CSS • JavaScript</span>
      </div>
    </div>
  `;

  document.body.appendChild(footer);
}

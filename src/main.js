import { Router } from './utils/router.js';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { CartDrawer } from './components/CartDrawer.js';
import { Toast } from './components/Toast.js';

// Import Pages
import { ShopPage } from './pages/ShopPage.js';
import { ProductDetailsPage } from './pages/ProductDetailsPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { SignupPage } from './pages/SignupPage.js';
import { CheckoutPage } from './pages/CheckoutPage.js';
import { ProfilePage } from './pages/ProfilePage.js';
import { EditProfilePage } from './pages/EditProfilePage.js';
import { OrderDetailsPage } from './pages/OrderDetailsPage.js';
import { WishlistPage } from './pages/WishlistPage.js';

import { AuthService } from './services/AuthService.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Global Components
    Navbar.mount(document.getElementById('navbar-root'));
    Footer.mount(document.getElementById('footer-root'));
    CartDrawer.mount(document.getElementById('cart-drawer-root'));
    Toast.init(document.getElementById('toast-root'));

    // Initialize Router
    const router = new Router(document.getElementById('app-root'));

    // Define Routes
    router.addRoute('/', ShopPage);
    router.addRoute('/product', ProductDetailsPage);
    router.addRoute('/login', LoginPage);
    router.addRoute('/signup', SignupPage);

    // Protected Routes
    router.addRoute('/checkout', CheckoutPage, () => {
        if (!AuthService.isAuthenticated()) {
            Toast.show('Please login to checkout', 'error');
            router.navigate('/login');
            return false;
        }
        return true;
    });

    router.addRoute('/profile', ProfilePage, () => {
        if (!AuthService.isAuthenticated()) {
            Toast.show('Please login to view profile', 'error');
            router.navigate('/login');
            return false;
        }
        return true;
    });

    router.addRoute('/edit-profile', EditProfilePage, () => {
        if (!AuthService.isAuthenticated()) {
            Toast.show('Please login to edit profile', 'error');
            router.navigate('/login');
            return false;
        }
        return true;
    });

    router.addRoute('/order-details', OrderDetailsPage, () => {
        if (!AuthService.isAuthenticated()) {
            Toast.show('Please login to view order details', 'error');
            router.navigate('/login');
            return false;
        }
        return true;
    });

    router.addRoute('/wishlist', WishlistPage);

    // Start routing
    router.start();
});

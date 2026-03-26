export class CartService {
    static CART_KEY = 'shopnest_cart';

    static getCart() {
        return JSON.parse(localStorage.getItem(this.CART_KEY) || '[]');
    }

    static saveCart(cart) {
        localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
        // Dispatch event so UI (like Navbar counter, CartDrawer) can update
        window.dispatchEvent(new CustomEvent('cart:updated', { detail: { cart } }));
    }

    static addItem(product) {
        const cart = this.getCart();
        const existingIndex = cart.findIndex(item => item.id === product.id);

        if (existingIndex >= 0) {
            cart[existingIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        this.saveCart(cart);
    }

    static updateQuantity(productId, quantity) {
        let cart = this.getCart();
        if (quantity <= 0) {
            this.removeItem(productId);
            return;
        }

        const existingIndex = cart.findIndex(item => item.id === productId);
        if (existingIndex >= 0) {
            cart[existingIndex].quantity = quantity;
            this.saveCart(cart);
        }
    }

    static removeItem(productId) {
        const cart = this.getCart();
        const filtered = cart.filter(item => item.id !== productId);
        this.saveCart(filtered);
    }

    static clearCart() {
        this.saveCart([]);
    }

    static getCartTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    static getCartCount() {
        const cart = this.getCart();
        return cart.reduce((count, item) => count + item.quantity, 0);
    }
}

export class WishlistService {
    static getWishlist() {
        return JSON.parse(localStorage.getItem('wishlist') || '[]');
    }

    static toggleWishlist(product) {
        const wishlist = this.getWishlist();
        const index = wishlist.findIndex(p => p.id === product.id);

        if (index === -1) {
            wishlist.push(product);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            window.dispatchEvent(new CustomEvent('wishlist:updated'));
            return true; // Added
        } else {
            wishlist.splice(index, 1);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            window.dispatchEvent(new CustomEvent('wishlist:updated'));
            return false; // Removed
        }
    }

    static isInWishlist(productId) {
        const wishlist = this.getWishlist();
        return wishlist.some(p => p.id === productId);
    }
}

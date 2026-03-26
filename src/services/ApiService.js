const API_URL = 'https://fakestoreapi.com/products';

export const ApiService = {
    /**
     * Fetch all products from the mock API
     * @returns {Promise<Array>} Array of product objects
     */
    async getProducts() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch products');
            return await response.json();
        } catch (error) {
            console.error('ApiService.getProducts Error:', error);
            throw error;
        }
    },

    /**
     * Fetch a single product by ID
     * @param {number|string} id 
     * @returns {Promise<Object>}
     */
    async getProduct(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error('Failed to fetch product ' + id);
            return await response.json();
        } catch (error) {
            console.error(`ApiService.getProduct(${id}) Error:`, error);
            throw error;
        }
    }
};

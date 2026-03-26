export class OrderService {
    static ORDERS_KEY = 'shopnest_orders';

    /**
     * Get all orders for the current user
     */
    static getUserOrders(userId) {
        const allOrders = JSON.parse(localStorage.getItem(this.ORDERS_KEY) || '[]');
        return allOrders.filter(order => order.userId === userId).sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    /**
     * Save a new order
     */
    static placeOrder(userId, items, total, shippingDetails) {
        const allOrders = JSON.parse(localStorage.getItem(this.ORDERS_KEY) || '[]');
        const newOrder = {
            id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            userId,
            items,
            total,
            shippingDetails,
            date: new Date().toISOString(),
            status: 'Processing'
        };
        allOrders.push(newOrder);
        localStorage.setItem(this.ORDERS_KEY, JSON.stringify(allOrders));
        return newOrder;
    }

    /**
     * Get a specific order by ID
     */
    static getOrderById(orderId) {
        const allOrders = JSON.parse(localStorage.getItem(this.ORDERS_KEY) || '[]');
        return allOrders.find(order => order.id === orderId);
    }
}

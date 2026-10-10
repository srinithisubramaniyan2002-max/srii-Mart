/**
 * Srinidhi Mart - API Service
 * Handles all REST API communications with the Spring Boot backend
 */

// If running directly through Spring Boot on port 8080, relative URL works seamlessly.
// If opened via file:// or Live Server (port 5500), points directly to Spring Boot backend.
const API_BASE = (window.location.protocol === 'file:' || window.location.port !== '8080')
  ? 'http://localhost:8080/api'
  : '/api';

const api = {
  // Generic Fetch wrapper with JSON parsing and error handling
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    try {
      const response = await fetch(url, { ...options, headers });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      return data;
    } catch (err) {
      console.warn(`[API] Network or Server Error on ${endpoint}:`, err.message);
      throw err;
    }
  },

  // Products
  async getProducts({ search = '', brand = '', sortBy = 'default', minPrice, maxPrice } = {}) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (brand && brand !== 'All') params.append('brand', brand);
    if (sortBy && sortBy !== 'default') params.append('sortBy', sortBy);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);

    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request(`/products${query}`);
  },

  async getProductById(id) {
    return this.request(`/products/${id}`);
  },

  async getBrands() {
    return this.request('/products/brands');
  },

  async getFeaturedProducts() {
    return this.request('/products/featured');
  },

  // Auth
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  async getCurrentUser(userId) {
    return this.request(`/auth/me?userId=${userId}`);
  },

  // Cart
  async getCart(userId) {
    return this.request(`/cart?userId=${userId}`);
  },

  async addToCart(userId, productId, quantity = 1) {
    return this.request(`/cart/add?userId=${userId}`, {
      method: 'POST',
      body: JSON.stringify({ productId, quantity })
    });
  },

  async updateCartItem(userId, itemId, quantity) {
    return this.request(`/cart/${itemId}?userId=${userId}&quantity=${quantity}`, {
      method: 'PUT'
    });
  },

  async removeCartItem(userId, itemId) {
    return this.request(`/cart/${itemId}?userId=${userId}`, {
      method: 'DELETE'
    });
  },

  async clearCart(userId) {
    return this.request(`/cart/clear?userId=${userId}`, {
      method: 'DELETE'
    });
  },

  // Orders
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  async getOrders(userId) {
    return this.request(`/orders?userId=${userId}`);
  },

  async getOrderById(orderId) {
    return this.request(`/orders/${orderId}`);
  },

  async trackOrder(orderNumber) {
    return this.request(`/orders/track/${encodeURIComponent(orderNumber)}`);
  }
};

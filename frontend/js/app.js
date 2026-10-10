/**
 * Srinidhi Mart - Main Application Controller
 * Handles product catalog rendering, brand filters, search, modal popups, and toast notifications
 */

// Fallback mobile dataset in case backend is offline during frontend preview
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro Max (256 GB) - Natural Titanium",
    brand: "Apple",
    model: "iPhone 15 Pro Max",
    description: "Forged in titanium with A17 Pro chip, Action button, and 5x Telephoto zoom.",
    price: 154900.00,
    originalPrice: 159900.00,
    discountPercent: 3,
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    ratingCount: 342,
    ram: "8 GB",
    storage: "256 GB",
    battery: "4422 mAh",
    camera: "48MP + 12MP + 12MP 5x Zoom",
    processor: "A17 Pro Bionic (3nm)",
    isFeatured: true
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra 5G (12GB RAM, 256GB Storage) - Titanium Gray",
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    description: "Galaxy AI powerhouse with built-in S Pen, 200MP Quad Telephoto and Snapdragon 8 Gen 3.",
    price: 129999.00,
    originalPrice: 134999.00,
    discountPercent: 4,
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    ratingCount: 518,
    ram: "12 GB",
    storage: "256 GB",
    battery: "5000 mAh",
    camera: "200MP + 50MP + 12MP + 10MP",
    processor: "Snapdragon 8 Gen 3 for Galaxy",
    isFeatured: true
  },
  {
    id: 3,
    name: "OnePlus 12 5G (16GB RAM, 512GB Storage) - Flowy Emerald",
    brand: "OnePlus",
    model: "OnePlus 12",
    description: "Hasselblad Camera, Snapdragon 8 Gen 3, 2K 120Hz ProXDR, and 100W SUPERVOOC charging.",
    price: 69999.00,
    originalPrice: 74999.00,
    discountPercent: 7,
    stock: 40,
    imageUrl: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    ratingCount: 280,
    ram: "16 GB",
    storage: "512 GB",
    battery: "5400 mAh",
    camera: "50MP LYT-808 + 64MP 3x + 48MP UW",
    processor: "Snapdragon 8 Gen 3",
    isFeatured: true
  },
  {
    id: 4,
    name: "Google Pixel 8 Pro (12GB RAM, 128GB Storage) - Bay Blue",
    brand: "Google",
    model: "Pixel 8 Pro",
    description: "Google Tensor G3 chip engineered with Google AI for Best Take and Magic Eraser.",
    price: 93999.00,
    originalPrice: 106999.00,
    discountPercent: 12,
    stock: 20,
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    ratingCount: 194,
    ram: "12 GB",
    storage: "128 GB",
    battery: "5050 mAh",
    camera: "50MP Octa PD + 48MP UW + 48MP 5x",
    processor: "Google Tensor G3",
    isFeatured: true
  },
  {
    id: 5,
    name: "Apple iPhone 15 (128 GB) - Blue",
    brand: "Apple",
    model: "iPhone 15",
    description: "Dynamic Island, 48MP Main camera with 2x Telephoto, color-infused glass and USB-C.",
    price: 71999.00,
    originalPrice: 79900.00,
    discountPercent: 10,
    stock: 35,
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    ratingCount: 410,
    ram: "6 GB",
    storage: "128 GB",
    battery: "3349 mAh",
    camera: "48MP + 12MP Ultra Wide",
    processor: "A16 Bionic",
    isFeatured: false
  },
  {
    id: 6,
    name: "Samsung Galaxy S24 5G (8GB RAM, 128GB Storage) - Cobalt Violet",
    brand: "Samsung",
    model: "Galaxy S24",
    description: "Compact flagship with 6.2-inch Dynamic AMOLED 2X 120Hz display and Galaxy AI.",
    price: 74999.00,
    originalPrice: 79999.00,
    discountPercent: 6,
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    ratingCount: 165,
    ram: "8 GB",
    storage: "128 GB",
    battery: "4000 mAh",
    camera: "50MP + 10MP 3x + 12MP UW",
    processor: "Snapdragon 8 Gen 3",
    isFeatured: false
  },
  {
    id: 7,
    name: "Nothing Phone (2) 5G (12GB RAM, 256GB Storage) - Dark Grey",
    brand: "Nothing",
    model: "Phone (2)",
    description: "Iconic Glyph Interface, Snapdragon 8+ Gen 1, 50MP Sony dual camera and Nothing OS.",
    price: 36999.00,
    originalPrice: 49999.00,
    discountPercent: 26,
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    ratingCount: 310,
    ram: "12 GB",
    storage: "256 GB",
    battery: "4700 mAh",
    camera: "50MP IMX890 + 50MP JN1 UW",
    processor: "Snapdragon 8+ Gen 1",
    isFeatured: true
  },
  {
    id: 8,
    name: "OnePlus Nord CE4 5G (8GB RAM, 128GB Storage) - Celadon Marble",
    brand: "OnePlus",
    model: "Nord CE4",
    description: "Snapdragon 7 Gen 3, 100W SUPERVOOC, 5500 mAh battery, and Sony LYT-600 with OIS.",
    price: 24999.00,
    originalPrice: 26999.00,
    discountPercent: 7,
    stock: 60,
    imageUrl: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    ratingCount: 520,
    ram: "8 GB",
    storage: "128 GB",
    battery: "5500 mAh",
    camera: "50MP Sony LYT-600 OIS + 8MP",
    processor: "Snapdragon 7 Gen 3",
    isFeatured: false
  },
  {
    id: 9,
    name: "Xiaomi 14 5G (12GB RAM, 512GB Storage) - Jade Green",
    brand: "Xiaomi",
    model: "Xiaomi 14",
    description: "Leica Summilux lens, Snapdragon 8 Gen 3, 1.5K 120Hz LTPO AMOLED, 90W HyperCharge.",
    price: 69999.00,
    originalPrice: 79999.00,
    discountPercent: 12,
    stock: 22,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    ratingCount: 180,
    ram: "12 GB",
    storage: "512 GB",
    battery: "4610 mAh",
    camera: "50MP Leica Main + 50MP 75mm Floating",
    processor: "Snapdragon 8 Gen 3",
    isFeatured: false
  },
  {
    id: 10,
    name: "Vivo X100 5G (16GB RAM, 512GB Storage) - Stargaze Blue",
    brand: "Vivo",
    model: "X100",
    description: "ZEISS APO Telephoto, MediaTek Dimensity 9300, and 120W Dual-Cell FlashCharge.",
    price: 63999.00,
    originalPrice: 69999.00,
    discountPercent: 8,
    stock: 18,
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    ratingCount: 140,
    ram: "16 GB",
    storage: "512 GB",
    battery: "5000 mAh",
    camera: "50MP VCS + 64MP ZEISS + 50MP UW",
    processor: "MediaTek Dimensity 9300",
    isFeatured: false
  },
  {
    id: 11,
    name: "Realme 12 Pro+ 5G (12GB RAM, 256GB Storage) - Submarine Blue",
    brand: "Realme",
    model: "12 Pro+",
    description: "Luxury watch design, 64MP Periscope Portrait camera with 120x SuperZoom.",
    price: 29999.00,
    originalPrice: 33999.00,
    discountPercent: 12,
    stock: 50,
    imageUrl: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    ratingCount: 380,
    ram: "12 GB",
    storage: "256 GB",
    battery: "5000 mAh",
    camera: "64MP Periscope + 50MP IMX890",
    processor: "Snapdragon 7s Gen 2",
    isFeatured: false
  },
  {
    id: 12,
    name: "Google Pixel 8a (8GB RAM, 128GB Storage) - Aloe",
    brand: "Google",
    model: "Pixel 8a",
    description: "Google Tensor G3, Actua 120Hz display, IP67 resistance, and 7 years of Pixel updates.",
    price: 49999.00,
    originalPrice: 52999.00,
    discountPercent: 6,
    stock: 35,
    imageUrl: "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    ratingCount: 210,
    ram: "8 GB",
    storage: "128 GB",
    battery: "4492 mAh",
    camera: "64MP Quad PD + 13MP UW",
    processor: "Google Tensor G3",
    isFeatured: false
  }
];

const app = {
  products: [],
  selectedBrand: 'All',
  searchQuery: '',
  selectedSort: 'default',
  currentViewingProduct: null,

  // Initialize app
  async init() {
    auth.updateUI();
    await cart.init();
    await this.loadBrands();
    await this.loadProducts();
    this.setupEventListeners();
  },

  // Load brands from API
  async loadBrands() {
    try {
      const response = await api.getBrands();
      const brands = ['All', ...(response.data || [])];
      this.renderBrandPills(brands);
    } catch (e) {
      const defaultBrands = ['All', 'Apple', 'Samsung', 'OnePlus', 'Google', 'Nothing', 'Xiaomi', 'Vivo', 'Realme'];
      this.renderBrandPills(defaultBrands);
    }
  },

  renderBrandPills(brands) {
    const container = document.getElementById('brand-pills-container');
    if (!container) return;

    container.innerHTML = brands.map(brand => `
      <button class="brand-pill ${brand === this.selectedBrand ? 'active' : ''}" onclick="app.filterByBrand('${brand}')">
        ${brand}
      </button>
    `).join('');
  },

  // Filter by brand
  async filterByBrand(brand) {
    this.selectedBrand = brand;
    document.querySelectorAll('.brand-pill').forEach(pill => {
      pill.classList.toggle('active', pill.textContent.trim() === brand);
    });
    await this.loadProducts();
  },

  // Load products from API
  async loadProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
        <div style="display: inline-block; width: 40px; height: 40px; border: 3px solid #cbd5e1; border-top-color: #4f46e5; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
        <p style="margin-top: 1rem; color: #64748b; font-weight: 500;">Loading authentic mobile phones...</p>
      </div>
    `;

    try {
      const response = await api.getProducts({
        search: this.searchQuery,
        brand: this.selectedBrand,
        sortBy: this.selectedSort
      });
      this.products = response.data || [];
    } catch (err) {
      console.warn('API error, using fallback dataset:', err.message);
      // Filter locally in fallback dataset
      let list = [...FALLBACK_PRODUCTS];
      if (this.selectedBrand && this.selectedBrand !== 'All') {
        list = list.filter(p => p.brand.toLowerCase() === this.selectedBrand.toLowerCase());
      }
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
      }
      if (this.selectedSort === 'price_asc') {
        list.sort((a, b) => a.price - b.price);
      } else if (this.selectedSort === 'price_desc') {
        list.sort((a, b) => b.price - a.price);
      } else if (this.selectedSort === 'rating_desc') {
        list.sort((a, b) => b.rating - a.rating);
      }
      this.products = list;
    }

    this.renderProducts();
  },

  renderProducts() {
    const grid = document.getElementById('products-grid');
    const countEl = document.getElementById('products-count');
    if (!grid) return;

    if (countEl) {
      countEl.textContent = this.products.length;
    }

    if (this.products.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: #fff; border-radius: 12px; border: 1px dashed #cbd5e1;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">🔍</div>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a;">No phones found</h3>
          <p style="color: #64748b; margin: 0.5rem 0 1.5rem;">Try modifying your search or choosing another brand.</p>
          <button class="btn-primary" onclick="app.resetFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = this.products.map(p => `
      <div class="product-card" id="product-${p.id}">
        <div class="product-badges">
          ${p.discountPercent > 0 ? `<span class="badge-discount">${p.discountPercent}% OFF</span>` : ''}
          ${p.isFeatured ? `<span class="badge-featured">★ Featured</span>` : ''}
        </div>

        <div class="product-image-wrap" onclick="app.viewProductDetails(${p.id})">
          <img src="${p.imageUrl}" alt="${p.name}" loading="lazy">
        </div>

        <div class="product-details">
          <span class="product-brand">${p.brand}</span>
          <h3 class="product-name" title="${p.name}" onclick="app.viewProductDetails(${p.id})">
            ${p.name}
          </h3>

          <div class="product-rating">
            <span class="rating-stars">★★★★☆</span>
            <span class="rating-score">${p.rating}</span>
            <span class="rating-count">(${p.ratingCount})</span>
          </div>

          <div class="product-specs-pills">
            ${p.ram ? `<span class="spec-pill">${p.ram} RAM</span>` : ''}
            ${p.storage ? `<span class="spec-pill">${p.storage}</span>` : ''}
            ${p.battery ? `<span class="spec-pill">${p.battery}</span>` : ''}
          </div>

          <div class="product-pricing">
            <span class="current-price">₹${Number(p.price).toLocaleString('en-IN')}</span>
            ${p.originalPrice && p.originalPrice > p.price ? `
              <span class="original-price">₹${Number(p.originalPrice).toLocaleString('en-IN')}</span>
              <span class="discount-save">Save ₹${Number(p.originalPrice - p.price).toLocaleString('en-IN')}</span>
            ` : ''}
          </div>

          <div class="card-actions">
            <button class="btn-add-cart" onclick="app.handleAddToCart(${p.id})">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              <span>Add to Cart</span>
            </button>
            <button class="btn-view-details" title="Quick View" onclick="app.viewProductDetails(${p.id})">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  handleAddToCart(productId) {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      cart.addItem(product, 1);
    }
  },

  // View Product Details Modal
  viewProductDetails(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    this.currentViewingProduct = product;

    document.getElementById('modal-p-img').src = product.imageUrl;
    document.getElementById('modal-p-img').alt = product.name;
    document.getElementById('modal-p-brand').textContent = product.brand;
    document.getElementById('modal-p-name').textContent = product.name;
    document.getElementById('modal-p-rating').textContent = `${product.rating} ★ (${product.ratingCount} reviews)`;
    document.getElementById('modal-p-price').textContent = `₹${Number(product.price).toLocaleString('en-IN')}`;
    document.getElementById('modal-p-original-price').textContent = product.originalPrice ? `₹${Number(product.originalPrice).toLocaleString('en-IN')}` : '';
    document.getElementById('modal-p-desc').textContent = product.description;

    document.getElementById('modal-p-ram').textContent = product.ram || '8 GB';
    document.getElementById('modal-p-storage').textContent = product.storage || '128 GB';
    document.getElementById('modal-p-camera').textContent = product.camera || '50 MP High-Res';
    document.getElementById('modal-p-battery').textContent = product.battery || '5000 mAh';
    document.getElementById('modal-p-processor').textContent = product.processor || 'Octa-Core';
    document.getElementById('modal-p-stock').textContent = `${product.stock} units available`;

    const modal = document.getElementById('product-details-modal');
    if (modal) modal.classList.add('active');
  },

  closeProductDetailsModal() {
    const modal = document.getElementById('product-details-modal');
    if (modal) modal.classList.remove('active');
  },

  addViewingProductToCart() {
    if (this.currentViewingProduct) {
      cart.addItem(this.currentViewingProduct, 1);
      this.closeProductDetailsModal();
    }
  },

  resetFilters() {
    this.searchQuery = '';
    this.selectedBrand = 'All';
    this.selectedSort = 'default';
    const sInput = document.getElementById('search-input');
    const sInputMob = document.getElementById('search-input-mobile');
    if (sInput) sInput.value = '';
    if (sInputMob) sInputMob.value = '';
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) sortSelect.value = 'default';
    this.filterByBrand('All');
  },

  // Setup search, sort, and keypress listeners
  setupEventListeners() {
    // Search Desktop
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.searchQuery = document.getElementById('search-input').value.trim();
        this.loadProducts();
      });
    }

    // Search Mobile
    const searchFormMob = document.getElementById('search-form-mobile');
    if (searchFormMob) {
      searchFormMob.addEventListener('submit', (e) => {
        e.preventDefault();
        this.searchQuery = document.getElementById('search-input-mobile').value.trim();
        this.loadProducts();
      });
    }

    // Sort
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.selectedSort = e.target.value;
        this.loadProducts();
      });
    }

    // Close Modals on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeProductDetailsModal();
        auth.closeModal();
        cart.closeDrawer();
        checkout.closeModal();
        checkout.closeConfirmationModal();
        this.closeOrdersModal();
      }
    });
  },

  // My Orders Modal
  async openOrdersModal() {
    const user = auth.getUser();
    if (!user) {
      auth.openModal('login');
      showToast('Please sign in to view your order history', 'info');
      return;
    }

    const modal = document.getElementById('my-orders-modal');
    const container = document.getElementById('orders-list-container');
    if (modal) modal.classList.add('active');

    if (container) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <div style="display: inline-block; width: 30px; height: 30px; border: 3px solid #cbd5e1; border-top-color: #4f46e5; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
          <p style="margin-top: 0.5rem; color: #64748b;">Loading your orders...</p>
        </div>
      `;

      try {
        const response = await api.getOrders(user.id);
        const orders = response.data || [];

        if (orders.length === 0) {
          container.innerHTML = `
            <div class="empty-state">
              <div class="empty-state-icon">📦</div>
              <h3>No orders yet</h3>
              <p>You haven't placed any orders with Srinidhi Mart yet.</p>
            </div>
          `;
          return;
        }

        container.innerHTML = orders.map(ord => `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.25rem; margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.75rem; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
              <div>
                <strong style="color: #4f46e5;">${ord.orderNumber}</strong>
                <span style="color: #64748b; font-size: 0.8rem; margin-left: 0.5rem;">${new Date(ord.createdAt).toLocaleDateString()}</span>
              </div>
              <span style="background: #ecfdf5; color: #059669; font-weight: 700; font-size: 0.75rem; padding: 0.25rem 0.65rem; border-radius: 999px;">
                ${ord.orderStatus}
              </span>
            </div>
            <div style="font-size: 0.875rem; color: #334155; margin-bottom: 0.75rem;">
              <strong>Total Paid:</strong> ₹${Number(ord.totalAmount).toLocaleString('en-IN')} via ${ord.paymentMethod}
            </div>
            <div style="font-size: 0.825rem; color: #64748b;">
              <strong>Delivery to:</strong> ${ord.shippingAddress}, ${ord.city}
            </div>
          </div>
        `).join('');
      } catch (err) {
        container.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: #ef4444;">
            Failed to load orders: ${err.message}
          </div>
        `;
      }
    }
  },

  closeOrdersModal() {
    const modal = document.getElementById('my-orders-modal');
    if (modal) modal.classList.remove('active');
  }
};

// Global Toast System
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
  toast.innerHTML = `
    <span style="font-weight: bold; font-size: 1.1rem;">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Start app on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});

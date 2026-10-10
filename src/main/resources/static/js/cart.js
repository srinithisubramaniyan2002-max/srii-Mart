/**
 * Srinidhi Mart - Shopping Cart Module
 * Supports both persistent backend cart (logged-in users)
 * and guest localStorage cart with automatic calculation
 */

const cart = {
  items: [],
  appliedCoupon: null,
  couponDiscount: 0,

  // Initialize cart
  async init() {
    await this.loadCart();
  },

  // Load items from backend or localStorage
  async loadCart() {
    const user = auth.getUser();
    if (user && user.id) {
      try {
        const response = await api.getCart(user.id);
        // Transform backend CartItem structure if needed
        this.items = (response.data || []).map(ci => ({
          cartItemId: ci.id,
          id: ci.product.id,
          name: ci.product.name,
          brand: ci.product.brand,
          price: ci.product.price,
          imageUrl: ci.product.imageUrl,
          quantity: ci.quantity
        }));
      } catch (err) {
        console.warn('Could not fetch cart from server, using local fallback:', err.message);
        this.loadLocalCart();
      }
    } else {
      this.loadLocalCart();
    }
    this.render();
  },

  loadLocalCart() {
    try {
      const data = localStorage.getItem('srinidhi_cart');
      this.items = data ? JSON.parse(data) : [];
    } catch (e) {
      this.items = [];
    }
  },

  saveLocalCart() {
    localStorage.setItem('srinidhi_cart', JSON.stringify(this.items));
  },

  // Add product to cart
  async addItem(product, quantity = 1) {
    const user = auth.getUser();

    // Check if item already exists locally
    const existing = this.items.find(i => i.id === product.id);

    if (user && user.id) {
      try {
        await api.addToCart(user.id, product.id, quantity);
        await this.loadCart();
      } catch (err) {
        showToast(err.message || 'Could not add to cart', 'error');
        return;
      }
    } else {
      // Guest mode
      if (existing) {
        existing.quantity += quantity;
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: quantity
        });
      }
      this.saveLocalCart();
      this.render();
    }

    showToast(`Added ${product.name.substring(0, 24)}... to cart!`, 'success');
    this.openDrawer();
  },

  // Update item quantity
  async updateQuantity(productId, delta) {
    const item = this.items.find(i => i.id === productId);
    if (!item) return;

    const newQty = item.quantity + delta;
    const user = auth.getUser();

    if (newQty <= 0) {
      await this.removeItem(productId);
      return;
    }

    if (user && user.id && item.cartItemId) {
      try {
        await api.updateCartItem(user.id, item.cartItemId, newQty);
        await this.loadCart();
      } catch (err) {
        showToast(err.message, 'error');
      }
    } else {
      item.quantity = newQty;
      this.saveLocalCart();
      this.render();
    }
  },

  // Remove item
  async removeItem(productId) {
    const item = this.items.find(i => i.id === productId);
    if (!item) return;

    const user = auth.getUser();
    if (user && user.id && item.cartItemId) {
      try {
        await api.removeCartItem(user.id, item.cartItemId);
        await this.loadCart();
      } catch (err) {
        showToast(err.message, 'error');
      }
    } else {
      this.items = this.items.filter(i => i.id !== productId);
      this.saveLocalCart();
      this.render();
    }

    showToast('Item removed from cart', 'info');
  },

  // Clear cart
  async clear() {
    const user = auth.getUser();
    if (user && user.id) {
      try {
        await api.clearCart(user.id);
      } catch (e) {}
    }
    this.items = [];
    this.appliedCoupon = null;
    this.couponDiscount = 0;
    this.saveLocalCart();
    this.render();
  },

  // Calculations
  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
  },

  getTax() {
    return Math.round(this.getSubtotal() * 0.05); // 5% GST
  },

  getShipping() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= 999 ? 0 : 99;
  },

  applyCoupon(code) {
    const clean = code.trim().toUpperCase();
    const subtotal = this.getSubtotal();

    if (subtotal === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }

    if (clean === 'WELCOME10') {
      this.appliedCoupon = 'WELCOME10';
      this.couponDiscount = Math.round(subtotal * 0.10); // 10% off
      showToast('Coupon WELCOME10 applied: 10% discount!', 'success');
    } else if (clean === 'FESTIVE20') {
      this.appliedCoupon = 'FESTIVE20';
      this.couponDiscount = Math.round(subtotal * 0.20); // 20% off
      showToast('Coupon FESTIVE20 applied: 20% festive discount!', 'success');
    } else {
      showToast('Invalid coupon code. Try WELCOME10 or FESTIVE20', 'error');
      return;
    }
    this.render();
  },

  removeCoupon() {
    this.appliedCoupon = null;
    this.couponDiscount = 0;
    this.render();
    showToast('Coupon removed', 'info');
  },

  getTotal() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    const tax = this.getTax();
    const shipping = this.getShipping();
    const total = subtotal + tax + shipping - this.couponDiscount;
    return Math.max(0, total);
  },

  getTotalItemsCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  },

  // Open & Close Cart Drawer
  openDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    if (drawer && overlay) {
      drawer.classList.add('active');
      overlay.classList.add('active');
    }
  },

  closeDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    if (drawer && overlay) {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
    }
  },

  // Render Cart UI
  render() {
    // 1. Update header badge counter
    const badge = document.getElementById('cart-counter-badge');
    if (badge) {
      const count = this.getTotalItemsCount();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-block' : 'none';
    }

    // 2. Render items in drawer
    const container = document.getElementById('cart-drawer-items');
    const summaryContainer = document.getElementById('cart-drawer-summary');
    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p style="margin: 0.5rem 0 1.25rem;">Looks like you haven't added any mobile phones yet.</p>
          <button class="btn-primary" onclick="cart.closeDrawer(); window.scrollTo({top: 500, behavior: 'smooth'});">
            Browse Phones
          </button>
        </div>
      `;
      if (summaryContainer) summaryContainer.style.display = 'none';
      return;
    }

    if (summaryContainer) summaryContainer.style.display = 'block';

    container.innerHTML = this.items.map(item => `
      <div class="cart-item-card">
        <img class="cart-item-thumb" src="${item.imageUrl}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="cart-item-price">₹${Number(item.price).toLocaleString('en-IN')}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, -1)">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" title="Remove item" onclick="cart.removeItem(${item.id})">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
    `).join('');

    // 3. Render summary calculations
    const subtotal = this.getSubtotal();
    const tax = this.getTax();
    const shipping = this.getShipping();
    const total = this.getTotal();

    document.getElementById('cart-subtotal-val').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('cart-tax-val').textContent = `₹${tax.toLocaleString('en-IN')}`;
    document.getElementById('cart-shipping-val').textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
    document.getElementById('cart-total-val').textContent = `₹${total.toLocaleString('en-IN')}`;

    const discountRow = document.getElementById('cart-discount-row');
    if (discountRow) {
      if (this.couponDiscount > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('cart-discount-val').textContent = `-₹${this.couponDiscount.toLocaleString('en-IN')} (${this.appliedCoupon})`;
      } else {
        discountRow.style.display = 'none';
      }
    }
  }
};

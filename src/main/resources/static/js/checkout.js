/**
 * Srinidhi Mart - Checkout & Order Confirmation Module
 * Handles demo checkout, payment selection, order creation and confirmation view
 */

const checkout = {
  selectedPayment: 'UPI',

  openModal() {
    if (cart.items.length === 0) {
      showToast('Your cart is empty. Please add items to checkout.', 'error');
      return;
    }

    cart.closeDrawer();

    const user = auth.getUser();
    if (user) {
      document.getElementById('checkout-name').value = user.name || '';
      document.getElementById('checkout-email').value = user.email || '';
      document.getElementById('checkout-phone').value = user.phone || '';
      if (user.address) {
        document.getElementById('checkout-address').value = user.address || '';
      }
    }

    this.renderSummary();
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.add('active');
  },

  closeModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) modal.classList.remove('active');
  },

  selectPayment(method) {
    this.selectedPayment = method;
    document.querySelectorAll('.payment-method-card').forEach(card => {
      card.classList.toggle('selected', card.dataset.method === method);
    });

    const upiDetails = document.getElementById('payment-upi-details');
    const cardDetails = document.getElementById('payment-card-details');
    if (upiDetails) upiDetails.style.display = method === 'UPI' ? 'block' : 'none';
    if (cardDetails) cardDetails.style.display = method === 'CARD' ? 'block' : 'none';
  },

  renderSummary() {
    const container = document.getElementById('checkout-items-preview');
    if (!container) return;

    container.innerHTML = cart.items.map(i => `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; font-size: 0.875rem;">
        <span style="max-width: 65%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          <strong>${i.quantity}x</strong> ${i.name}
        </span>
        <span style="font-weight: 600;">₹${(Number(i.price) * i.quantity).toLocaleString('en-IN')}</span>
      </div>
    `).join('');

    const subtotal = cart.getSubtotal();
    const tax = cart.getTax();
    const shipping = cart.getShipping();
    const discount = cart.couponDiscount;
    const total = cart.getTotal();

    document.getElementById('checkout-subtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('checkout-tax').textContent = `₹${tax.toLocaleString('en-IN')}`;
    document.getElementById('checkout-shipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
    document.getElementById('checkout-discount').textContent = `-₹${discount.toLocaleString('en-IN')}`;
    document.getElementById('checkout-total').textContent = `₹${total.toLocaleString('en-IN')}`;

    const discountRow = document.getElementById('checkout-discount-row');
    if (discountRow) discountRow.style.display = discount > 0 ? 'flex' : 'none';
  },

  async handlePlaceOrder(event) {
    event.preventDefault();

    const name = document.getElementById('checkout-name').value.trim();
    const email = document.getElementById('checkout-email').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const address = document.getElementById('checkout-address').value.trim();
    const city = document.getElementById('checkout-city').value.trim();
    const state = document.getElementById('checkout-state').value.trim();
    const pincode = document.getElementById('checkout-pincode').value.trim();
    const submitBtn = document.getElementById('place-order-btn');

    if (!name || !email || !phone || !address || !city || !state || !pincode) {
      showToast('Please complete all shipping address fields', 'error');
      return;
    }

    const user = auth.getUser();
    const orderPayload = {
      userId: user ? user.id : null,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      shippingAddress: address,
      city: city,
      state: state,
      pincode: pincode,
      paymentMethod: this.selectedPayment,
      discountAmount: cart.couponDiscount,
      items: cart.items.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    };

    try {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span style="display:inline-block; animation: spin 1s infinite linear;">↻</span> Placing Order...
      `;

      const response = await api.createOrder(orderPayload);
      const createdOrder = response.data;

      // Close checkout modal and clear cart
      this.closeModal();
      await cart.clear();

      // Show Order Confirmation
      this.showOrderConfirmation(createdOrder);
    } catch (err) {
      showToast(err.message || 'Error placing order. Please try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `Place Order (Demo Payment)`;
    }
  },

  showOrderConfirmation(order) {
    const modal = document.getElementById('order-confirmation-modal');
    if (!modal) return;

    // Delivery date calculation (3 to 5 days from today)
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 4);
    const dateFormatted = deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    document.getElementById('conf-order-number').textContent = order.orderNumber;
    document.getElementById('conf-customer-name').textContent = order.customerName;
    document.getElementById('conf-customer-email').textContent = order.customerEmail;
    document.getElementById('conf-payment-method').textContent = `${order.paymentMethod} (Demo Verified)`;
    document.getElementById('conf-delivery-date').textContent = dateFormatted;
    document.getElementById('conf-shipping-address').textContent = `${order.shippingAddress}, ${order.city}, ${order.state} - ${order.pincode}`;
    document.getElementById('conf-order-total').textContent = `₹${Number(order.totalAmount).toLocaleString('en-IN')}`;

    const itemsContainer = document.getElementById('conf-order-items');
    if (itemsContainer && order.items) {
      itemsContainer.innerHTML = order.items.map(it => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; font-size: 0.85rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <img src="${it.productImage}" style="width: 40px; height: 40px; object-fit: contain; background: #fff; border-radius: 4px; padding: 2px;">
            <div>
              <div style="font-weight: 600;">${it.productName}</div>
              <div style="color: #64748b; font-size: 0.775rem;">Qty: ${it.quantity} × ₹${Number(it.unitPrice).toLocaleString('en-IN')}</div>
            </div>
          </div>
          <div style="font-weight: 700;">₹${Number(it.subtotal).toLocaleString('en-IN')}</div>
        </div>
      `).join('');
    }

    modal.classList.add('active');
    showToast('🎉 Congratulations! Order placed successfully!', 'success');
  },

  closeConfirmationModal() {
    const modal = document.getElementById('order-confirmation-modal');
    if (modal) modal.classList.remove('active');
  }
};

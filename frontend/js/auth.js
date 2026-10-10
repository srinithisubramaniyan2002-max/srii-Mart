/**
 * Srinidhi Mart - Authentication Module
 * Handles login, registration, session persistence, and auth UI state
 */

const auth = {
  // Retrieve saved user from localStorage
  getUser() {
    try {
      const data = localStorage.getItem('srinidhi_user');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  // Save user session
  setUser(userData) {
    localStorage.setItem('srinidhi_user', JSON.stringify(userData));
    this.updateUI();
  },

  // Check login status
  isLoggedIn() {
    return this.getUser() !== null;
  },

  // Logout
  logout() {
    localStorage.removeItem('srinidhi_user');
    this.updateUI();
    if (window.cart) {
      window.cart.loadCart();
    }
    showToast('Logged out successfully', 'info');
  },

  // Update header UI according to user login state
  updateUI() {
    const userContainer = document.getElementById('user-nav-container');
    if (!userContainer) return;

    const user = this.getUser();

    if (user) {
      userContainer.innerHTML = `
        <div class="user-profile-btn" id="user-menu-btn" title="${user.email}">
          <span class="user-avatar">${user.name.charAt(0).toUpperCase()}</span>
          <span>${user.name.split(' ')[0]}</span>
          <button class="btn-outline" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; margin-left: 0.5rem;" onclick="auth.logout()">Logout</button>
        </div>
      `;
    } else {
      userContainer.innerHTML = `
        <button class="nav-btn" onclick="auth.openModal('login')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span>Sign In</span>
        </button>
      `;
    }
  },

  // Open login/register modal
  openModal(tab = 'login') {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;
    this.switchTab(tab);
    modal.classList.add('active');
  },

  closeModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.remove('active');
  },

  switchTab(tab) {
    const loginForm = document.getElementById('login-form-container');
    const registerForm = document.getElementById('register-form-container');
    const tabLoginBtn = document.getElementById('tab-login-btn');
    const tabRegisterBtn = document.getElementById('tab-register-btn');

    if (tab === 'login') {
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
      tabLoginBtn.classList.add('active');
      tabRegisterBtn.classList.remove('active');
    } else {
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
      tabLoginBtn.classList.remove('active');
      tabRegisterBtn.classList.add('active');
    }
  },

  // Perform Login
  async handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const submitBtn = document.getElementById('login-submit-btn');

    if (!email || !password) {
      showToast('Please fill in both email and password', 'error');
      return;
    }

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Signing in...';

      const response = await api.login({ email, password });
      this.setUser(response.data);
      this.closeModal();
      showToast(`Welcome back, ${response.data.name}!`, 'success');

      if (window.cart) {
        window.cart.loadCart();
      }
    } catch (err) {
      showToast(err.message || 'Login failed. Please verify credentials.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign In';
    }
  },

  // Perform Registration
  async handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const phone = document.getElementById('reg-phone').value.trim();
    const address = document.getElementById('reg-address').value.trim();
    const submitBtn = document.getElementById('reg-submit-btn');

    if (!name || !email || !password) {
      showToast('Name, email, and password are required', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      return;
    }

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creating Account...';

      const response = await api.register({ name, email, password, phone, address });
      this.setUser(response.data);
      this.closeModal();
      showToast('Registration successful! Welcome to Srinidhi Mart.', 'success');

      if (window.cart) {
        window.cart.loadCart();
      }
    } catch (err) {
      showToast(err.message || 'Registration failed. Try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Create Account';
    }
  },

  // Quick fill demo user credentials
  fillDemoAccount(type = 'user') {
    if (type === 'user') {
      document.getElementById('login-email').value = 'user@srinidhimart.com';
      document.getElementById('login-password').value = 'password123';
    } else {
      document.getElementById('login-email').value = 'admin@srinidhimart.com';
      document.getElementById('login-password').value = 'admin123';
    }
    showToast('Demo credentials filled!', 'info');
  }
};

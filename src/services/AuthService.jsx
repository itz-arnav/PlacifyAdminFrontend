const AuthService = {
  async login(username, password) {
    const response = await fetch('https://placify-backend.vercel.app/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem('username', data.username);
      return true;
    }
    return false;
  },

  async register(username, email, password) {
    const response = await fetch('https://placify-backend.vercel.app/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.status === 201) {
      return true;
    }
    const errorData = await response.json();
    throw new Error(errorData.error || 'Registration failed');
  },

  async verifyToken() {
    const response = await fetch('https://placify-backend.vercel.app/api/auth/verify', {
      method: 'POST',
      credentials: 'include',
    });

    if (response.status === 200) {
      const data = await response.json();
      return { valid: true, username: data.decoded.username };
    }
    return { valid: false };
  },

  async logout() {
    await fetch('https://placify-backend.vercel.app/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    localStorage.removeItem('username');
  },

  getStoredUser() {
    return localStorage.getItem('username') || null;
  }
};

export default AuthService;

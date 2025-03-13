const USE_PRODUCTION = true;

const BASE_URL = USE_PRODUCTION
  ? 'https://placify-backend.vercel.app'
  : 'http://localhost:7777';

const AuthService = {
  async login(username, password) {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log('AuthService login success', data.username);
      return { success: true, username: data.username };
    }
    console.log('AuthService login failed');
    return { success: false };
  },

  async register(username, email, password) {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    if (response.status === 201) {
      console.log('AuthService register success');
      return true;
    }
    const errorData = await response.json();
    console.log('AuthService register error', errorData.error);
    throw new Error(errorData.error || 'Registration failed');
  },

  async verifyToken() {
    const response = await fetch(`${BASE_URL}/api/auth/verify`, {
      method: 'POST',
      credentials: 'include',
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log('AuthService verify success', data.decoded.username);
      return { valid: true, username: data.decoded.username };
    }
    console.log('AuthService verify failed');
    return { valid: false };
  },

  async logout() {
    const response = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    if (response.status === 200) {
      console.log('AuthService logout success');
    } else {
      console.log('AuthService logout failed');
    }
  }
};

export default AuthService;

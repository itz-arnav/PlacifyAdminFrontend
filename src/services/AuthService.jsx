const AuthService = {
  async login(username, password) {
    const response = await fetch('http://localhost:7777/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem('jwt', data.token);
      return true;
    } else {
      return false;
    }
  },

  async register(username, email, password) {
    const response = await fetch('http://localhost:7777/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    if (response.status === 201) {
      return true;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }
  },

  async verifyToken(token) {
    const response = await fetch('http://localhost:7777/api/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.status === 200;
  },

  logout() {
    localStorage.removeItem('jwt');
  },
};

export default AuthService;


// await fetch('https://placify-backend.vercel.app/api/auth/login', {
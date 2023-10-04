const AuthService = {
    async login(username, password) {
      // Replace the following fake API call with your real API call
      console.log("Sending data, username", username, "password", password)
      const response = await fetch('https://placify-backend.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username" : username, "password" : password }),
      });
  
      if (response.status === 200) {
        const data = await response.json();
  
        // Store the JWT in local storage
        localStorage.setItem('jwt', data.token);
        
        return true;
      } else {
        return false;
      }
    },
  
    logout() {
      // Remove the JWT from local storage
      localStorage.removeItem('jwt');
  
      // Optionally: Invalidate the JWT on the server side
    },
  };
  
  export default AuthService;
  
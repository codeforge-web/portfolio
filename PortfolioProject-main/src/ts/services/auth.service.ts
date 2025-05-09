interface User {
  id: string;
  email: string;
  role: string;
  name: string;
}

class AuthService {
  private token: string | null = null;
  private user: User | null = null;

  constructor() {
    this.token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      this.token = data.token;
      this.user = data.user;
      
      if (this.token) {
        localStorage.setItem('token', this.token);
      }
      if (this.user) {
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  logout(): void {
    this.token = null;
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }

  getUser(): User | null {
    return this.user;
  }
}

export const authService = new AuthService(); 
class AuthService {
    constructor() {
        this.token = null;
        this.user = null;
        this.token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        if (userStr) {
            this.user = JSON.parse(userStr);
        }
    }
    async login(email, password) {
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
        }
        catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }
    logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
    isAuthenticated() {
        return !!this.token;
    }
    getToken() {
        return this.token;
    }
    getUser() {
        return this.user;
    }
}
export const authService = new AuthService();

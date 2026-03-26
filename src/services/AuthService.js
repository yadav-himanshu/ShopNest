export class AuthService {
    static USERS_KEY = 'shopnest_users';
    static SESSION_KEY = 'shopnest_session';

    /**
     * Initializes users in localStorage if empty
     */
    static init() {
        if (!localStorage.getItem(this.USERS_KEY)) {
            localStorage.setItem(this.USERS_KEY, JSON.stringify([]));
        }
    }

    /**
     * Registers a new user
     */
    static signup(name, email, password) {
        const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');

        if (users.find(u => u.email === email)) {
            throw new Error('Email already registered');
        }

        const newUser = { id: Date.now().toString(), name, email, password };
        users.push(newUser);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

        // Auto login after signup
        this.login(email, password);
        return newUser;
    }

    /**
     * Logs a user in
     */
    static login(email, password) {
        const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Omit password from session
        const { password: _, ...sessionUser } = user;
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionUser));

        // Dispatch global event
        window.dispatchEvent(new CustomEvent('auth:change', { detail: { user: sessionUser } }));
        return sessionUser;
    }

    /**
     * Logs out current user
     */
    static logout() {
        localStorage.removeItem(this.SESSION_KEY);
        window.dispatchEvent(new CustomEvent('auth:change', { detail: { user: null } }));
    }

    /**
     * Checks if user is auth'd
     */
    static isAuthenticated() {
        return !!localStorage.getItem(this.SESSION_KEY);
    }

    /**
     * Gets current user
     */
    static getUser() {
        const session = localStorage.getItem(this.SESSION_KEY);
        return session ? JSON.parse(session) : null;
    }
}

// Initialize on load
AuthService.init();

import { create } from 'zustand';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

// Check localStorage for initial state
const storedToken = localStorage.getItem('cms_token');
const storedUser = localStorage.getItem('cms_user');

export const useAuthStore = create<AuthState>((set) => ({
  token: storedToken || null,
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedToken,
  setAuth: (token, user) => {
    localStorage.setItem('cms_token', token);
    localStorage.setItem('cms_user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('cms_token');
    localStorage.removeItem('cms_user');
    set({ token: null, user: null, isAuthenticated: false });
  },
}));

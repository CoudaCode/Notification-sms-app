// src/store/useAuthStore.ts

import Cookies from "js-cookie";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { API_URL } from "../api/endpoints";
import { LoginFormInputs, SignupFormInputs, userType } from "../types/user";

interface AuthState {
  user: userType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: userType | null) => void;
  setIsAuthenticated: (value: boolean) => void;
  login: (data: LoginFormInputs) => Promise<void>;
  signup: (data: SignupFormInputs) => Promise<void>;
  logout: () => void;
  checkValidateToken: (token: string) => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  devtools((set, get) => ({
    user: null,
    isAuthenticated: Cookies.get("userConnect") !== undefined,
    isLoading: false,
    setUser: (user: userType | null) => set({ user }),
    setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
    login: async (data: LoginFormInputs) => {
      set({ isLoading: true });
      try {
        const response = await fetch(`${API_URL}/user/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(
            errorMessage.message || "Email ou mot de passe incorrect."
          );
        }

        const result = await response.json();

        get().setUser(result.message);
        set({ isAuthenticated: true });
        Cookies.set("userConnect", result.token);
      } catch (error) {
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },
    signup: async (data: SignupFormInputs) => {
      set({ isLoading: true });
      try {
        const response = await fetch(`${API_URL}/user/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.message || "Ce compte existe déjà.");
        }

        const result = await response.json();
        return result;
      } catch (error) {
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },
    logout: () => {
      Cookies.remove("userConnect");
      get().setUser(null);
      set({ isAuthenticated: false });
    },
    checkValidateToken: async (token: string) => {
      set({ isLoading: true });
      try {
        const response = await fetch(`${API_URL}/user/check-token`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const userData = await response.json();
          get().setUser(userData);
          set({ isAuthenticated: true });
        } else {
          get().logout();
        }
      } catch (error) {
        console.error("Erreur lors de la validation du token :", error);
        get().logout();
      } finally {
        set({ isLoading: false });
      }
    },
  }))
);

// Initialize store and check token on load
const token = Cookies.get("userConnect");
if (token) {
  useAuthStore.getState().checkValidateToken(token);
}

export { useAuthStore };

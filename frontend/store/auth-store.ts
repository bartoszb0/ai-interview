import { getMeCall, logoutCall } from "@/lib/api/auth";
import { create } from "zustand";

type AuthStore = {
  isAuthenticated: boolean;
  userEmail: string | null;
  isLoading: boolean;
  login: (email: string) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  userEmail: null,
  isLoading: true,
  login: (email) => set({ isAuthenticated: true, userEmail: email }),
  logout: async () => {
    try {
      await logoutCall();
    } catch {
      // Cookie will expire regardless
    }
    set({ isAuthenticated: false, userEmail: null });
  },
  checkAuth: async () => {
    try {
      const res = await getMeCall();
      set({ isAuthenticated: true, userEmail: res.email, isLoading: false });
    } catch {
      set({ isAuthenticated: false, userEmail: null, isLoading: false });
    }
  },
}));

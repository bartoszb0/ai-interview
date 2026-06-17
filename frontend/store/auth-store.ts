import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  token: string | null;
  userEmail: string | null;
  login: (token: string, userEmail: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      userEmail: null,
      login: (token, userEmail) => set({ token, userEmail }),
      logout: () => set({ token: null, userEmail: null }),
    }),
    { name: "auth-store" },
  ),
);

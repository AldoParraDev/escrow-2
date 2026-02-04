import { UserData } from "@/types/user";
import { Preferences } from "@capacitor/preferences";
import { create } from "zustand";
import { persist, StorageValue } from "zustand/middleware";

type AuthState = {
  token: string | null;
  userLoggedIn: UserData | null;
  hasHydrated: boolean;
  bankLinked: boolean;
  setToken: (token: string) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
  setUserLoggedIn: (user: UserData | null) => void;
  setBankLinked: (value: boolean) => void;
};

// Adaptador para usar Capacitor Preferences como storage
const capacitorStorage = {
  getItem: async (name: string): Promise<StorageValue<AuthState> | null> => {
    const { value } = await Preferences.get({ key: name });
    return value ? JSON.parse(value) : null;
  },
  setItem: async (
    name: string,
    value: StorageValue<AuthState>
  ): Promise<void> => {
    await Preferences.set({ key: name, value: JSON.stringify(value) });
  },
  removeItem: async (name: string): Promise<void> => {
    await Preferences.remove({ key: name });
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userLoggedIn: null,
      hasHydrated: false,
      bankLinked: false,

      setToken: (token) => set({ token }),
      logout: () => set({ token: null, userLoggedIn: null, bankLinked: false }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
      setUserLoggedIn: (user) => set({ userLoggedIn: user }),
      setBankLinked: (value) => set({ bankLinked: value }),
    }),
    {
      name: "auth",
      storage: capacitorStorage,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

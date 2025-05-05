import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AuthStore {
  isAuth: boolean;
  accessToken: string;
  checkingAuth: boolean;
  setIsAuth: (v: boolean) => void;
  setAccessToken: (v: string) => void;
  setCheckingAuth: (v: boolean) => void;
}

const initialState = {
  isAuth: false,
  accessToken: "",
  checkingAuth: false,
};

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      setIsAuth: (isAuth) => set({ isAuth }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setCheckingAuth: (checkingAuth) => set({ checkingAuth }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuth: state.isAuth,
        accessToken: state.accessToken,
      }),
    },
  ),
);

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AuthStore {
  isAuth: boolean;
  accessToken: string;
  checkingAuth: boolean;
  userEmail: string;
  setIsAuth: (v: boolean) => void;
  setAccessToken: (v: string) => void;
  setCheckingAuth: (v: boolean) => void;
  setUserEmail: (v: string) => void;
}

const initialState = {
  isAuth: false,
  accessToken: "",
  checkingAuth: false,
  userEmail: "",
};

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      setIsAuth: (isAuth) => set({ isAuth }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setCheckingAuth: (checkingAuth) => set({ checkingAuth }),
      setUserEmail: (userEmail) => set({ userEmail }),
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

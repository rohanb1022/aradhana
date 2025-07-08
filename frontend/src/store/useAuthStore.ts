/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios.ts";

// export interface AuthUser {
//   _id: string;
//   firstname: string;
//   lastname: string;
//   username: string;
//   email: string;
// }

// export interface UserCredentials {
//   email: string;
//   password: string;
//   firstname?: string;
//   lastname?: string;
//   username?: string;
// }

// interface AuthStore {
//   authUser: AuthUser | null;
//   token: string | null;

//   isLoggingIn: boolean;
//   isSigningUp: boolean;
//   isCheckingAuth: boolean;
//   isLoggingOut: boolean;

//   checkAuth: () => Promise<void>;
//   signin: (userData: UserCredentials) => Promise<void>;
//   signup: (userData: UserCredentials) => Promise<void>;
//   logout: () => Promise<void>;
// }

// export const useAuthStore = create<AuthStore>((set) => ({
//   authUser: null,
//   token: null,

//   isLoggingIn: false,
//   isSigningUp: false,
//   isCheckingAuth: false,
//   isLoggingOut: false,

//   checkAuth: async () => {
//     set({ isCheckingAuth: true });
//     try {
//       const response = await axiosInstance.get("/auth/check-auth");
//       set({
//         authUser: response.data,
//         token: response.data.token ?? null,
//       });
//     } catch (error) {
//       set({ authUser: null, token: null });
//     } finally {
//       set({ isCheckingAuth: false });
//     }
//   },

//   signin: async (userData) => {
//     set({ isLoggingIn: true });
//     try {
//       const response = await axiosInstance.post("/auth/login", userData);
//       set({
//         authUser: response.data,
//         token: response.data.token ?? null,
//       });
//     } catch (error) {
//       set({ authUser: null, token: null });
//     } finally {
//       set({ isLoggingIn: false });
//     }
//   },

//   signup: async (userData) => {
//     set({ isSigningUp: true });
//     try {
//       const response = await axiosInstance.post("/auth/register", userData);
//       set({
//         authUser: response.data,
//         token: response.data.token ?? null,
//       });
//     } catch (error) {
//       set({ authUser: null, token: null });
//     } finally {
//        set({ isSigningUp: false });
//     }
//   },

//   logout: async () => {
//     set({ isLoggingOut: true });
//     try {
//       await axiosInstance.post("/auth/logout");
//       set({ authUser: null, token: null });
//     } catch (error) {
//       console.error("Logout failed:", error);
//     } finally {
//       set({ isLoggingOut: false });
//     }
//   },
// }));


/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.ts";
import toast from "react-hot-toast";

export interface AuthUser {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}

export interface UserCredentials {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  username?: string;
}

interface AuthStore {
  authUser: AuthUser | null;
  token: string | null;

  isLoggingIn: boolean;
  isSigningUp: boolean;
  isCheckingAuth: boolean;
  isLoggingOut: boolean;

  checkAuth: () => Promise<void>;
  signin: (userData: UserCredentials) => Promise<void>;
  signup: (userData: UserCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const toastOptions = {
  style: {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
  },
};

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  token: null,

  isLoggingIn: false,
  isSigningUp: false,
  isCheckingAuth: false,
  isLoggingOut: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/check-auth");
      set({
        authUser: response.data,
        token: response.data.token ?? null,
      });
    } catch (error) {
      set({ authUser: null, token: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signin: async (userData) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", userData);
      set({
        authUser: response.data,
        token: response.data.token ?? null,
      });
      toast.success("Welcome back! 🎉", toastOptions);
    } catch (error: any) {
      const message = error?.response?.data?.message || "Login failed.";
      toast.error(message, toastOptions);
      set({ authUser: null, token: null });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  signup: async (userData) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/register", userData);
      set({
        authUser: response.data,
        token: response.data.token ?? null,
      });
      toast.success("Account created! 🚀", toastOptions);
    } catch (error: any) {
      const message = error?.response?.data?.message || "Signup failed.";
      toast.error(message, toastOptions);
      set({ authUser: null, token: null });
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null, token: null });
      toast.success("Logged out successfully 👋", toastOptions);
    } catch (error) {
      toast.error("Logout failed.", toastOptions);
    } finally {
      set({ isLoggingOut: false });
    }
  },
}));

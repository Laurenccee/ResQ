import { deleteItemAsync, getItem, setItem } from "expo-secure-store";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { useEffect } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { auth } from "@/services/firebase";

// Serializable user data (Firebase User object has methods that can't be persisted)
type SerializableUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
};

type AuthState = {
  isInitialized: boolean;
  user: SerializableUser | null;
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  hasToCreateAnAccount: boolean;
  isLoading: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  setCreateAccount: (value: boolean) => void;
  setError: (error: string | null) => void;

  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

// Helper to convert Firebase User to serializable object
const serializeUser = (user: User): SerializableUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  emailVerified: user.emailVerified,
});

export const useAuthProvider = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      isInitialized: false,
      isAuthenticated: false,
      isEmailVerified: false,
      hasToCreateAnAccount: false,
      isLoading: false,
      error: null,

      setCreateAccount: (value: boolean) =>
        set({ hasToCreateAnAccount: value }),

      setUser: (user) =>
        set({
          user: user ? serializeUser(user) : null,
          isInitialized: true,
          isAuthenticated: !!user,
          isEmailVerified: user?.emailVerified ?? false,
          // Reset hasToCreateAnAccount when user signs in
          hasToCreateAnAccount: user ? false : false,
        }),

      setError: (error) => set({ error }),

      signIn: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          await signInWithEmailAndPassword(auth, email, password);
          // User state will be updated by onAuthStateChanged listener
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
        set({ isLoading: false });
      },

      signUp: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          // User state will be updated by onAuthStateChanged listener
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
        set({ isLoading: false });
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await auth.signOut();
          set({
            user: null,
            isAuthenticated: false,
            isEmailVerified: false,
            hasToCreateAnAccount: false,
            isLoading: false,
          });
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      sendVerificationEmail: async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          set({ error: "No user logged in" });
          throw new Error("No user logged in");
        }
        set({ isLoading: true, error: null });
        try {
          await sendEmailVerification(currentUser);
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
        set({ isLoading: false });
      },

      refreshUser: async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) return;
        try {
          await currentUser.reload();
          useAuthProvider.getState().setUser(currentUser);
        } catch (error: any) {
          set({ error: error.message });
        }
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => ({
        getItem,
        setItem,
        removeItem: deleteItemAsync,
      })),

      partialize: (state) =>
        ({
          user: state.user,
        }) as AuthState,

      onRehydrateStorage: () => (state) => {
        // When state is rehydrated, sync derived states from persisted user
        // Trust the persisted emailVerified - Firebase auth listener will update with fresh data
        if (state && state.user) {
          state.isAuthenticated = true;
          state.isEmailVerified = state.user.emailVerified;
        }
        // Don't set isInitialized here - let Firebase auth listener do it
        // This ensures we wait for fresh data from Firebase
      },
    }
  )
);

export const useAuthListener = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Firebase auth state:", user?.email || "signed out");
      useAuthProvider.getState().setUser(user);
      console.log("Auth Store after auth change:", useAuthProvider.getState());
    });

    return () => unsubscribe();
  }, []);
};

export const subscribeToAuthChanges = () => {
  return onAuthStateChanged(auth, (user) => {
    useAuthProvider.getState().setUser(user);
  });
};

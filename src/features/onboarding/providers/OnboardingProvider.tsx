import { deleteItemAsync, getItem, setItem } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type OnboardingState = {
  hasCompletedOnboarding: boolean;

  // Actions
  completeOnboarding: () => void;
  resetOnboarding: () => void;
};

export const useOnboardingProvider = create(
  persist<OnboardingState>(
    (set) => ({
      hasCompletedOnboarding: false,

      // Onboarding actions
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      resetOnboarding: () => set({ hasCompletedOnboarding: false }),
    }),
    {
      name: "onboarding-store",
      storage: createJSONStorage(() => ({
        getItem,
        setItem,
        removeItem: deleteItemAsync,
      })),
    }
  )
);

import { useOnboardingProvider } from "@/features/onboarding/providers/OnboardingProvider";
import { useAuthListener, useAuthProvider } from "@/providers/AuthProvider";
import {
  InstrumentSerif_400Regular,
  InstrumentSerif_400Regular_Italic,
} from "@expo-google-fonts/instrument-serif";
import {
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "InstrumentSerif-Regular": InstrumentSerif_400Regular,
    "InstrumentSerif-Italic": InstrumentSerif_400Regular_Italic,
    "Oswald-Regular": Oswald_400Regular,
    "Oswald-Medium": Oswald_500Medium,
    "Oswald-SemiBold": Oswald_600SemiBold,
    "Oswald-Bold": Oswald_700Bold,
  });

  const { isAuthenticated, isInitialized, isEmailVerified } = useAuthProvider();
  const { hasCompletedOnboarding } = useOnboardingProvider();

  // Initialize Firebase auth listener
  useAuthListener();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    console.log("Onboarding Store State:", useOnboardingProvider.getState());
  }, []);

  useEffect(() => {
    console.log("Auth State:", {
      isAuthenticated,
      isInitialized,
      isEmailVerified,
    });
  }, [isAuthenticated, isInitialized, isEmailVerified]);

  if (!fontsLoaded || !isInitialized) {
    return null;
  }

  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!hasCompletedOnboarding}>
          <Stack.Screen name="(onboarding)/onboarding-screen" />
        </Stack.Protected>
        <Stack.Protected guard={!isAuthenticated && hasCompletedOnboarding}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
        <Stack.Protected guard={isAuthenticated && !isEmailVerified}>
          <Stack.Screen name="(verify)/verification" />
        </Stack.Protected>
        <Stack.Protected guard={isAuthenticated && isEmailVerified}>
          <Stack.Screen name="(protected)" />
        </Stack.Protected>
      </Stack>
    </React.Fragment>
  );
}

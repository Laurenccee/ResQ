import { useAuthProvider } from "@/providers/AuthProvider";
import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  const { hasToCreateAnAccount } = useAuthProvider();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={hasToCreateAnAccount}>
        <Stack.Screen name="user-role" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!hasToCreateAnAccount}>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

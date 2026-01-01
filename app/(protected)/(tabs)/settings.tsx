import Appbar from "@/components/layouts/appbar";
import { useOnboardingProvider } from "@/features/onboarding/providers/OnboardingProvider";
import { useAuthProvider } from "@/providers/AuthProvider";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { logout } = useAuthProvider();
  const { resetOnboarding } = useOnboardingProvider();

  return (
    <SafeAreaView className="flex-1 py-4 bg-background">
      <Appbar />
      <View className="flex-1 justify-center items-center px-8">
        <Text className="text-secondary text-4xl font-serif text-center">
          Welcome to ResQ
        </Text>
        <Text className="text-secondary/70 text-base font-oswald text-center mt-2">
          Your safety companion
        </Text>
        <Pressable
          className="mt-8 bg-secondary rounded-2xl px-6 py-3"
          onPress={logout}
        >
          <Text className="text-white font-oswald-medium text-xl text-center">
            logout
          </Text>
        </Pressable>
        <Pressable
          className="mt-8 bg-secondary rounded-2xl px-6 py-3"
          onPress={resetOnboarding}
        >
          <Text className="text-white font-oswald-medium text-xl text-center">
            Reset Onboarding
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

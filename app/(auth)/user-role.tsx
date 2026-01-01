import { useAuthProvider } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import { ShieldCheck, Users } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function UserRole() {
  const router = useRouter();

  const { setCreateAccount } = useAuthProvider();

  const handleSelectRole = (role: "parent" | "children") => {
    // TODO: Save role to auth store
    console.log("Selected role:", role);
    // Navigate to sign-up form with role
    router.push({
      pathname: "/(auth)/sign-up",
      params: { role },
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-accent py-4">
        {/* Header */}
        <View className="flex-row items-center justify-center px-16 mb-4">
          <Text className="text-secondary text-4xl font-serif">ResQ</Text>
        </View>

        {/* Content */}
        <View className="flex-1 justify-center px-16">
          <Text className="text-secondary text-5xl font-serif text-center mb-3 leading-tight">
            Who are you?
          </Text>
          <Text className="text-secondary/60 text-base font-oswald text-center mb-10">
            Select your profile type to customize your experience.
          </Text>

          {/* Role Selection Cards */}
          <View className="flex-row gap-4">
            {/* Parent Card */}
            <Pressable
              onPress={() => handleSelectRole("parent")}
              className="flex-1 bg-white rounded-3xl p-5 items-center"
            >
              <View className=" rounded-2xl p-4 mb-3">
                <Users size={28} color="#141053" />
              </View>
              <Text className="text-secondary text-xl font-serif text-center mb-1">
                Parent
              </Text>
              <Text className="text-secondary/60 text-xs font-oswald text-center leading-relaxed">
                Monitor location and receive alerts in real time.
              </Text>
            </Pressable>

            {/* Children Card */}
            <Pressable
              onPress={() => handleSelectRole("children")}
              className="flex-1 bg-white rounded-3xl p-5 items-center"
            >
              <View className=" rounded-2xl p-4 mb-3">
                <ShieldCheck size={28} color="#141053" />
              </View>
              <Text className="text-secondary text-xl font-serif text-center mb-1">
                Children
              </Text>
              <Text className="text-secondary/60 text-xs font-oswald text-center leading-relaxed">
                Protected at all times with instant emergency alerts.
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Bottom - matching onboarding button style */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-secondary/60 font-oswald">
            Already have an account?{" "}
          </Text>
          <Pressable onPress={() => setCreateAccount(false)}>
            <Text className="text-secondary font-oswald-medium">Log In</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

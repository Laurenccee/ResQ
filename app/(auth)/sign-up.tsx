import Button from "@/components/ui/button";
import { useAuthProvider } from "@/providers/AuthProvider";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: "parent" | "children" }>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signUp, setCreateAccount, sendVerificationEmail } = useAuthProvider();

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      // Send verification email after successful sign up
      await sendVerificationEmail();
      // Navigate to verification screen
      router.replace("/(verify)/verification");
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-accent">
      {/* Header with back button */}
      <View className="flex-row items-center px-6 py-4">
        <Pressable onPress={() => router.back()} className="p-2">
          <ArrowLeft size={24} color="#141053" />
        </Pressable>
      </View>

      {/* Content */}
      <View className="flex-1 justify-center px-8">
        <Text className="text-secondary text-4xl font-serif text-center mb-2">
          Create Account
        </Text>
        <Text className="text-secondary/70 text-base font-oswald text-center mb-8">
          Sign up as {role === "parent" ? "a Parent" : "Children"}
        </Text>

        {/* Form */}
        <View className="gap-4">
          {/* Name Input */}
          <View className="bg-white rounded-2xl px-4 py-3 flex-row items-center">
            <User size={20} color="rgba(20,16,83,0.5)" />
            <TextInput
              className="flex-1 text-secondary text-base font-oswald ml-3"
              placeholder="Full Name"
              placeholderTextColor="rgba(20,16,83,0.5)"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          {/* Email Input */}
          <View className="bg-white rounded-2xl px-4 py-3 flex-row items-center">
            <Mail size={20} color="rgba(20,16,83,0.5)" />
            <TextInput
              className="flex-1 text-secondary text-base font-oswald ml-3"
              placeholder="Email"
              placeholderTextColor="rgba(20,16,83,0.5)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View className="bg-white rounded-2xl px-4 py-3 flex-row items-center">
            <Lock size={20} color="rgba(20,16,83,0.5)" />
            <TextInput
              className="flex-1 text-secondary text-base font-oswald ml-3"
              placeholder="Password"
              placeholderTextColor="rgba(20,16,83,0.5)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Eye size={20} color="rgba(20,16,83,0.5)" />
              ) : (
                <EyeOff size={20} color="rgba(20,16,83,0.5)" />
              )}
            </Pressable>
          </View>
        </View>

        {/* Sign Up Button */}
        <View className="mt-8">
          <Button classname="bg-secondary rounded-2xl" onPress={handleSignUp}>
            <Text className="text-white font-oswald-medium text-xl text-center">
              Sign Up
            </Text>
          </Button>
        </View>

        {/* Login Link */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-secondary/70 font-oswald">
            Already have an account?{" "}
          </Text>
          <Pressable onPress={() => setCreateAccount(false)}>
            <Text className="text-secondary font-oswald-medium">Log In</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

import Button from "@/components/ui/button";
import { useAuthProvider } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, setCreateAccount } = useAuthProvider();

  const handleSignIn = () => {
    signIn(email, password);
  };

  return (
    <SafeAreaView className="flex-1  bg-accent">
      {/* Header with back button */}

      {/* Content */}
      <View className="flex-1 justify-center px-8">
        <Text className="text-secondary text-4xl font-serif text-center mb-2">
          Welcome Back
        </Text>
        <Text className="text-secondary/70 text-base font-oswald text-center mb-8">
          Log in to your account
        </Text>

        {/* Form */}
        <View className="gap-4">
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

        {/* Forgot Password */}
        <Pressable className="mt-4 self-end">
          <Text className="text-secondary/70 font-oswald">
            Forgot Password?
          </Text>
        </Pressable>

        {/* Sign In Button */}
        <View className="mt-8">
          <Button classname="bg-secondary rounded-2xl" onPress={handleSignIn}>
            <Text className="text-white font-oswald-medium text-xl text-center">
              Log In
            </Text>
          </Button>
        </View>

        {/* Sign Up Link */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-secondary/70 font-oswald">
            Don't have an account?{" "}
          </Text>
          <Pressable onPress={() => setCreateAccount(true)}>
            <Text className="text-secondary font-oswald-medium">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

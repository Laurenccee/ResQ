import Button from "@/components/ui/button";
import { useAuthProvider } from "@/providers/AuthProvider";
import { auth } from "@/services/firebase";
import { useRouter } from "expo-router";
import { Mail, X } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Verification() {
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);
  const { sendVerificationEmail, logout } = useAuthProvider();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const checkVerification = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await currentUser.reload();
        if (currentUser.emailVerified) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          useAuthProvider.getState().setUser(currentUser);
        }
      }
    };

    checkVerification();

    intervalRef.current = setInterval(checkVerification, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      await sendVerificationEmail();
    } catch (error) {
      console.error("Error sending verification email:", error);
    } finally {
      setTimeout(() => setIsResending(false), 2000);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-accent">
      {/* X Button */}
      <View className="px-4 pt-2">
        <Pressable onPress={logout} className="self-end p-2">
          <X size={18} color="#141053" />
        </Pressable>
      </View>

      <View className="flex-1 justify-center px-8">
        {/* Email Icon */}
        <View className="items-center mb-6">
          <View className="bg-secondary/10 rounded-full p-6">
            <Mail size={64} color="#141053" />
          </View>
        </View>

        {/* Title */}
        <Text className="text-secondary text-4xl font-serif text-center mb-8">
          Verify Your Email
        </Text>

        {/* Description */}
        <Text className="text-secondary/70 text-base font-oswald text-center">
          We've sent a verification link to your email address.
        </Text>
        <Text className="text-secondary/70 text-base font-oswald text-center mb-8">
          Please check your inbox and click the link to verify your account.
        </Text>

        {/* Resend Email Button */}
        <View className="mt-3">
          <Button
            classname="bg-secondary rounded-2xl "
            onPress={handleResendEmail}
            isDisabled={isResending}
          >
            <View className="flex-row items-center justify-center gap-2">
              <Text className="text-white font-oswald-medium text-md text-center">
                {isResending ? "Sending..." : "Resend Email"}
              </Text>
            </View>
          </Button>
        </View>
      </View>

      {/* Help Text */}
      <View className="px-8 pb-8">
        <Text className="text-secondary/50 text-sm font-oswald text-center">
          Didn't receive the email? Check your spam folder or try resending.
        </Text>
      </View>
    </SafeAreaView>
  );
}

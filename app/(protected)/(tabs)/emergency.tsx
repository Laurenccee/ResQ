import Appbar from "@/components/layouts/appbar";
import EmergencyButton from "@/features/emergency/components/emergencyButton";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EmergencyScreen() {
  return (
    <SafeAreaView className="bg-background py-4 flex-1">
      <Appbar />
      <View className="bg-background flex-1 justify-center items-center px-8">
        <Text className="font-serif text-4xl text-center text-secondary mb-2">
          Having an emergency?
        </Text>
        <Text className="font-oswald text-center text-secondary mb-9">
          Shake the phone or tap the SOS button to notify your guardians.
        </Text>

        <View>
          <EmergencyButton />
        </View>
      </View>
    </SafeAreaView>
  );
}

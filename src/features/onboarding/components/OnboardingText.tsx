import React from "react";
import { Dimensions, Text, View } from "react-native";
import { Slide } from "../data/slides";

const { width } = Dimensions.get("window");

interface OnboardingTextProps {
  item: Slide;
}

export default function OnboardingText({ item }: OnboardingTextProps) {
  return (
    <View style={{ width: width }} className="px-16">
      <View className="gap-3">
        <Text className="font-serif text-5xl text-white text-center">
          {item.title}
        </Text>
        <Text className="font-oswald text-base text-white/80 text-center">
          {item.description}
        </Text>
      </View>
    </View>
  );
}

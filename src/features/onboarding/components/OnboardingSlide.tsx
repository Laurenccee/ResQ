import React from "react";
import { Animated, Dimensions, Image, View } from "react-native";
import { Slide } from "../data/slides";

const { width } = Dimensions.get("window");

interface OnboardingSlideProps {
  item: Slide;
  index: number;
  scrollX: Animated.Value;
  textColor?: Animated.AnimatedInterpolation<string>;
}

export default function OnboardingSlide({
  item,
  index,
  scrollX,
  textColor,
}: OnboardingSlideProps) {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.85, 1, 0.85],
    extrapolate: "clamp",
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.5, 1, 0.5],
    extrapolate: "clamp",
  });

  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [20, 0, 20],
    extrapolate: "clamp",
  });

  return (
    <View style={{ width: width }} className="px-16">
      {/* Image */}
      <Animated.View
        style={{
          transform: [{ scale }],
          opacity,
        }}
        className="items-center justify-center"
      >
        <Image className="aspect-square w-full rounded-3xl bg-white/20" />
      </Animated.View>

      {/* Text */}
      <Animated.View
        style={{
          transform: [{ translateY }],
          opacity,
        }}
        className="gap-3 mt-14"
      >
        <Animated.Text
          style={{ color: textColor || "#FFFFFF" }}
          className="font-serif text-5xl text-center leading-tight"
        >
          {item.title}
        </Animated.Text>
        <Animated.Text
          style={{ color: textColor || "#FFFFFF", opacity: 0.7 }}
          className="font-oswald text-base text-center"
        >
          {item.description}
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

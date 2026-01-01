import React from "react";
import { Animated, Dimensions, View } from "react-native";

const { width } = Dimensions.get("window");

interface PaginationDotsProps {
  total: number;
  scrollX: Animated.Value;
  textColor?: Animated.AnimatedInterpolation<string>;
}

export default function PaginationDots({
  total,
  scrollX,
  textColor,
}: PaginationDotsProps) {
  return (
    <View className="flex-row justify-center items-center gap-3 py-4">
      {Array.from({ length: total }).map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [7, 14, 7],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={index}
            style={{
              width: dotWidth,
              opacity,
              height: 4,
              borderRadius: 4,
              backgroundColor: textColor || "white",
            }}
          />
        );
      })}
    </View>
  );
}

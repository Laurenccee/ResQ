import Button from "@/components/ui/button";
import {
  OnboardingSlide,
  PaginationDots,
  slides,
  useOnboardingCarousel,
} from "@/features/onboarding";
import { useOnboardingProvider } from "@/features/onboarding/providers/OnboardingProvider";
import { useAuthProvider } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import React from "react";
import { Animated, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Colors from tailwind config
const PRIMARY = "#346F44";
const ACCENT = "#E5E0FF";
const SECONDARY = "#141053";
const WHITE = "#FFFFFF";

export default function OnboardingScreen() {
  const router = useRouter();
  const { scrollX, flatListRef, onScroll, screenWidth } =
    useOnboardingCarousel();

  // Create faster transition input ranges (color changes in middle 20% of swipe)
  const createFastInputRange = () => {
    const ranges: number[] = [];
    slides.forEach((_, i) => {
      const center = i * screenWidth;
      ranges.push(center - screenWidth * 0.1); // 10% before center
      ranges.push(center + screenWidth * 0.1); // 10% after center
    });
    return ranges.sort((a, b) => a - b);
  };

  const createFastOutputRange = (colorA: string, colorB: string) => {
    const outputs: string[] = [];
    slides.forEach((_, i) => {
      const color = i % 2 === 0 ? colorA : colorB;
      outputs.push(color); // before center
      outputs.push(color); // after center
    });
    return outputs;
  };

  const fastInputRange = createFastInputRange();

  // Interpolate background color - fast transition
  const backgroundColor = scrollX.interpolate({
    inputRange: fastInputRange,
    outputRange: createFastOutputRange(PRIMARY, ACCENT),
    extrapolate: "clamp",
  });

  // Interpolate text color - fast transition
  const textColor = scrollX.interpolate({
    inputRange: fastInputRange,
    outputRange: createFastOutputRange(WHITE, SECONDARY),
    extrapolate: "clamp",
  });

  // Interpolate button background color - fast transition
  const buttonBgColor = scrollX.interpolate({
    inputRange: fastInputRange,
    outputRange: createFastOutputRange(WHITE, SECONDARY),
    extrapolate: "clamp",
  });

  // Interpolate button text color - fast transition
  const buttonTextColor = scrollX.interpolate({
    inputRange: fastInputRange,
    outputRange: createFastOutputRange(SECONDARY, WHITE),
    extrapolate: "clamp",
  });

  const { completeOnboarding } = useOnboardingProvider();
  const { setCreateAccount } = useAuthProvider();

  const handleSignUp = () => {
    completeOnboarding();
    setCreateAccount(true);
  };

  const handleLogin = () => {
    completeOnboarding();
  };

  return (
    <SafeAreaProvider>
      <Animated.View
        style={{ backgroundColor, flex: 1 }}
        className="justify-between py-12"
      >
        <SafeAreaView className="flex-1">
          {/* Header */}
          <View className="flex items-center mb-4 px-16">
            <Animated.Text
              style={{ color: textColor }}
              className="text-4xl font-serif"
            >
              ResQ
            </Animated.Text>
          </View>

          {/* Carousel with fixed dots overlay */}
          <View className="flex-1">
            <Animated.FlatList
              ref={flatListRef}
              data={slides}
              renderItem={({ item, index }) => (
                <OnboardingSlide
                  item={item}
                  index={index}
                  scrollX={scrollX}
                  textColor={textColor}
                />
              )}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              scrollEventThrottle={16}
              bounces={false}
              decelerationRate="fast"
              getItemLayout={(_, index) => ({
                length: screenWidth,
                offset: screenWidth * index,
                index,
              })}
            />

            {/* Fixed Pagination Dots - positioned after the image */}
            <View
              className="absolute left-0 right-0"
              style={{ top: screenWidth - 128 + 24 }}
            >
              <PaginationDots
                total={slides.length}
                scrollX={scrollX}
                textColor={textColor}
              />
            </View>
          </View>

          {/* Buttons */}
          <View className="gap-1 mt-4 px-16">
            <Animated.View
              style={{ backgroundColor: buttonBgColor }}
              className="rounded-2xl"
            >
              <Button classname="rounded-2xl" onPress={handleSignUp}>
                <Animated.Text
                  style={{ color: buttonTextColor }}
                  className="font-oswald-medium text-xl text-center"
                >
                  Sign Up
                </Animated.Text>
              </Button>
            </Animated.View>

            <Button
              classname="bg-transparent rounded-2xl"
              onPress={handleLogin}
            >
              <Animated.Text
                style={{ color: textColor }}
                className="font-oswald-medium text-xl text-center"
              >
                Log in
              </Animated.Text>
            </Button>
          </View>
        </SafeAreaView>
      </Animated.View>
    </SafeAreaProvider>
  );
}

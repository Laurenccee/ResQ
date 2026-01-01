import { useRef } from "react";
import { Animated, Dimensions, FlatList } from "react-native";

const { width } = Dimensions.get("window");

export function useOnboardingCarousel() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  return {
    scrollX,
    flatListRef,
    onScroll,
    screenWidth: width,
  };
}

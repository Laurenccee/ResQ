import { MapPin, Users } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, Text, View } from "react-native";

// Component for a single ripple ring
const RippleRing = ({ delay }: { delay: number }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // We use a timeout to start the loop at a staggered time,
    // but the delay is NOT part of the repeating sequence.
    const startTimeout = setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          // 1. THE ANIMATION (Scale up and Fade out)
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 2,
              duration: 2500,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 2500,
              useNativeDriver: true,
            }),
          ]),

          // 2. THE 2-SECOND WAIT (Pause before restarting)
          Animated.delay(2000),

          // 3. RESET (Snap back to start instantly)
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0.5,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
        opacity,
      }}
      className="absolute w-56 h-56 bg-red-300 rounded-full"
    />
  );
};

export default function EmergencyButton() {
  return (
    <View className="items-center justify-center p-20">
      {/* Ripple Faders */}
      <RippleRing delay={0} />
      <RippleRing delay={800} />
      <RippleRing delay={1600} />

      {/* Main SOS Button */}
      <Pressable
        className="bg-red-400 rounded-full justify-center items-center aspect-square w-56 h-56 shadow-2xl z-10"
        onPress={() => console.log("SOS Triggered")}
      >
        <Text className="text-white font-oswald-medium text-6xl text-center">
          SOS
        </Text>
      </Pressable>

      {/* Floating Status Cards */}
      <View
        style={{ elevation: 5 }}
        className="absolute top-12 right-6 bg-white flex-row items-center p-2 rounded-2xl shadow-none z-20"
      >
        <View className="bg-blue-100 p-2 rounded-xl mr-2">
          <MapPin size={16} color="#3b82f6" />
        </View>
        <Text className="text-slate-800 font-oswald text-sm">
          Sending Location
        </Text>
      </View>

      <View
        style={{ elevation: 5 }}
        className="absolute bottom-12 left-2 bg-white flex-row items-center p-2 rounded-2xl shadow-none z-20"
      >
        <View className="bg-green-100 p-2 rounded-xl mr-2">
          <Users size={16} color="#10b981" />
        </View>
        <Text className="text-slate-800 font-oswald text-sm">
          Notifying 3 Guardians
        </Text>
      </View>
    </View>
  );
}

import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Map, Siren } from "lucide-react-native";
import React from "react";

export default function ProtectedLayout() {
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#141053", // secondary color

          tabBarInactiveTintColor: "rgba(20,16,83,0.5)",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
          },
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="(tabs)/emergency"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Siren color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="(tabs)/map"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => <Map color={color} size={size} />,
          }}
        />
      </Tabs>
    </React.Fragment>
  );
}

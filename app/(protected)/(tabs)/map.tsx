import LocationBar from "@/features/map/components/layouts/LocationBar";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

export default function CurrentLocationMap() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      // 1. Request Permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // 2. Watch location in real-time
      const subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10, // Update every 10 meters
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );

      return () => subscriber.remove();
    })();
  }, []);

  if (errorMsg)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{errorMsg}</Text>
      </View>
    );
  if (!location)
    return (
      <ActivityIndicator size="large" color="#ef4444" style={{ flex: 1 }} />
    );

  return (
    <View className="flex-1 bg-background">
      <View className="absolute top-12 left-0 right-0 z-50 px-6">
        <LocationBar />
      </View>
      <View className="flex-1">
        <MapView
          style={styles.map}
          showsMyLocationButton={false}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation={true} // Shows the blue dot natively
          followsUserLocation={true}
        >
          {/* Custom Marker for the user/child */}

          {/* Optional: Add a Circle to show accuracy/safe zone */}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
});

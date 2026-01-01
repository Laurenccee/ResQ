import * as Location from "expo-location";
import { MapPin } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function LocationBar() {
  const [address, setAddress] = useState<string>("Loading location...");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      let reverseRegion = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseRegion.length > 0) {
        let item = reverseRegion[0];
        let name = item.name ?? "";
        let city = item.city ?? item.region ?? "";
        setAddress(`${name}, ${city}`);
      }
    })();
  }, []);

  return (
    <View className="px-8 py-4 bg-white/65 rounded-2xl flex-row items-center">
      <View className="p-2  rounded-2xl">
        <MapPin size={24} className="color-seconday" />
      </View>
      <View className="ml-3">
        <Text className="text-secondary text-xs uppercase font-oswald tracking-widest">
          Current Location
        </Text>
        {errorMsg ? (
          <Text className="text-red-400 text-sm">{errorMsg}</Text>
        ) : (
          <Text
            className=" text-lg text-secondary font-serif font-semibold"
            numberOfLines={1}
          >
            {address}
          </Text>
        )}
      </View>
    </View>
  );
}

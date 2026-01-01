import { Bell } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

import { formatCustomDate, getCurrentDateTime } from "@/utils/timeUtils";

export default function AppBar() {
  return (
    <View className=" bg-background px-8 ">
      <Text className="font-oswald text-secondary-200 capitalize">
        {formatCustomDate(getCurrentDateTime())}
      </Text>
      <View className="flex flex-row">
        <View className="flex-1 flex-row items-center gap-2">
          <Text className="font-serif text-secondary text-3xl">
            Hi, Revert Laurence
          </Text>
        </View>
        <View>
          <View className="p-2 bg-white rounded-2xl">
            <Bell />
          </View>
        </View>
      </View>
    </View>
  );
}

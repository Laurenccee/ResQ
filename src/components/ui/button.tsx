import React from "react";
import { Pressable } from "react-native";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  classname?: string;
  textColor?: string;
  isDisabled?: boolean;
}

export default function Button({
  children,
  onPress,
  classname,
  isDisabled,
}: ButtonProps) {
  return (
    <>
      <Pressable
        onPress={onPress}
        className={`${classname} w-full h-16 items-center justify-center px-4 py-2 ${isDisabled ? "opacity-50" : ""}`}
        disabled={isDisabled}
      >
        {children}
      </Pressable>
    </>
  );
}

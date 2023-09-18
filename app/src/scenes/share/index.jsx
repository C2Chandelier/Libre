import React from "react";
import { View, Text } from "react-native";
import Navbar from "../navbar";
import { useTailwind } from "tailwind-rn";

export default function Share() {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("flex-1")}>
      <Text>Share ICI</Text>
      <Navbar style={tailwind("absolute bottom-0 w-[100%] ")} />
    </View>
  );
}

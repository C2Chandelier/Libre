import React from "react";
import { View, Text } from "react-native";
import Navbar from "../navbar";
import { useTailwind } from "tailwind-rn";
import Logout from "../auth/components/logout";

export default function MyAccount() {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("flex-1")}>
      <Text>PROFIL ICI</Text>
      <Logout />
      <Navbar style={tailwind("absolute bottom-0 w-[100%] ")} />
    </View>
  );
}

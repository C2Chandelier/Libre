import React from "react";
import { View, Text } from "react-native";
import Navbar from "../navbar";
import { useTailwind } from "tailwind-rn";
import { useRoute } from "@react-navigation/native";

export default function MemberProfil() {
  const tailwind = useTailwind();
    const route = useRoute();
    const { id } = route.params;
    console.log(id)
  return (
    <View style={tailwind("flex-1")}>
      <Text>PROFIL de membre ICI</Text>
      <Navbar style={tailwind("absolute bottom-0 w-[100%] ")} />
    </View>
  );
}

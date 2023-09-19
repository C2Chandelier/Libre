import React from "react";
import { View, Text } from "react-native";
import Navbar from "../Navbar";
import { useRoute } from "@react-navigation/native";

export default function MemberProfil() {
    const route = useRoute();
    const { id } = route.params;
    console.log(id)
  return (
    <View>
      <Text>PROFIL de membre ICI</Text>
      <Navbar />
    </View>
  );
}

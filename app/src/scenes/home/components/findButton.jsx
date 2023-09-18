import React from "react";
import { View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import { BiSearch } from "react-icons/bi";

export default function FindButton() {
  const navigation = useNavigation();
  const tailwind = useTailwind();

  return (
    <View style={tailwind("bg-gray-500")}>
      <Pressable onPress={() => navigation.navigate("Search")}>
        <BiSearch style={{ width: "30px", height: "30px",color:"white" }} />
      </Pressable>
    </View>
  );
}

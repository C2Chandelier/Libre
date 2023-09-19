import React from "react";
import { View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BiSearch } from "react-icons/bi";

export default function FindButton() {
  const navigation = useNavigation();

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Search")}>
        <BiSearch />
      </Pressable>
    </View>
  );
}

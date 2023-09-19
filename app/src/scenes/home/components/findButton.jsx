import React from "react";
import { View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

export default function FindButton() {
  const navigation = useNavigation();

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Search")}>
        <Entypo name="magnifying-glass" size={32} color="black" />
      </Pressable>
    </View>
  );
}

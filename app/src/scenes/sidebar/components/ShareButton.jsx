import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Pressable } from "react-native";
import { Fontisto } from "@expo/vector-icons";

export default function ShareButton() {
  const navigation = useNavigation();

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Share")}>
        <Fontisto name="share-a" size={35} color="white" />
      </Pressable>
    </View>
  );
}

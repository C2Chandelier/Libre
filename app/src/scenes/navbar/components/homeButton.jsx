import React from "react";
import { View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

export default function HomeButton() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Home")}>
        {route.name === "Home" ? <Entypo name="home" size={40} color="white" /> : <AntDesign name="home" size={40} color="black" />}
      </Pressable>
    </View>
  );
}

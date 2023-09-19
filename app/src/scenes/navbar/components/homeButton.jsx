import React from "react";
import { View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

export default function HomeButton() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Home")}>{route.name === "Home" ? <Entypo name="home" size={40} color="black" /> : <Entypo name="home" size={40} color="white" /> }</Pressable>
    </View>
  );
}

import React from "react";
import { View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { useRoute } from "@react-navigation/native";

export default function HomeButton() {
  const navigation = useNavigation();
  const route = useRoute();
  const style = {width:"40px",height:"40px"}

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Home")}>{route.name === "Home" ? <AiFillHome style={style} /> : <AiOutlineHome style={style} />}</Pressable>
    </View>
  );
}

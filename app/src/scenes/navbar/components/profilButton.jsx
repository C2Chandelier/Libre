import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Pressable } from "react-native";
import { FaRegUser, FaUser } from "react-icons/fa";
import { useRoute } from "@react-navigation/native";

export default function Profilbutton() {
  const navigation = useNavigation();
  const route = useRoute();
  const style = { width: "40px", height: "40px" };

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Profil")}>{route.name === "Profil" ? <FaUser style={style}/> : <FaRegUser style={style}/>}</Pressable>
    </View>
  );
}

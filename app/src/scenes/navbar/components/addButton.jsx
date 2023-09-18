import React from "react";
import { View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BiSolidMessageAltAdd } from "react-icons/bi";
import { useRoute } from "@react-navigation/native";

export default function AddButton() {
  const route = useRoute();
  const navigation = useNavigation();
  const style = { width: "50px", height: "50px", color: route.name === "Messagerie" || route.name === "MyAccount" ? "black" : "white" };

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Ajoute")}>
        <BiSolidMessageAltAdd style={style} />
      </Pressable>
    </View>
  );
}

import React from "react";
import { View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function ActuButton() {
  const navigation = useNavigation();
  const route = useRoute();
  const style = { width: "40px", height: "40px" };

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Actu")}>
        {route.name === "Actu" ? <Ionicons name="newspaper" size={40} color="white" /> : <Ionicons name="newspaper-outline" size={40} color="black" />}
      </Pressable>
    </View>
  );
}

import React from "react";
import { View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

export default function AddButton() {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Ajoute")}>
        {route.name === "Chat" || route.name === "MyAccount" ? (
          <MaterialIcons name="add-box" size={50} color="black" />
        ) : (
          <MaterialIcons name="add-box" size={50} color="white" />
        )}
      </Pressable>
    </View>
  );
}

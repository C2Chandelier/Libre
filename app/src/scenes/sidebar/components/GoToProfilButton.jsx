import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function GoToProfilButton() {
  const navigation = useNavigation();

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("MemberProfil", { id: "1234" })}>
        <MaterialCommunityIcons name="eye-plus" size={40} color="white" />
      </Pressable>
    </View>
  );
}

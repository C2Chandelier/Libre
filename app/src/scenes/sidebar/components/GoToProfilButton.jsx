import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function GoToProfilButton({ userId }) {
  const navigation = useNavigation();

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("MemberProfil", { userId: userId })}>
        <MaterialCommunityIcons name="eye-plus" size={40} color="white" />
      </Pressable>
    </View>
  );
}

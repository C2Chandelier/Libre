import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Pressable } from "react-native";
import { useTailwind } from "tailwind-rn";
import { PiUserCirclePlusBold } from "react-icons/pi";

export default function GoToProfilButton() {
  const navigation = useNavigation();
  const tailwind = useTailwind();

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Profil")}>
        <PiUserCirclePlusBold style={{ width: "40px", height: "40px" }} />
      </Pressable>
    </View>
  );
}

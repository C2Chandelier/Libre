import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Pressable } from "react-native";
import { PiUserCirclePlusBold } from "react-icons/pi";

export default function GoToProfilButton() {
  const navigation = useNavigation();

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("MemberProfil",{id:"1234"})}>
        <PiUserCirclePlusBold style={{ width: "40px", height: "40px" }} />
      </Pressable>
    </View>
  );
}

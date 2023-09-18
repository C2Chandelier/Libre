import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Pressable } from "react-native";
import { useTailwind } from "tailwind-rn";
import {PiShareFatFill} from "react-icons/pi"

export default function ShareButton() {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Profil")}>
        <PiShareFatFill style={{ width: "40px", height: "40px" }} />
      </Pressable>
    </View>
  );
}

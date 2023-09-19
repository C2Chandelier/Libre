import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Pressable } from "react-native";
import {PiShareFatFill} from "react-icons/pi"

export default function ShareButton() {
  const navigation = useNavigation();

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Share")}>
        <PiShareFatFill style={{ width: "40px", height: "40px" }} />
      </Pressable>
    </View>
  );
}

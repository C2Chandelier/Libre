import React from "react";
import { View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BiMessageMinus, BiSolidMessageMinus } from "react-icons/bi";
import { useRoute } from "@react-navigation/native";


export default function Chatbutton() {
  const navigation = useNavigation();
  const route = useRoute();
  const style = { width: "40px", height: "40px" };

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Messagerie")}>
        {route.name === "Messagerie" ? <BiSolidMessageMinus style={style}/> : <BiMessageMinus style={style}/>}
      </Pressable>
    </View>
  );
}

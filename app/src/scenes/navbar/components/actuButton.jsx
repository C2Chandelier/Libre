import React from "react";
import { View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IoNewspaper, IoNewspaperOutline } from "react-icons/io5";
import { useRoute } from "@react-navigation/native";

export default function ActuButton() {
  const navigation = useNavigation();
  const route = useRoute();
  const style = { width: "40px", height: "40px" };

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Actu")}>
        {route.name === "Actu" ? <IoNewspaper style={style}/> : <IoNewspaperOutline style={style}/>}
      </Pressable>
    </View>
  );
}

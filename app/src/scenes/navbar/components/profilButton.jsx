import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Profilbutton() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View>
      <Pressable
        onPress={() => {
          navigation.removeListener;
          navigation.navigate("MyAccount");
        }}>
        {route.name === "MyAccount" ? <FontAwesome5 name="user-alt" size={40} color="black" /> : <FontAwesome5 name="user" size={40} color="gray" />}
      </Pressable>
    </View>
  );
}

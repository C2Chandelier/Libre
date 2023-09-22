import React from "react";
import { View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";


export default function Chatbutton() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Chat")}>
        {route.name === "Chat" ? (
          <Ionicons name="md-chatbox-ellipses-sharp" size={40} color="white" />
        ) : (
          <Ionicons name="md-chatbox-ellipses-outline" size={40} color="gray" />
        )}
      </Pressable>
    </View>
  );
}

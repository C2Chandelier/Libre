import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function CommentButton() {
  const navigation = useNavigation();

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Comment")}>
        <FontAwesome name="commenting" size={40} color="white" />
      </Pressable>
    </View>
  );
}

import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function CommentButton({ setIsCommentOpen }) {
  return (
    <View>
      <Pressable onPress={() => setIsCommentOpen(true)}>
        <FontAwesome name="commenting" size={40} color="white" />
      </Pressable>
    </View>
  );
}

import React from "react";
import { View, Text, Pressable, SafeAreaView } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function Comment({ setIsCommentOpen, postId }) {
  return (
    <SafeAreaView>
      <Pressable
        onPress={() => {
          setIsCommentOpen(false);
          console.log(postId);
        }}>
        <Entypo name="cross" size={24} color="black" />
      </Pressable>
      <Text>Comment ICI</Text>
    </SafeAreaView>
  );
}

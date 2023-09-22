import React from "react";
import { View, Text, Pressable, SafeAreaView } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function Share({ setIsShareOpen, postId }) {
  return (
    <SafeAreaView>
      <Pressable
        onPress={() => {
          setIsShareOpen(false);
          console.log(postId);
        }}>
        <Entypo name="cross" size={24} color="black" />
      </Pressable>
      <Text>Share ICI</Text>
    </SafeAreaView>
  );
}

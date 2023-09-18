import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Pressable } from "react-native";
import { useTailwind } from "tailwind-rn";
import {FaCommentDots} from "react-icons/fa"

export default function CommentButton() {
  const navigation = useNavigation();
  const tailwind = useTailwind();

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Comment")}>
        <FaCommentDots style={{ width: "40px", height: "40px" }} />
      </Pressable>
    </View>
  );
}

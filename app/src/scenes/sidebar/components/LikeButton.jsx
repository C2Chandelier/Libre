import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function LikeButton({ postId }) {
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = React.useState(false);
  const style = { width: "40px", height: "40px", color: isLiked ? "red" : "white" };

  return (
    <View>
      <Pressable
        onPress={() => {
          setIsLiked(!isLiked);
          console.log(postId);
        }}>
        {isLiked ? <AntDesign name="heart" size={40} color="red" /> : <AntDesign name="heart" size={40} color="white" />}
      </Pressable>
    </View>
  );
}

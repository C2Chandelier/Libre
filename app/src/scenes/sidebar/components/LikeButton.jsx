import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Pressable } from "react-native";
import {PiHeartFill} from "react-icons/pi"


export default function LikeButton() {
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = React.useState(false)
  const style = { width: "40px", height: "40px", color: isLiked ? "red" : "white" };

  return (
    <View>
      <Pressable onPress={() => setIsLiked(!isLiked)}>
        <PiHeartFill style={style}/>
      </Pressable>
    </View>
  );
}

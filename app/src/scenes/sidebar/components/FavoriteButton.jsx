import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Pressable } from "react-native";
import { useTailwind } from "tailwind-rn";
import { AiFillStar } from "react-icons/ai";

export default function FavoriteButton() {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const style = { width: "40px", height: "40px", color: isFavorite ? "yellow" : "white" };


  return (
    <View>
      <Pressable onPress={() => setIsFavorite(!isFavorite)}>
        <AiFillStar style={style} />
      </Pressable>
    </View>
  );
}

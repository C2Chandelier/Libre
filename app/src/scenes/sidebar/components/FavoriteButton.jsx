import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function FavoriteButton({ postId }) {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const style = { width: "40px", height: "40px", color: isFavorite ? "yellow" : "white" };

  return (
    <View>
      <Pressable
        onPress={() => {
          setIsFavorite(!isFavorite);
          console.log(postId);
        }}>
        {isFavorite ? <AntDesign name="star" size={40} color="yellow" /> : <Ionicons name="ios-bookmark" size={40} color="white" />}
      </Pressable>
    </View>
  );
}

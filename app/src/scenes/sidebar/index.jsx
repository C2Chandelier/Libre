import React from "react";
import { View } from "react-native";
import CommentButton from "./components/CommentButton";
import ShareButton from "./components/ShareButton";
import LikeButton from "./components/LikeButton";
import GoToProfilButton from "./components/GoToProfilButton";
import FavoriteButton from "./components/FavoriteButton";
import { useTailwind } from "tailwind-rn";

export default function Sidebar() {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("bg-gray-500 items-center justify-around h-full")}>
      <GoToProfilButton />
      <CommentButton />
      <LikeButton />
      <FavoriteButton />
      <ShareButton />
    </View>
  );
}

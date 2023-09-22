import React from "react";
import { View } from "react-native";
import CommentButton from "./components/CommentButton";
import ShareButton from "./components/ShareButton";
import LikeButton from "./components/LikeButton";
import GoToProfilButton from "./components/GoToProfilButton";
import FavoriteButton from "./components/FavoriteButton";
import tw from "twrnc";

export default function Sidebar() {

  return (
    <View style={tw`justify-around items-center h-full`}>
      <GoToProfilButton />
      <CommentButton />
      <LikeButton />
      <FavoriteButton />
      <ShareButton />
    </View>
  );
}

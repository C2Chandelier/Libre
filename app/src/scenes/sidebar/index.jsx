import React, { useState } from "react";
import { View } from "react-native";
import CommentButton from "./components/CommentButton";
import ShareButton from "./components/ShareButton";
import LikeButton from "./components/LikeButton";
import GoToProfilButton from "./components/GoToProfilButton";
import FavoriteButton from "./components/FavoriteButton";
import { useRoute } from "@react-navigation/native";
import tw from "twrnc";

export default function Sidebar({ userId, postId, setIsCommentOpen, setIsShareOpen }) {
  const route = useRoute();
  const styleNav = "flex flex-row justify-around items-center w-full";
  const styleSide = "justify-around items-center h-full";
  return (
    <View style={route.name === "Detail" ? tw`${styleNav}` : tw`${styleSide}`}>
      <GoToProfilButton userId={userId} />
      <CommentButton setIsCommentOpen={setIsCommentOpen} />
      <LikeButton postId={postId} />
      <FavoriteButton postId={postId} />
      <ShareButton setIsShareOpen={setIsShareOpen} />
    </View>
  );
}

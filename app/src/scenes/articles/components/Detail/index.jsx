import React, { useState } from "react";
import { View, Text, SafeAreaView, Modal, Pressable } from "react-native";
import Sidebar from "../../../Sidebar";
import Comment from "../../../Comment";
import Share from "../../../Share";
import tw from "twrnc";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Detail() {
  const route = useRoute();
  const navigation = useNavigation();
  const postId = route.params.postId;
  const userId = route.params.userId;
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <SafeAreaView style={tw`flex h-full w-full bg-red-500`}>
      <Pressable
        onPress={() => {
          setIsCommentOpen(false);
          setIsShareOpen(false);
          navigation.goBack();
        }}>
        <AntDesign name="left" size={24} color="black" />
      </Pressable>
      <Text>DETAIL ICI</Text>
      <Modal visible={isCommentOpen} transparent={true} animationType="slide">
        <View style={tw`bg-white absolute bottom-0 w-full h-3/4`}>
          <Comment setIsCommentOpen={setIsCommentOpen} postId={postId} />
        </View>
      </Modal>
      <Modal visible={isShareOpen} transparent={true} animationType="slide">
        <View style={tw`bg-white absolute bottom-0 w-full h-2/5`}>
          <Share setIsShareOpen={setIsShareOpen} postId={postId} />
        </View>
      </Modal>
      {!isCommentOpen && !isShareOpen ? (
        <View style={tw`bg-black justify-around h-20 absolute bottom-0 w-full`}>
          <Sidebar userId={userId} postId={postId} setIsCommentOpen={setIsCommentOpen} setIsShareOpen={setIsShareOpen} />
        </View>
      ) : null}
    </SafeAreaView>
  );
}

import React, { useState } from "react";
import { View, Pressable, Text, ScrollView, SafeAreaView, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import Navbar from "../Navbar";
import tw from "twrnc";
import Sidebar from "../Sidebar";
import FindButton from "./components/FindButton";
import Comment from "../Comment";
import Share from "../Share";
import { PanGestureHandler } from "react-native-gesture-handler";

export default function Article() {
  const navigation = useNavigation();
  const postId = "1111";
  const userId = "2222";
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const onGestureEvent = ({ nativeEvent: event }) => {
    if (event.translationX < -50) {
      navigation.navigate("Detail", {
        postId: postId,
        userId: userId,
      });
    }
  };

  return (
    <SafeAreaView style={tw`flex flex-col`}>
      <View style={tw`absolute right-0 z-10 mr-5 mt-4`}>
        <FindButton />
      </View>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <ScrollView style={tw`mb-16`}>
            <Pressable
              onPress={() =>
                navigation.navigate("Detail", {
                  postId: postId,
                  userId: userId,
                })
              }>
              <Text style={tw`mx-auto text-xl mt-16`}>TITRE BROOOOOOOOOOOOOOOOO</Text>
              <Entypo name="image-inverted" size={220} color="black" style={tw`mx-auto`} />
              <Text style={tw`ml-2 w-[90%] text-base pr-2 pb-5`}>
                Une exoplanète et une formidable nébuleuse : le 12 juillet, de nouvelles images du télescope spatial James Webb ont été dévoilées par la NASA, révélant la beauté et
                l'inconcevable immensité du cosmos.Un an après la publication de ses premiers clichés du cosmos, le télescope spatial James Webb a livré ce mercredi une nouvelle
                image spectaculaire, capturant la naissance d’étoiles similaires à notre Soleil. Des jets d’hydrogène rouges dominent la photo, provoqués par les étoiles naissantes
                jaillissant de leur cocon de poussière idable nébuleuse : le 12 juillet, de nouvelles images du télescope spatial James Webb ont été dévoilées par la NASA, révélant
                la beauté et l'inconcevable immensité du cosmos.Un an après la publication de ses premiers clichés du cosmos, le télescope spatial James Webb a livré ce mercredi
                une nouvelle image spectaculaire, capturant la naissance d’étoiles similaires à notre Soleil. Des jets d’hydrogène rouges dominent la photo, provoqués par les
                étoiles naissantes jaillissant de leur cocon de poussière.
              </Text>
            </Pressable>
          </ScrollView>
        </PanGestureHandler>
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
        <>
          <View style={tw`absolute right-0 top-2/5 h-1/2 z-10 w-14`}>
            <Sidebar userId={userId} postId={postId} setIsCommentOpen={setIsCommentOpen} setIsShareOpen={setIsShareOpen} />
          </View>
          <View style={tw`flex flex-row bg-black justify-around h-16 absolute bottom-0 w-full`}>
            <Navbar />
          </View>
        </>
      ) : null}
    </SafeAreaView>
  );
}

import React from "react";
import { View, Text, SafeAreaView, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function MemberProfil() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params;
  console.log(userId);
  return (
    <SafeAreaView style={tw`flex h-full w-full`}>
      <Pressable onPress={() => navigation.goBack()}>
        <AntDesign name="left" size={24} color="black" />
      </Pressable>
      <Text>PROFIL MEMBRE ICI</Text>
    </SafeAreaView>
  );
}

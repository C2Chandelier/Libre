import React from "react";
import ProfilButton from "./components/ProfilButton";
import ChatButton from "./components/ChatButton";
import ActuButton from "./components/ActuButton";
import HomeButton from "./components/HomeButton";
import AddButton from "./components/AddButton";
import { View } from "react-native";
import tw from "twrnc";

export default function Navbar() {
  return (
    <View style={tw`flex flex-row bg-gray-500 justify-around w-full`}>
      <HomeButton />
      <ActuButton />
      <AddButton />
      <ChatButton />
      <ProfilButton />
    </View>
  );
}

import React from "react";
import ProfilButton from "./components/profilButton";
import ChatButton from "./components/chatButton";
import ActuButton from "./components/actuButton";
import HomeButton from "./components/homeButton";
import AddButton from "./components/addButton";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";

export default function Navbar() {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("flex flex-row bg-gray-500 items-center justify-around w-full")}>
      <HomeButton />
      <ActuButton />
      <AddButton />
      <ChatButton />
      <ProfilButton />
    </View>
  );
}

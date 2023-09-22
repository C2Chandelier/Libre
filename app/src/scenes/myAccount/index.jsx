import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import Navbar from "../Navbar";
import Logout from "../Auth/components/Logout";
import tw from "twrnc";

export default function MyAccount() {
  return (
    <SafeAreaView style={tw`flex h-full w-full`}>
      <Text>PROFIL ICI</Text>
      <Logout />
      <View style={tw`flex flex-row bg-white border-t border-slate-400 justify-around h-16 absolute bottom-0 w-full`}>
        <Navbar />
      </View>
    </SafeAreaView>
  );
}

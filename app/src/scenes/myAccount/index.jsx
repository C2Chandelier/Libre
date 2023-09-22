import React from "react";
import { View, Text } from "react-native";
import Navbar from "../Navbar";
import Logout from "../Auth/components/Logout";
import tw from "twrnc";

export default function MyAccount() {

  return (
    <View style={tw`flex absolute bottom-0 w-full`}>
      <Text>PROFIL ICI</Text>
      <Logout />
      <Navbar />
    </View>
  );
}
